import React from "react";
import { AMOUNT_OF_TRIES } from "../../../configs/constants";

const TriesCounter = ({ tries }) => {
  const arrTries = new Array(AMOUNT_OF_TRIES)
    .fill(1)
    .map((item, index) => index + 1);
  return (
    <div className="Dashboard__header__triesCounter">
      <span>{tries} tries left</span>
      <span>
        {arrTries.map(number => {
          return number <= tries ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#0435FD" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#212143" />
            </svg>
          );
        })}
      </span>
    </div>
  );
};

export default TriesCounter;
