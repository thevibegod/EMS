import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../Images/logo.png';

export default function MyNavbar({userName,status,lastSeen,killLogin}){
  return (
    <Navbar bg="dark" expand="sm">
    <Navbar.Brand className="text-primary">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '} EMS
    </Navbar.Brand>
    <Navbar.Toggle
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mr-auto" >
            <Link className="nav-link" style={{color : 'white'}} to={"/dashboard"}>Dashboard</Link>
            <Link className="nav-link" to={"/changelimits"} style={{color : 'white'}}>Set Limits</Link>
            <Link className="nav-link" to={"/viewdetails"} style={{color : 'white'}}>Previous Data</Link>
          </Nav>
        </Navbar.Collapse>
        <span className="navbar-text mr-2" style={{color : 'white'}}> {!lastSeen?`Device Status: ${status}`:`Device Status: ${status} Last seen: ${lastSeen}`}</span>
        <span className="navbar-text mr-2" style={{color : 'white'}}> {` Hello ${userName}`}</span>
        <Link className="btn btn-outline-danger" to = {"/"}  onClick={killLogin}> Logout </Link>
        </Navbar>
  )
}
