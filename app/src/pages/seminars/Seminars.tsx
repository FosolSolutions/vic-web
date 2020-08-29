import React from "react";
import { useAppContext } from "components/contexts/app-context";
import { PagesRoutes, IPage } from "services";

export default () => {
  const [, , ajax] = useAppContext();
  const [html, setHtml] = React.useState({ __html: "" });
  React.useEffect(() => {
    ajax.get(PagesRoutes.getForPath("/seminars")).then(async (response) => {
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
