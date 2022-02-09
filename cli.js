'use strict';
require('dotenv').config();

const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function main() {
  const blogs = await sequelize.query('SELECT * FROM blogs', {
    type: QueryTypes.SELECT,
    logging: false,
  });
  blogs.forEach((b) => {
    console.log(`${b.author}: ${b.title}, ${b.likes} likes`);
  });
  await sequelize.close();
}

main();
