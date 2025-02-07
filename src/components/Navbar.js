import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">  
            <Link to="/" className="navbar-link"><img src="https://cdn-icons-png.flaticon.com/128/8540/8540857.png" alt="icon"/> PhotoFolio</Link>
            </div>
        {/* <div className="navbar-links">
        
          <Link to="/about" className="navbar-link">    <button className="navbar-link">About me</button></Link>
        </div> */}
        <div className="navbar-menu">
          <button className="menu-button">
        
          </button>
        </div>
      </div>
  
    </div>
    <div className="outlet-container">
    <Outlet />
  </div>
    </>
  );
};

export default Navbar;

