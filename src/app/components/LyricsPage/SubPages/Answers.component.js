import React from "react";

const Answers = ({ answers, handleUserAnswer }) => {
  return (
    <div>
      {answers.length ? answers[0].title : "no answer"}
      <button onClick={() => handleUserAnswer("machine",answers[0].title)}>
        That’s what I looking for!
      </button>
      <button onClick={() => handleUserAnswer("human",answers[0].title)}>
        Wrong song, try again
      </button>
    </div>
  );
};

export default Answers;
