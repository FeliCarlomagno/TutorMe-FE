import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { loginAction } from "../redux/actions";
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
    dispatch(loginAction(e, user, navigate));
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

              <Button
                variant="primary"
                type="submit"
                className="rounded-pill mb-2"
                onClick={() => {
                  setTimeout(props.onHide, 1000);
                }}
              >
                Accedi
              </Button>
              <p className="mb-0">
                Non hai ancora un account?
                <Link to="/signup" className="text-decoration-none fs-6 ">
                  <span
                    onClick={() => {
                      props.onHide();
                    }}
                    className="ms-1"
                  >
                    Iscriviti
                  </span>
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
