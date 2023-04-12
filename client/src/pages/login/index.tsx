import React, { useState, useContext, useEffect, useMemo } from "react";
import SignIn from "./Sigin";
import SignUp from "./Signup";
import "./style.css"

const Auth = () => {
  let [authMode, setAuthMode] = useState("signin")
  return (
    authMode === 'signin' ? <SignIn /> : <SignUp />
  )
};

export default Auth;
