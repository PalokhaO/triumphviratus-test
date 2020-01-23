import React, { useState } from "react";
import MicButton from "../MicButton/MicButton";
import "../styles.scss";

const LyricsInputs = ({ submitUserAnswer, loadingStatus }) => {
  const [lyrics, setLyrics] = useState("");
  const handleAreaOnChange = ({ target: { value } }) => setLyrics(value);

  const handleSubmit = () => submitUserAnswer(lyrics, "lyrics");

  const handleRecordingSubmit = file => submitUserAnswer(file, "hum");
  const handleClipSubmit = file => submitUserAnswer(file, "clip");

  return (
    <section className="lyricsPage">
      <div className="lyricsPage__dialog">
        <img className="lyricsPage__dialog--gif" src="/images/ai.gif" />
        <div>
          <div className="lyricsPage__dialog--text">
            <span> Write lyrics from the song or sing it</span>
            <span> I have 5 tries to guess </span>
            <span>Prepare to lose, human</span>
          </div>
          <div className="lyricsPage__dialog__textInput">
            <textarea
              onChange={handleAreaOnChange}
              value={lyrics}
              placeholder="Write song’s lyrics"
            />
            <button
              onClick={handleSubmit}
              disabled={loadingStatus ? "disabled" : undefined}
            >
              {loadingStatus ? "..." : "Check"}
            </button>
          </div>
        </div>
      </div>
      <div className="lyricsPage__inputVariants">
        <div>
          <span> OR record yourself singing it</span>
          <div>
            <MicButton
              onRecordingComplete={handleRecordingSubmit}
              disabled={loadingStatus ? "disabled" : undefined}
            />
          </div>
        </div>

        <div>
          <span> OR record a piece of the song</span>
          <div>
            <MicButton
              onRecordingComplete={handleClipSubmit}
              disabled={loadingStatus ? "disabled" : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LyricsInputs;
