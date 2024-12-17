const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    fs.readdir("./files", function(err, files){
        res.render("index", {files: files});
    })
})

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, fileData){
        let title = req.params.filename.split('_')
        title.pop()
        title = title.join(' ')
        res.render("show", {filename: req.params.filename, title: title, fileData: fileData});
    })
})

app.get("/delete/:filename", function(req, res){
    fs.rm(`./files/${req.params.filename}`, function(err){
        res.redirect("/");
    })
})
app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}_.txt`, req.body.details, function(err){
        res.redirect("/");
    })
})
app.listen(3000)