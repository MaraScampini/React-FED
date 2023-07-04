import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { errorCheck } from "../../services/useful";
import './Login.css'
import { TextInput } from "../../common/TextInput/TextInput";

export const Login = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    email: "",
    password: "",
    credentials: ""
  })

  const [logged, setLogged] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    logUser(userCredentials).then((res) => {
      sessionStorage.setItem("token", res.token);
      setLogged(true);
    })
    .catch(error => {console.log(error)
      let errorMessage = error.response.data.message
    setUserError((prevState) => ({
      ...prevState,
      credentials: errorMessage
    }))
    })
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
              {userError.credentials ? (<div>{userError.credentials}</div>) : (<div></div>)}
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <TextInput
                  type={"email"}
                  name={"email"}
                  placeholder={"Enter your email"}
                  design={userError.email ? ("errorInput") : ("")}
                  state={setUserCredentials}
                  errorState={setUserError}
                  password1={""}
                />
                {/* <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className={userError.email ? ("errorInput") : ("")}
                  onChange={(e) => inputHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                /> */}
                {userError.email ? (<div>{userError.email}</div>) : (<div></div>)}
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                {/* <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={userError.password ? ("errorInput") : ("")}
                  onChange={(e) => inputHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                /> */}
                <TextInput
                  type={"password"}
                  name={"password"}
                  placeholder={"Enter your password"}
                  design={userError.password ? ("errorInput") : ("")}
                  state={setUserCredentials}
                  errorState={setUserError}
                  password1={""}
                />
                {userError.password ? (<div>{userError.password}</div>) : (<div></div>)}
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
