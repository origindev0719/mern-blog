import React, { useState, useContext, useEffect, useMemo } from "react";
import { Route, Link, useNavigate } from "react-router-dom";
import { signin } from "../../api";
import "./style.css"
const SignIn = () => {
  const [inputs, setInputs] = useState({ password: '', email: '' });
  const navigate = useNavigate ()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({...inputs, [event.target.id]: event.target.value})
  }
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const userData: any = await signin(inputs);
    if(userData) {
      sessionStorage.setItem('token', JSON.stringify(userData));
      if(userData.rollno == 2) navigate("/admin")
      else navigate("/home")
    }
  }

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link to={"/signup"} className="link-primary">
                Sign Up
            </Link>
            </div>
            <div className="form-group mt-3">
                <label>Email address</label>
                <input
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChange}
                />
            </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                type="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChange}
                />
            </div>
            <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
            </div>
            <p className="forgot-password text-right mt-2">
                Forgot <a href="#">password?</a>
            </p>
            </div>
          </form>
      </div>
    </>
  );
};

export default SignIn;
