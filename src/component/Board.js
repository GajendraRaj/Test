import React, { useState } from 'react';
import { Square } from './Square';

export const Board = (props) => {
    const initialState = {
        filledSquares: [],
        isGameOver: false
    }
    const [boardState, setBoardState] = useState(initialState);
    const [filledSquareCount, setFilledSquareCount] = useState(0);

    const getSequare = () => {
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

    const getFilledValue = (squareIndex) => {
        console.log(squareIndex);
        return (boardState.filledSquares[squareIndex] || "");
    }

    const fillTheSquare = (index) => {
        let filledSquares = boardState.filledSquares;

        filledSquares[index] = props.activePlayer;
        setFilledSquareCount(filledSquareCount + 1);
        setBoardState((prevState) => ({
            ...prevState,
            filledSquares
        }));
        checkActivePlayerWinTheGame();
    }

    const isSquareDisabled = (squareIndex) => {
        console.log('isSquareDisable ' + squareIndex);
        return (boardState.filledSquares[squareIndex] || boardState.isGameOver) ? true : false;
    }

    const checkActivePlayerWinTheGame = () => {
        let isGameOver = false;
        if (isAnyRowCompletedByTheActivePlayer() ||
            isAnyColumnCompletedByTheActivePlayer() ||
            isAnyDiagonalCompletedByTheActivePlayer()
        ) {
            isGameOver = true;
                props.setTheWinner();
        } else if (isGameDrawn()) {
            isGameOver = true;
            props.gameDrawn();
        } else {
            props.changeActivePlayer();
        }

        setBoardState((prevState) => ({
            ...prevState,
            isGameOver
        }));
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
        const activePlayer = props.activePlayer;
        const filledSquares = boardState.filledSquares;

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
        const filledSquares = boardState.filledSquares;
        const activePlayer = props.activePlayer;

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
        const filledSquares = boardState.filledSquares;
        const activePlayer = props.activePlayer;

        return (filledSquares[diagonalIndexList[index][0]] === activePlayer && 
            filledSquares[diagonalIndexList[index][1]] === activePlayer && 
            filledSquares[diagonalIndexList[index][2]] === activePlayer);
    }

    const isGameDrawn = () => {
        return (filledSquareCount === 9);
    }

    const resetHandler = () => {
        setBoardState(initialState);
        setFilledSquareCount(0);
        props.reset();
    }

    return (
        <div>
            <ul className="board"> 
                { getSequare() }        
            </ul>
            <button onClick={resetHandler}>Play again</button>
        </div>
    );
}