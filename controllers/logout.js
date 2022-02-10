const expressRouter = require('express').Router();
const router = require('@root/async-router').wrap(expressRouter);

router.delete('/', (req, res) => {
  req.session.destroy();
  return res.status(204).end();
});

module.exports = router;
