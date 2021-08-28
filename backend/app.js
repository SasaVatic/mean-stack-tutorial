const express = require('express');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://sasa:G8YXdX2BqKCQadWD@cluster0.xypyb.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use(express.json());

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then((createdPost) => {
      res.status(201).json({
        message: 'Post added sucessfully',
        postId: createdPost._id
      });
    });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: 'Post deleted' });
    });
});

module.exports = app;
