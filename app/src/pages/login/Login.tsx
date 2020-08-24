import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ILogin } from "../../services";
import { useHistory } from "react-router-dom";
import { useAppContext } from "components/contexts/app-context";

export default () => {
  const [, , , oauth] = useAppContext();
  const history = useHistory();
  const [account, setAccount] = useState({
    username: "",
    password: "",
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
    oauth.token(account).then(() => {
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
                placeholder="email"
                value={account.username}
                onChange={(e) => setField("username", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
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
