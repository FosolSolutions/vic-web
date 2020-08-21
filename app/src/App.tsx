import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { Container } from "react-bootstrap";
import {
  AuthenticationContext,
  IUser,
} from "./components/authentication/AuthenticationContext";
import JwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

export default () => {
  const [cookies] = useCookies(["VicWeb"]);
  const token = cookies["VicWeb"];
  const data = !!token ? JwtDecode(token) : undefined;
  const [user, setUser] = useState({
    isAuthenticated: !!data,
    // displayName: data?.displayName ?? undefined,
    token: token,
  } as IUser);
  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Header />
          <Container className="main">
            <Nav />
            <Main />
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthenticationContext.Provider>
  );
};
