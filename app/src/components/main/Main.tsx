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
  AdminMedia,
} from "../../pages";
import useAppContext from "components/contexts/useAppContext";

export default () => {
  const [state] = useAppContext();
  return (
    <React.Fragment>
      <Switch>
        {!state.identity?.isAuthenticated ? (
          <Redirect exact path="/admin/media" to="/login" />
        ) : null}
        <Route path="/admin/media" component={AdminMedia} />
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
    </React.Fragment>
  );
};
