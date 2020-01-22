import React, { useState } from "react";
import MicButton from "../MicButton/MicButton";

const LyricsInputs = ({ submitUserAnswer, loadingStatus }) => {
  const [lyrics, setLyrics] = useState("");
  const handleAreaOnChange = ({ target: { value } }) => setLyrics(value);

  const handleSubmit = () => submitUserAnswer(lyrics, "lyrics");

  const handleRecordingSubmit = file => submitUserAnswer(file, "hum");
  const handleClipSubmit = file => submitUserAnswer(file, "clip");

  return (
    <section>
      <div>
        Write lyrics from the song or sing it I have 5 tries to guess Prepare to
        lose, human
      </div>
      <div>
        <div>
          <textarea onChange={handleAreaOnChange} value={lyrics} />
        </div>
        <span> OR record yourself singing it</span>
        <div>
          <div>
            <MicButton onRecordingComplete={handleRecordingSubmit} />
          </div>
        </div>
        <span> OR record a piece of the song</span>
        <div>
          <div>
            <MicButton onRecordingComplete={handleClipSubmit} />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loadingStatus ? "disabled" : undefined}
      >
        {loadingStatus ? "..." : "Check"}
      </button>
    </section>
  );
};

export default LyricsInputs;