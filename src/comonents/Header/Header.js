import React from 'react';
import "./Header.css";
import logo from "../../images/Logo.svg";

const Header = () => {
    const StyleSheet = {
        backgroundColor: 'lightgray',
        width: '100%',
        height: '70px',
    }
    return (
        <div>
            <img style={StyleSheet} src={logo} alt="Logo" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order-review">Order Review</a>
                <a href="/manage">Manage</a>
                <a href="/contact">Contact</a>
            </nav>
        </div>
    );
};

export default Header;