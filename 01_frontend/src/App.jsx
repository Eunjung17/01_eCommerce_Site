import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
// import Admin from './components/Admin/Admin';
// import BusinessOwner from './components/BusinessOwner/BusinessOwner';
// import ChangePassword from './components/ChangePassword/ChangePassword';
// import FindEmail from './components/FindEmail/FindEmail';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
// import Order from './components/Order/Order';
import ProductCategoryList from './components/ProductCategoryList/ProductCategoryList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Registration from './components/Registration/Registration';
import UserCart from './components/UserCart/UserCart';
// import UserCartOrder from './components/UserCart/UserCartOrder';
import UserDetail from './components/UserDetail/UserDetail';
import UserOrderDetail from './components/UserOrderDetail/UserOrderDetail';
import UserOrderHistory from './components/UserOrderHistory/UserOrderHistory';
import UserManage from './components/UserManage/UserManage';
 import { useState, useEffect } from 'react';

import {store} from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') ?? null);

  //?? null: Only falls back to null if the value is null or undefined.
  //|| null: Falls back to null for any falsy value, including "" (empty string), false, 0, NaN, etc.

  useEffect(()=>{
    if(token){
      localStorage.setItem('token', token);
    } 
    else{
      localStorage.removeItem('token');
    }
  },[token]);

  useEffect(()=>{
    if(userRole){
      localStorage.setItem('userRole', parseInt(userRole));
      console.log("sss:" , typeof(localStorage.getItem('userRole')));
    } 
    else{
      localStorage.removeItem('userRole');
    }
  },[userRole]);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navigation path="/Navigation" token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>
          <Routes>
            <Route path="/" element={<Home token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            <Route path="/Registration" element={<Registration token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            <Route path="/SignIn" element={<SignIn token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            <Route path="/UserDetail" element={<UserDetail token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            <Route path="/UserManage" element={<UserManage token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            {/* <Route path="/FindEmail" element={<FindEmail token={token} setToken={setToken}/>} /> */}
            {/* <Route path="/ChangePassword" element={<ChangePassword token={token} setToken={setToken} />} /> */}
            {/* <Route path="/Order" element={<Order token={token} setToken={setToken} />} /> */}
            <Route path="/UserCart" element={<UserCart token={token} setToken={setToken}  userRole={userRole} setUserRole={setUserRole}/>} />
            {/* <Route path="/UserCartOrder" element={<UserCartOrder token={token} setToken={setToken}  userRole={userRole} setUserRole={setUserRole}/>} /> */}
            <Route path="/UserOrderDetail" element={<UserOrderDetail token={token} setToken={setToken} />} />
            <Route path="/UserOrderHistory" element={<UserOrderHistory token={token} setToken={setToken} />} />
            {/* <Route path="/BusinessOwner" element={<BusinessOwner token={token} setToken={setToken} />} /> */}
            {/* <Route path="/Admin" element={<Admin token={token} setToken={setToken} />} /> */}
            {/* <Route path="/BusinessOwner" element={<BusinessOwner token={token} setToken={setToken} />} /> */}
            <Route path="/ProductCategoryList" element={<ProductCategoryList token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
            <Route path="/ProductDetail" element={<ProductDetail token={token} setToken={setToken} userRole={userRole} setUserRole={setUserRole}/>} />
          </Routes>
          <Footer path="/Footer"/>
        </Router>
      </Provider>
    </>
  );
}

export default App;
