const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/tokenExtractor');

async function blogFinder(req, res, next) {
  req.blog = await Blog.findByPk(req.params.id);
  next();
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    let err = new Error();
    err.name = 'NotFoundError';
    throw err;
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

module.exports = router;
