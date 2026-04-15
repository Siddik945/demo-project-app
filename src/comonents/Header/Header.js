import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const StyleSheet = {
    backgroundColor: "lightgray",
    width: "100%",
    height: "70px",
  };
  return (
    <div>
      {/* <img style={StyleSheet} src={logo} alt="Logo" /> */}
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/order-review">Order Review</Link>
        <Link to="/manage">Manage</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Header;
