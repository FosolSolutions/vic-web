import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { AuthenticationContext } from "../authentication/AuthenticationContext";
import { useCookies } from "react-cookie";

export default () => {
  const [, , removeCookie] = useCookies("VicWeb");
  const identity = useContext(AuthenticationContext);
  const logout = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    identity.setUser({
      isAuthenticated: false,
    });
    removeCookie("VicWeb");
  };
  return (
    <header className="topbar header">
      <Container>
        <Row>
          <Col sm={12}>
            <ul className="social-network social-icons">
              <li>
                <a
                  className="waves-effect waves-dark"
                  href="https://www.facebook.com/victoriachristadelphians/"
                  title="Like me on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a
                  className="waves-effect waves-dark"
                  href="https://youtube.com/channel/UCGtl-CSoulrUZteWdfZ00Nw"
                  title="Subscribe to me on YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
              <li>
                {identity.user.isAuthenticated ? (
                  <Link to="/" title="logout">
                    <FontAwesomeIcon icon={faUser} onClick={logout} />
                  </Link>
                ) : (
                  <Link to="/login" title="login">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                )}
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
