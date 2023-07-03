import jwtDecode from "jwt-decode";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  let decoded;
  if(token){
     decoded = jwtDecode(token)
  }

  const logoutHandler = () => {
    sessionStorage.clear()
    navigate("/")
  }
  

  return (
    <>
      <Container>
        <Row className="justify-content-around">
          <Col>
            <div onClick={() => navigate("/")}>REACT</div>
          </Col>
          {token ? (
            <>
            <Col>
              <div>HOLA, {decoded?.name}</div>
            </Col>
            <Col>
            <div onClick={()=>logoutHandler()}>LOGOUT</div>
          </Col>
          </>
          ) : (
            <Col>
              <div onClick={() => navigate("/login")}>LOGIN</div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
