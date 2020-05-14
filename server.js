const express = require('express');
const app = express()
const PORT = 3000;
const path = require('path')
const fs = require('fs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.listen(PORT, console.log("Server listening on ", PORT));
