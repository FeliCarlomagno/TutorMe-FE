import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SET_USER_INFORMATION } from "../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({
          type: SET_USER_INFORMATION,
          payload: user,
        });
        navigate("/");
        alert("Richiesta eseguita correttamente");
      } else {
        alert("Qualcosa è andato storto");
      }
    } catch (error) {
      alert("errore Fatale", error);
    }
  };

  return (
    <div id="signup_container">
      <Container className="p-5 m-5">
        <Row className="justify-content-center left_row_Signup">
          <Col className="d-flex flex-column justify-content-center p-5">
            <h1>Dare lezioni Fare crescere gli allievi</h1>
            <p>
              TutorMe ti offre la possibilità di condividere le tue conoscenze e insegnare
              in oltre 500 materie diverse. Che tu sia uno studente, un autodidatta, un
              diplomato o un laureato, accogliamo con entusiasmo tutti i profili di
              appassionati. Sia che tu sia esperto in lingue, sport, musica, arte, tempo
              libero o sostegno scolastico, c'è spazio per te su <span>TutorMe.</span>
              Unisciti a noi e inizia a dare lezioni private nella materia che ami!
            </p>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center">
            <Card style={{ width: "20em" }} className="py-3 px-2 border-0 shadow">
              <Card.Body>
                <h2 className="text-center">Crea il tuo account</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={user.name}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                      className="signup_form_control"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUsurname">
                    <Form.Control
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
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="d-block mx-auto rounded-pill "
                  >
                    Submit
                  </Button>
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
