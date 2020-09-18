import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { Container } from "react-bootstrap";
import { IdentityProvider } from "./contexts/identity";
import Error from "./components/error/Error";
import { Provider } from "react-redux";
import { store } from "./reduxStore";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IdentityProvider>
        <Error></Error>
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
      </IdentityProvider>
    </Provider>
  );
};

export default App;
