const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../util/config');
const { User } = require('../models');

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  const passwordCorrect = req.body.password === 'salainen';

  if (!(user && passwordCorrect)) {
    const err = new Error();
    err.name = 'InvalidCredentialsError';
    throw err;
  }

  // const payload = {
  //   username: user.username,
  //   id: user.id,
  // };

  // const token = jwt.sign(payload, JWT_SECRET);

  req.session.user = {
    username: user.username,
    id: user.id,
  };

  res.json({ username: user.username, name: user.name });
});

module.exports = router;
