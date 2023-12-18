import { useEffect, useState, useRef } from "react";
import { Col, Container, Row, Form, Button, Card, Accordion, Modal, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";
import { handleLogout, materieInsegnabili } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Profilo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state) => state.userLogin.userLogin);
  const editAnnuncio = useSelector((state) => state.annuncioEdit.annuncioEdit);
  const fileInputRef = useRef();

  const [formValue, setFormValue] = useState("");
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [idAnnuncioEdit, setIdAnnuncioEdit] = useState("");
  const [buttonState, setButtonState] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState(null);

  const [annuncioEdit, setAnnuncioEdit] = useState({
    listaMaterie: [],
    titoloAnnuncio: "",
    descrizioneAnnuncio: "",
    tariffaOraria: 1,
    tipoLezione: [],
    isCreate: false,
  });

  //funzione bottoni cambio di stato(da implementare per l'editAnnuncio):
  const handleButtonState = (i) => {
    const updatedButtonStates = [...buttonState];
    updatedButtonStates[i] = !updatedButtonStates[i];
    setButtonState(updatedButtonStates);
  };

  //funzione di input file per trasformare un bottone in un input(per il setting dell'immagine di profilo)
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    try {
      const response = await fetch(`http://localhost:8080/api/auth/setImmagine/${userName?.username}`, {
        method: "PUT",
        body: JSON.stringify(image),
        headers: {
          Authorization: `Bearer ${userName?.accessToken}`,
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Immagine caricata con successo");
      } else {
        alert("qualcosa non va bene con il caricamento dell'immagine");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

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

  //FETCH di modifica utente:______________________________________________________________________
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/auth/modificaUtente/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${userName?.accessToken}`,
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("TUTTO OK");
      } else {
        alert("NIENTE DI BUONO");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  //FETCH DI CANCELLAZIONE PRENOTAZIONE_______________________________________________________________
  const handleDeletePrenotazione = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/prenotazioni/eliminaPrenotazione/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userName?.accessToken}`,
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRefresh(true);
      } else {
        alert("qualcosa è andato storto");
      }
    } catch (error) {
      alert("FATAL_ERROR", error);
    }
  };

  //FETCH ELIMINA ANNUNCIO__________________________________________________________________________
  const handleDeleteAnnunci = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/annuncio/eliminaAnnuncio/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userName?.accessToken}`,
        },
      });
      if (response.ok) {
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        alert("Qualcosa non va con l'eliminazione del tuo annuncio");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  //FETCH DI AGGIUNTA IMMAGINE_________________________________________________________________
  const handleSetImage = async () => {};

  //FETCH DI MODIFICA Annuncio___________________________________________________________________
  const handleEditAnnuncio = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/modificaAnnuncio/${idAnnuncioEdit}/${user?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(annuncioEdit),
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Annuncio modificato");
      } else {
        alert("modifica annuncio errata");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };

  //FETCH DI CANCELLAZIONE ACCOUNT
  const handleDeleteUtente = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/eliminaUtente/${user?.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
        handleLogout();
      } else {
        navigate("*");
      }
    } catch (error) {
      alert("FATAL ERROR", error);
      navigate("*");
    }
  };

  //update dopo aver cancellato un annuncio/prenotazione
  useEffect(() => {
    fetchUser();
  }, [refresh]);

  return (
    <Container>
      <Row className="justify-content-center profile_container">
        <Col xs={12} md={8} lg={4}>
          <Card className="border-0 shadow-sm rounded-4">
            <p className="text-center pt-3 m-0 fw-semibold">Info Generali 😎</p>
            <Card.Body>
              <Form className="p-2 rounded-4" onSubmit={handleEdit}>
                <Form.Group className="mb-3" controlId="formBasiclastUsername">
                  <Form.Control
                    type="text"
                    placeholder={userName ? userName.username : "Nome"}
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
                    placeholder={user?.email}
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
                <img src="/assets/credit-card.png" alt="identty_card" className="identity_photo" />
              </div>

              <Form
                onClick={handleButtonClick}
                action="`http://localhost:8080/api/auth/setImmagine`"
                method="PUT"
                encType="multipart/form-data"
              >
                <input type="file" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                <Button className="mt-4 rounded-4" onClick={() => handleSetImage()}>
                  Carica una foto
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 rounded-4 text-center shadow-sm mt-2 mb-2">
            <Card.Body>
              <p className="fw-semibold">Cancella account 😧</p>
              <p className="fs-6">
                ATTENZIONE! Cancellando l'account perderai tutte le informazioni inserite, tutte le lezioni
                saranno cancellate e non farai più parte di TutorMe. L'azione che stai per compiere è
                irreversibile. Sii sicuro prima di procedere.
              </p>

              <Button onClick={() => handleDeleteUtente()}>Cancella</Button>
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
                      <div className="d-flex ">
                        <ion-icon
                          name="trash-bin-outline"
                          onClick={(e) => {
                            handleDeletePrenotazione(p.id);
                          }}
                        />
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>{p.descrizionePrenotazione}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            ))}
          </Card>

          <Card className="border-0 text-center shadow-sm rounded-4 mt-2 w-100">
            <h4 className="mt-2">Lista Annunci</h4>
            {user?.listaAnnunci?.map((a, i) => (
              <Card.Body className="d-flex p-1" key={i}>
                <Accordion className="w-100 justify-content-between">
                  <Accordion.Item eventKey="0" className="border-0">
                    <Accordion.Header>
                      {a.listaMaterie.join("-")}
                      <div className="d-flex ">
                        <ion-icon
                          name="trash-bin-outline"
                          onClick={(e) => {
                            handleDeleteAnnunci(a.id);
                          }}
                        />
                        <BsPencil
                          className="ms-2"
                          onClick={(e) => {
                            setModalShow(true);
                            setIdAnnuncioEdit(a.id);
                            dispatch({
                              type: "GET_EDIT_ANNUNCIO",
                              payload: a,
                            });
                            setAnnuncioEdit(editAnnuncio);
                          }}
                        />
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{a.tipoLezione}</p>
                      <p>{a.tariffaOraria}€/h</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Row>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* MODALE DI MODIFICA ANNUNCIO*/}
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <Form className="p-2 rounded-4" onSubmit={handleEditAnnuncio}>
                <Form.Group controlId="formBasicMateria">
                  <Form.Control
                    type="text"
                    placeholder="Cosa vuoi imparare? ↧ scorri tra le materie"
                    className="p-3 border-0 "
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                  />
                </Form.Group>
                <div className="materieInsegnabili_edit d-flex flex-column mt-2">
                  {materieInsegnabili
                    .filter((v) => v.toLowerCase().includes(formValue.toLowerCase()))
                    .map((m, i) => (
                      <Button
                        value={m}
                        key={i}
                        className="mb-2 py-3  border-0"
                        style={{ backgroundColor: buttonState[i] ? "#e3c579" : null }}
                        onClick={(e) =>
                          setAnnuncioEdit({
                            ...annuncioEdit,
                            listaMaterie: [...annuncioEdit?.listaMaterie, e.target.value],
                          })
                        }
                      >
                        {m}
                      </Button>
                    ))}
                </div>
                <FormGroup>
                  <Form.Control
                    type="text"
                    as="textarea"
                    value={annuncioEdit?.titoloAnnuncio}
                    className=" border border-2 border-light mt-2"
                    onChange={(e) =>
                      setAnnuncioEdit({
                        ...annuncioEdit,
                        titoloAnnuncio: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Control
                    type="text"
                    as="textarea"
                    value={annuncioEdit?.descrizioneAnnuncio}
                    className=" border border-2 border-light mt-2"
                    onChange={(e) =>
                      setAnnuncioEdit({
                        ...annuncioEdit,
                        descrizioneAnnuncio: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Control
                    type="text"
                    value={annuncioEdit?.tariffaOraria}
                    className=" border border-2 border-light mt-2"
                    onChange={(e) =>
                      setAnnuncioEdit({
                        ...annuncioEdit,
                        tariffaOraria: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <div className="d-flex flex-column mt-2">
                    <Button
                      value="ONLINE"
                      onClick={(e) => {
                        setAnnuncioEdit({
                          ...annuncioEdit,
                          tipoLezione: [...annuncioEdit.tipoLezione, e.target.value],
                        });
                      }}
                    >
                      ONLINE
                    </Button>
                    <Button
                      value="DAL_VIVO"
                      className="mt-2"
                      onClick={(e) => {
                        setAnnuncioEdit({
                          ...annuncioEdit,
                          tipoLezione: [...annuncioEdit.tipoLezione, e.target.value],
                        });
                      }}
                    >
                      DAL VIVO
                    </Button>
                  </div>
                </FormGroup>

                <div className="">
                  <Button
                    onClick={(e) => {
                      dispatch({
                        type: "SET_ANNUNCIO_EDIT",
                        payload: annuncioEdit,
                      });

                      handleEditAnnuncio();
                    }}
                    className=" bg-danger border-0 mt-2 "
                  >
                    Crea Annuncio
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profilo;
