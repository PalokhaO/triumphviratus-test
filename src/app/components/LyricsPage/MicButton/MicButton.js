import React, { useState } from "react";
import { microphoneService } from "../../../services/microphone.service";

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
        <button onClick={handleClick}>
            {isRecording
                ? 'Press to stop recording'
                : 'Press to start recording'
            }
        </button>
    )
};

export default MicButton;