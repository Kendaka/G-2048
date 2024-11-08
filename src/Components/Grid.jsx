import React, { useState, useEffect } from 'react';

const Grid = () => {
  const gridSize = 4;
  const [grid, setGrid] = useState([]);

  const initializeTiles = () => {
    const initialGrid = Array(gridSize * gridSize).fill(null);
    const randomIndices = [];
    while (randomIndices.length < 2) {
      const index = Math.floor(Math.random() * gridSize * gridSize);
      if (!randomIndices.includes(index)) {
        randomIndices.push(index);
      }
    }
    randomIndices.forEach(index => {
      initialGrid[index] = getRandomTileValue();
    });
    setGrid(initialGrid);
  };

  const getRandomTileValue = () => {
    return Math.random() < 0.9 ? 2 : 4;
  };

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

  const shiftRowLeft = (row) => {
    let filteredRow = row.filter(cell => cell !== null);
    let newRow = [];
    let merged = Array(row.length).fill(false);

    let i = 0;
    while (i < filteredRow.length) {
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        newRow.push(filteredRow[i] * 2);
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

    return newRow;
  };

  const shiftRowRight = (row) => {
    let filteredRow = row.filter(cell => cell !== null).reverse();
    let newRow = [];
    let merged = Array(row.length).fill(false);

    let i = 0;
    while (i < filteredRow.length) {
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1] && !merged[i] && !merged[i + 1]) {
        newRow.push(filteredRow[i] * 2);
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

    return newRow.reverse();
  };

  const shiftUp = (colIndex) => {
    const col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null);
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        newCol.push(filteredCol[i] * 2);
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

    return newCol;
  };

  const shiftDown = (colIndex) => {
    const col = [];
    for (let i = 0; i < gridSize; i++) {
      col.push(grid[i * gridSize + colIndex]);
    }
    let filteredCol = col.filter(cell => cell !== null).reverse();
    let newCol = [];
    let i = 0;
    let merged = Array(col.length).fill(false);

    while (i < filteredCol.length) {
      if (i + 1 < filteredCol.length && filteredCol[i] === filteredCol[i + 1] && !merged[i] && !merged[i + 1]) {
        newCol.push(filteredCol[i] * 2);
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

    return newCol.reverse();
  };

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

    if (moved) {
      const emptyCells = newGrid.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
      if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newGrid[randomIndex] = getRandomTileValue();
      }
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    initializeTiles();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
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
  }, [grid]);

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
    </div>  
  );
};

export default Grid;
