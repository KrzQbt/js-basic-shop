import './App.css';
import Login from './components/Login';
import React, {useState} from 'react';
import { Button, Form} from "react-bootstrap";
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Topnav from './components/Topnav';
import Categories from './components/Categories';
import ItemsInCategory from './components/ItemsInCategory';



function App() {
  const [newName, setNewName] = useState({
    username: '',
    password: ''
  });// tu trzymane
  const [creds, setCreds] = useState(newName);

  const [token,setToken] = useState({myToken:''});

  const [basket, setBasket] = useState([]);

const BasketContext = React.createContext([]);

function loginRequest(username,password){
  axios.post('http://127.0.0.1:3456/user/login',{"username":username,"password":password})
    .then(
      res =>{
        setToken({myToken:res.data["token"]})

        window.sessionStorage.setItem("token",res.data["token"]);
        return (res.data["token"])
        // token = res.data["token"]
      }
    )
}

// should cancel token, for now just erase it
function logout(){
  setToken({myToken:""});
}



  


  function handleOnSubmit(event) {
    console.log(newName);
    setCreds(newName);


    loginRequest(creds.username,creds.password);

    event.preventDefault(); // no def reload
  }
  

  function handleOnChange(event) {
    var { value, name } = event.target;
    setNewName((namev) => {
      if (name === 'username')
        return {
          username: value,
          password: namev.password
        };
      else
        return {
          username: namev.username,
          password: value
        };
    });



  }
  const baskets = React.useContext(BasketContext);
  

if(window.sessionStorage.getItem("token")==null){
  return (
    <div className='container'>
    <h1>
      Hello {creds.username} 
      {/* {creds.password} {token.myToken} */}
    </h1>
    <form onSubmit={handleOnSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleOnChange}
          value={newName.username}
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
          value={newName.password}
        />
        <Button type="submit">Login</Button>
      </form>
      </div>
  );
}


  return (
    <BasketContext.Provider value={basket}>

   <div>
    <Topnav/>
    <div>
      <div>
        {baskets}
      </div>

    </div>

    <Routes>
                <Route path="/categories" element={<Categories/>} />
                <Route path="/category/:categoryId" element={<ItemsInCategory/>} />
    </Routes>
    </div>
    </BasketContext.Provider>
  );


}





export default App;
