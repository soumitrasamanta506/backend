const express = require('express')
const app = express()
const userModel = require("./models/user");

const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path');

app.set('view engine', "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get("/", function(req, res){
    res.render('index.ejs');
})
app.post("/create", function(req, res){
    let {username, email, password} = req.body

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash
            })
            let token = jwt.sign({email}, "secret");
            res.cookie("token", token);

            res.send(createdUser)
        })
    })
    
})
app.get("/login", function(req, res){
    res.render("login.ejs")
})
app.post("/login", async function(req, res){
    let user = await userModel.findOne({email: req.body.email})
    if(!user)  return res.send('something went wrong!')

    bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email: user.email}, "secret");
            res.cookie("token", token);
            res.send('you are logged in')
        }
        else
            res.send(`you can't log in`)
    })
})
app.get("/logout", function(req, res){
    res.cookie("token", "");
    res.redirect("/");
})
app.listen(3000)