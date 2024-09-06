// src/app/dikigorikoi-syllogoi/LawAssociationsClient.js

'use client'; // Mark this file as a client component

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'; // Use Next.js's Link component

export default function LawAssociationsClient({ associations }) {
  return (
    <Container className="my-3">
      <Row className="mx-1">
        <h1 className="my-2">Δικηγορικοί Σύλλογοι</h1>
        <h5 className="mb-5">Η λίστα των διαθέσιμων δικηγορικών συλλόγων του upLawyer.</h5>
      </Row>
      <Row>
        {associations.map((association) => (
          <Col key={association.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="card-association">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-medium">{association.associationName}</span>
                  <Link href={`/dikigorikoi-syllogoi/${association.associationSlug}`} passHref>
                    <FaArrowRight className="text-black cursor-pointer association-arrow mx-3" />
                  </Link>
                </div>
                <div className="text-md fw-light mt-2">
                  <span>{association.lawyerCount} διαθέσιμοι δικηγόροι</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
