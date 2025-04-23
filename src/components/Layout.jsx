import React from "react";
import Navbar from "./NavBar";

const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="page-container">{children}</main>
    </>
  );
};

export default Layout;
