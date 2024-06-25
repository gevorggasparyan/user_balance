const Sequelize = require("sequelize");
const config = require("../config/database.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    pool: {
      max: 100,
      min: 10,
      acquire: 30000,
      idle: 10000,
    },
  }
);
const User = sequelize.define("User", {
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    version: true,
    timestamps: true,
});

module.exports = { sequelize, User };
