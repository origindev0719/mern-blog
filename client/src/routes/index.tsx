import React from 'react';
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes as Switch,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Sigin";
import SignUp from "../pages/login/Signup";
import ViewBlog from "../pages/home/ViewBlog";
import Admin from "../pages/admin/index";
import Test from "../pages/test";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ViewBlog" element={<ViewBlog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/test" element={<Test />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
