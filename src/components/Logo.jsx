import React from "react";
import logo from "../logo.webp";

function Logo({ height, width }) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ height: height, width: width }} />
    </div>
  );
}

export default Logo;
