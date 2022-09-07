import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import googleIcon from '../images/fi-snsuxl-google-logo.svg';
import { Col, Container, Row, Form, Button, Card, ButtonGroup} from 'react-bootstrap';
// firebase imported files
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './FirebaseConfig';
import { Link } from 'react-router-dom';
if(firebase.apps.length === 0){ firebase.initializeApp(firebaseConfig);}



export default function Login () {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({ isSignedIn : false, name:'', email:'', photo:'', error:'', success:false});
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" }};

  //Usual login/out method
const handleBlur = (e) => {
  let isFieldValid = true;
  if (e.target.name === "email") {
  isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  }
  if(e.target.name === 'password') {
  const isPasswordValid = e.target.value.length > 6;
  const passwordHasNumber = /\d{1}/.test(e.target.value);
  isFieldValid = isPasswordValid && passwordHasNumber;
  }
  if(isFieldValid) {
  const newUserInfo = {...user}
  newUserInfo[e.target.name]  = e.target.value;
  setUser(newUserInfo);
  }
}
const handleSubmit = (e) => {
  if (newUser && user.email && user.password){ 
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      updateUserName(user.name);
      history.push(from);
    })
    .catch((error) => { 
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    })
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
    })
    .catch((error) => { 
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    })
  }
  e.preventDefault();
}

// updateUserInfo
const updateUserName = name => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName:name
  }).then(() => {})
.catch((error)=> {console.log(error)})
}

const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token', idToken);
  }).catch(function(error) {console.log(error);});
}



//Google sign in/out provider
const GoogleSignIn =()=> {
  var GoogleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(GoogleProvider)
  .then(res=> {
    const {displayName, photoURL, email} = res.user;
    const signedInUser = {isSignedIn:true, name:displayName, email:email, photo:photoURL}
    setLoggedInUser(signedInUser);
    history.replace(from);
  })
  .catch((error) => { console.log(error.message)})
}

  //css
  const linkCss = {textDecoration:"none", color:"#00d369f6", cursor:"pointer"};
  const InputCss ={backgroundColor:"#f1f1f1", borderRadius:".2rem", padding:"1rem"};
  const titleBtn = {textDecoration: 'inherit', color:"white", backgroundColor:"#00d369f6", border:"none", fontWeight:"500"};
  const or = {textAlign:"center", borderBottom: "1px solid #b4b4b4",lineHeight: "0.1rem",margin: "10px 0 20px" }
  const span = { background:"#f1f1f1",padding:"0 10px"};
  const socialBtn = { width:"1.5rem", backgroundColor:"#fff", borderRadius:"50%"}
  const SocialCol ={backgroundColor:"#00d369f6", borderRadius:".2rem", textAlign:"center", cursor:"pointer", color:"#fff",
                    padding:".3rem", margin:"0 1rem", border:"none"}
    


    return (
        <div>
          <Container style={{marginTop:"8%"}}>
              <Row className="justify-content-center">
                  <Col md={4} style={InputCss}>
                    <Form onSubmit={handleSubmit}>
                      <Card.Title className="text-center mb-3">{newUser ? 'CREATE ACCOUNT' : 'LOGIN'}</Card.Title>
                      <Form.Group controlId="formBasicEmail formBasicPassword">
                          {newUser && <Form.Control onBlur={handleBlur} className="mb-3" name="name"  type="text" placeholder="Your full name" required/>}
                          <Form.Control onBlur={handleBlur} className="mb-3" name="email" type="text" placeholder="Enter email" required/>
                          <Form.Control onBlur={handleBlur} className="mb-3" name="password" type="password" placeholder="Password" required/>
                      </Form.Group>

                      {!newUser ?
                      <Row className=" gap-4 mb-2">
                          <Col><Form.Check type="checkbox" label="Remember me" /></Col>
                          <Col><Link to="*" ><Form.Label style={linkCss}>Forget password?</Form.Label></Link></Col>
                      </Row> : ''}

                      <ButtonGroup className="d-grid gap-2 mb-2">
                          <Button type="submit" size="md"  style={titleBtn}>{newUser ? 'Sign up' : 'Sign in'}</Button>
                      </ButtonGroup>
                      <Row>
                        <Col> <Card.Text className="text-center mb-3">{newUser ? 'Already have account?' : "Don't have account?"}</Card.Text></Col>
                        <Col><Card.Text className="text-center mb-3" onClick={()=> setNewUser(!newUser)} style={linkCss} htmlFor="newUser" name="newUser">
                          {newUser ? "Sign in account." : 'Create an account.' } </Card.Text></Col>
                      </Row>
                    </Form>

                    <Card.Text style={or}><span style={span}>{newUser ? 'Sign up with' : 'Sign in with'}</span></Card.Text>
                      <Row className="gap-3 text-center">
                        <Col onClick={GoogleSignIn} style={SocialCol} className="btn btn-success"><img src={googleIcon} style={socialBtn} alt=""/> &nbsp; Continue with Google</Col>
                      </Row>
                      <Card.Text style={{color:"red"}} className="text-center mt-3">{user.error}</Card.Text>
                      {user.success && <Card.Text style={{color:"green"}} className="text-center mt-3">User {newUser ? 'created' : 'Logged In'}  successfully</Card.Text>}
                  </Col>
              </Row>
          </Container>
        </div>
    );
};
