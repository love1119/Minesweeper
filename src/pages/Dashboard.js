import React, { useContext } from "react";

import Header from "../components/Header";
import GameBoard from "../components/GameBoard";

import { GameBoardValueContext } from "../store/context";

const Dashboard = () => {
  const { isEnded, success } = useContext(GameBoardValueContext);

  return (
    <div>
      <Header />
      <GameBoard />
      {isEnded && (
        <div className={`error-message ${success ? "success" : ""}`}>
          {success ? "You are a winner." : "You clicked on Bomb."}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
