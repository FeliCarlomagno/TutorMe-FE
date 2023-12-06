import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { SET_LOGIN_INFORMATION } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LogIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const isLogged = useSelector((state) => state.userLogin?.isLogged);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: SET_LOGIN_INFORMATION,
          payload: data,
        });

        dispatch({
          type: "SET_IS_LOGGED",
        });
      } else {
        navigate("*");
      }
    } catch (error) {
      navigate("*");
    }
  };

  return (
    <>
      <Container>
        <Row className="d-flex text-center justify-content-center">
          {isLogged && <Alert> Accesso eseguito</Alert>}
          <Col>
            <h2 className="mb-5 text-black">Connettiti</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  className="border-0"
                  value={user.username}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      username: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="border-0"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </Form.Group>

              <p className="text-black">
                Non hai ancora un account?
                <Link to="/signup">
                  <span
                    className="text-decoration-none"
                    onClick={() => {
                      props.onHide();
                    }}
                  >
                    Iscriviti
                  </span>
                </Link>
              </p>

              <Button
                variant="primary"
                type="submit"
                className="rounded-pill"
                onClick={() => {
                  setTimeout(props.onHide, 1000);
                }}
              >
                Accedi
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
