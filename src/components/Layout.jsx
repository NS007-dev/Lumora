import React from "react";
import Navbar from "./NavBar";

const Layout = ({ children, isDarkMode, toggleDarkMode, theme, setTheme }) => {
  return (
    <>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="page-container">{children}</main>
    </>
  );
};

export default Layout;
