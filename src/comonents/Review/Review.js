import React from "react";
import "./Review.css";

const Review = (props) => {
  // console.log(props);
  const { name, count, id, price } = props.cart;
  console.log(id);
  return (
    <div className="review">
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>Quantity: {count}</p>
      <button id="btn" onClick={() => props.removeProduct(id)}>Remove</button>
    </div> 
  );
};

export default Review;
