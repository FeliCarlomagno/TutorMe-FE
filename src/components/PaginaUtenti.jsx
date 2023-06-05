import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ANNUNCIO_SELEZIONATO } from "../redux/actions";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Badge,
  Image,
  Toast,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomModal from "./CustomModal";
import PaginaPrenotazione from "./PaginaPrenotazione";

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

  console.log("parametri ricevuti da cardTeacher", params);

  const [selectedUser, setSelectedUser] = useState(null);

  const annuncioStock = useSelector(
    (state) => state.annuncioSelezionato.annuncioSelezionato
  );

  console.log("Annuncio Stok", annuncioStock);

  const fetchAnnunci = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/annuncioById/${params.annuncioId}`,
        {
          /*headers: {
            Authorization: `Bearer ${userLogged?.accessToken}`,
          },*/
        }
      );
      if (response.ok) {
        const fetchedAnnunci = await response.json();
        dispatch({
          type: GET_ANNUNCIO_SELEZIONATO,
          payload: fetchedAnnunci,
        });
        alert("Inserire una pagina di prenotazione conclusa o un modale di conferma");
      } else {
        console.log("Qualcosa è andato storto");
      }
    } catch (error) {
      console.log("FATAL ERROR", error);
    }
  };

  useEffect(() => {
    fetchAnnunci();
  }, []);

  //-----------fetch utente----------------
  const fetchSearchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/trovaUtenteByUsername/${annuncioStock?.user?.username}`,
        {
          method: "GET",
          /*headers: {
            Authorization: `Bearer ${userLogged?.accessToken}`,
          },*/
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        alert("Tutto ok");
        setSelectedUser(responseData);
      } else {
        alert("QUALCOSA NON VA");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  useEffect(() => {
    fetchSearchProfile();
  }, []);

  return (
    <>
      <div id="selected_page_container" className="p-2">
        <Container className=" d-flex align-items-center">
          <Row className="d-flex align-content-center">
            <Col xs={12} md={12} xl={5} className="d-flex justify-content-center">
              <Card
                style={{ maxWidth: "18rem" }}
                className=" text-center rounded-4 border-0 shadow w-100 d-flex mb-2"
              >
                <Card.Body className="d-flex flex-column justify-content-evenly align-items-center">
                  <Card.Img
                    variant="top"
                    src="https://picsum.photos/200/200"
                    className=" p-1 py-3 img_Annuncio_selected "
                  />
                  <Card.Title>{annuncioStock?.user.name}</Card.Title>

                  <h3> Riguardo a {annuncioStock?.user?.name}</h3>
                  <p className="teacher_description">{selectedUser?.descrizione}</p>

                  {userLogged?.username ? (
                    <Button
                      onClick={(e) => {
                        /*navigate("/paginaPrenotazione/" + annuncioStock.id);*/
                        setModalShow(true);
                      }}
                      className="rounded-pill"
                    >
                      Prenota una lezione
                    </Button>
                  ) : (
                    <>
                      <Button onClick={toggleShowA} className="mb-2">
                        Prenota
                      </Button>
                      <Toast
                        show={showA}
                        onClose={toggleShowA}
                        className="border-0"
                        delay={3000}
                        autohide
                      >
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
                  {annuncioStock?.listaMaterie.map((a) => (
                    <Badge bg="primary" className="me-1">
                      {a}
                    </Badge>
                  ))}
                  {annuncioStock?.tipoLezione.map((tipo) => (
                    <Badge>{tipo}</Badge>
                  ))}
                  <p className="lh-sm fw-bold w-100 p_lesson_description_title mt-2">
                    {annuncioStock?.titoloAnnuncio}
                  </p>
                  <h3 className="fs-6 fw-bolder">Riguardo alla tua lezione</h3>
                  <p className="p_lesson_description">
                    {annuncioStock?.descrizioneAnnuncio}
                  </p>
                  <Card.Text>Tariffa:{annuncioStock?.tariffaOraria}€/h</Card.Text>
                </Card.Body>
              </Card>

              <Card className="border-1 rounded-4 mt-2 border-0 border-1 bg-transparent shadow card_teacher_transparent text-end">
                <Card.Body>
                  <Row>
                    <Col className="mb-2">
                      <Card.Img
                        src="https://picsum.photos/201/201"
                        className="img_annuncio_comments rounded-circle"
                      />
                      <span> Maria Lucia</span>
                    </Col>
                  </Row>
                  <Row>
                    <p className="m-0">Insegnante qualificata e gentile</p>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="border-0 rounded-4 mt-2 border-1 bg-transparent shadow text-end">
                <Card.Body>
                  <Row>
                    <Col className="mb-2">
                      <Card.Img
                        src="https://picsum.photos/200/200"
                        className="img_annuncio_comments rounded-circle"
                      />
                      <span> Luca</span>
                    </Col>
                  </Row>
                  <Row>
                    <p className="m-0">
                      Mi sono trovato splendidamente. Gentile e qualificata
                    </p>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="border-0 rounded-4 border-1 mt-2 bg-transparent shadow text-end">
                <Card.Body>
                  <Row>
                    <Col className="mb-2">
                      <Card.Img
                        src="https://picsum.photos/210/210"
                        className="img_annuncio_comments rounded-circle"
                      />
                      <span> Federica</span>
                    </Col>
                  </Row>
                  <Row>
                    <p className="m-0">Persona super preparata e disponibile</p>
                  </Row>
                </Card.Body>
              </Card>
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
              <PaginaPrenotazione />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default PaginaUtenti;
