import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Conference from "./pages/conference/Conference";
import Contact from "./pages/contact/Contact";
import Donate from "./pages/donate/Donate";
import Events from "./pages/events/Events";
import Links from "./pages/links/Links";
import Media from "./pages/media/Media";
import Seminars from "./pages/seminars/Seminars";

export default () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <main className="main">
          <Switch>
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
