import React from "react";
import Footer from "./Footer";
import NavbarBeranda from "./NavbarBeranda";

const LayoutComponent = (props) => {
  return (
    <>
      <NavbarBeranda />
      <div className="row">
        <div>{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutComponent;