import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner} from 'react-bootstrap';
import { UserContext } from '../App';
import OrderControl from './OrderControl';


export default function Orders () {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);
    const [orderControl, setOrderControl] = useState([]);
    useEffect(()=>{
        fetch('https://mobilemaya-server-production.up.railway.app/getOrders?email=' + loggedInUser.email)
        .then(res => res.json())
        .then(data => {
            setOrderControl(data)
            setSpinner(false)
        })
    },[loggedInUser.email]) 



    //css
    const formBg = { backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: ".5rem" }

    return (
        <div>
            <Container style={{ marginTop: "8%" }}>
                <Row className="justify-content-center">
                    <Col md={7} style={formBg}>
                        <Card.Title className="text-center"> {loggedInUser.name}  ,You have {orderControl.length} pending order.</Card.Title>
                        {orderControl.map(order => <OrderControl order={order}></OrderControl>)}
                        <Container className="row g-4 mt-3">
                            {spinner && <div className="text-center"> <Spinner animation="border" variant="success" /></div>}
                        </Container> 
                    </Col>
                </Row>
            </Container>
        </div>
    );
};