import { Link } from 'react-router-dom';
import { twilioAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    twilioAuth.signout(() => {
      navigate('/');
    });
  };

  return (
    <div class="container justify-content-center">
       <Image 
            src="/logo.png" 
            height='180px'
            width='458px'    
          />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Soapbox Caddie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {twilioAuth.isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/protected1">In Home Laundry Service</Nav.Link>
                  <Nav.Link as={Link} to="/protected2">Pickup/Dropoff Laundry Service</Nav.Link>
                </>
              ) : null}
            </Nav>
            {twilioAuth.isAuthenticated ? (
              <Button variant="outline-primary" onClick={handleSignOut}>Sign out</Button>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container  className="mt-4">
        {children}
      </Container>
    </div>
  );
}