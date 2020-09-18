import React from "react";
import "./Events.css";
import { Oauth } from "../../services/ajax";
import { PagesRoutes, IPage } from "services";

export default () => {
  const [html, setHtml] = React.useState({ __html: "" });
  React.useEffect(() => {
    Oauth.get(PagesRoutes.getForPath("/events")).then(async (response) => {
      const page = (await response.json()) as IPage;
      setHtml({ __html: page.body });
    });
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={html}></div>
    </>
  );
};
