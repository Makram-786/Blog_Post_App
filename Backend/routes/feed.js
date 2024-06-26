const express = require('express');

const {body} = require('express-validator')

const router = express.Router();

const postController = require('../controllers/feed')

router.get('/posts' , postController.getPosts);

router.post('/post' , [
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
] , postController.createPost)


router.get('/post/:postId' , postController.getPost);

router.put('/post/:postId' , postController.editPost)

module.exports = router