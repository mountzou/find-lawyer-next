'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaRobot } from 'react-icons/fa';

const NavbarUI = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        className={'fixed-top navbar-blur'} 
        expanded={isNavbarOpen}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} className="order-lg-last order-1" />
          
          <Navbar.Brand as={Link} href="/" className="order-lg-first order-2 ms-auto">
            <strong>upLawyer<sub><small>beta</small></sub></strong>
          </Navbar.Brand>
          
          <Navbar.Collapse id="basic-navbar-nav" className="order-3">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/dikigoroi">Δικηγόροι</Nav.Link>
              <Nav.Link as={Link} href="/dikigorikoi-syllogoi">Δικηγορικοί Σύλλογοι</Nav.Link>
              <Nav.Link as={Link} href="/blog">Αρθρογραφία</Nav.Link>
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              <Link href="/ai-assistant" passHref legacyBehavior>
                <a className="btn btn-outline-dark nav-btn">
                  <FaRobot className="mb-1 me-2" /> AI βοηθός
                </a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Optional: This div can be used to apply a blur effect to the main content when the navbar is open */}
      <div className={`main-content ${isNavbarOpen ? 'blur-background' : ''}`}>
        {/* Your main page content goes here */}
      </div>
    </>
  );
};

export default NavbarUI;
