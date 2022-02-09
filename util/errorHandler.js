function errorHandler(error, req, res, next) {
  console.error(JSON.stringify(error, null, 2));
  if (
    error.name === 'SequelizeDatabaseError' ||
    error.name === 'SequelizeValidationError'
  ) {
    return res.status(400).json({ message: error.errors[0].message });
  }
  if (error.name === 'NotFoundError') {
    return res.status(404).end();
  }
  next(error);
}

module.exports = {
  errorHandler,
};
