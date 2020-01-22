import React from "react";

const ResultsPage = ({
  toggleGameStatus,
  successSong,
  wrongSongs,
  startNewRound
}) => {
  return (
    <div>
      <blockquote>
        {successSong ? (
          <span>
            You lose! I guessed the song. Time to understand that I can guess
            any song. Here are my tries:
          </span>
        ) : (
          <span>
            You are winner! I didn’t guess the song. Don’t be so happy, maybe
            your request was too complicated. This time you win, human.  Here is
            how I was trying to guess the song:
          </span>
        )}
      </blockquote>
      <div>
        {wrongSongs.length > 0 && (
          <div>
            <p>Wrong tries:</p>
            {wrongSongs.map((title, index) => (
              <p key={index}>{title}</p>
            ))}
          </div>
        )}
        {successSong && (
          <div>
            <p>Success try:</p>
            <p>{successSong}</p>
          </div>
        )}
      </div>
      <button variant="secondary" onClick={toggleGameStatus}>Quit</button>
      <button onClick={startNewRound}>Play again</button>
    </div>
  );
};

export default ResultsPage;
