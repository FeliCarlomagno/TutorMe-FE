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
} from "react-bootstrap";
import { useSelector } from "react-redux";

const Profilo = () => {
  const userName = useSelector((state) => state.userLogin.userLogin);
  const [user, setUser] = useState(null);
  const [deletePrenotazione, setDeletePrenotazione] = useState(null);
  console.log("Prenotazione selezionata", deletePrenotazione);

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
        alert("trova utente by username ok");
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

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/prenotazioni/eliminaPrenotazione/${deletePrenotazione}`,
        {
          method: "DELETE",
          headers: {
            Authorization: process.env.REACT_API_KEY,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
      } else {
        <Alert>qualcosa non va</Alert>;
      }
    } catch (error) {
      alert("FATAL_ERROR", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Card className="border-0 shadow-sm rounded-4">
            <p className="text-center pt-2 m-0 fw-semibold">Info Generali 😎</p>
            <Card.Body>
              <Form className="p-2 rounded-4">
                <Form.Group className="mb-3 " controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder={userName?.username}
                    className=" border border-2 border-light text-light"
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
              <Card.Body className="d-flex p-1">
                <Button data-bs-toggle="button" key={i} className="w-100">
                  {p.dataPrenotazione} {p.id}
                  <ion-icon
                    name="trash-bin-outline"
                    onClick={(e) => {
                      setDeletePrenotazione(p.id);
                      handleDelete();
                    }}
                  />
                </Button>
              </Card.Body>
            ))}
          </Card>

          <Card
            style={{ maxWidth: "17rem" }}
            className="border-0 text-center shadow-sm rounded-4 mt-2"
          >
            <h4 className="mt-2">Lista Annunci</h4>
            {user?.listaAnnunci?.map((p, i) => (
              <Card.Body className="d-flex p-1">
                <Button data-bs-toggle="button" key={i} className="w-100">
                  {p.listaMaterie}
                  <ion-icon
                    name="trash-bin-outline"
                    onClick={(e) => {
                      setDeletePrenotazione(p.id);
                      handleDelete();
                    }}
                  />
                </Button>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profilo;
