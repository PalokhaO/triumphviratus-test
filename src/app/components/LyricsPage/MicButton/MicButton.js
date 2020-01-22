import React, { useState } from "react";
import { microphoneService } from "../../../services/microphone.service";
import styles from './MicButton.module.css';

const MicButton = ({onRecordingComplete}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState({stop: () => {}});

    const handleClick = () => {
        if (isRecording) {
            record.stop();
            record.result.then(onRecordingComplete);
        } else {
            setRecord(microphoneService.startRecording());
        }

        setIsRecording(!isRecording);
    }

    return(
        <div>
            <button onClick={handleClick} className={styles.button}><img className={styles.icon} src="images/mic.svg"></img></button>
            <span>
                {isRecording
                    ? 'Press to stop recording'
                    : 'Press to start recording'
                }
            </span>
        </div>
    )
};

export default MicButton;