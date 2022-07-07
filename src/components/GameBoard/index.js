import React, { useMemo, useContext } from "react";

import { GameBoardDispatchContext } from "../../store/context";
import { GameBoardValueContext } from "../../store/context";

import { UNCOVER_CELL, CLICKED_BOMB } from "../../store/actions";

import { GAME_SIZE } from "../../constants";

import Cell from "../Cell";

import "./style.css";

const GameBoard = () => {
  const { level, data, coveredFlags } = useContext(GameBoardValueContext);
  const dispatch = useContext(GameBoardDispatchContext);

  const boardSize = useMemo(() => GAME_SIZE[level], [level]);

  const boardStyle = useMemo(() => {
    const style = Array.from(Array(boardSize).keys())
      .map(() => "1fr")
      .join(" ");
    return {
      gridTemplateColumns: style
    };
  }, [boardSize]);

  const onCellClick = (rowIndex, colIndex) => {
    const isBomb = data[rowIndex][colIndex] === -1;

    if (isBomb) {
      dispatch({
        type: CLICKED_BOMB
      });
    } else {
      dispatch({
        type: UNCOVER_CELL,
        payload: {
          rowIndex,
          colIndex
        }
      });
    }
  };

  return (
    <div className="gameboard" style={boardStyle}>
      {Array.from(Array(boardSize).keys()).map((_, index) => (
        <React.Fragment key={index}>
          {Array.from(Array(boardSize).keys()).map((cell, cIndex) => (
            <Cell
              data={data?.[index]?.[cIndex]}
              covered={coveredFlags?.[index]?.[cIndex]}
              key={cIndex}
              onClick={() => onCellClick(index, cIndex)}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GameBoard;
