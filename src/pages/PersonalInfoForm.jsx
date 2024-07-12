import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

function PersonalInfoForm({ onNext }) {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login2');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Personal Information</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" />
                  </Form.Group>

                  <Form.Group as={Col} md={3} controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" />
                  </Form.Group>

                  <Form.Group as={Col} md={3} controlId="formZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formCell">
                    <Form.Label>Cell Number</Form.Label>
                    <Form.Control type="tel" placeholder="(123) 456-7890" />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Row>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PersonalInfoForm;