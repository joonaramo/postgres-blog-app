const Blog = require('./Blog');
const Reading = require('./Reading');
const User = require('./User');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Reading, as: 'readings' });
Blog.belongsToMany(User, { through: Reading });

Blog.hasMany(Reading, { as: 'readingLists' });
Reading.belongsTo(Blog);

module.exports = {
  Blog,
  User,
  Reading,
};
