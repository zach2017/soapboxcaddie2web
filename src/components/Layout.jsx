import { Link, NavLink  } from 'react-router-dom';
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
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {twilioAuth.isAuthenticated ? (
                <>
                  <NavLink className="nav-link" to="/">Home</NavLink>
                  <NavLink className="nav-link"  to="/protected1">Laundry Service</NavLink>
                  <NavLink className="nav-link" to="/protected2">Become a Caddie</NavLink>
                </>
              ) : null}
            </Nav>
            {twilioAuth.isAuthenticated ? (
              <Button variant="outline-primary" onClick={handleSignOut}>Sign out</Button>
            ) : (
              <NavLink className="nav-link"  as={Link} to="/login">Login</NavLink>
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