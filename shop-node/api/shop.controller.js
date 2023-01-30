const Category = require('../domain/category');
const OrderProduct = require('../domain/order-product');
const Order = require('../domain/order');
const Product = require('../domain/product');
const User = require('../domain/user');




exports.getProductById = (req,res,next) => {
    
    Product.findByPk(req.params.id)
    .then( product => {
        res.status(200).json(
            product
        );
    })

}


exports.getAllProducts = (req,res,next) => {

    Product.findAll().then( products => 
        res.status(200).json(products)
        );

}


exports.postProduct = (req,res,next) => {

    Product.create(req.body).then(
        res.status(201).send("created")

    )

}

exports.getCategoryById = (req,res,next) => {
    
    Category.findByPk(req.params.id)
    .then( category => {
        res.status(200).json(
            category
        );
    })

}

exports.getAllCategories = (req,res,next) => {


    Category.findAll().then( category => 
        res.status(200).json(category)
    );

}


exports.getProductsByCategory = (req,res,next) => {
    const catId = req.params.id;
    

    Product.findAll({
        where: {
            categoryId: catId
        }
    })
    .then( productsByCategory =>{
        res.status(200).json(
            {
                categoryId: catId,
                products: productsByCategory
            }
        );
    })

}

exports.postCategory = (req,res,next) => {

    Category.create(req.body).then(
        res.status(201).send("created")

    )

}



exports.getOrderById = (req,res,next) => {
    // console.log(req.params.id)
    console.log("by id");

    Order.findByPk(req.params.id)
    .then(order =>{
        if(order!=null){
            // console.log(order);
    console.log("by id");
            
            OrderProduct.findAll({where:{orderId:req.params.id}})
            
            .then( orderProducts => {
                
                console.log("byId");
                console.log(orderProducts.length);
                orderContentResponse ={
                    orderId:req.params.id,
                    orderProductsList: [],
                    total: 0
                }
                
                for (let i = 0; i< orderProducts.length; i++) {
                    // console.log(orderProducts[i].dataValues.productId)
                    
                    Product.findByPk(orderProducts[i].dataValues.productId)
                    .then( item =>{
                        // console.log("PRO")
                        // console.log(item);
                        orderContentResponse.orderProductsList.push({
                        productName: item.dataValues.name,
                        productId: item.dataValues.id,
                        unitPrice: item.dataValues.price,
                        amount: orderProducts[i].dataValues.amount,
                    })
                        orderContentResponse.total += (item.dataValues.price) * (orderProducts[i].dataValues.amount)
                    

                        console.log(orderContentResponse)

                        if(i == orderProducts.length-1){
                            res.status(200).json(orderContentResponse);

                        }
                    }
                    );

                

                }

            
            
            
            })


        }else{
            res.status(404).send("not found")
        }
    });

}

exports.postOrder = (req,res,next) => {
    
    const uid = req.body.userId

    const order = Order.create({
        userId: uid,
        paid: false
    })
    .then(order => {
    console.log(order);
    console.log(req.body.productMap);
    for ( i in req.body.productMap){
        // console.log(i)
        OrderProduct.create({
            orderId: order.dataValues.id,
            productId: req.body.productMap[i][0],
            amount: req.body.productMap[i][1]
        });
    }
    res.status(201).send("created")


    })




    // decrement stock amount later
    // var body = {
    //     userId: 1,
    //   productMap: [
    //       [1,2], [3,4]
    //   ]
    // }
    // body.productMap.push([var1,var2])
    
    // body.productMap.push([var1,var2])
    
    // alert(body.productMap[2][1]);


    // for ( i in req.body.productMap){
    //     // console.log(i)
    //     OrderProduct.create({
    //         orderId: order.id,
    //         productId: req.body.productMap[i][0],
    //         amount: req.body.productMap[i][1]
    //     });
    // }

    // res.status(201).send("created")

}