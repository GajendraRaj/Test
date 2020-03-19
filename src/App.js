import React from 'react';
import './App.css';
//import { Game } from './component/Game';
import { Game } from './component/Game1';

function App() {
  return (
    <div className="App">
      <h2>Tic Tac Toe</h2>
      <div>
        <Game />  
      </div>         
    </div>
  );
}

export default App;
