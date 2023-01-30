const express = require('express');

const shopController = require('../shop.controller');
const authCheck = require('../../service/jwtCheckup.service')


const router = express.Router();

router.get('/product/:id',shopController.getProductById)

router.get('/product',shopController.getAllProducts)

router.post('/product',authCheck,shopController.postProduct)


router.get('/category/:id/product',shopController.getProductsByCategory)

router.get('/category/:id',shopController.getCategoryById)


router.get('/category',shopController.getAllCategories)

router.post('/category',authCheck,shopController.postCategory)




router.get('/order/:id',authCheck,shopController.getOrderById)

router.post('/order',authCheck,shopController.postOrder)

module.exports = router;
