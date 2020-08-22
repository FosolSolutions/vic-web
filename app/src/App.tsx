import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { Container, Alert } from "react-bootstrap";
import {
  AuthenticationContext,
  generateIdentity,
} from "./components/contexts/AuthenticationContext";
import { SiteContext, ISite } from "./components/contexts/SiteContext";
import { useCookies } from "react-cookie";
import Constants from "./settings/Constants";
import { IToken } from "./services";

export default () => {
  // If a cookie exists, parse it and initialize state.
  const [cookies] = useCookies([Constants.cookieName]);
  const token = cookies[Constants.cookieName] as IToken;
  const [site, setSite] = useState({} as ISite);
  const [identity, setIdentity] = useState(generateIdentity(token));
  return (
    <SiteContext.Provider value={[site, setSite]}>
      <AuthenticationContext.Provider value={[identity, setIdentity]}>
        <Router>
          <div className="App">
            <Header />
            <Container className="main">
              <Nav />
              {!!site.error ? <Alert variant="danger">{site.error}</Alert> : ""}
              <Main />
            </Container>
            <Footer />
          </div>
        </Router>
      </AuthenticationContext.Provider>
    </SiteContext.Provider>
  );
};
