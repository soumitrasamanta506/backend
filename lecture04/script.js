const express = require('express')
const app = express()

app.use(function(req, res, next){
    console.log('middleware chala')
    next();
})
app.use(function(req, res, next){
    console.log('middleware chala ek aur baar')
    next();
})
// app.get(route, requestHandler)
app.get("/", function(req, res, next){
    res.send("Welcome")
    next();
})

app.get("/profile", function(req, res, next){
    // res.send("Welcome soumitra!")
    // next();
    return next(new Error("something went wrong"))
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('something broke!')
})

app.listen(3000)