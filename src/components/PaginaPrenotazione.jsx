import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PaginaPrenotazione = () => {
  const user = useSelector((state) => state.userLogin.userLogin);
  const params = useParams();
  console.log("parametro ricevuto", params);
  console.log("user che prenota", user?.username);

  const [prenotazione, setPrenotazione] = useState({
    descrizionePrenotazione: "",
    dataPrenotazione: null,
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/effettuaPrenotazione/${params.annuncio}/${user.username}`,
        {
          method: "POST",
          body: JSON.stringify(prenotazione),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const data = await response;
      if (response.ok) {
        alert("tutto ok");
      } else {
        alert("Qualcosa non va bene");
        console.log(data);
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            Ciao
          </Col>
          <Col>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body>
                <h2>Organizza</h2>
                <p>la tua prima lezione con NOME PROF E CREATORE DELL'ANNUNCIO</p>
                <Form onSubmit={handelSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Aggiungi una breve presentazione su di te</Form.Label>
                    <Form.Control
                      className="border-0 shadow-sm"
                      type="text"
                      as="textarea"
                      rows={5}
                      placeholder="Presentati "
                      onChange={(e) => {
                        setPrenotazione({
                          ...prenotazione,
                          descrizionePrenotazione: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="fs-6">
                      Aggiungi una breve presentazione su di te
                    </Form.Label>
                    <Form.Control
                      className="border-0 shadow-sm"
                      type="date"
                      onChange={(e) => {
                        setPrenotazione({
                          ...prenotazione,
                          dataPrenotazione: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaPrenotazione;
