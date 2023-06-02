import { useEffect, useState, useRef } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  Alert,
  InputGroup,
  Accordion,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { handleDeleteAnnunci } from "../redux/actions";

const Profilo = () => {
  const userName = useSelector((state) => state.userLogin.userLogin);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  console.log("User", user);

  //funzione di input file
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File selezionato:", file);
  };
  //fine funzione input

  const fetchUser = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/trovaUtenteByUsername/${userName?.username}`,
        {
          headers: {
            Authorization: process.env.REACT_API_KEY,
          },
        }
      );
      if (response.ok) {
        const fetchedUser = await response.json();
        setUser(fetchedUser);
      } else {
        alert("response not ok");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //ftech di modifica utente:
  const fetchEditUser = async () => {
    try {
      const resposne = await fetch;
    } catch (error) {}
  };

  //FETCH DI CANCELLAZIONE PRENOTAZIONE

  const handleDeletePrenotazione = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/eliminaPrenotazione/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: process.env.REACT_API_KEY,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setRefresh(true);
      } else {
        alert("qualcosa è andato storto");
      }
    } catch (error) {
      alert("FATAL_ERROR", error);
    }
  };

  //fetch elimna annunci
  const handleDeleteAnnunci = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/eliminaAnnuncio/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: process.env.REACT_API_KEY,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setRefresh(true);
      } else {
        alert("Qualcosa non va con l'eliminazione del tuo annuncio");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  //update dopo aver cancellato una pagina
  useEffect(() => {
    fetchUser();
  }, [refresh]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Card className="border-0 shadow-sm rounded-4">
            <p className="text-center pt-3 m-0 fw-semibold">Info Generali 😎</p>
            <Card.Body>
              <Form className="p-2 rounded-4">
                <Form.Group className="mb-3 " controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder={userName ? userName.username : "Nome"}
                    className=" border border-2 border-light "
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasiclastName">
                  <Form.Control
                    type="text"
                    placeholder="Cognome"
                    className=" border border-2 border-light"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDateofAge">
                  <Form.Control
                    type="date"
                    placeholder="data di nascita"
                    className=" border border-2 border-light"
                  />
                </Form.Group>

                <Form.Group className="mb-3 rounded-4" controlId="formBasiclastEmail">
                  <Form.Control
                    type="email"
                    placeholder="email"
                    className=" border border-2 border-light"
                  />
                </Form.Group>
                <Row xs={3} className="justify-content-center">
                  {/*INSERIRE FETCH DI MODIFICA UTENTE*/}
                  <Button variant="primary" type="submit" className="rounded-4">
                    Invia
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm rounded-4 mt-2">
            <p className="text-center pt-3 m-0 fw-semibold">Descriviti ✒️</p>
            <Card.Body>
              <Form.Group className="mb-3 " controlId="formBasicName">
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={6}
                  placeholder="Inserisci una descrizione su di te"
                  className=" border border-2 border-light "
                />
              </Form.Group>
              <Row xs={3} className="justify-content-center">
                {/*INSERIRE FETCH DI MODIFICA UTENTE*/}
                <Button variant="primary" type="submit" className="rounded-4">
                  Invia
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* SEZIONE CENTRALE*/}
        <Col xs={12} md={3}>
          <Card className="border-0 shadow-sm rounded-4 text-center">
            <Card.Body>
              <p className="fw-semibold">Identità 🪪</p>
              <div className="upload_photo_div">
                <img
                  src="/assets/credit-card.png"
                  alt="identty_card"
                  className="identity_photo"
                />
              </div>
              <Button onClick={handleButtonClick} className="mt-4 rounded-4">
                Carica una foto
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleFileChange}
                />
              </Button>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm rounded-4 text-center mt-2">
            <Card.Body>
              <p className="fw-semibold">Password 🔑</p>

              <Button className="mt-4 rounded-4">Cambia password</Button>
            </Card.Body>
          </Card>

          <Card className="border-0 rounded-4 text-center shadow-sm mt-2">
            <Card.Body>
              <p className="fw-semibold">Cancella account 😧</p>
              <p className="fs-6">
                ATTENZIONE! Cancellando l'account perderai tutte le informazioni inserite,
                tutte le lezioni saranno cancellate e non farai più parte di TutorMe.
                L'azione che stai per compiere è irreversibile. Sii sicuro prima di
                procedere.
              </p>
              <Button>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup>
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3}>
          <Card
            style={{ maxWidth: "18rem" }}
            className="text-center rounded-4 d-block border-0 mb-2 shadow-sm"
          >
            <Card.Img
              variant="top"
              src="https://picsum.photos/200/200"
              className=" p-1 mt-3 img_Annuncio_selected "
            />
            <Card.Body>
              <Card.Title>{userName?.username}</Card.Title>
            </Card.Body>
          </Card>

          <Card
            style={{ maxWidth: "17rem" }}
            className="border-0 text-center shadow-sm rounded-4"
          >
            <h4 className="mt-2">Lista Prenotazioni</h4>
            {user?.listaPrenotazioni?.map((p, i) => (
              <Card.Body className="d-flex p-1 justify-content-center" key={i}>
                <Accordion className="w-100">
                  <Accordion.Item eventKey="0" className="border-0">
                    <Accordion.Header>
                      {p.dataPrenotazione}
                      <ion-icon
                        name="trash-bin-outline"
                        onClick={(e) => {
                          handleDeletePrenotazione(p.id);
                        }}
                      />
                    </Accordion.Header>
                    <Accordion.Body>{p.descrizionePrenotazione}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            ))}
          </Card>

          <Card
            style={{ maxWidth: "17rem" }}
            className="border-0 text-center shadow-sm rounded-4 mt-2"
          >
            <h4 className="mt-2">Lista Annunci</h4>
            {user?.listaAnnunci?.map((p, i) => (
              <Card.Body className="d-flex p-1" key={i}>
                <Accordion className="w-100 justify-content-between">
                  <Accordion.Item eventKey="0" className="border-0">
                    <Accordion.Header>
                      {p.listaMaterie}
                      <ion-icon
                        name="trash-bin-outline"
                        onClick={(e) => {
                          handleDeleteAnnunci(p.id);
                        }}
                      />
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profilo;
