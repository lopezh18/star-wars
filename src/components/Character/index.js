import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ERROR_MESSAGE = 'oops something went wrong'
const dataToDisplay = ['name', 'birth_year', 'height', 'mass', 'hair_color', 'skin_color'];

export default function Character() {
  const { character } = useParams() ;
  const [state, updateState] = useState({
    characterInformation: {},
    error: '',
    loading: false,
  });
  const fetchData = useCallback(async () => {
    try {
      updateState({ ...state, loading: true });
      const data = await fetch(`https://swapi.dev/api/people/${character}`);
      console.log(data.body);
      const result = await data.json();
      if (result.detail) {
        updateState({ ...state, loading: false, error: 'invalid character id' });
      } else {
        const formattedResult = dataToDisplay.reduce((acc, cv) => {
          acc[cv] = result[cv];
          return acc;
        }, {});
        updateState({ ...state, loading: false, characterInformation: formattedResult });
        console.log(result);
      }
    } catch (e) {
      console.log(e);
      updateState({ ...state, loading: false, error: ERROR_MESSAGE });
    }
  },[]);

  useEffect(() => {
    fetchData();
  }, [fetchData])
  
  return (
    <div>
      {state.error && <p>{state.error}</p>}
      { !state.error && !state.loading && (
        <div>
          {Object.keys(state.characterInformation).map((key) => {
            const formattedKey = key[0].toUpperCase() + key.slice(1).replace('_', ' ');
            const value = state.characterInformation[key];
            return <p key={key}>{formattedKey}: {value}</p>
          })}
          {/* <p>Name: {state.characterInformation.name}</p>
          <p>Height: {state.characterInformation.height}</p>
          <p>Mass: {state.characterInformation.mass}</p>
          <p>Hair Color: {state.characterInformation.hair_color}</p>
          <p>Skin Color: {state.characterInformation.skin_color}</p> */}
        </div>
      )}
    </div>
  )
}