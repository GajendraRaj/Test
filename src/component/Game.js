import React, { useState } from 'react';
import { Board } from './Board';

export const Game = () => {
    const initialState = {
        activePlayer: 'X',
        winner: null,
        isGameOver: false
    }
    const [gameState, setGameState] = useState(initialState);

    const changeActivePlayer = () => {
        setGameState((prevState) => ({
            ...prevState,
            activePlayer: getInactivePlayer() 
        }));
    }

    const setTheWinner = () => {
        setGameState((prevState) => ({
            ...prevState,
            winner: gameState.activePlayer,
            isGameOver: true
        }));
    }

    const gameDrawn = () => {
        setGameState((prevState) => ({
            ...prevState,
            isGameOver: true
        }));
    }

    const getInactivePlayer = () => {
        return gameState.activePlayer === 'X' ? 'O' : 'X';
    }

    const showGameOverMessage = () => {
        return gameState.winner ? 
            (<p className="win-msg">{`Player ${gameState.winner} win the game`}</p>)
            :
            (<p className="game-drawn-msg">{`Game drawn`}</p>);

    }

    const resetNotification = () => {
        setGameState(initialState);
    }

    return (
        <div className="game">   
            <h4>{`Next player: ${gameState.activePlayer}`}</h4>
            <Board activePlayer={gameState.activePlayer}
                changeActivePlayer={changeActivePlayer}
                setTheWinner={setTheWinner}
                gameDrawn={gameDrawn}
                reset={resetNotification}
            />

            {gameState.isGameOver && showGameOverMessage()}
        </div>
    );
}