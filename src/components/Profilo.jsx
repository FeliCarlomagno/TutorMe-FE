import { useEffect, useState, useRef } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  InputGroup,
  Accordion,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Profilo = () => {
  const userName = useSelector((state) => state.userLogin.userLogin);
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  console.log("User", user);

  //STATO PER AGGIUNTA IMMAGINE:
  const [image, setImage] = useState(null);

  //funzione di input file per trasformare un bottone in un input-------------------------
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("File selezionato:", file);
  };
  //fine funzione input---------------------------------------------------------------

  const fetchUser = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/trovaUtenteByUsername/${userName?.username}`,
        {
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
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

  //FETCH di modifica utente:--------------------------------------------------------
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/modificaUtente/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("TUTTO OK");
      } else {
        alert("NIENTE DI BUONO");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  //FETCH DI CANCELLAZIONE PRENOTAZIONE-----------------------------------------------------------
  const handleDeletePrenotazione = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/eliminaPrenotazione/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
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

  //fetch elimina annunci-----------------------------------------------------------------------------
  const handleDeleteAnnunci = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/eliminaAnnuncio/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
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

  //FETCH DI AGGIUNTA IMMAGINE------------------------------------------------------------------------------------------
  const handleSetImage = async () => {
    try {
      const response = await fetch(
        `localhost:8080/api/auth/setImmagine/${userName?.username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setImage(data);
        alert("Immagine caricata con successo");
      } else {
        alert("qualcosa non va bene con il caricamento dell'immagine");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center profile_container">
        <Col xs={12} md={8} lg={4}>
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

          <Card className="border-0 shadow-sm rounded-4 mt-2 text-center mb-2">
            <p className="text-center pt-3 m-0 fw-semibold">Descriviti ✒️</p>
            <Card.Body>
              <Form onSubmit={handleEdit}>
                <Form.Group className="mb-3 " controlId="formBasicName">
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={6}
                    value={user?.descrizione}
                    placeholder="Inserisci una descrizione su di te"
                    className=" border border-2 border-light "
                    onChange={(e) => setUser({ ...user, descrizione: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="rounded-4">
                  Invia
                </Button>
              </Form>
              <Row xs={3} className="justify-content-center"></Row>
            </Card.Body>
          </Card>
        </Col>

        {/* SEZIONE CENTRALE*/}
        <Col xs={12} md={8} lg={4}>
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

              <Form onClick={handleButtonClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleFileChange}
                />
                <Button className="mt-4 rounded-4" /*onClick={handleSetImage}*/>
                  Carica una foto
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/*<Card className="border-0 shadow-sm rounded-4 text-center mt-2">
            <Card.Body>
              <p className="fw-semibold">Password 🔑</p>

              <Button className="mt-4 rounded-4">Cambia password</Button>
            </Card.Body>
            </Card>*/}

          <Card className="border-0 rounded-4 text-center shadow-sm mt-2 mb-2">
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

        <Col xs={12} md={8} lg={4} className="d-flex flex-column text-center">
          <Card className="text-center rounded-4 d-block border-0 mb-2 shadow-sm">
            <Card.Img
              variant="top"
              src="https://picsum.photos/200/200"
              className=" p-1 mt-3 img_Annuncio_selected "
            />
            <Card.Body>
              <Card.Title>{userName?.username}</Card.Title>
            </Card.Body>
          </Card>

          <Card className="border-0 text-center shadow-sm rounded-4">
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

          <Card className="border-0 text-center shadow-sm rounded-4 mt-2 w-100">
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
