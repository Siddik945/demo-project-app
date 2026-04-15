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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./comonents/LogIn/LogIn";
import { createContext } from "react";
import PrivetRouter from "./comonents/PrivetRouter/PrivetRouter";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <p>Email: {loggedInUser.email}</p> */}
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Shop></Shop>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/order-review" element={<Order></Order>} />
          <Route
            path="/manage"
            element={
              <PrivetRouter>
                <Manage />
              </PrivetRouter>
            }
          />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/login" element={<LogIn></LogIn>} />
          <Route
            path="/product/:productId"
            element={<ProductDetail></ProductDetail>}
          />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
