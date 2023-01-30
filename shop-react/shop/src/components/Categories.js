import axios from "axios";
import React, {useState} from 'react';
import { Link } from "react-router-dom";



function Categories(){
    const [categories,setCategories] = useState("");
    // const [chosenCategory, setChosenCategory] = useState("");

    function getAllCategories(){

        axios.get('http://127.0.0.1:3456/shop/category')
            .then(res =>{
                setCategories(res.data);
                // setCategories([{"id":1,"name":"cars"}]);

            })

      }
      if(categories == ""){ // to prevent rerender with new request

        // setCategories( [{name:"xd"}])
        getAllCategories();
        return( <h1>none loaded yet</h1>)
    }


    // now get data and pass params plus child link, move to window storage and make hook basket
    // https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6
    // keep links as oneliner
    return(
    <div>
        {categories.map( cat =>{
            var base = "/category/" + cat.id; 


            return(<Link to={base}>{cat.name}</Link>)
            
        })}

                
    </div>
    );
    
}

export default Categories;
