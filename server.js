const express = require('express');
const app = express()
const PORT = 3000;
const path = require('path')
const fs = require('fs')
const dbJson = path.join(__dirname, "/db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(dbJson);
});

app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    const allNotes = [];

    allNotes.push(newNote);

    const JSONfileraw = fs.readFileSync(dbJson);
    const JSONfile = JSON.parse(JSONfileraw)

    allNotes.push(JSONfile[0]);

    const notes = JSON.stringify(allNotes, null, 2)

    fs.writeFile(dbJson, notes, "utf8", function (err, data) {
        if (err) {
            throw err
        }
        else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

app.listen(PORT, console.log("Server listening on ", PORT));
