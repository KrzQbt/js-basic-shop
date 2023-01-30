import React, {useState} from 'react';

import {useParams} from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


function ItemsInCategory(){
    const  { categoryId }  = useParams();
    const [categoryInfo,setCategoryInfo] = useState("");
    const [productsList,setProductsList] = useState("");

    const [basket,setBasket] = useState([])



    function getCategoryInfo(categoryIdNum){
      axios.get('http://127.0.0.1:3456/shop/category/'+categoryIdNum)
            .then(res =>{
                setCategoryInfo(res.data["name"]);
                // setCategories([{"id":1,"name":"cars"}]);

            })
    }
    function getProductsInCategory(categoryIdNum){
      axios.get('http://127.0.0.1:3456/shop/category/'+ categoryIdNum+'/product')
            .then(res =>{
                setProductsList(res.data.products)
                // setCategories([{"id":1,"name":"cars"}]);

            })
    }

function addToBasket(productId, name){
  if( basket.length == 0){
    let newBasket = []
    newBasket.push({
      productId:productId,
      name:name,
      quantity:1
    })
    setBasket(newBasket)
    return
  }
  let newBasket = basket

  for( let i=0; i< newBasket.length; i++){
    if(newBasket[i]["productId"] == productId){
      newBasket[i]["quantity"] += 1
    }
    setBasket(newBasket)
  }
  return
  
}


function buy(){
   var orderdata = {
      userId: 1,
      // userId: window.sessionStorage.getItem("userId"),
      productMap: []
    }
    for (let i = 0; i < basket.length; i++) {
      orderdata["productMap"].push([basket[i]["productId"] ,basket[i]["quantity"] ]);
    }
    
    axios.post('http://127.0.0.1:3456/shop/order',orderdata, {headers: {
      'Authorization': window.sessionStorage.getItem("token")
    }}).then(res => {
      window.location.reload();
    })


}


    if(categoryInfo == ""){ // to prevent rerender with new request

      // setCategories( [{name:"xd"}])
      getCategoryInfo(categoryId)
      return( <h1>Cat info not loaded yet</h1>)
    }

    if(productsList == ""){ // to prevent rerender with new request

      // setCategories( [{name:"xd"}])
      getProductsInCategory(categoryId);
      return( <h1>products not loaded yet</h1>)
    }
    


    return(
      <div>
        {
        
        basket.map( prod =>{
          return(<div>
            <h3>{prod.name} amount: {prod.quantity}</h3>

          </div>)
        })

        
        }
        <button onClick={() => buy()}>Buy</button>

        <h1>{categoryInfo}</h1>
        <br/>
        {productsList.map( prod =>{
          return(<div>
            <h3>{prod.name}</h3>
            <h5>price:{prod.price}</h5>
            <p>{prod.description}</p>

            <button onClick={() => addToBasket(prod.id,prod.name)}>add to basket</button>
          </div>)
        })
        
        }



      </div>
      );

    
}

export default ItemsInCategory;
