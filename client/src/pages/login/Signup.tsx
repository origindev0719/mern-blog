import React, { useState, useContext, useEffect, useMemo } from "react";
import { Route, Link, useNavigate  } from "react-router-dom";
import { signup } from "../../api";
import "./style.css"
// import { User } from "../types";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    password: '',
    email: '',
    name: ''
  });
  let [authMode, setAuthMode] = useState("signin")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({...inputs, [event.target.id]: event.target.value})
  }
  const navigate = useNavigate ()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData: any =  await signup(inputs);
    if(userData) navigate("/signin");
  }

  return (
    <>
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to={"/signin"} className="link-primary">
                Sign In
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              id="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignUp;
