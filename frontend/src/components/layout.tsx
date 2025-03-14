import React from "react";
import { Outlet } from "react-router";
import Header from "./header";
import { Container } from "react-bootstrap";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
