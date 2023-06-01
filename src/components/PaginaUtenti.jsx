import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ANNUNCIO_SELEZIONATO } from "../redux/actions";
import { Button, Col, Container, Row, Card, Badge, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const PaginaUtenti = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userLogged = useSelector((state) => state.userLogin.userLogin?.username);

  const annuncioStock = useSelector(
    (state) => state.annuncioSelezionato.annuncioSelezionato
  );

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
  }, [params.annuncioId]);

  return (
    <>
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
                  <Button
                    onClick={(e) => {
                      navigate("/login");
                    }}
                    className="rounded-pill"
                  >
                    Prenota una lezione
                  </Button>
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

            <p className="fs-3 fw-bold">
              {annuncioStock?.descrizioneAnnuncio} = descrizione annuncio
            </p>
            <Row>
              <Col>
                <h3> Riguardo a **nome Insegnante**</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, ea.
                  Perferendis, atque. Ea quos praesentium est, perferendis officiis harum,
                  placeat eos tempore laboriosam omnis minus voluptatibus eaque quidem,
                  iste sapiente!
                </p>
                <h3>Commenti</h3>
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                        ea labore illo voluptas esse libero obcaecati,
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                        ea labore illo voluptas esse libero obcaecati,
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                        ea labore illo voluptas esse libero obcaecati,
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                        ea labore illo voluptas esse libero obcaecati,
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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                        ea labore illo voluptas esse libero obcaecati,
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
    </>
  );
};

export default PaginaUtenti;
