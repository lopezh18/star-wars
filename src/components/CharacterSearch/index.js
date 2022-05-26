import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CharacterList } from './styles';

const ERROR_MESSAGE = 'oops something went wrong'

const CharacterSearch = () => {
  const [state, updateState] = useState({
    characterState: [],
    error: '',
    loading: false,
    searchValue: '',
  });
  
  const memoized = useCallback(async() => {
    try {
      updateState({ ...state, loading: true, });
      const response = await fetch('https://swapi.dev/api/people/');
      const { results } = await response.json();
      updateState({ ...state, characterState: results, loading: false });
    } catch (e) {
      console.log(e);
      updateState({ ...state, error: ERROR_MESSAGE, loading: false, });
    }
  }, []);
  
  // useEffect(() => {
    //   const fetchData = async () => {
      //     try {
        //       console.log('in nonmemoized');
        //       const response = await fetch('https://swapi.dev/api/people/');
        //       const { results } = await response.json();
        //       console.log(results);
        //       updateState({ ...state, characterState: results });
        //     } catch (e) {
                  //  updateState({ ...state, error: ERROR_MESSAGE, loading: false, });
          //       console.log(e);
          //     }
          //   }
          
          //   fetchData();
          // }, []);
          
  useEffect(() => {
    memoized();
  }, [memoized]);
  console.log(state.characterState);

  const handleChange = ({ target: { value }}, str) => {
    updateState({ ...state, searchValue: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateState({ ...state, loading: true });
      const data = await fetch(`https://swapi.dev/api/people/?search=${state.searchValue}`);
      const { results } = await data.json();
      console.log('search-results', results);
      updateState({ ...state, characterState: results, loading: false });
    } catch (e) {
      console.log(e);
      updateState({ ...state, error: ERROR_MESSAGE, loading: false});
    }
  }

  return (
    <div>
      <h1>Look up your favorite characters</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='character=search'>Who would you like to learn more about?</label>
        <input id='character-search' type='text' onChange={handleChange}/>
        <button type='submit'>search</button>
      </form>
      { !state.loading ?
        <CharacterList>
          {state.characterState.map(({ created, name, url }) => {
            const id = url.split('/people/')[1].split('/')[0];
            return <Link key={`${name}-${created}`} to={`/${id}`}>{name}</Link>
          })}
        </CharacterList> : <p>LOADING...</p>
      }
    </div>
  )
}

export default CharacterSearch;