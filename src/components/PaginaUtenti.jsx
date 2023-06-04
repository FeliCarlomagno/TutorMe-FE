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

  //-----------fetch utente----------------
  const fetchSearchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/trovaUtenteByUsername/${annuncioStock?.user?.username}`,
        {
          method: "GET",
          headers: {
            Authorization: process.env.REACT_API_KEY,
          },
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
      <div id="pagina_annnuncio_select" className="bg-light">
        <Container>
          <Row>
            <Col xs={12} className="mt-4 d-flex justify-content-center">
              <Card
                style={{ maxWidth: "18rem" }}
                className=" text-center rounded-4 d-block border-0 shadow-sm w-100"
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
          </Row>

          <Row className="mt-3">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  {annuncioStock?.listaMaterie.map((a) => (
                    <Badge bg="primary" className="me-1">
                      {a}
                    </Badge>
                  ))}
                  <p className="fs-5 lh-sm fw-bold w-100">
                    Nome annuncio:{annuncioStock?.descrizioneAnnuncio}
                  </p>
                  <h3>Riguardo alla tua lezione</h3>
                  <p>{annuncioStock?.descrizioneAnnuncio}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h3> Riguardo a {annuncioStock?.user?.name}</h3>
                  <p>{selectedUser?.descrizione}</p>
                  {annuncioStock?.tipoLezione.map((tipo) => (
                    <Badge>{tipo}</Badge>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PaginaUtenti;
