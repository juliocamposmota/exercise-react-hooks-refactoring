// src/App.js

import React from 'react';
import TicTacToe from './TicTacToe';
import GameProvider from './context/GameProvider';
import './App.css';

function App() {
  return (
    <GameProvider>
      <TicTacToe />
    </GameProvider>
  );
}

export default App;
