const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderProduct = sequelize.define('orderProduct', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // add
    // atPrice: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // }

  },
  {
    freezeTableName: true, 
        timestamps: false
  });
  
  module.exports = OrderProduct;