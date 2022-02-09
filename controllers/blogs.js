const router = require('express').Router();

const { Blog } = require('../models');

async function blogFinder(req, res, next) {
  req.blog = await Blog.findByPk(req.params.id);
  next();
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

module.export = router;
