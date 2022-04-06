import React from "react";
import Header from "../components/Header";

function Layout(props) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
