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
      <div class="container">
        <hr/>
        <center><Image
          src="/logo.PNG"
          height='180px'
          width='458px'
        /></center>
        <header class="d-flex   py-3 mb-4 border-bottom" >
          <ul class="nav nav-pills">
            <li class="nav-item"><a href="/" class="nav-link active" aria-current="page">Home</a></li>
            {twilioAuth.isAuthenticated ? (
              <li class="nav-item"><a href="/login" class="nav-link">SignOut</a></li>
            ) : (
              <li class="nav-item"><a href="/login" class="nav-link">Schedule a Caddie</a></li>
            )}
            <li class="nav-item"><a href="#pricing" class="nav-link">Pricing</a></li>
            <li class="nav-item"><a href="#faqs" class="nav-link">FAQs</a></li>
          </ul>
        </header>
      </div>
      <center>      
        <Container>
        {children}
      </Container>
      </center>
    </div>
  );
}