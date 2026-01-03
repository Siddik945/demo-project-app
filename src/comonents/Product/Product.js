import React from "react";
import "./Product.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = (props) => {
  //   console.log(props.showDisplay);
  const { img, name, seller, price, stock, id } = props.product;

   const cartButton = (
      <button id="btn" onClick={() => props.handleAddProduct(props.product)}>
        <span>
          <FaShoppingCart />
        </span>
        Add to Cart
      </button>
    );
  return (
    <div className="product-contain">
      <div id="image">
        <img src={img} alt="" />
      </div>
      <div>
        <h3>
          <Link to={"/product/" + id}>{name}</Link>
        </h3>
        <p>
          <small>By {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock-order soon</small> 
        </p>
        {props.showDisplay === "true" && cartButton}
      </div>
    </div>
  );
};

export default Product;
