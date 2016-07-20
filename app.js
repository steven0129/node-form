const express = require('express');
const app = express();
const multer = require('multer');
const port = process.env.PORT || 3000;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('you have no right to access this page.');
});

app.get('/uploadFile', function (req, res) {
    res.render('upload', {
        title: '上傳檔案'
    });
});

app.post('/uploadAction', multer({ storage: storage }).single('myFile'), function (req, res) {
    console.log('upload file');
    console.log(req.file);
    res.end('file uploaded.');
});

app.listen(3000, function () {
    console.log('start to listening on ' + port + ' ......');
});