import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
  AdminPages,
} from "../../pages";
import IdentityContext from "../../contexts/identity";

export default () => {
  const [identity] = React.useContext(IdentityContext);
  return (
    <>
      <Switch>
        {!identity?.isAuthenticated ? (
          <Redirect exact path="/admin/pages" to="/login" />
        ) : null}
        <Route path="/admin/pages" component={AdminPages} />
        <Route path="/conference" component={Conference} />
        <Route path="/contact" component={Contact} />
        <Route path="/donate" component={Donate} />
        <Route path="/events" component={Events} />
        <Route path="/links" component={Links} />
        <Route path="/login" component={Login} />
        <Route path="/media" component={Media} />
        <Route path="/seminars" component={Seminars} />
        <Route exact path="/" component={Home} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </>
  );
};
