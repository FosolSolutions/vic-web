import React from "react";
import "./Nav.css";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            alt="victoriabiblestudy.com | from the Victoria Christadelphians"
            height="38"
            width="220"
          />
        </Link>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/conference">CYC Conference</Link>
          </li>
          <li>
            <Link to="/seminars">Seminars</Link>
          </li>
          <li>
            <Link to="/links">Links</Link>
          </li>
          <li>
            <Link to="/media">Media</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
