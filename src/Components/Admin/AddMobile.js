import React, {  useState } from 'react';
import Sidebar from '../Admin/Sidebar';
import { Button, Container, Row, Col, Form, Card, ButtonGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
const axios = require('axios').default;



export default function AddMobile() {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null)
    const handleImage = (e) => {
        const imageData = new FormData();
        imageData.set('key','bfb6697942dc1322d12730fc343c43ee')
        imageData.append('image',e.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {console.log(error)});
    }

    const history = useHistory()
    const onSubmit = data => { const addMobile = { name: data.name, company: data.company, price: data.price, img: imageURL }
        if (imageURL) {
            fetch('https://mobilemaya-server-production.up.railway.app/addMobile', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addMobile)
            })
                .then(res => res.json())
                .then(data => { 
                    alert("Item added successfully")
                    history.push('/admin') 
                })
        }
    };

    //css
    const formBg = { backgroundColor: "#f1f1f1", padding: "1rem", borderRadius: ".5rem" }
    const titleBtn = { textDecoration: 'inherit', color: "white", backgroundColor: "#00d369f6", border: "none", fontWeight: "500", width: "100%" };
    const file = { width: "100%", border: "1px solid #f7fffb", borderRadius: ".3rem", backgroundColor: "#fff" }

    return (
        <div>
            <Container style={{ marginTop: "8%" }}>
                <Row className="justify-content-center">
                    <Col md={3}>
                        <Sidebar />
                    </Col>
                    <Col md={7} style={formBg}>
                        <Card.Title className="text-center">ADD MOBILE</Card.Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group>
                                <Form.Label className="mb-0"><strong>Mobile Company</strong></Form.Label>
                                <Form.Control name="company" ref={register({ required: true })} className="mb-2" placeholder="Enter company name"/>

                                <Form.Label className="mb-0"><strong>Mobile Name</strong></Form.Label>
                                <Form.Control name="name"  ref={register({ required: true })} className="mb-2" placeholder="Enter mobile name"/>

                                <Form.Label className="mb-0"  ><strong>Price</strong></Form.Label>
                                <Form.Control name="price" ref={register({ required: true })} className="mb-2" type="number" placeholder="Enter price in bdt"/>

                                <Form.Label className="mb-0" htmlFor="image" ><strong>Add Photo</strong></Form.Label>
                                <Form.Control name="img" onChange={handleImage} ref={register({ required: true })} className="mb-1" type="file" style={file}/>
                                {imageURL && <strong >Image uploaded successfully.</strong>}
                            </Form.Group>
                            <ButtonGroup>
                                <Button className="mt-3" type="submit" style={titleBtn}>Save to database</Button>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
