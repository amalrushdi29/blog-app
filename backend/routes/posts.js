const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// GET all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create post (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.user._id
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update post (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You can only edit your own posts!' });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE post (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You can only delete your own posts!' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET posts by username
router.get('/user/:username', async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const posts = await Post.find({ author: user._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;