import React from "react";
import "./styles.scss";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styles from "./ResultsPage.module.css";

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
        <div className="lyricsPage__dialog--text" style={{ width: "unset" }}>
          {successSong ? (
            <>
              <h4>You lose!</h4>
              <span>
                I guessed the song. Time to understand that I can guess any
                song.
              </span>
              <span>Here are my tries:</span>
            </>
          ) : (
            <>
              <h4>You win this time!</h4>
              <span>I didn’t guess the song. Don’t be so happy, human.</span>
              <span>Maybe your request was too complicated.</span>
              <span>Here is how I was trying to guess the song:</span>
            </>
          )}
        </div>
      </div>

      <div className="lyricsPage__inputVariants">
        {wrongSongs.length > 0 && (
          <div className={`lyricsPage__borderedDiv ${styles.guesses}`}>
            <p>
              <b>Wrong tries:</b>
            </p>
            <ul>
              {wrongSongs.map((song, index) => (
                <li>
                  <AudioPlayer
                    key={index}
                    src={song.preview}
                    title={song.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {successSong && (
          <div className={`lyricsPage__borderedDiv ${styles.guesses}`}>
            <p>
              <b>Success try:</b>
            </p>
            <ul>
              <li>
                <AudioPlayer
                  src={successSong.preview}
                  title={successSong.title}
                />
              </li>
            </ul>
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
