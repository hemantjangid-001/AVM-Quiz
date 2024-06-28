import React, { useState } from "react";
import "./pyramid.css";
import moneyPyramid from "../Moneypyramid";

function Pyramid({ questionNumber }) {
  return (
    <div className="pyramid-container">
      <ul className="moneyList">
        {moneyPyramid.map((item) => {
          return (
            <li
              key={item.id}
              className={
                questionNumber === item.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyListItemNumber">{item.id}</span>
              <span className="moneyListItemAmount">{item.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pyramid;
