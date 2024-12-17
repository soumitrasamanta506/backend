const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/', function(req, res){
    res.cookie("name", "ashrita");
    res.send("done");
})
app.get('/read', (req, res)=>{
    console.log(req.cookies)
    res.send("read");
})

app.listen(3000);