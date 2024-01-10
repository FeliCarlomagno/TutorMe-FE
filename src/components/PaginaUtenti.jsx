import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ANNUNCIO_SELEZIONATO,
  firstLetterUpperCaseAction,
  recensioniLezione,
  searchFetchedProfileAction,
} from "../redux/actions";
import { Button, Col, Container, Row, Card, Badge, Toast, Modal, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PaginaPrenotazione from "./PaginaPrenotazione";
import { BiMessageAlt } from "react-icons/bi";

const PaginaUtenti = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userLogged = useSelector((state) => state.userLogin.userLogin);

  //stato per il toast
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  //STATO MODALE
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const annuncioStock = useSelector((state) => state.annuncioSelezionato.annuncioSelezionato);

  const fetchAnnunci = async () => {
    try {
      const response = await fetch(`http://localhost:8080/annuncio/annuncioById/${params.annuncioId}`, {});
      if (response.ok) {
        const fetchedAnnunci = await response.json();
        dispatch({
          type: GET_ANNUNCIO_SELEZIONATO,
          payload: fetchedAnnunci,
        });
      } else {
        dispatch({
          type: "GET_ANNUNCI_ERROR",
        });
      }
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    fetchAnnunci();
  }, []);

  //-----------fetch utente----------------

  const fetchSearchedProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/trovaUtenteByUsername/${annuncioStock?.user?.username}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setSelectedUser(responseData);
      } else {
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  useEffect(() => {
    fetchSearchedProfile();
    //searchFetchedProfileAction(setSelectedUser, "annuncioStock?.user?.username");
  }, []);

  return (
    <>
      <div id="selected_page_container" className="p-2">
        {annuncioStock?.hasError && <Spinner animation="grow" variant="primary" />}
        <Container className=" d-flex align-items-center justify-content-center">
          <Row className="d-flex align-content-center">
            <Col xs={12} md={12} xl={5} className="d-flex justify-content-center">
              <Card
                style={{ maxWidth: "18rem" }}
                className=" text-center rounded-4 border-0 shadow w-100 d-flex mb-2"
              >
                <Card.Body className="d-flex flex-column justify-content-evenly align-items-center">
                  <Card.Img
                    src={`data:image/jpeg;base64,${selectedUser?.profileImage}`}
                    className="img_Annuncio_selected rounded-circle"
                  />
                  <Card.Title>{annuncioStock?.user?.usarname}</Card.Title>

                  <h3>
                    Riguardo a
                    <span className="fw-bold text-danger ms-1">{annuncioStock?.user?.username}</span>
                  </h3>
                  <p className="teacher_description">{selectedUser?.descrizione}</p>

                  {userLogged?.username ? (
                    <Button
                      onClick={() => {
                        setModalShow(true);
                      }}
                      className="rounded-pill fw-semibold"
                    >
                      <BiMessageAlt /> Prenota una lezione
                    </Button>
                  ) : (
                    <>
                      <Button onClick={toggleShowA} className="mb-2">
                        Prenota
                      </Button>
                      <Toast show={showA} onClose={toggleShowA} className="border-0" delay={3000} autohide>
                        <Toast.Body>Accedi per poter prenotare</Toast.Body>
                      </Toast>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0 shadow-sm rounded-4 ">
                <Card.Body>
                  {annuncioStock?.listaMaterie.map((a, i) => (
                    <Badge bg="primary" className="me-1" key={i}>
                      {a}
                    </Badge>
                  ))}
                  {annuncioStock?.tipoLezione.map((tipo, i) => (
                    <Badge bg="warning" className="me-1" key={i}>
                      {tipo}
                    </Badge>
                  ))}
                  <p className="lh-sm fw-bold w-100 p_lesson_description_title mt-2">
                    {annuncioStock?.titoloAnnuncio}
                  </p>
                  <h3 className="fs-6 fw-bolder">Riguardo alla tua lezione</h3>
                  <p className="p_lesson_description">{annuncioStock?.descrizioneAnnuncio}</p>
                  <Card.Text>Tariffa:{annuncioStock?.tariffaOraria}€/h</Card.Text>
                </Card.Body>
              </Card>

              <div id="reviews_div">
                {recensioniLezione.map((recensione) => (
                  <Card className="rounded-4 mt-2 border-0 bg-transparent shadow text-end">
                    <Card.Body>
                      <Row>
                        <Col className="mb-2">
                          <Card.Img src={recensione.photo} className="img_annuncio_comments rounded-circle" />
                          <span> {recensione.nome}</span>
                        </Col>
                      </Row>
                      <Row>
                        <p className="m-0">{recensione.recensione}</p>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <PaginaPrenotazione selectedUser={selectedUser} />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default PaginaUtenti;
