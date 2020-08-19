import React from "react";

export default () => {
  return (
    <div>
      <h1>Donate</h1>
      <img
        alt="e-transfer"
        width="130px"
        src={
          process.env.PUBLIC_URL + "/images/Interac_e-Transfer_logo-300x133.png"
        }
      />
      <p>
        Donations may be made electronically via Interac E-Transfer to&nbsp;
        <a href="mailto:donate@victoriachristadelphians.com">
          donate@victoriachristadelphians.com
        </a>
        .
      </p>
      <p>
        Alternatively, mail a cheque made out to “
        <span className="bold">Victoria Christadelphian Ecclesia</span>” to the
        address below.
      </p>
      <h3>Address</h3>
      <p>
        1396 McKenzie Avenue <br />
        Victoria BC, Canada, V8P 2M3
      </p>
    </div>
  );
};
