'use strict';
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { PORT, SESSION_SECRET } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorsRouter = require('./controllers/authors');
const readinglistsRouter = require('./controllers/readinglists');
const { errorHandler } = require('./util/errorHandler');
const { sequelize } = require('./models/Blog');

const app = express();

app.use(express.json());
const store = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions',
});
app.use(
  session({
    secret: SESSION_SECRET,
    store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readinglistsRouter);

app.use(errorHandler);

async function main() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
