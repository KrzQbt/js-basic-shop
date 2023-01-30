const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    paid: {
      type: Sequelize.BOOLEAN,
      allowNull:false
    },
    
  },
  {
    freezeTableName: true, 
        timestamps: false
  });
  
  module.exports = Order;