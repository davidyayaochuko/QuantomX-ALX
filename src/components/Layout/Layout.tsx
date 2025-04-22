import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type Props = { children: React.ReactNode };
export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <LinkContainer to="/register">
            <Navbar.Brand>QuantumX Dashboard</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
              <LinkContainer to="/structure"><Nav.Link>Structure</Nav.Link></LinkContainer>
              <LinkContainer to="/branding"><Nav.Link>Branding</Nav.Link></LinkContainer>
              <LinkContainer to="/invites"><Nav.Link>Invites</Nav.Link></LinkContainer>
              <LinkContainer to="/workspace-config"><Nav.Link>Workspace Config</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
