import { Container, Row, Col , Image , Button} from 'react-bootstrap';

export default function Home() {
  return (
    <div class='container bg-transparent'  >
      <Container >
        <Row>
          
          <Col>
            <h1>Welcome to the Soapbox Caddie</h1>
            <p>Choose Peace. Not Laundry.</p>
           
            <hr/>
          </Col>
          <hr/>
          <Image 
            src="/bannerworks.PNG"     
          />
        </Row>
      </Container>
    </div>
  );
}