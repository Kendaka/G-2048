import React, { useState, useEffect } from 'react';
import Score from './Score';
import GameMessage from './GameMessage';

const Grid = () => {
  const gridSize = 4; // the size of the grid
  const [grid, setGrid] = useState([]); // state for storing the current grid
  const [score, setScore] = useState(0); // state for tracking the score
  const [gameStatus, setGameStatus] = useState(null) // state for checking the game status


  // generating two random tiles with values of either 2 or 4
  const initializeTiles = () => {
    const initialGrid = Array(gridSize * gridSize).fill(null); // empty grid 
    const randomIndices = []; // randomly placing the tiles
    while (randomIndices.length < 2) {
      const index = Math.floor(Math.random() * gridSize * gridSize);
      if (!randomIndices.includes(index)) {
        randomIndices.push(index);
      }
    }
    randomIndices.forEach(index => {
      initialGrid[index] = getRandomTileValue();
    });
    setGrid(initialGrid); // updating the grid state
    setScore(0);
    setGameStatus(null);
  };

  // returns a random tile value with higher chance of getting 2 than getting 4
  const getRandomTileValue = () => Math.random() < 0.9 ? 2 : 4;

  // check if the game has won
  const checkForWin = () => grid.includes(2048);

  // check if the game has loss
  const checkForLoss = () => {
    if (grid.includes(null)) return false; 
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const tile = grid[index];
        const right = j < gridSize - 1 ? grid[index + 1] : null;
        const down = i < gridSize - 1 ? grid[index + gridSize] : null;
        if (tile === right || tile === down) return false; 
      }
    }
    return true;
  };
  
  // handle the status of the game
  const handleGame = () => {
    if (checkForWin()) {
      setGameStatus('won');
    } else if (checkForLoss()) {
      setGameStatus('lost');
    }
  };

  // assigning background color based on the tile value
  const getTileColor = (value) => {
    switch (value) {
      case 2: return 'bg-[#B5B5B5]';
      case 4: return 'bg-[#A2A2A2]';
      case 8: return 'bg-[#F76A3B]';
      case 16: return 'bg-[#F7803C]';
      case 32: return 'bg-[#F4846C]';
      case 64: return 'bg-[#F57C4A]';
      case 128: return 'bg-[#EDC039]';
      case 256: return 'bg-[#F4C300]';
      case 512: return 'bg-[#F1A800]';
      case 1024: return 'bg-[#F28500]';
      case 2048: return 'bg-[#F26B00]';
      default: return 'bg-gray-800';
    }
  };

  // shifts the row to the left, merging tiles where possible  
  const shiftRowLeft = (row) => {
    let filteredRow = row.filter(cell => cell !== null);
    let newRow = [];
    let merged = Array(row.length).fill(false); // tracking merged cells to avoid merging twice
    let tempScore = 0; // temporary score to accumulate during this shift

    let i = 0;
    while (i < filteredRow.length) {
      // merging if they have the same value and are not merged yet.
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredRow[i] * 2;
        newRow.push(filteredRow[i] * 2); // doubling the value of the merged tiles
        tempScore += mergedValue; // add merged value to temp score
        merged[i] = true; // marking it as merged
        i += 2;
      } else {
        newRow.push(filteredRow[i]); // moving the tiles if they are unable to merge
        i++;
      }
    }

    // maintaining the grid size
    while (newRow.length < gridSize) {
      newRow.push(null);
    }
    setScore(prevScore => prevScore + tempScore); // only update score once after merging
    return newRow;
  };


  // shift the row to the right
  const shiftRowRight = (row) => {
    let filteredRow = row.filter(cell => cell !== null).reverse();
    let newRow = [];
    let merged = Array(row.length).fill(false);
    let tempScore = 0;


    let i = 0;
    while (i < filteredRow.length) {
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredRow[i] * 2;
        newRow.push(filteredRow[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newRow.push(filteredRow[i]);
        i++;
      }
    }

    while (newRow.length < gridSize) {
      newRow.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    return newRow.reverse();
  };

  // shifts the colum upwards
  const shiftUp = (colIndex) => {
    const col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null);
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);
    let tempScore = 0;

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredCol[i] * 2;
        newCol.push(filteredCol[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newCol.push(filteredCol[i]);
        i++;
      }
    }

    while (newCol.length < gridSize) {
      newCol.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    return newCol;
  };

  // shifts the colum downward
  const shiftDown = (colIndex) => {
    const col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null).reverse();
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);
    let tempScore = 0;

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        const mergedValue = filteredCol[i] * 2;
        newCol.push(filteredCol[i] * 2);
        tempScore += mergedValue;
        merged[i] = true;
        i += 2;
      } else {
        newCol.push(filteredCol[i]);
        i++;
      }
    }

    while (newCol.length < gridSize) {
      newCol.push(null);
    }
    setScore(prevScore => prevScore + tempScore);
    return newCol.reverse();
  };

  // movement of the tiles in all directions
  const moveTiles = (direction) => {
    const newGrid = [...grid];
    let moved = false;

    if (direction === 'left') {
      for (let i = 0; i < gridSize; i++) {
        const row = newGrid.slice(i * gridSize, i * gridSize + gridSize);
        const shiftedRow = shiftRowLeft(row);
        if (JSON.stringify(row) !== JSON.stringify(shiftedRow)) moved = true;
        newGrid.splice(i * gridSize, gridSize, ...shiftedRow);
      }
    }

    if (direction === 'right') {
      for (let i = 0; i < gridSize; i++) {
        const row = newGrid.slice(i * gridSize, i * gridSize + gridSize);
        const shiftedRow = shiftRowRight(row);
        if (JSON.stringify(row) !== JSON.stringify(shiftedRow)) moved = true;
        newGrid.splice(i * gridSize, gridSize, ...shiftedRow);
      }
    }

    if (direction === 'up') {
      for (let i = 0; i < gridSize; i++) {
        const shiftedCol = shiftUp(i);
        for (let j = 0; j < gridSize; j++) {
          if (newGrid[j * gridSize + i] !== shiftedCol[j]) moved = true;
          newGrid[j * gridSize + i] = shiftedCol[j];
        }
      }
    }

    if (direction === 'down') {
      for (let i = 0; i < gridSize; i++) {
        const shiftedCol = shiftDown(i);
        for (let j = 0; j < gridSize; j++) {
          if (newGrid[j * gridSize + i] !== shiftedCol[j]) moved = true;
          newGrid[j * gridSize + i] = shiftedCol[j];
        }
      }
    }

    // generating another tile if tiles moved
    if (moved) {
      const emptyCells = newGrid.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newGrid[randomIndex] = getRandomTileValue();
      }
      setGrid(newGrid); // updating the grid state
    }
    handleGame();
  };

  // calling the initialize function
  useEffect(() => {
    initializeTiles();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus) return;
      switch (e.key) {
        case 'w':
          moveTiles('up');
          break;
        case 'a':
          moveTiles('left');
          break;
        case 's':
          moveTiles('down');
          break;
        case 'd':
          moveTiles('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid, gameStatus]);

  const handlePlayAgain = () => initializeTiles();

  // rendering the grid
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-4 grid-rows-4 w-[60%] p-2 gap-1">
        {grid.map((value, index) => (
          <div
            key={index}
            className={`w-full h-32 flex justify-center items-center border-2 border-gray-600 ${getTileColor(value)}`}
          >
            {value && <span className="text-2xl font-bold">{value}</span>}
          </div>
        ))}
      </div>
      {gameStatus && (
        <GameMessage
          message={gameStatus === 'won' ? "You Won!" : "Game Over"}
          buttonText="Play Again"
          onButtonClick={handlePlayAgain}
        />
      )}
      <Score score={score}/>
    </div>  
  );
};

export default Grid;
