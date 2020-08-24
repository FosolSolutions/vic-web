import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { Container, Alert } from "react-bootstrap";
import { AuthRoutes } from "./services";
import { AppProvider, defaultState } from "./components/contexts/app-context";

export default () => {
  // If a cookie exists, parse it and initialize state.
  const [state, setState] = useState(defaultState);
  return (
    <AppProvider
      tokenUrl={AuthRoutes.token()}
      refreshUrl={AuthRoutes.refresh()}
      value={[state, setState]}
    >
      <Router>
        <div className="App">
          <Header />
          <Container className="main">
            <Nav />
            {!!state.error ? <Alert variant="danger">{state.error}</Alert> : ""}
            <Main />
          </Container>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};
