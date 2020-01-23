import React from "react";
import "./styles.scss";

const ResultsPage = ({
  toggleGameStatus,
  successSong,
  wrongSongs,
  startNewRound
}) => {
  return (
    <section className="lyricsPage">
      <div className="lyricsPage__dialog">
        <img className="lyricsPage__dialog--gif" src="/images/ai.gif" />
        <div className="lyricsPage__dialog--text" style={{width:"unset"}}>
          {!successSong ? (
            <>
              <span>You lose! I guessed the song.</span>
              <span>
                Time to understand that I can guess any song.
              </span>
              <span>Here are my tries:</span>
            </>
          ) : (
            <span>
              You are winner! I didn’t guess the song. Don’t be so happy, maybe
              your request was too complicated. This time you win, human.  Here
              is how I was trying to guess the song:
            </span>
          )}
        </div>
      </div>

      <div className="lyricsPage__inputVariants">
        {wrongSongs.length > 0 && (
          <div className="lyricsPage__borderedDiv">
            <p><b>Wrong tries:</b></p>
            {wrongSongs.map((song, index) => (
              <p key={index}>{song.title}</p>
            ))}
          </div>
        )}
        {successSong && (
          <div className="lyricsPage__borderedDiv">
            <p><b>Success try:</b></p>
            <p>{successSong.title}</p>
          </div>
        )}
      </div>
      <div className="lyricsPage__inputVariants">
      <button variant="secondary" onClick={toggleGameStatus}>
        Quit
      </button>
      <button onClick={startNewRound}>Play again</button>
      </div>
    </section>
  );
};

export default ResultsPage;
