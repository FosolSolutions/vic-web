import React from "react";
import "./Home.css";
import { Row, Col } from "react-bootstrap";
import { AdminPagesRoutes, IPage } from "services";
import { useAppContext } from "components/contexts/app-context";

export default () => {
  const [, , ajax] = useAppContext();
  const [html, setHtml] = React.useState({ __html: "" });
  React.useEffect(() => {
    ajax.get(AdminPagesRoutes.getForPath("/home")).then(async (response) => {
      const page = (await response.json()) as IPage;
      setHtml({ __html: page.body });
    });
  }, []);

  return (
    <>
      <Row>
        <Col sm={12} className="text-center">
          <img
            alt="Bible"
            className="img-fluid"
            src={
              process.env.PUBLIC_URL +
              "/images/arto-marttinen-small-cropped-text-1-1024x334.jpg"
            }
          />
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col sm={8} dangerouslySetInnerHTML={html}></Col>
        <Col sm={4}>
          <iframe
            title="Directions"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d42323.18268968333!2d-123.344714!3d48.471898!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f73db12906889%3A0x15d13f16bb60f696!2s1396%20McKenzie%20Ave%2C%20Victoria%2C%20BC%20V8P%202M3%2C%20Canada!5e0!3m2!1sen!2sus!4v1597861745461!5m2!1sen!2sus"
            width="400"
            height="300"
            style={{ border: 0 }}
            aria-hidden="false"
          ></iframe>
        </Col>
      </Row>
    </>
  );
};
