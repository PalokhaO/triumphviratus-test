import React, { useState } from "react";
import MicButton from "../MicButton/MicButton";

const LyricsInputs = ({submitUserAnswer}) => {
  const [lyrics, setLyrics] = useState("");
  const handleAreaOnChange = ({ target: { value } }) => setLyrics(value);

  const handleSubmit = () => {
    return submitUserAnswer(lyrics,"lyrics")
  };
  return(
    <section>
      <div>
        Write lyrics from the song or sing it I have 5 tries to guess Prepare
        to lose, human
      </div>
      <div>
        <div>
          <textarea onChange={handleAreaOnChange} value={lyrics} />
        </div>
        <span> OR </span>
        <div>
          <div>
            <MicButton onRecordingComplete={console.log}></MicButton>
          </div>
          <div>record sing</div>
        </div>
      </div>
      <button onClick={handleSubmit}>Check</button>
    </section>
  )
};

export default LyricsInputs;