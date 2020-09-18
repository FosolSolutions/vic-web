import React from "react";
import { usePage } from "../../hooks";

export default () => {
  const page = usePage("/conference");
  return (
    <>
      <div dangerouslySetInnerHTML={page}></div>
    </>
  );
};
