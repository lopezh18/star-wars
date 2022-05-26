import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import CharacterSearch from './components/CharacterSearch';
import Character from './components/Character';

const TestDiv = styled('div')`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Router>
      <TestDiv className="App">
        <Routes>
          <Route exact path='/' element={<CharacterSearch />}/>
          <Route exact path='/:character' element={<Character />}/>
        </Routes>
      </TestDiv>
    </Router>
  );
}

export default App;
