const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();
const port = process.env.PORT || 5000;

//Connection Database
mongoose.connect('mongodb+srv://barisd:<password>@cleanblog.d2afp.mongodb.net/cleanBlog?retryWrites=true&w=majority');

//Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', postController.getAllPosts);
app.post('/posts', postController.createPost);
app.get('/posts/:id', postController.getPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/posts/edit/:id', pageController.getEditPage);
app.get('/add_post', pageController.getAddPage);

//Listening
app.listen(port, () => {
  console.log(`App Server Running at http://localhost:${port}`);
});
