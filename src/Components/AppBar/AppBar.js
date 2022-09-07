import React, { useContext } from "react";
import logo from "../images/logo.png";
import { Navbar,Nav, Button } from 'react-bootstrap';
import { UserContext } from "../../App";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppBar.css';
// firebase imported files
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "../Login/FirebaseConfig";
if(firebase.apps.length === 0){ firebase.initializeApp(firebaseConfig);}


export default function AppBar () {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const user = firebase.auth().currentUser;

    //css
    const brand = { width:"4rem"};
    const navbar = {position:"absolute", background:"transparent", boxShadow:"none",  width:"82%",};
    const titleChild = {fontWeight:"500", color:"#000", margin:".3rem 2rem 0 0"}
    const titleBtn = {textDecoration: 'inherit',border:"none",  backgroundColor:"#00d369f6", fontWeight:"500"}
    const nav = { marginLeft: 'auto'};
    const linkUnderLine = {textDecoration:"none"}
    const photoUrl = {width:"2rem", borderRadius:"50%", height:"2rem", outline:"0 none", marginLeft:"1rem",
                        boxShadow: "0 5px 5px #00000013 inset, 0 0 .5rem #2be007f8"};


    return(
        <div>
            <Container className="appbar">
                <div className="row">
                    <div className="col-md-12">
                        <Navbar style={navbar} expand="lg" sticky="top">
                            <Link to="/"><Navbar.Brand><img src={logo} style={brand} alt="logo"/></Navbar.Brand></Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto navXl" style={nav}>
                                <Link to="/home" style={linkUnderLine}><Nav.Item style={titleChild}>HOME</Nav.Item></Link>
                                <Link to="/orders" style={linkUnderLine}><Nav.Item style={titleChild}>ORDERS</Nav.Item></Link>
                                <Link to="/admin" style={linkUnderLine}><Nav.Item style={titleChild}>ADMIN</Nav.Item></Link>
                                <Link to="/deals" style={linkUnderLine}><Nav.Item style={titleChild}>DEALS</Nav.Item></Link>
                                {user ? <img src={user.photoURL} style={photoUrl} alt="idImage"/> : <Button style={titleBtn} href="/login" >LOGIN</Button>}
                            </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
             </Container>
        </div>
    ) 
}