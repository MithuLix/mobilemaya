import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Form, Button} from 'react-bootstrap';
import { UserContext } from '../../App';
import './Home.css';
import Mobiles from '../Mobiles/Mobiles';


export default function Home() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [mobiles, setMobiles] = useState([]);
    const [spinner, setSpinner] = useState(true);


    //get mobiles
    useEffect(() => {
        fetch('https://mobilemaya-server-production.up.railway.app/mobiles')
        .then(res => res.json())
        .then(data => { setMobiles(data); setSpinner(false)})},[]);
    
    //css
    const titleBtn = {textDecoration: 'inherit',border:"none", backgroundColor:"#00d369f6", fontWeight:"500", color:"#fff", marginLeft:"-3rem", borderRadius:"0 .3rem .3rem 0"}
    const input = {outline:"0 none", boxShadow: "0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6)"}
    
    return (
        <div>
            <Container style={{marginTop:"7%"}}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Form.Group controlId="formBasicEmail" className="d-flex">
                                <Form.Control style={input} type="text" placeholder="search product" />
                                <Button style={titleBtn}>Search</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container className="row g-4 mt-3">
                    {spinner && <div className="text-center"> <Spinner animation="border" variant="success" /></div>}
                </Container> 

                <Container> 
                    <Row className="justify-content-center">
                        <Col id="mobiles" md={8}>
                            { mobiles.map(mobile => <Mobiles mobile={mobile} key={mobile._id}></Mobiles>)}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

