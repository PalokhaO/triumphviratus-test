import React from "react";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

const Answers = ({ answers, handleUserAnswer }) => {
  const answer = answers[0] || {
    title: 'Couldn`t guess :c'
  };
  return (
    <div>
      
      {
        answer.preview
          ? <AudioPlayer controls src={answer.preview} title={answer.title}></AudioPlayer>
          : <span>{answer.title}</span>
      }
      
      <button variant="secondary" onClick={() => handleUserAnswer("human",answer.title)}>
        Wrong song
      </button>
      <button onClick={() => handleUserAnswer("machine",answer.title)}>
        That’s the one!
      </button>
    </div>
  );
};

export default Answers;
