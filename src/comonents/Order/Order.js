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

const Order = () => {
  const [cart, setCart] = useState([]);

  const [ordered, setOrdered] = useState(false);
  const handle = () => {
    setOrdered(true);
    setCart([]);
    deleteShoppingCart();
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
        {ordered && <img src={image} alt="" />}
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
