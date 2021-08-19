import React, { useContext } from 'react';
import GameBoard from './GameBoard';
import GameContext from './context/GameContext';

function TicTacToe() {
  const { activePlayer, gameBoard } = useContext(GameContext);

  const victoryArchivedInLine = (gameBoard) => {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1]
        && gameBoard[i + 1] === gameBoard[i + 2]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  const victoryArchivedInColumn = (gameBoard) => {
    for (let i = 0; i <= 2; i += 1) {
      if (
        gameBoard[i] === gameBoard[i + 3]
        && gameBoard[i + 3] === gameBoard[i + 6]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  const victoryArchivedInDiagonals = (gameBoard) => {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      return gameBoard[0];
    }
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      return gameBoard[2];
    }
    return false;
  }

  const resetGame = () => {
    this.setState({
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  }

  const toggleActivePlayer = () => {
    const { activePlayer } = this.state;
    if (activePlayer === 1) return 2;
    return 1;
  }

  const updateState = (cellClicked) => {
    this.setState((state) => {
      const newState = [...state.gameBoard];
      let newActivePlayer = state.activePlayer;

      if (state.gameBoard[cellClicked] === 0) {
        newState[cellClicked] = state.activePlayer;
        newActivePlayer = this.toggleActivePlayer();
      } else newState[cellClicked] = state.gameBoard[cellClicked];

      return {
        activePlayer: newActivePlayer,
        gameBoard: newState,
      };
    });
  }

  const victoryArchieved = () => {
    const { gameBoard } = this.state;

    return (
      TicTacToe.victoryArchivedInLine(gameBoard)
      || TicTacToe.victoryArchivedInColumn(gameBoard)
      || TicTacToe.victoryArchivedInDiagonals(gameBoard)
    );
  }

  const renderButton = () => {
    return (
      <button
        type="button"
        onClick={this.resetGame}
        data-testid="restart-button"
      >
        Recomeçar Jogo
      </button>
    );
  }

  const win = this.victoryArchieved();

  if (!gameBoard.includes(0) && !win) {
    return (
      <>
        {this.renderButton()}
        <h1>Empate</h1>
      </>
    );
  }

  return (
    <>
      {this.renderButton()}
      {(!win)
        ? (
          <GameBoard
            gameState={gameBoard}
            updateGame={this.updateState}
          />
        )
        : <h1>{`Player ${win === 2 ? 'O' : 'X'} Ganhou`}</h1>}
    </>
  );
}

export default TicTacToe;
