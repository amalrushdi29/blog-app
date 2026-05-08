const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/auth');
const Post = require('../models/Post')

// GET all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a comment
router.post('/:postId', verifyToken, async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      post: req.params.postId
    });
    const newComment = await comment.save();
    const populated = await newComment.populate('author', 'username');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/:commentId', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    const post = await Post.findById(comment.post)

    const isCommentAuthor = comment.author.toString() === req.user._id
    const isPostAuthor = post.author.toString() === req.user._id

    if (!isCommentAuthor && !isPostAuthor) {
      return res.status(403).json({ message: 'Not authorized to delete this comment!' })
    }

    await Comment.findByIdAndDelete(req.params.commentId)
    res.json({ message: 'Comment deleted!' })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;