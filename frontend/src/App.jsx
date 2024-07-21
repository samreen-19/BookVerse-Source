import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from  "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favorites from "./components/profile/Favorites";
import UpdateBookDetails from "./pages/UpdateBookDetails";
import AddBook from "./pages/AddBook";
import OrderHistory from "./components/profile/OrderHistory";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import {Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { GrFavorite } from "react-icons/gr";


const App = () => {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if (
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")));
      }
    
  })
  return (
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks/>} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updatebook/:id" element={<UpdateBookDetails/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />}> 
          {role=="user"? (
           
             <Route index element={<Favorites/>} />):(
              <Route index element={<AddBook/>}></Route>)
             
          }
          {role=="admin" ? (
             null
          ):(
            <Route path="/profile/orderhistory" element={<OrderHistory/>} ></Route>
          )}
          
          </Route>
          <Route path="/view-book-details/:id" element={<ViewBookDetails/>} />
        </Routes>
        <Footer />
      </div>
  );
};

export default App;

