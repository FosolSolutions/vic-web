import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { IToken, ILogin } from "../../services";
import { useHistory } from "react-router-dom";
import {
  AuthenticationContext,
  generateIdentity,
} from "../../components/contexts/AuthenticationContext";
import { SiteContext } from "../../components/contexts/SiteContext";
import { useCookies } from "react-cookie";
import Constants from "../../settings/Constants";
import { getAuth } from "../../services";

export default () => {
  const [, setCookie] = useCookies([Constants.cookieName]);
  const [identity, setIdentity] = React.useContext(AuthenticationContext);
  const [, setSite] = React.useContext(SiteContext);
  const Auth = getAuth(identity, setIdentity, setSite, setCookie);
  const history = useHistory();
  const [account, setAccount] = useState({
    username: undefined,
    password: undefined,
  } as ILogin);
  const setField = <P extends keyof ILogin>(name: P, value: any) => {
    setAccount((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Auth.token(account).then(async (response) => {
      const token = (await response.json()) as IToken;
      setCookie(Constants.cookieName, token, {
        maxAge: token.refreshExpiresIn,
      });
      setIdentity(generateIdentity(token));
      history.push("/");
    });
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Account</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={account.username}
                onChange={(e) => setField("username", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={account.password}
                onChange={(e) => setField("password", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button type="submit">Login</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </React.Fragment>
  );
};
