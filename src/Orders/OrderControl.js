import React from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';


export default function OrderControl (props) {
   const { name, price, company, img} = props.order;

    const handleDelete = id => {
        fetch(`https://mobilemaya-server-production.up.railway.app/orderControl/${id}`, {method:"DELETE"})
            .then(res => res.json())
            .then(data => {alert("Order Canceled")})
    }


    //css
    const ColBg = {backgroundColor:"#f1f1f1", padding:"1rem", borderRadius:".5rem"}
    const tableBg = {backgroundColor:"#fff", borderCollapse: "collapse"}
    const titleBtn = { color:"white", backgroundColor:"#00d369f6", border:"none", fontWeight:"500"};

    return (
        <div>
            <Container style={{marginTop:"8%"}}>
                <Row className="justify-content-center">
                    <Col style={ColBg} md={8}>
                        <Card.Title className="text-center mb-4">YOUR ORDERS</Card.Title>
                            <Table hover size="sm" style={tableBg}>
                            <thead><tr><th>Photo</th> <th>Name</th><th>Company</th><th>Price</th></tr> </thead>
                            <tbody><tr><td><img style={{width:"3rem"}} src={img} alt=""/></td><td>{name}</td><td>{company}</td><td>{price}</td></tr> </tbody>
                            </Table>
                            <Button onClick={()=>handleDelete(props.order._id)} style={titleBtn}>Cancel Order</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
