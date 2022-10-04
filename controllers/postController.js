const data = require('../models/post');
const detail = require('../models/comment');

const tranPost = (request, response) => {
    console.log(`'${request.method}' | http://localhost:5000${request.url}`);
    return response.render('post', {title: 'Post'});
};

const getPost = (request, response) => {
    console.log(`'${request.method}' | http://localhost:5000${request.url}`);
    if (request.query.id) {
        const post = data.posts.find(position => position.id == parseInt(request.query.id));
        var comment = [];
        for (const findComment of detail.comments) {
            if (findComment.id == request.query.id) {
                comment.push(findComment);
            }
        }
        return response.status(200).render('detail', {title: 'Detail', body: [post], comments: comment});
    }
    return response.status(200).render('index', {title: 'Index', body: data.posts});
};

const setPost = (request, response) => {
    console.log(`'${request.method}' | http://localhost:5000${request.url}`);
    if (request.body.context) {
        const cmt = {
            id: request.query.id,
            context: request.body.context
        };
        detail.comments.push(cmt);
        const post = data.posts.find(position => position.id == parseInt(request.query.id));
        var comment = [];
        for (const findComment of detail.comments) {
            if (findComment.id == request.query.id) {
                comment.push(findComment);
            }
        }
        return response.status(200).render('detail', {title: 'Detail', body: [post], comments: comment});
    }
    if (request.body.id) {
        const post = data.posts.find(position => position.id == parseInt(request.body.id));
        if (request.body.method == "put") {
            return response.render('edit', {title: 'Edit', id: post.id, context01: post.title, context02: post.content});
        } else {
            const newPosts = data.posts.filter(position => position.id != parseInt(request.body.id));
            data.posts = newPosts;
            return response.status(200).render('index', {title: 'Index', body: data.posts});
        }
    }
    const newPost = {
        id: data.posts.length ? data.posts[data.posts.length - 1].id + 1 : 1,
        title: request.body.title,
        content: request.body.content
    };
    data.posts.push(newPost);
    return response.status(201).render('post', {title: 'Post', note: 'Your post has been published'});
};

const updatePost = (request, response) => {
    console.log(`'${request.method}' | http://localhost:5000${request.url}`);
    if (request.method == "POST") {
        const post = data.posts.find(position => position.id == parseInt(request.body.id));
        post.title = request.body.title;
        post.content = request.body.content;
        const newPosts = data.posts.filter(position => position.id != parseInt(request.body.id));
        newPosts.push(post);
        newPosts.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
        return response.status(201).render('edit', {title: 'Index', body: data.posts, note: 'Your post has been updated'});
    } else {
        return response.status(200).render('edit', {title: 'Index', body: data.posts});
    }
};

module.exports = {tranPost, getPost, setPost, updatePost};