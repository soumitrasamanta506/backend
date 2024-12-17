const express = require('express')
const app = express()

const userModel = require('./usermodel')

app.get('/', (req, res) => {
    res.send("hey");
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "ashrita",
        email: "ashrita@gmail.com",
        username: "ashrita"
    })

    res.send(createdUser)
})

app.get('/read', async (req, res) => {
    let users = await userModel.find({username: "ashrita"});
    res.send(users);
})

app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({username: "soumitra"}, {name: "soumitra samanta"}, {new: true});
    res.send(updatedUser)
})

app.get('/delete', async (req, res) => {
    let updatedUser = await userModel.findOneAndDelete({username: "soumitra"});
    res.send(updatedUser)
})

app.listen(3000)