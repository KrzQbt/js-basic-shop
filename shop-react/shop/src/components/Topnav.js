import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Topnav(){
        
    return(
    <Navbar bg="light" expand="lg">
        <Navbar bg="light" expand="lg">
        <Nav className="me-auto">

            <Nav.Link>
                <Link to="categories">
                    Categories
                </Link>
            </Nav.Link>
        </Nav>
        </Navbar>
    </Navbar>
    );
    
}

export default Topnav;
