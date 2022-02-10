const { Reading, User } = require('../models');
const { tokenExtractor } = require('../util/tokenExtractor');

const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

router.post('/', async (req, res) => {
  const readinglist = await Reading.create(req.body);
  res.json(readinglist);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglist = await Reading.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (readinglist.userId !== user.id) {
    let err = new Error();
    err.name = 'NotAuthorizedError';
    throw err;
  }
  if (req.body.read !== undefined) {
    readinglist.read = req.body.read;
  }
  await readinglist.save();
  res.json(readinglist);
});

module.exports = router;
