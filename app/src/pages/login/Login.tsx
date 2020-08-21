import React, { useState, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { API } from "../../services";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "../../components/authentication/AuthenticationContext";
import { useCookies } from "react-cookie";

interface IToken {
  displayName: string;
  accessToken: string;
}

interface IAccount {
  username?: string;
  password?: string;
}

export default () => {
  const [, setCookie] = useCookies(["VicWeb"]);
  const identity = useContext(AuthenticationContext);
  const history = useHistory();
  const [account, setAccount] = useState({
    username: undefined,
    password: undefined,
  } as IAccount);
  const setField = <P extends keyof IAccount>(name: P, value: any) => {
    setAccount((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(API.Auth.Login(), {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(account),
    }).then(async (response) => {
      const data = (await response.json()) as IToken;
      identity.setUser({
        isAuthenticated: true,
        displayName: data.displayName,
      });
      setCookie("VicWeb", data.accessToken);
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
