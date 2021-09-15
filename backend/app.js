const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

const dbURI = 'mongodb+srv://sasa:G8YXdX2BqKCQadWD@cluster0.xypyb.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use('/images', express.static(path.join('backend', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
