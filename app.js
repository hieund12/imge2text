const express = require('express');
const multer  = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors()); // To allow cross-origin requests
app.use(express.static('public')); // To serve static files

const upload = multer({ dest: 'uploads/' }); // To handle file uploads

app.post('/upload', upload.single('image'), (req, res) => {
    const filePath = req.file.path;

    Tesseract.recognize(
        filePath,
        'jpn',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        fs.unlinkSync(filePath); // Delete the image file after text extraction

        // let formattedText = text.replace(/[^a-zA-Z0-9.,?!'’\s\u3000-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/g, "");

        // res.send({ text: formattedText });
        res.send({ text });
    })
        .catch(err => {
            fs.unlinkSync(filePath); // Delete the image file in case of error
            res.status(500).send({ error: err.message });
        });

});

app.listen(3000, () => console.log('Server started on port 3000'));
