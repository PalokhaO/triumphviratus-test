const apiUrl = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000';

export const httpService = {
    recognizeByLyrics: lyrics => fetch(`${apiUrl}/by_lyrics?q=${lyrics}`)
        .then(res => res.json()),
    recognizeByClip: blob => {
        const body = new FormData();
        body.set('file', blob);
        return fetch(`${apiUrl}/by_clip`, {
            method: 'POST',
            body,
        }).then(res => res.json());
    },
    recognizeByHum: blob => {
        const body = new FormData();
        body.set('file', blob);
        return fetch(`${apiUrl}/by_hum`, {
            method: 'POST',
            body,
        }).then(res => res.json());
    }
};