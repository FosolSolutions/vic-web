import React from "react";
import { usePage } from "../../hooks";

export default () => {
  const page = usePage("/seminars");
  return (
    <>
      <div dangerouslySetInnerHTML={page}></div>
    </>
  );
};
