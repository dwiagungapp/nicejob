import React from "react";
import Footer from "./Footer";
import NavbarJobVacancy from "../beranda/NavbarJobVacancy";

const LayoutJobVacancy = (props) => {
  return (
    <>
      <NavbarJobVacancy />
      <div className="row">
        <div>{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutJobVacancy;