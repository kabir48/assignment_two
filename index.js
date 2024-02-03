let server = require("http");
let fs = require('fs');
let multer = require('multer');
const path = require('path');

let http = server.createServer(handleRequest)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, 'image' + '-' + file.originalname)
    }
});
let upload = multer({ storage: storage }).single("file");

function handleRequest(req, res) {
    if (req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end("This is Home Page");
    } else if (req.url == '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('This is About Page');
        res.end();
    } else if (res.url == '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('This is Contact Page');
        res.end();
    } else if (req.url == '/file-write') {
        fs.writeFile('demo.txt', 'Hello World', function(error) {
            if (error) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end("Something went Wrong");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end("File Works!");
            }
        });
    } else if (req.method === 'POST' && req.url === '/uploads') {
        // Handle file upload
        upload(req, res, (error) => {
            if (error) {
                console.error('Error uploading file:', error.message);
                return res.end('Error uploading file');
            } else {
                res.end('File Uploaded Successfully')
            }
        });
    }
}
http.listen(5500, function() {
    console.log('Server is Running....')
});