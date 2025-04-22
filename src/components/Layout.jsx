import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main style={{ paddingTop: "80px" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
