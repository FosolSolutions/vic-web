import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import {
  Home,
  Conference,
  Contact,
  Donate,
  Events,
  Links,
  Media,
  Seminars,
  AdminMedia,
} from "./pages";

export default () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <main className="main">
          <Switch>
            <Route path="/admin/media">
              <AdminMedia />
            </Route>
            <Route path="/conference">
              <Conference />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/donate">
              <Donate />
            </Route>
            <Route path="/events">
              <Events />
            </Route>
            <Route path="/links">
              <Links />
            </Route>
            <Route path="/media">
              <Media />
            </Route>
            <Route path="/seminars">
              <Seminars />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
