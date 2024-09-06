import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1>Welcome to My Next.js App</h1>
          <p>This is a simple home page using React Bootstrap components.</p>
          <Button variant="primary" href="#learn-more">
            Learn More
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
