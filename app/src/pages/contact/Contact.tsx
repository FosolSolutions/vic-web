import React from "react";
import { Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { ContactRoutes } from "../../services";
import { IContact } from "../../services";
import { useAppContext } from "components/contexts/app-context";

interface IState {
  messageSent: boolean;
  error?: string;
  message: IContact;
}

export default () => {
  const [, , ajax] = useAppContext();
  const [contact, setContact] = React.useState({
    messageSent: false,
    message: {},
  } as IState);

  const setField = <P extends keyof IContact>(name: P, value: string) => {
    setContact((state) => {
      return {
        ...state,
        message: {
          ...state.message,
          [name]: value,
        },
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    if (
      contact.message.email &&
      contact.message.firstName &&
      contact.message.lastName &&
      contact.message.subject &&
      contact.message.body
    ) {
      ajax.post(ContactRoutes.submit(), contact.message).then(() => {
        setContact({
          ...contact,
          messageSent: true,
          error: undefined,
        });
      });
    } else {
      setContact({
        ...contact,
        messageSent: false,
        error: "Required fields must be provided before submitting.",
      });
    }
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm="12">
          {contact.messageSent ? (
            <Alert variant="success">
              Thanks! Your message has been successfully sent.
            </Alert>
          ) : null}
          {contact.error ? (
            <Alert variant="danger ">{contact.error}</Alert>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <h1>Contact Us</h1>
          <div>
            <span className="bold">Please contact us if you:</span>
            <ul>
              <li>
                Wish to register for one of our online meetings or seminars
              </li>
              <li>Need a bible</li>
              <li>Would like free bible literature</li>
            </ul>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <InputGroup>
                <Form.Label>Name:</Form.Label>
                <span className="red">*&nbsp;</span>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="first"
                  onChange={(e) => setField("firstName", e.target.value)}
                />
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="last"
                  onChange={(e) => setField("lastName", e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <Form.Label>Email:</Form.Label>
                <span className="red">*&nbsp;</span>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="your.email@host.com"
                  onChange={(e) => setField("email", e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <Form.Label>Subject:</Form.Label>
                <span className="red">*&nbsp;</span>
                <Form.Control
                  type="text"
                  name="subject"
                  onChange={(e) => setField("subject", e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <Form.Label>Message:</Form.Label>
                <span className="red">*&nbsp;</span>
                <Form.Control
                  as="textarea"
                  name="body"
                  onChange={(e) => setField("body", e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <Button type="submit">Submit</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={4}>
          <aside id="text-3" className="widget widget_text">
            <h3 className="widget-title">The Victoria Christadelphians</h3>
            <div className="textwidget">
              <p>
                <strong>OUR ADDRESS:</strong>
                <br />
                1396 McKenzie Avenue
                <br />
                Victoria BC, Canada, V8P 2M3
              </p>
              <p>
                <strong>OUR PHONE:</strong>
                <br />
                250.477.2112
              </p>
            </div>
          </aside>
        </Col>
      </Row>
    </React.Fragment>
  );
};
