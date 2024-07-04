import { Container, Row, Col } from 'react-bootstrap';

export default function ProtectedPage2() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Protected Page 2</h1>
          <p>This is another protected page. You can only see this if you're authenticated.</p>
        </Col>
      </Row>
    </Container>
  );
}