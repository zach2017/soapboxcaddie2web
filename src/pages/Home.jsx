import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to the Home Page</h1>
          <p>This is a simple authentication demo using Vite, React, and Bootstrap.</p>
        </Col>
      </Row>
    </Container>
  );
}