import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
  return (
    <div>
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
