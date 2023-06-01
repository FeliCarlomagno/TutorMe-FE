import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PaginaPrenotazione = () => {
  const user = useSelector((state) => state.userLogin.userLogin);
  const params = useParams();

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
      if (response.ok) {
        alert("tutto ok");
      } else {
        alert("Qualcosa non va bene");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h2>Organizza</h2>
            <p>la tua prima lezione con NOME PROF E CREATORE DELL'ANNUNCIO</p>
            <Form onSubmit={handelSubmit}>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Aggiungi una breve presentazione su di te</Form.Label>
                <Form.Control
                  type="text"
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
                <Form.Label>Aggiungi una breve presentazione su di te</Form.Label>
                <Form.Control
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaPrenotazione;
