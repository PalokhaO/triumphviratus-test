import fetch from 'node-fetch';
import FormData from 'form-data';

const token = 'e999c7db186ba9c6edbf7ec687db3d68';

function addDeezerInfo(items) {
    return Promise.all(items.map(findDeezerSong));
}

function findDeezerSong (item) {
    return fetch(`https://api.deezer.com/search?q=artist:"${
                encodeURIComponent(item.artist.replace('\u200b', ''))
            }" track:"${
                encodeURIComponent(item.title)
            }"`
        )
        .then(res => res.json())
        .then(res => res.data[0])
        .then(deezerItem => ({
            title: `${item.title} by ${item.artist}`,
            deezer_link: deezerItem && deezerItem.link || null,
            cover: deezerItem && deezerItem.album && deezerItem.album.cover || null,
            preview: deezerItem && deezerItem.preview,
        }));
}

export const recognizeByLyrics = lyrics => fetch(`https://api.audd.io/?method=findLyrics&api_token=${token}&q=${
        encodeURIComponent(lyrics)
    }`)
    .then(res => res.json())
    .then(body => (body.result || []))
    .then(addDeezerInfo);

export const recognizeByClip = blob => {
    const body = new FormData();
    body.append('file', blob);
    body.append('method', 'recognize');
    body.append('api_token', token);
    return fetch('https://api.audd.io/', {
        method: 'POST',
        body,
    })
        .then(res => res.json())
        .then(body => body.result ? [body.result] : [])
        .then(addDeezerInfo);
};

export const recognizeByHum = blob => {
    const body = new FormData();
    body.append('file', blob);
    body.append('method', 'recognizeWithOffset');
    body.append('api_token', token);
    return fetch('https://api.audd.io/', {
            method: 'POST',
            body,
        })
        .then(res => res.json())
        .then(body => (body.result && body.result.list || []))
        .then(addDeezerInfo);
};