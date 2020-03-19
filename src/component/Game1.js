import React, { useState } from 'react';
//import { Board } from './Board';
import { Square } from './Square';
export const Game = () => {
    const initialState = {
        activePlayer: 'X',
        winner: null,
        isGameOver: false
    }
    const [gameState, setGameState] = useState(initialState);
    const [square, setSquare] = useState([]);
    const [filledSquareCount, setFilledSquareCount] = useState(0);

    const renderSquare = () => {
        let squareList = [];

        for(let i = 0; i < 9; i++) {
            squareList.push(<li key={i}>
                <Square clickNotification={fillTheSquare.bind(this, i)}
                    value={getFilledValue(i)}
                    isDisabled={isSquareDisabled(i)} />
            </li>);
        }

        return squareList;
    }

    const fillTheSquare = (index) => {
        let filledSquares = square;

        filledSquares[index] = gameState.activePlayer;
        setSquare(filledSquares);
        setFilledSquareCount(filledSquareCount + 1);
        checkActivePlayerWinTheGame();
    }

    const checkActivePlayerWinTheGame = () => {
        let isGameOver = false;
        if (isAnyRowCompletedByTheActivePlayer() ||
            isAnyColumnCompletedByTheActivePlayer() ||
            isAnyDiagonalCompletedByTheActivePlayer()
        ) {
            isGameOver = true;
            setTheWinner();
        } else if (isGameDrawn()) {
            isGameOver = true;
            gameDrawn();
        } else {
            setGameState((prevState) => ({
                ...prevState,
                activePlayer: getInactivePlayer() 
            }));
        }

        setSquare((prevState) => ({
            ...prevState,
            isGameOver
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

    const isAnyRowCompletedByTheActivePlayer = () => {
        const rowStartIndexList = [0, 3, 6];
        const totalRows = 3;
        let isPlayerWin = false;

        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            let rowStartIndex = rowStartIndexList[rowIndex];
            if (isRowCompletedByTheActivePlayer(rowStartIndex)) {
                isPlayerWin = true;
                break;
            }
        }

        return isPlayerWin;
    }

    const isRowCompletedByTheActivePlayer = (rowStartIndex) => {
        const activePlayer = gameState.activePlayer;
        const filledSquares = square;

        return (filledSquares[rowStartIndex] === activePlayer &&
            filledSquares[rowStartIndex + 1] === activePlayer &&
            filledSquares[rowStartIndex + 2] === activePlayer);
    }

    const isAnyColumnCompletedByTheActivePlayer = () => {
        const columnStartIndexList = [0, 1, 2];
        const totalColumns = 3;
        let isPlayerWin = false;

        for(let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            let columnStartIndex = columnStartIndexList[columnIndex];
            if(isColumnCompletedByTheActivePlayer(columnStartIndex, totalColumns)) { 
                isPlayerWin = true;
                break;
            } 
        }

        return isPlayerWin;
    }

    const isColumnCompletedByTheActivePlayer = (columnStartIndex, totalColumns) => {
        const filledSquares = square;
        const activePlayer = gameState.activePlayer;

        return (filledSquares[columnStartIndex] === activePlayer && 
            filledSquares[columnStartIndex + totalColumns] === activePlayer && 
            filledSquares[columnStartIndex + (2 * totalColumns)] === activePlayer);
    }

    const isAnyDiagonalCompletedByTheActivePlayer = () => {
        const totalDiagonals = 2;
        let isPlayerWin = false;
       
        for(let diagonalIndex = 0; diagonalIndex < totalDiagonals; diagonalIndex++) {
            if(isDiagonalCompletedByTheActivePlayer(diagonalIndex)){
                isPlayerWin = true;
                break;
            }
        }
       
        return isPlayerWin;
    }

    const isDiagonalCompletedByTheActivePlayer = (index) => {
        const diagonalIndexList = [[0, 4, 8], [2, 4, 6]];
        const filledSquares = square;
        const activePlayer = gameState.activePlayer;

        return (filledSquares[diagonalIndexList[index][0]] === activePlayer && 
            filledSquares[diagonalIndexList[index][1]] === activePlayer && 
            filledSquares[diagonalIndexList[index][2]] === activePlayer);
    }

    const isGameDrawn = () => {
        return (filledSquareCount === 9);
    }

    const showGameOverMessage = () => {
        return gameState.winner ? 
            (<p className="win-msg">{`Player ${gameState.winner} win the game`}</p>)
            :
            (<p className="game-drawn-msg">{`Game drawn`}</p>);

    }

    const getFilledValue = (squareIndex) => {
        console.log(squareIndex);
        return (square[squareIndex] || "");
    }

    const isSquareDisabled = (squareIndex) => {
        console.log('isSquareDisable ' + squareIndex);
        return (square[squareIndex] || gameState.isGameOver) ? true : false;
    }


    const resetHandler = () => {
        setSquare([]);
        setFilledSquareCount(0);
        setGameState(initialState);
    }

    return (
        <div className="game">   
            <h4>{`Next player: ${gameState.activePlayer}`}</h4>
            <ul className="board"> 
                { renderSquare() }        
            </ul>
            <button onClick={resetHandler}>Play again</button>
            {gameState.isGameOver && showGameOverMessage()}
        </div>
    );
}