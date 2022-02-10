const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      data: {
        type: DataTypes.TEXT,
      },
      expires: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
  },
};
