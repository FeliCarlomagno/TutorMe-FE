import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ANNUNCIO_SELEZIONATO } from "../redux/actions";
import { Button, Col, Container, Row, Card, Badge, Image, Toast } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomModal from "./CustomModal";

const PaginaUtenti = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userLogged = useSelector((state) => state.userLogin.userLogin?.username);

  //stato per il toast
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  console.log("parametri ricevuti da cardTeacher", params);

  const annuncioStock = useSelector(
    (state) => state.annuncioSelezionato.annuncioSelezionato
  );

  console.log("Annuncio Stok", annuncioStock);

  const fetchAnnunci = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/annuncioById/${params.annuncioId}`,
        {
          headers: {
            Authorization: process.env.REACT_API_KEY,
          },
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

  return (
    <>
      <div id="pagina_annnuncio_select" className="bg-light">
        <Container>
          <Row>
            <Col xs={12} md={4} className="mt-4">
              <Card
                style={{ maxWidth: "18rem" }}
                className=" text-center rounded-4 d-block border-0 shadow-sm"
              >
                <Card.Img
                  variant="top"
                  src="https://picsum.photos/200/200"
                  className=" p-1 py-3 img_Annuncio_selected "
                />
                <Card.Body className="py-3">
                  <Card.Title>{annuncioStock?.user.name}</Card.Title>
                  <Card.Text>{annuncioStock?.tariffaOraria}</Card.Text>
                  {userLogged ? (
                    <Button
                      onClick={(e) => {
                        navigate("/paginaPrenotazione/" + annuncioStock.id);
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

            <Col xs={12} md={8} className="mt-3">
              {annuncioStock?.listaMaterie.map((a) => (
                <Badge bg="primary" className="me-1">
                  {a}
                </Badge>
              ))}

              <p className="fs-1 lh-sm fw-bold">{annuncioStock?.descrizioneAnnuncio}</p>
              <Row>
                <Col>
                  <h3> Riguardo a {annuncioStock?.user?.name}</h3>
                  <p>
                    INserire la descrizione presente sulla pagina di profilo che si andrà
                    a creare
                  </p>
                  <h3>Luogo del corso</h3>
                  {annuncioStock?.tipoLezione.map((tipo) => (
                    <Badge>{tipo}</Badge>
                  ))}

                  <h3 className="mt-5">Commenti</h3>
                  {/**CARD COMMENTI */}
                  <Card className="rounded-4 comments_card mt-2 ">
                    <Card.Body className="rounded-4 ">
                      <Row>
                        <Col>
                          <div>
                            <Image src="/assets/55058.jpg" className="comments_img" />
                            <span className="ms-1">Maria Grazia</span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                          Suscipit ea labore illo voluptas esse libero obcaecati,
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="rounded-4 comments_card mt-2">
                    <Card.Body className=" rounded-4">
                      <Row>
                        <Col>
                          <div>
                            <Image src="/assets/55058.jpg" className="comments_img" />
                            <span className="ms-1">Federico neri</span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                          Suscipit ea labore illo voluptas esse libero obcaecati,
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="rounded-4 comments_card mt-2">
                    <Card.Body className=" rounded-4">
                      <Row>
                        <Col>
                          <div>
                            <Image src="/assets/55058.jpg" className="comments_img" />
                            <span className="ms-1">Giuseppe Casini</span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                          Suscipit ea labore illo voluptas esse libero obcaecati,
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="rounded-4 comments_card mt-2">
                    <Card.Body className=" rounded-4">
                      <Row>
                        <Col>
                          <div>
                            <Image src="/assets/55058.jpg" className="comments_img" />
                            <span className="ms-1">Alessandro Montegrandi</span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                          Suscipit ea labore illo voluptas esse libero obcaecati,
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="rounded-4 comments_card mt-2">
                    <Card.Body className=" rounded-4">
                      <Row>
                        <Col>
                          <div>
                            <Image src="/assets/55058.jpg" className="comments_img" />
                            <span className="ms-1">Vittoria Brunelli</span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                          Suscipit ea labore illo voluptas esse libero obcaecati,
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  {/**CARD COMMENTI */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PaginaUtenti;
