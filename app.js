const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  fs.readdir("./hisaab", (err, files) => {
    if (err) return res.status(500).send(err);
    res.render("index", { files: files });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/createHisab", (req, res) => {
  fs.writeFile(`./hisaab/${req.body.title}`, req.body.content, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

app.get("/delete/:fileName", (req, res) => {
  fs.unlink(`./hisaab/${req.params.fileName}`, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

app.get("/edit/:fileName", (req, res) => {
  fs.readFile(`./hisaab/${req.params.fileName}`, "utf-8", (err, fileData) => {
    if (err) return res.status(500).send(err);
    res.render("edit", { fileData, fileName: req.params.fileName });
  });
});

app.post("/update/:fileName", (req, res) => {
  fs.writeFile(
    `./hisaab/${req.params.fileName}`,
    req.body.newContent,
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect("/");
    }
  );
});

app.get("/hisaab/:fileName", (req, res) => {
  fs.readFile(`./hisaab/${req.params.fileName}`, "utf-8", (err, fileData) => {
    if (err) return res.status(500).send(err);
    res.render("hisaab", { fileData, fileName: req.params.fileName });
  });
});

app.listen("3000", () => {
  console.log("Server connected");
});
