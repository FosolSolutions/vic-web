import React from "react";
import "./Events.css";
import { usePage } from "../../hooks";

export default () => {
  const page = usePage("/events");
  return (
    <>
      <div dangerouslySetInnerHTML={page}></div>
    </>
  );
};
