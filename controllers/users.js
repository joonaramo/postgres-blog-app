const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

const { User, Blog, Reading } = require('../models');

async function userFinder(req, res, next) {
  next();
}

router.get('/', async (req, res) => {
  console.log('session', req.session.id);
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: 'userId' },
    },
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  let where = {};
  where.userId = req.params.id;
  if (req.query.read) {
    where.read = req.query.read === 'true';
  }
  const user = await User.findByPk(req.params.id, {
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
          where,
        },
      },
    ],
  });
  if (!user) {
    let err = new Error();
    err.name = 'NotFoundError';
    throw err;
  }
  res.json(user);
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
