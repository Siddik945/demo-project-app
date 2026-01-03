import logo from "./logo.svg";
import "./App.css";
import { use } from "react";
import { useState, useEffect } from "react";
import Header from "./comonents/Header/Header";
import Shop from "./comonents/Shop/Shop";
import Order from "./comonents/Order/Order";
import Manage from "./comonents/Manage/Manage";
import Contact from "./comonents/Contact/Contact";
import NotFound from "./comonents/NotFound/NotFound";
import ProductDetail from "./comonents/ProductDetail/ProductDetail";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Shop></Shop>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/order-review" element={<Order></Order>} />
          <Route path="/manage" element={<Manage></Manage>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/product/:productId" element={<ProductDetail></ProductDetail>} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
