const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');

const Post = require('./models/Post');

const app = express();
const port = 3000;

//Connection Database
mongoose.connect('mongodb://localhost/cleanblog-test-db');

//Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index',{posts});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post',{post});
});

//Listening
app.listen(port, () => {
  console.log(`App Server Running at http://localhost:${port}`);
});
