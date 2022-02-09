const { Blog } = require('../models');
const { sequelize } = require('../models/Blog');

const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
  });
  res.json(blogs);
});

module.exports = router;
