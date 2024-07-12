import { Link, NavLink } from 'react-router-dom';
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
      <div class="container">
        <center>
        <Container>
          {children}
        </Container>
      </center>
      </div>
  );
}