const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/tokenExtractor');

async function blogFinder(req, res, next) {
  req.blog = await Blog.findByPk(req.params.id);
  next();
}

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: 'userId' },
    include: {
      model: User,
    },
    where,
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.blog) {
    let err = new Error();
    err.name = 'NotFoundError';
    throw err;
  }
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!req.blog) {
    let err = new Error();
    err.name = 'NotFoundError';
    throw err;
  }
  if (req.blog.userId !== user.id) {
    let err = new Error();
    err.name = 'NotAuthorizedError';
    throw err;
  }
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;
