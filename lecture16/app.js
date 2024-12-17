const express = require('express');
const app = express();

const userModel = require('./models/user')
const postModel = require('./models/post')

app.get("/", (req, res) => {
    res.send('hey');
})
app.get("/create", async (req, res) => {
    let user = await userModel.create({
        username: "soumitra",
        age: 20,
        email: "soumitra@gmail.com"
    })
    res.send(user)
})
app.get("/post/create", async function(req, res) {
    let post = await postModel.create({
        postdata: "hello sare log kaise ho",
        user: "66c2ce0cf44d00fcb45d3b5f"
    })
    let user = await userModel.findOne({_id: "66c2ce0cf44d00fcb45d3b5f"});
    user.posts.push(post._id);
    await user.save();

    res.send({post, user});
})

app.listen(3000);