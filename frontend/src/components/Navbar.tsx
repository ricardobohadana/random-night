import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const Links: React.FC<{ title: string; to: string }> = ({ title, to }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      setIsActive(true);
    }
  }, []);

  return (
    <Nav.Link active={isActive ? window.location.pathname === to : false}>
      <Link to={to} className="nav-link">
        {title}
      </Link>
    </Nav.Link>
  );
};

const AppNavbar: React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Links title="Início" to="/" />
            <Links title="Top Rated" to="/toprated" />
            <Links title="Most Popular" to="/mostpopular" />
          </Nav>
          <Nav className="m-auto">
            {/* <Links title="Random Night" to="/RandomNight"> */}
            <Button variant="outline">
              <Link to="/generate" className="nav-link">
                Random Night
              </Link>
            </Button>
            {/* </Links> */}
          </Nav>
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Type a movie or TV Show"
                className="m-1"
                aria-label="Search"
              />
              <Button variant="outline-success" className="m-1">
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
