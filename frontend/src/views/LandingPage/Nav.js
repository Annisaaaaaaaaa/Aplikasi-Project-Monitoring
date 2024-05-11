import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../assets/img/logo.png';
import '../../Css/Home.css'
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router,
  Link 
} from "react-router-dom";

export const MyNav = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#home">
            {/* <img src={logo} alt="Logo"/> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"/>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#features" className={activeLink === 'features' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('features')}>Features</Nav.Link>
              <Nav.Link href="#project" className={activeLink === 'project' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('project')}>Project</Nav.Link>
            </Nav>
            <span className="navbar-text ml-auto">
            <button className="vvd"><Link to='/login' style={{ color: 'white' }}>LOGIN</Link> </button></span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
