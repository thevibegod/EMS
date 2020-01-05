import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../Images/logo.png';
import {Navbar,Nav} from 'react-bootstrap';

export default function MyNavbar({userName,killLogin}){
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
            <Link className="nav-link" style={{color : 'white'}} to={"/admindashboard"}>Create User</Link>
            <Link className="nav-link" to={"/deleteuser"} style={{color : 'white'}}>Delete User</Link>
          </Nav>
        </Navbar.Collapse>
        <span className="navbar-text mr-2" style={{color : 'white'}}>{`Hello ${userName}`}</span>
        <Link className="btn btn-outline-danger" to = {"/"}  onClick={killLogin}> Logout </Link>
        </Navbar>
  )
}
