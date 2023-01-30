const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Category = require('./domain/category');
const OrderProduct = require('./domain/order-product');
const Order = require('./domain/order');
const Product = require('./domain/product');
const User = require('./domain/user');

const cors = require('cors')


const app = express();

app.use(cors())





Category.hasMany(Product);
Product.belongsToMany(Order, {through: OrderProduct});
User.hasMany(Order);

userRoutes = require('./api/routes/user.routes');
shopRoutes = require('./api/routes/shop.routes');
app.use(express.json());

app.use('/user',userRoutes);

app.use('/shop',shopRoutes);



  sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ username: 'test', password: 'test', isAdmin: true });
    }
    return user;
  })
  .then(user => {
     return sequelize.query("INSERT INTO shop.category (name) VALUES('cars');");
  })
  .then(user => {
    return sequelize.query("INSERT INTO shop.product(name, price, image, description, categoryId) VALUES('bmw', 20, 'none', 'a bmw', 1);");
 })
 .then(user => {
  return sequelize.query("INSERT INTO shop.product(name, price, image, description, categoryId) VALUES('audi', 18, 'none', 'an audi', 1);");
})


  .then(() => {
    app.listen(3456);
  })
  .catch(err => {
    console.log(err);
  });

