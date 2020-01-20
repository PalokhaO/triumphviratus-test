import React from "react";

const Answers = ({ answers, toggleGameStatus, toggleSeeAnswer }) => {
  return (
    <div>
      {answers.length ? answers[0].title : "no answer"}
      <button>That’s what I looking for!</button>
      <button onClick={toggleSeeAnswer}>Wrong song, try again</button>
      <button onClick={toggleGameStatus}>Quit</button>
    </div>
  );
};

export default Answers;
