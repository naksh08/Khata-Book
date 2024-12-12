const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) return res.status(500).send(err);
    res.render("index", { files });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create/new", (req, res) => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const fileName = `${day}-${month}-${year}.txt`;
  // const data = "This data will be coming from frontend.";
  fs.writeFile(`./files/${fileName}`, req.body.data, (err) => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.get("/hisaab/:file", (req, res) => {
  const file = req.params.file;
  fs.readFile(`./files/${file}`, "utf8", (err, data) => {
    if (err) console.log(err);
    else res.render("hisaab", { data, file });
  });
});

app.get("/edit/:file", (req, res) => {
  const file = req.params.file;
  fs.readFile(`./files/${file}`, "utf8", (err, data) => {
    if (err) console.log(err);
    else res.render("edit", { data, file });
  });
});

app.post("/update/:file", (req, res) => {
  const file = req.params.file;
  fs.writeFile(`./files/${file}`, req.body.filedata, (err) => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.get("/delete/:file", (req, res) => {
  const file = req.params.file;
  fs.unlink(`./files/${file}`, (err) => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.listen(3000);
