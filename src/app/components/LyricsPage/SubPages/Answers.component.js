import React from "react";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
import "../styles.scss";

const Answers = ({ answers, handleUserAnswer }) => {
  const answer = answers[0] || {
    title: "Couldn`t guess :c"
  };
  return (
    <section className="lyricsPage">
      <div className="lyricsPage__dialog">
        <img className="lyricsPage__dialog--gif" src="/images/ai.gif" />
        <div>
          <div className="lyricsPage__dialog--text">
            <span> I think the song may be:</span>
          </div>
          <div className="lyricsPage__borderedDiv songDiv">
            {answer.preview ? (
              <AudioPlayer controls src={answer.preview} title={answer.title} />
            ) : (
              <span>{answer.title}</span>
            )}
          </div>
        </div>
      </div>

      <div className="lyricsPage__inputVariants">
        <button
          variant="secondary"
          onClick={() => handleUserAnswer("human", answer)}
        >
          Wrong song
        </button>
        <button onClick={() => handleUserAnswer("machine", answer)}>
          That’s the one!
        </button>
      </div>
    </section>
  );
};

export default Answers;
