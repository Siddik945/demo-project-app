import React, { useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/auth";
import { useState } from "react";
import firebaseConfig from "../firebase.config";
import "./LogIn.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

firebase.initializeApp(firebaseConfig);

const LogIn = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
    password: "",
    newUser: false,
  });
  const handleGoogleLogIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        navigate(from, { replace: true });  
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoggedInUser(user);
      });
  };

  const handleCheckBox = (e) => {
    const newUserInfo = { ...user };
    newUserInfo.newUser = e.target.checked;
    setUser(newUserInfo);
  };

  const handleName = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  };

  const handleEmail = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
    // console.log(e.target.value);
  };

  const handlePassword = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  };

  const handleSubmit = (e) => {
    if (user.email && user.password && user.newUser) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.isSignedIn = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.isSignedIn = true;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  return (
    <div className="App">
      <h2>Our Login System</h2>
      <button onClick={handleGoogleLogIn}>Google Sign In</button>
      <br />
      <form action="" onSubmit={handleSubmit}>
        <input type="checkbox" onClick={handleCheckBox} />
        New User Sign Up
        <br />
        <input
          type="text"
          name="name"
          onBlur={handleName}
          placeholder="Your Name"
          required
        ></input>
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleEmail}
          placeholder="Your Email"
          required
        ></input>
        <br />
        <input
          type="password"
          name="password"
          onBlur={handlePassword}
          placeholder="Your Password"
          required
        ></input>
        <br />
        <input type="submit" />
      </form>
      {user.error && <p style={{ color: "red" }}>{user.error}</p>}
      {!user.isSignedIn && user.success && (
        <p style={{ color: "green" }}>Sign Up Successfull</p>
      )}
      {user.isSignedIn && (
        <div>
          <p>Welcome: {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
          <p style={{ color: "green" }}>Login Successfull</p>
        </div>
      )}
    </div>
  );
};

export default LogIn;
