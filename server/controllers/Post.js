const models = require('../models');
const PostModel = require('../models/Post');

const { Post } = models;

const mainPage = (req, res) => res.render('app');

const makePost = async (req, res) => {
  if (!req.body.title && !req.body.text) {
    return res.status(400).json({ error: 'Name your post and please enter some text' });
  }
  if (!req.body.text) {
    return res.status(400).json({ error: 'Please enter some text on to your post' });
  }

  const postData = {
    title: req.body.title,
    text: req.body.text,
    owner: req.session.account._id,
  };

  try {
    const newPost = new Post(postData);
    await newPost.save();
    return res.status(201).json({ text: newPost.text });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getPost = (req, res) => PostModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ posts: docs });
});

module.exports = {
  mainPage,
  makePost,
  getPost,
};
