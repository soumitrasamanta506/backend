const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'public'))); // setup public static file
app.set('view engine', 'ejs');  // setup ejs

app.get("/", function(req, res){
    res.render('index');
})

app.get("/profile/:username", function(req, res){   //dynamic route
    res.send(`welcome, ${req.params.username}`);
})

app.get("/about/:username/:age", function(req, res){
    res.send(`welcome, ${req.params.username} of age ${req.params.age}`)    // req.params is an object
})
app.listen(3000)