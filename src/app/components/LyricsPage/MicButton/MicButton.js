import React, { useState } from "react";
import { microphoneService } from "../../../services/microphone.service";
import styles from "./MicButton.module.css";

const MicButton = ({ onRecordingComplete, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState({ stop: () => {} });

  const handleClick = () => {
    if (isRecording) {
      record.stop();
      record.result.then(onRecordingComplete);
    } else {
      setRecord(microphoneService.startRecording());
    }

    setIsRecording(!isRecording);
  };

  return (
    <span className={styles.wrapper}>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={styles.button}
      >
        {isRecording ? (
          <img className={styles.icon} src="images/circle.svg" />
        ) : (
          <img className={styles.icon} src="images/mic.svg" />
        )}
      </button>
      <span>{isRecording ? "Recording..." : "Press to start recording"}</span>
    </span>
  );
};

export default MicButton;
