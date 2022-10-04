const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.route('/')
    .get(postController.tranPost)
    .post(postController.setPost);
router.route('/index')
    .get(postController.getPost)
    .post(postController.setPost);
router.route('/edit')
    .get(postController.getPost)
    .post(postController.updatePost);

module.exports = router;