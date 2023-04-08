import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(cors())

// serve uploaded files
app.use('/files', express.static('files'));

const upload = multer({ dest: 'files/' }); // for parsing the uploaded file
app.use(express.json()); // for parsing the password

app.get('/fileList', (req, res) => {
    fs.readdir('files/', (err, files) => {
        res.send(files);
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body.pw , req.file);
    res.send('File uploaded');
});

app.listen(8080, () => {
  console.log(`Server listening on port ${8080}`);
});
