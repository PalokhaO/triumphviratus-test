import React from "react";

const Answers = ({ answers, handleUserAnswer }) => {
  const answer = answers[0] || {
    title: 'Couldn`t guess :c'
  };
  return (
    <div>
      {answer.cover && <img src={answer.cover}></img>}
      {answer.preview && <audio controls src={answer.preview}></audio>}
      <p>{answer.title}</p>
      <button onClick={() => handleUserAnswer("machine",answer.title)}>
        That’s what I looking for!
      </button>
      <button onClick={() => handleUserAnswer("human",answer.title)}>
        Wrong song, try again
      </button>
    </div>
  );
};

export default Answers;
