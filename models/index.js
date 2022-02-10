const Blog = require('./Blog');
const Reading = require('./Reading');
const User = require('./User');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Reading });
Blog.belongsToMany(User, { through: Reading });

module.exports = {
  Blog,
  User,
};
