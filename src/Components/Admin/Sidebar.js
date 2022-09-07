import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { faPencilAlt, faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


export default function Sidebar() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    //css
    const linkUnderline= {textDecoration: "none", color:"inherit"};
    const sidebar = {backgroundColor:"#2eb670f6", color:"#fff", borderRadius:".5rem" }
    const title = {textAlign:"center", marginBottom:"3rem"}
    const text = {backgroundColor:"#64c091", padding:".3rem 1rem", borderRadius:".3rem", marginBottom:'1rem'}

    return (
        <div>
            <Card style={sidebar}>
                <Card.Body>
                    <Card.Title style={title}>MOBILE MAYA</Card.Title>
                    <Link to="/admin" style={linkUnderline}><Card.Text style={text}><FontAwesomeIcon icon={faThLarge}/>&nbsp; Mobile Manager</Card.Text></Link>
                    <Link to="/addMobile" style={linkUnderline}><Card.Text style={text}><FontAwesomeIcon icon={faPlus}/>&nbsp; Add Mobile</Card.Text></Link>
                    <Link to="/admin" style={linkUnderline}><Card.Text style={text}><FontAwesomeIcon icon={faPencilAlt}/>&nbsp; Edit Mobile</Card.Text></Link>
                </Card.Body>
            </Card> 
        </div>
    );
};
