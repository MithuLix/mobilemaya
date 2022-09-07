import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Table, Card, Spinner } from "react-bootstrap";
import MobileManager from "./MobileManager";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [deletes, setDeletes] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    fetch('https://mobilemaya-server-production.up.railway.app/mobiles')
      .then((res) => res.json())
      .then((data) => {  setDeletes(data);  setSpinner(false)})}, []);

  //css
  const ColBg = { backgroundColor: "#f1f1f1", padding: "1rem",  borderRadius: ".5rem",};
  const tableBg = { backgroundColor: "#fff" };

  return (
    <div>
      <Container style={{ marginTop: "8%" }}>
        <Row className="justify-content-center">
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={7} style={ColBg}>
            <Card.Title className="text-center mb-4">MOBILE MANAGER </Card.Title>
            <Table id="tableId" striped bordered hover size="sm" style={tableBg}>
              <thead> <tr><th>Name</th> <th>Price</th><th>Action</th></tr> </thead>
              <tbody> {deletes.map(item =>  <MobileManager key={item._id} item={item}></MobileManager>)}  </tbody>
            </Table>
            <Container className="row g-4 mt-3">
                {spinner && (<div className="text-center"><Spinner animation="border" variant="success" /> </div> )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
