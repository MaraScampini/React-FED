import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [logged, setLogged] = useState(false);

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    logUser(userCredentials).then((res) => {
      sessionStorage.setItem("token", res.token);
      setLogged(true);
    });
  };

  useEffect(() => {
    if (logged) {
      navigate("/");
    }
  }, [logged]);

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={6}
            lg={4}
          >
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => inputHandler(e)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => inputHandler(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => submitHandler(e)}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
