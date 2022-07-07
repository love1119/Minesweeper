import React, { useReducer } from "react";

import Dashboard from "./pages/Dashboard";

import {
  GameBoardValueContext,
  GameBoardDispatchContext
} from "./store/context";

import reducer from "./store/reducer";

import { generateInitialGameBoard, generateRandomGameBoard } from "./uitls";
import { GAME_LEVELS } from "./constants";

import "./styles.css";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    level: GAME_LEVELS.BEGINEER,
    data: generateRandomGameBoard(GAME_LEVELS.BEGINEER),
    coveredFlags: generateInitialGameBoard(GAME_LEVELS.BEGINEER, true),
    success: false,
    isEnded: false
  });

  return (
    <>
      <GameBoardValueContext.Provider value={state}>
        <GameBoardDispatchContext.Provider value={dispatch}>
          <Dashboard />
        </GameBoardDispatchContext.Provider>
      </GameBoardValueContext.Provider>
    </>
  );
};

export default App;
