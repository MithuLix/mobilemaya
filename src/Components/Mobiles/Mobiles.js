import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

export default function Mobiles(props) {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, price, img, _id} = props.mobile;

    //css
    const CardsCol = {padding:"0%"}
    const titleBtn = { color:"white", backgroundColor:"#00d369f6", border:"none", fontWeight:"500"};
    const cards  ={width: "14rem",  height:" 16.2rem", lineHeight: ".4rem", border: "none",  boxShadow: ".2rem .2rem .3rem #e7e7e7, -.1rem -.2rem .3rem #f3f3f3"}
    const CardImg ={width: "7rem",  margin: ".2rem auto",}
    const cardBody = {marginTop:"-1rem"}

    return (
        <div>
            <Container style={{marginTop:"8%"}}>
                <Row>
                    <Col style={CardsCol}>
                        <Card style={cards}>
                            <Card.Img style={CardImg} variant="top" src={img} alt="Image not found"/>
                            <Card.Body style={cardBody}>
                            <Card.Title style={{fontSize:"1rem"}} className="text-between">{name}</Card.Title>
                            <Col className="d-flex justify-content-between mt-2">
                                <Card.Text className="mt-2">{price} Taka</Card.Text>
                               <Link to={`/checkout/${_id}`}><Button style={titleBtn} className="btn-sm mb-4"><FontAwesomeIcon icon={faCartPlus}/>&nbsp; Buy</Button></Link> 
                            </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
