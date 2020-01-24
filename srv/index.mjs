import express from 'express';
import cors from 'cors';
import path from 'path';
import os from 'os';
import { recognizeByLyrics, recognizeByClip, recognizeByHum } from './audd-deezer.mjs';
import formData from 'express-form-data';

const port = process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : 5000;

const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), '/build')));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
   
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.get('/by_lyrics', (req, res) => 
    recognizeByLyrics(req.query.q)
        .then(response => res.json(response))
        .catch(e => res.status(500).send(e.message))
);

app.post('/by_clip', (req, res) => 
    recognizeByClip(req.body.file)
        .then(response => res.json(response))
        .catch(e => res.status(500).send(e.message))
);

app.post('/by_hum', (req, res) => 
    recognizeByHum(req.body.file)
        .then(response => res.json(response))
        .catch(e => res.status(500).send(e.message))
);

app.get('*', (req,res) =>{
    res.sendFile(path.join(process.cwd(), '/build/index.html'));
});

app.listen(port);