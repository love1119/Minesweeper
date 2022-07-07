import {
  START_GAME,
  END_GAME,
  UPDATE_BOARD,
  UNCOVER_CELL,
  CLICKED_BOMB
} from "./actions";

import {
  generateInitialGameBoard,
  generateRandomGameBoard,
  getUncoveredCell,
  uncoverAllCells
} from "../uitls";

import { GAME_SIZE } from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        level: action.payload.level,
        data: generateRandomGameBoard(action.payload.level),
        coveredFlags: generateInitialGameBoard(action.payload.level, true),
        success: false,
        isEnded: false
      };
    case UNCOVER_CELL:
      let { coveredFlags, level, data } = state;
      const { rowIndex, colIndex } = action.payload;
      getUncoveredCell(
        coveredFlags,
        data,
        rowIndex,
        colIndex,
        GAME_SIZE[level]
      );

      return {
        ...state,
        coveredFlags
      };
    case CLICKED_BOMB:
      let { coveredFlags: cCoveredFlags, level: cLevel } = state;
      uncoverAllCells(cCoveredFlags, cLevel);

      return {
        ...state,
        success: false,
        isEnded: true,
        coveredFlags: cCoveredFlags
      };
    case END_GAME:
      return state;
    case UPDATE_BOARD:
      return state;
    default:
      return state;
  }
};

export default reducer;
