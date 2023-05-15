const express = require('express');
const multer  = require('multer');
const ReadText = require('text-from-image');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors()); // To allow cross-origin requests
app.use(express.static('public')); // To serve static files

const upload = multer({ dest: 'uploads/' }); // To handle file uploads

app.post('/upload', upload.single('image'), (req, res) => {
    const filePath = req.file.path;

    ReadText(filePath)
        .then(text => {
            fs.unlinkSync(filePath); // Delete the image file after text extraction

            let formattedText = text.replace(/[^a-zA-Z0-9.,?!'’ ]/g, "");
            res.send({ text: formattedText });
        })
        .catch(err => {
            fs.unlinkSync(filePath); // Delete the image file in case of error
            res.status(500).send({ error: err.message });
        });

});

app.listen(3000, () => console.log('Server started on port 3000'));
