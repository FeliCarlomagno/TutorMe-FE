import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IS_SIGNUP, SET_USER_INFORMATION } from "../redux/actions";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Singup = () => {
  const isSingup = useSelector((state) => state?.userSignUp);
  console.log(isSingup, "SONO IL VALORE DI ISsIGNUP", isSingup);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      console.log("FORM NON VALIDO!");
      e.stopPropagation();
    } else {
      console.log("FORM VALIDO");
      try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("PERCHE PASSO????");
          dispatch({
            type: SET_USER_INFORMATION,
            payload: user,
          });
          dispatch({
            type: IS_SIGNUP,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          navigate("*");
        }
      } catch (error) {
        navigate("*");
      }
    }

    setValidated(true);
  };

  return (
    <div id="signup_container">
      <Container className="p-4 m-4 h-100">
        {isSingup.isSignup && (
          <Modal show={modalShow} onHide={() => setModalShow(false)} size="xl" className="modal_isCreated">
            <Modal.Body className="bg-transparent modal_isCreated_body">
              <h1>Profilo Creato. Benvenuto {isSingup?.userSignUp?.name}</h1>
            </Modal.Body>
          </Modal>
        )}
        <Row className="justify-content-center left_row_Signup">
          <Col className="d-flex flex-column justify-content-evenly leftDiv_Signup rounded-4 mb-4">
            <h1 className="text-danger">Dare lezioni Fare crescere gli allievi</h1>
            <p>
              TutorMe ti offre la possibilità di condividere le tue conoscenze e insegnare in oltre 500
              materie diverse. Che tu sia uno studente, un autodidatta, un diplomato o un laureato, accogliamo
              con entusiasmo tutti i profili di appassionati. Sia che tu sia esperto in lingue, sport, musica,
              arte, tempo libero o sostegno scolastico, c'è spazio per te su <span>TutorMe.</span>
              Unisciti a noi e inizia a dare lezioni private nella materia che ami!
            </p>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center col_form_signup">
            <Card style={{ width: "20em" }} className="py-3 px-2 border-0 shadow rounded-4">
              <Card.Body>
                <h2 className="text-center fw-semibold mb-4">Crea il tuo account</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={user.name}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                      className="signup_form_control"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUsurname">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Username"
                      value={user.username}
                      onChange={(e) => {
                        setUser({ ...user, username: e.target.value });
                      }}
                      className="signup_form_control"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                      className="signup_form_control"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                      className="signup_form_control"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="d-block mx-auto rounded-pill "
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    Iscriviti
                  </Button>
                  <p className="text-center mt-2">
                    Hai già un account?
                    <Link to="/signupPage" className="text-decoration-none">
                      <span className="text-danger ms-1">Accedi</span>
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Singup;
