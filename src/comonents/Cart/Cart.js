import React, { Children } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = props.cart;
  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    price = price + product.price * product.count;
  }
  // const price = cart.reduce((total, prd) => total + prd.price, 0);
  let shipping = 0;
  if (price > 350) {
    shipping = 0;
  } else if (price > 15) {
    shipping = 4.99;
  } else if (price > 0) {
    shipping = 12.99;
  }
  const tax = (price * 0.1).toFixed(2);
  const total = price + shipping + Number(tax);
  return (
    <div className="cart-container">
      <div className="head">
        <h3>Order Summary</h3>
        <h5>Items Ordered : {cart.length}</h5>
      </div>
      <div className="body">
        <p>Product Price :{price}</p>
        <p>
          <small>Shipping Cost :{shipping}</small>
        </p>
        <p>
          <small>Tax + Vet :{tax}</small>
        </p>
        <h4>Total Price :{total}</h4>
        <br />
        {
          props.children
        }
      </div>
    </div>
  );
};

export default Cart;
