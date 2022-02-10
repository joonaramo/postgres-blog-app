const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

const { User, Blog, Reading } = require('../models');

async function userFinder(req, res, next) {
  req.user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: 'userId',
        },
        through: {
          attributes: [],
        },
        include: {
          model: Reading,
          as: 'readingLists',
          attributes: {
            exclude: ['userId', 'blogId'],
          },
        },
      },
    ],
  });
  next();
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: 'userId' },
    },
  });
  res.json(users);
});

router.get('/:id', userFinder, async (req, res) => {
  if (!req.user) {
    let err = new Error();
    err.name = 'NotFoundError';
    throw err;
  }
  res.json(req.user);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  user.username = req.body.username;
  await user.save();
  res.json(user);
});

module.exports = router;
