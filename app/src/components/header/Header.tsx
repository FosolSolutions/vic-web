import React from "react";
import "./Header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useCookies } from "react-cookie";
import Constants from "../../settings/Constants";
import IdentityContext from "../../contexts/identity";

export default () => {
  const history = useHistory();
  const location = useLocation();
  const [identity, setIdentity] = React.useContext(IdentityContext);
  const [, , removeCookie] = useCookies(Constants.cookieName);
  const logout = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    removeCookie(Constants.cookieName);
    setIdentity((s) => {
      return {
        ...s,
        isAuthenticated: false,
      };
    });
    history.push("/login");
  };
  return (
    <>
      {location.pathname !== "/login" ? (
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
                  {identity.isAuthenticated ? (
                    <li>
                      <Link to="/admin/pages" title="admin">
                        <FontAwesomeIcon icon={faCog} />
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    {identity.isAuthenticated ? (
                      <Link to="/" title="logout">
                        <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
                      </Link>
                    ) : (
                      <Link to="/login" title="login">
                        <FontAwesomeIcon icon={faSignInAlt} />
                      </Link>
                    )}
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </header>
      ) : null}
    </>
  );
};
