import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function BaggageForm({ onNext }) {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login3');
  };


  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBags">
            <Form.Label>Number of Bags</Form.Label>
            <Form.Control type="number" placeholder="Enter number of bags" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </Form>
    </Container>
  );
}

export default BaggageForm;