export const microphoneService = {
    startRecording: () => {
        const recording = {
            stop: () => {},
            result: null,
        };
        const recordingStopped = new Promise((resolve, reject) => {
            recording.stop = resolve;
        });

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Media devices are not supported!');
        }

        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});

                mediaRecorder.addEventListener('dataavailable', ({data}) => {
                    if (data.size) {
                        recording.result = data;
                    }
                });
                
                recordingStopped.then(() => {
                    mediaRecorder.stop();
                });

                mediaRecorder.start();
            });

        return recording;
    }
}