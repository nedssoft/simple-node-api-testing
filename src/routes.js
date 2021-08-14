const { Router } = require('express');

const router = new Router();
const { getAllPosts, deletePost, addPost, updatePost } = require('./handlers');

router.get('/', getAllPosts);
router.delete('/:postId', deletePost);
router.post('/', addPost);
router.patch('/:postId', updatePost);

module.exports = router;