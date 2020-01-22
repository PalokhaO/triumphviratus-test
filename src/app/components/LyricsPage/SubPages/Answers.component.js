import React from "react";

const Answers = ({ answers, handleUserAnswer }) => {
  const answer = answers[0] || {
    title: 'Couldn`t guess :c'
  };
  return (
    <div>
      {answer.cover && <img src={answer.cover}></img>}
      {answer.preview && <audio controls src={answer.preview}></audio>}
      <p>{answers.length ? answers[0].title : "no answer"}</p>
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
