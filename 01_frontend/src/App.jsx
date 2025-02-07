import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navigation/Navigation';
import Login from './components/User/LoginForm';
import SingleBook from './components/SingleBook/SingleBook';
import Books from './components/Books/Books';
import Signup from './components/User/RegisterForm';
import UserProfile from './components/User/UserProfile';
import Reservations from './components/Reservations/Reservations';
 import { useState, useEffect } from 'react';

import {store} from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [changeFlag, setChangeFlag] = useState("");

  useEffect(()=>{
    if(token){
      localStorage.setItem('token', token);
    } 
    else{
      localStorage.removeItem('token');
    }
  },[token]);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav path="/Nav" token={token} setToken={setToken}/>
          <Routes>
            <Route path="/" element={<Books token={token} setToken={setToken} changeFlag={changeFlag}/>} />
            <Route path="/SingleBook/:id" element={<SingleBook token={token} setToken={setToken}/>} />
            <Route path="/Login" element={<Login token={token} setToken={setToken}/>} />
            <Route path="/Signup" element={<Signup token={token} setToken={setToken}/>} />
            <Route path="/UserProfile" element={<UserProfile token={token} setToken={setToken}/>} />
            <Route path="/Reservations" element={<Reservations token={token} setToken={setToken} setChangeFlag={setChangeFlag}/>} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
