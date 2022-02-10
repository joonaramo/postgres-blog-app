require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 5555,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env_SESSION_SECRET,
};
