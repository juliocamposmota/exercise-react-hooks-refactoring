import React, { useState } from 'react';
import GameContext from './GameContext';

function GameProvider({ children }) {
  const [game, setGame] = useState({
    activePlayer: 1,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const context = {
    game,
    setGame,
  };

  return (
    <GameContext.Provider value={ context }>
      { children }
    </GameContext.Provider>
  );
}

export default GameProvider;
