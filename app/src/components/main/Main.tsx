import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Conference,
  Contact,
  Donate,
  Events,
  Links,
  Login,
  Media,
  Seminars,
  AdminMedia,
} from "../../pages";

export default () => {
  return (
    <React.Fragment>
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
        <Route path="/login">
          <Login />
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
    </React.Fragment>
  );
};
