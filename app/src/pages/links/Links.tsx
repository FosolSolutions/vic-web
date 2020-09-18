import React from "react";
import "./Links.css";
import { usePage } from "../../hooks";

export default () => {
  const page = usePage("/links");
  return (
    <>
      <div dangerouslySetInnerHTML={page}></div>
    </>
  );
};
