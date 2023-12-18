import { useState } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const isLogged = useSelector((state) => state.userLogin?.isLogged);

  const modalTimeout = () => {
    setModalShow(true);
    setTimeout(() => {
      setModalShow(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAction(e, user, navigate, modalTimeout));
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div id="signUpPage_container">
      <Container className="text-center p-5">
        <Row className="justify-content-center">
          {isLogged && (
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="xl" className="modal_isCreated">
              <Modal.Body className="bg-transparent modal_isCreated_body">
                <h1>Benvenuto {user.username}</h1>
              </Modal.Body>
            </Modal>
          )}
          <Col xs={12} md={6}>
            <h2 className="text-black text-center fw-bold">Connettiti</h2>
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
              <Button variant="primary" type="submit" className="rounded-pill">
                Accedi
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
