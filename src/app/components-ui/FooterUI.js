// src/components/FooterUI.js
'use client';

import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FooterUI() {
  return (
    <footer className="bg-light mt-5 fixed-bottom navbar-blur">
      <Container>
        <Row className="align-items-center flex-column-reverse flex-md-row">
          <Col className="text-center text-md-start">
            <p className="m-0 py-3">
              © 2024 upLawyer. Με επιφύλαξη παντός νόμιμου δικαιώματος.
            </p>
          </Col>
          <Col className="text-center text-md-end">
            {/* Convert anchor tags to Next.js Link components */}
            <Link href="/privacy-policy" passHref legacyBehavior>
              <a className="me-3 text-decoration-none">Πολιτική Απορρήτου</a>
            </Link>
            <Link href="/terms-and-conditions" passHref legacyBehavior>
              <a className="me-3 text-decoration-none">Όροι και Προϋποθέσεις</a>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <a className="text-decoration-none">Επικοινωνία</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterUI;
