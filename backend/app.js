const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
const db = "posts";

mongoose.connect("mongodb://localhost:27017/node-angular", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: "Post added successfully"
    });
});

app.use("/api/posts", (req, res, next) => {
    const posts = [
        {
            id: 'fadf12421l',
            title: 'First server-side post',
            content: 'This is coming from the server'
        },
        {
            id: 'ksajflaj132',
            title: 'Second server-side post',
            content: 'This is coming from the server'
        }
    ];
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
    });
});

module.exports = app;
