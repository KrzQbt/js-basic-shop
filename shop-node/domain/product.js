const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    image: { // as a link
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
  
    // ,
    // stock: {
        // type: Sequelize.INTEGER,
        // allowNull: false
    // }


  },
  {
    freezeTableName: true, 
        timestamps: false
  });
  
  module.exports = Product;

