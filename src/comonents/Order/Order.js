import React, { use, useState } from "react";
import { useEffect } from "react";
import { getShoppingCart } from "../../utilities/fakedb";
import fakeData from "../../fakeData/products.json";
import Review from "../Review/Review";
import "./Order.css";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import { deleteShoppingCart } from "../../utilities/fakedb";
import image from "../../images/giphy.gif";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);  
  const [checkEmail, setCheckEmail] = useState(false);
  const navigate = useNavigate();

  const [ordered, setOrdered] = useState(false);
  const handle = () => {
    // if(!loggedInUser.email){
    //   setCheckEmail(true);
    //   navigate("/login");
    //   return;
    // }
    // else{
    //   navigate("/shpping");
    //   setCheckEmail(false);
    // }
    navigate("/manage");
    setOrdered(true);
    setCart([]);
    deleteShoppingCart();
    // const newUser = {...loggedInUser};
    // if(newUser.email){
    //   navigate("/login")
    // }
    // else{
    //   setCheckEmail=false;
    // }
    // setLoggedInUser(newUser);
  };
  const removeProduct = (productId) => {
    const newCart = cart.filter((pd) => pd.id !== productId);
    setCart(newCart);
    removeFromDb(productId);
  };
  useEffect(() => {
    const orderData = getShoppingCart();
    const orderKey = Object.keys(orderData);
    const orderCart = orderKey.map((key) => {
      const product = fakeData.find((pd) => pd.id === key);
      product.count = orderData[key];
      return product;
    });
    setCart(orderCart);
  }, []);
  // console.log(cart);
  return (
    <div className="review-container">
      <div className="review-item">
        {cart.map((pd) => (
          <div key={pd.id}>
            <Review cart={pd} removeProduct={removeProduct}></Review>
          </div>
        ))}
        
      </div>
      <div className="order-summary">
        <Cart cart={cart}>
          <button id="btn" onClick={handle}>
            Place Order
          </button>
        </Cart>
      </div>

    </div>
  );
};

export default Order;
