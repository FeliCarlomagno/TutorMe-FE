import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { firstLetterUpperCase } from "../redux/actions";

const PaginaPrenotazione = (props) => {
  const user = useSelector((state) => state.userLogin.userLogin);
  //const params = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [prenotazione, setPrenotazione] = useState({
    descrizionePrenotazione: "",
    dataPrenotazione: null,
    isBookedUp: false,
  });

  const annuncioStock = useSelector((state) => state.annuncioSelezionato.annuncioSelezionato);

  const templateParams = {
    username: firstLetterUpperCase(annuncioStock?.user?.username),
    email: props.selectedUser?.email,
    username_teacher: firstLetterUpperCase(user?.username),
    advertisment: annuncioStock.listaMaterie,
  };

  const sendEmail = () => {
    emailjs.send("service_tutorme_trial", "template_tutorme_trial", templateParams, "IVYu6FhHixUbS70t5").then(
      (response) => {
        console.log(response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/effettuaPrenotazione/${annuncioStock?.id}/${user.username}`,
        {
          method: "POST",
          body: JSON.stringify(prenotazione),
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setPrenotazione({ isBookedUp: true });
        sendEmail();
      } else {
        alert("Hai già prenotato questo annuncio!");
      }
    } catch (error) {
      alert("FATAL ERROR ", error);
    }
  };

  return (
    <>
      <div id="div_PaginaPrenotazione">
        <Container className="d-flex justify-content-evenly align-items-center h-100">
          {prenotazione.isBookedUp && (
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="xl" className="modal_isCreated ">
              <Modal.Body className="bg-transparent modal_isBookedUp_body text-dark ">
                <h1 className="text-center">Prenotazione effettuata</h1>
              </Modal.Body>
            </Modal>
          )}
          <Row>
            <Col xs={12} md={5}>
              <Card
                style={{ maxWidth: "18rem" }}
                className=" text-center rounded-4 border-0 shadow w-100 d-flex "
              >
                <Card.Body className="d-flex flex-column justify-content-evenly align-items-center">
                  <Card.Img
                    variant="top"
                    src="https://picsum.photos/200/200"
                    className=" p-1 py-3 img_Annuncio_selected "
                  />
                  <Card.Title>{annuncioStock?.user.name}</Card.Title>
                  <span className="text-danger">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0 shadow-sm rounded-4 bg-transparent">
                <Card.Body>
                  <h2>Organizza</h2>
                  <p>
                    la tua prima lezione con
                    <span className="text-danger ms-2">
                      {firstLetterUpperCase(annuncioStock?.user?.username)}
                    </span>
                  </p>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Label>
                        Presentati a
                        <span className="fw-bold ms-1">
                          {firstLetterUpperCase(annuncioStock?.user?.username)}
                        </span>{" "}
                        e specifica le tue necessità e difficoltà
                      </Form.Label>
                      <Form.Control
                        className="border-0 shadow-sm"
                        type="text"
                        as="textarea"
                        rows={5}
                        placeholder="Presentati..."
                        onChange={(e) => {
                          setPrenotazione({
                            ...prenotazione,
                            descrizionePrenotazione: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label className="fs-6">Aggiungi una breve presentazione su di te</Form.Label>
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
                    <div className="w-100 d-flex justify-content-center">
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        Prenota
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PaginaPrenotazione;
