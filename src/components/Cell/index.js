import React from "react";

import "./style.css";

// covered: if true, cell is covered. if false, uncovered.
// data: if -1, cell is bomb, if >=0, bomb count around the cell, .

const Cell = ({ data, covered, onClick }) => {
  return (
    <div
      className={`cell ${covered ? "covered" : ""} ${
        data === -1 ? "bomb" : ""
      }`}
      onClick={onClick}
    >
      {!covered && <span>{data === -1 ? "💣" : data}</span>}
    </div>
  );
};

export default Cell;
