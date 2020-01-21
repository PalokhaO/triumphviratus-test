export const microphoneService = {
    startRecording: () => {
        const recording = {
            stop: () => {},
            result: null,
        };
        let resolveResult = () => {};
        recording.result = new Promise((resolve, reject) => {
            resolveResult = resolve;
        });
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
                        resolveResult(data);
                    }
                });
                
                recordingStopped.then(() => {
                    mediaRecorder.stop();
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                });

                mediaRecorder.start();
            });

        return recording;
    }
}