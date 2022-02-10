const { Reading } = require('../models');

const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

router.post('/', async (req, res) => {
  const readinglist = Reading.create(req.body);
  res.json(readinglist);
});

module.exports = router;
