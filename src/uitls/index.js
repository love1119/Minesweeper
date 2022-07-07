import { BOMB_COUNT, GAME_SIZE } from "../constants";

const generateInitialGameBoard = (level, defaultValue) => {
  const size = GAME_SIZE[level];

  return Array.from(Array(size).keys()).map(() =>
    Array.from(Array(size).keys()).map((_) => defaultValue)
  );
};

const generateRandomGameBoard = (level) => {
  const bombCount = BOMB_COUNT[level];
  const size = GAME_SIZE[level];

  // 1.
  let data = generateInitialGameBoard(level, 0);

  // 2.sm
  Array.from(Array(bombCount).keys()).forEach(() => {
    while (1) {
      const row = Math.floor(Math.random() * size); // 0 - size - 1
      const column = Math.floor(Math.random() * size); // 0 - size - 1

      if (data[row][column] !== -1) {
        data[row][column] = -1;
        break;
      }
    }
  });

  // 3. Generate bomb count of un-bomb cell.
  const rowArray = Array.from(Array(size).keys());
  const columnArray = Array.from(Array(size).keys());

  const neighbours = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  rowArray.forEach((_, rowIndex) => {
    columnArray.forEach((_, colIndex) => {
      if (data[rowIndex][colIndex] !== -1) {
        let count = 0;
        neighbours.forEach(([offsetRow, offsetCol]) => {
          const nRow = rowIndex + offsetRow;
          const nCol = colIndex + offsetCol;
          if (nRow >= 0 && nRow < size) {
            if (nCol >= 0 && nCol < size) {
              if (data[nRow][nCol] === -1) {
                count++;
              }
            }
          }
        });

        data[rowIndex][colIndex] = count;
      }
    });
  });

  return data;
};

const getUncoveredCell = (flags, data, rowIndex, colIndex, size) => {
  flags[rowIndex][colIndex] = false;

  const neighbours = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  neighbours.forEach(([offsetRow, offsetCol]) => {
    const nRow = rowIndex + offsetRow;
    const nCol = colIndex + offsetCol;
    if (nRow >= 0 && nRow < size) {
      if (nCol >= 0 && nCol < size) {
        if (data[nRow][nCol] !== -1) {
          flags[nRow][nCol] = false;
        }
      }
    }
  });
};

const uncoverAllCells = (flags, level) => {
  const size = GAME_SIZE[level];
  const rowArray = Array.from(Array(size).keys());
  const columnArray = Array.from(Array(size).keys());

  // 2.sm
  rowArray.forEach((_, rowIndex) => {
    columnArray.forEach((_, colIndex) => {
      flags[rowIndex][colIndex] = false;
    });
  });
};

export {
  generateInitialGameBoard,
  generateRandomGameBoard,
  getUncoveredCell,
  uncoverAllCells
};
