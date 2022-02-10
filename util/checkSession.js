const { User } = require('../models');

async function checkSession(req, res, next) {
  const user = await User.findByPk(req.session.user?.id);

  if (!user || user.disabled) {
    let err = new Error();
    err.name = 'NotAuthorizedError';
    throw err;
  }

  req.user = user;
  next();
}

module.exports = checkSession;
