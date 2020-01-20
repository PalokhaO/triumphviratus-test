export const httpService = {
    recognizeByLyrics: lyrics => fetch(`https://api.audd.io/?method=findLyrics&q=${lyrics}`)
        .then(res => res.json())
        .then(body => (body.result || []).map(res => ({
            title: res.full_title,
        })))
        .catch(() => []),
    recognizeByClip: blob => {
        const body = new FormData();
        body.set('file', blob);
        body.set('return', 'deezer');
        body.set('method', 'recognize');
        return fetch('https://api.audd.io/', {
            method: 'POST',
            body,
        })
            .then(res => res.json())
            .then(body => (body || []).map(res => ({
                title: res.full_title,
                deezer_id: res.deezer.id,
                cover: res.deezer.album.cover,
            })))
            .catch(() => []);
    },
    recognizeByHum: blob => {
        const body = new FormData();
        body.set('file', blob);
        body.set('method', 'recognizeWithOffset');
        return fetch('https://api.audd.io/', {
                method: 'POST',
                body,
            })
            .then(res => res.json())
            .then(body => (body.result.list || []).map(res => ({
                title: `${res.title} by ${res.artist}`,
            })))
            .catch(() => []);
    }
};