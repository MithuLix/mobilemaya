import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';


export default function Checkout () {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {id} = useParams();
    const [mobile, setMobile] = useState({});
    const { name, price, company, img} = mobile;

    useEffect(() => {
        fetch('https://mobilemaya-server-production.up.railway.app/mobile/' + id)
            .then(res => res.json())
            .then(data => setMobile(data))
    }, [id])

    //css
    const ColBg = {backgroundColor:"#f1f1f1", padding:"1rem", borderRadius:".5rem"}
    const tableBg = {backgroundColor:"#fff", borderCollapse: "collapse"}
    const titleBtn = { color:"white", backgroundColor:"#00d369f6", border:"none", fontWeight:"500"};

    return (
        <div>
            <Container style={{marginTop:"8%"}}>
                <Row className="justify-content-center">
                    <Col style={ColBg} md={8}>
                        <Card.Title className="text-center mb-4">CHECKOUT</Card.Title>
                            <Table hover size="sm" style={tableBg}>
                            <thead><tr><th>Photo</th> <th>Name</th><th>Company</th><th>Price</th></tr> </thead>
                            <tbody><tr><td><img style={{width:"3rem"}} src={img} alt=""/></td><td>{name}</td><td>{company}</td><td>{price} Taka</td></tr> </tbody>
                            </Table>
                        <Link to={`/placeOrder/${id}`}><Button style={titleBtn}>Place Order</Button></Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
