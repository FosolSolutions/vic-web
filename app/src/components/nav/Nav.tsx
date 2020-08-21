import React from "react";
import "./Nav.css";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default () => {
  return (
    <React.Fragment>
      <Row>
        <Col className="logo" sm={4}>
          <Link to="/">
            <img
              src={logo}
              alt="victoriabiblestudy.com | from the Victoria Christadelphians"
              className="img-fluid"
            />
          </Link>
        </Col>
        <Col sm={8}>
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
        </Col>
      </Row>
    </React.Fragment>
  );
};
