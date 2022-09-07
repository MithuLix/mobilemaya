import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Container, Row, Col, Card, Form, ButtonGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';



export default function PlaceOrder () {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    const {id} = useParams();
    const [order, setOrder] = useState([])

    useEffect(() => {
        fetch('https://mobilemaya-server-production.up.railway.app/mobile/' + id)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    const onSubmit = data => {
        const orders = {...loggedInUser, shipment: data, orders: order, date: new Date()}
        fetch('https://mobilemaya-server-production.up.railway.app/placeOrder', {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(orders)
        })
    }

    //css
    const formBg = { backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: ".5rem" }
    const titleBtn = { textDecoration: 'inherit', color: "white", backgroundColor: "#00d369f6", border: "none", fontWeight: "500", width: "100%" };
    const linkUnderLine = {textDecoration:"none"}


    return (
        <div>
            <Container style={{ marginTop: "8%" }}>
            <Row className="justify-content-center">
                    <Col md={5} style={formBg}>
                        <Card.Title className="text-center">ENTER DETAILS TO ORDER</Card.Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group>
                                <Form.Control name="name" ref={register({ required: true })} className="mb-2" placeholder="Enter full name"/>
                                <Form.Control name="email" ref={register({ required: true })} className="mb-2" placeholder="Enter your email"/>
                                <Form.Control name="mobile"  ref={register({ required: true })} className="mb-2" placeholder="Enter mobile number"/>
                                <Form.Control name="address" ref={register({ required: true })} className="mb-2" placeholder="Enter shipping address"/>
                            </Form.Group>
                            <ButtonGroup>
                               <Link to="/orders" style={linkUnderLine}><Button type="submit" style={titleBtn}>Enter your details</Button></Link> 
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

