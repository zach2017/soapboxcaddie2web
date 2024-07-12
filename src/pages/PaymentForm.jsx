import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PaymentForm2({ onSubmit }) {

  
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };


  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formExpiration">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control type="text" placeholder="MM/YY" />
          </Form.Group>

          <Form.Group as={Col} controlId="formCVV">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="CVV" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formNameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control type="text" placeholder="Enter name on card" />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={handleNext}>
          Submit Payment
        </Button>
      </Form>
    </Container>
  );
}

export default PaymentForm2;