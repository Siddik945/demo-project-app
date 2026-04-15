import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const PrivetRouter = ({ children }) => {
  const [loggedInUser] = useContext(UserContext);
  const location = useLocation();

  if (!loggedInUser?.email) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children; 
};

export default PrivetRouter;
