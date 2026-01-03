import React, { useEffect } from "react";
import fakeData from "../../fakeData/products.json";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb } from "../../utilities/fakedb";
import { getShoppingCart } from "../../utilities/fakedb";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const product10 = fakeData.slice(0, 10);
    setProducts(product10);
  }, []);

  useEffect(() => {
    const savedCart = getShoppingCart();
    const productIds = Object.keys(savedCart);
    const previousCart = productIds.map((id) => {
      const product = fakeData.find((pd) => pd.id === id);
      product.count = savedCart[id];
      return product;
    });
    setCart(previousCart);
  }, []);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd.id === product.id);
    if (sameProduct) {
      product.count = sameProduct.count + 1;
      const others = cart.filter((pd) => pd.id !== product.id);
      const newCart = [...others, product];
      setCart(newCart);
    }else {
      product.count = 1;
      const newCart = [...cart, product];   
      setCart(newCart);
    }
    addToDb(product.id);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        <ul>
          {products.map((product) => (
            <Product
              product={product}
              key={product.id}
              handleAddProduct={handleAddProduct}
              showDisplay="true"
            ></Product>
          ))}
        </ul>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/order-review"><button id="btn">Review Order</button></Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
