import React, { useContext, useState } from "react";

import { GameBoardDispatchContext } from "../../store/context";

import { GAME_LEVELS } from "../../constants";

import { START_GAME } from "../../store/actions";

import "./style.css";

const GameLevels = Object.values(GAME_LEVELS);

const Header = () => {
  const dispatch = useContext(GameBoardDispatchContext);

  const [gameLevel, setGameLevel] = useState(GAME_LEVELS.BEGINEER);

  const onChangeLevel = (e) => {
    setGameLevel(e.target.value);
  };

  const onClickPlay = () => {
    dispatch({
      type: START_GAME,
      payload: {
        level: gameLevel
      }
    });
  };

  return (
    <div className="header">
      <label className="header__label">Game Level:</label>
      <select className="header__select" onChange={onChangeLevel}>
        {GameLevels.map((level) => (
          <option value={level} key={level}>
            {level}
          </option>
        ))}
      </select>
      <button className="header__play" onClick={onClickPlay}>
        Play
      </button>
    </div>
  );
};

export default Header;
