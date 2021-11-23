const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// The Path to the folder that you want to manage with the Web-Panel 
const filedirection = "../files/";

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filedirection + filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

app.get("/api/getFolders", (req, res) => {
  var files = [];
  fs.readdirSync(filedirection).forEach(file => {
    files.push({ filename: file, size: getFilesizeInBytes(file) + " byte" });
  });
  res.send(files);
});

app.get("/api/getStats", (req, res) => {
  fs.readdir('../files/', (error, files) => {
    res.send({ filecount: files.length, size: 0 });
  });
});

app.post("/api/deletefile", (req, res) => {
  const filename = req.body.filename;
  fs.unlinkSync(filedirection + filename);
});

app.post("/api/addfile", (req, res) => {
  const file = req.body.file;
  const filecontent = "This File was created by the File Manager !";
  fs.writeFile(filedirection + file, filecontent, () => {
    console.log("Erfolgreich");
    res.send("Erfolgreich");
  });
});

app.listen(3333, () => {
  console.log("Server läuft mit dem Port 3333 => Ali");
});














