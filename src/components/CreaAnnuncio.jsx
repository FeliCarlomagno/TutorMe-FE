import { useState } from "react";
import { Col, Container, Row, Button, Form, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SEND_ANNUNCIO } from "../redux/actions";
import { materieInsegnabili } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const CreaAnnuncio = () => {
  const userName = useSelector((state) => state.userLogin.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [annuncio, setAnnuncio] = useState({
    listaMaterie: [],
    titoloAnnuncio: "",
    descrizioneAnnuncio: "",
    tariffaOraria: 1,
    tipoLezione: [],
    isCreate: false,
  });

  //PROVA RENDERIZZAZIONE DI PARTI DI CODICE USANDO LO STATE
  const [step, setStep] = useState({
    isStepUno: true,
    isStepDue: false,
    isStepTre: false,
    isStepQuattro: false,
    isStepCinque: false,
  });

  //CAMBIO COLORE DEI BOTTONI DELLE MATERIE CLICCATI:
  const [buttonState, setButtonState] = useState([]);
  const handleButtonClick = (i) => {
    const updatedButtonStates = [...buttonState];
    updatedButtonStates[i] = !updatedButtonStates[i];
    setButtonState(updatedButtonStates);
  };

  //FORM DI RICERCA MATERIE:
  const [formValue, setFormValue] = useState("");

  const handleSet = (e) => {
    //se annuncio.listaMaterie include al suo interno
    // un valore uguale al valore dell'input, non aggiunge nuovamente il valore
    if (!annuncio.listaMaterie.includes(e.target.value)) {
      setAnnuncio({
        ...annuncio,
        listaMaterie: [...annuncio.listaMaterie, e.target.value],
      });
    }
  };

  //FETCH PER INVIARE I DATI DI UN ANNUNCIO:
  const addAnnuncioInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/annuncio/creaAnnuncio/${userName?.username}`,
        {
          method: "POST",
          body: JSON.stringify(annuncio),
          headers: {
            Authorization: `Bearer ${userName?.accessToken}`, //<-- IL BEARER VA CAMBIATO E TENUTO SEMPRE AGGIORNATO
            //POICHE' SI COLLEGA ALLA RICERCA DELLA MAIL PER AUTORIZZARSI
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch({
          type: SEND_ANNUNCIO,
          payload: annuncio,
        });
        alert("annuncio creato");
        navigate("/");
      } else {
        alert("qualcosa è andato storto");
      }
    } catch (error) {
      alert("Errore", error);
    }
  };
  return (
    <div id="crea_annuncio_container">
      <Container className="h-100">
        <Row>
          <Col className="d-flex justify-content-around " xs={12} md={5}>
            <Card
              style={{ maxWidth: "17em", maxHeight: "20em" }}
              className="rounded-4 border-0 shadow mt-5"
            >
              <Card.Body className="p-4">
                <h1>Tutor Pill</h1>
                <p className="pt-4 ">
                  TutorMe ti da la possibilità di condividere le tue passioni e le tue
                  conoscenze in tantissime materie.
                  <br />
                  Crea il tuo annuncio, pubblicalo sulla piattaforma e sei pronto per
                  cominciare!
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex flex-column col_step_one text-center" xs={12} md={5}>
            {step.isStepUno && (
              <>
                <h2>Cosa Insegni?</h2>
                <Form className="m-2">
                  <Form.Group controlId="formBasicMateria">
                    <Form.Control
                      type="text"
                      placeholder="Cosa vuoi imparare? ↧ scorri tra le materie"
                      className="p-3 border-0 "
                      value={formValue}
                      onChange={(e) => setFormValue(e.target.value)}
                    />
                  </Form.Group>
                </Form>

                <div className="d-flex flex-column div_materie">
                  {materieInsegnabili
                    .filter((v) => v.toLowerCase().includes(formValue.toLowerCase()))
                    .map((m, i) => (
                      <Button
                        value={m}
                        key={i}
                        onClick={(m) => {
                          handleSet(m);
                          handleButtonClick(i);
                        }}
                        className="mb-2 py-3  border-0"
                        style={{ backgroundColor: buttonState[i] ? "#e3c579" : null }}
                      >
                        {m}
                      </Button>
                    ))}
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      setStep({
                        ...step,
                        isStepUno: false,
                        isStepDue: true,
                      });
                    }}
                    className="bg-danger mt-4 border-0"
                  >
                    Avanti
                  </Button>
                </div>
              </>
            )}
            {step.isStepDue && (
              <div className="d-flex flex-column justify-content-between h-100">
                <h2>
                  <span className="text-danger">Titolo</span> del tuo annuncio
                </h2>

                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={7}
                      placeholder="Inserisci il titolo del tuo annuncio.."
                      value={annuncio.titoloAnnuncio}
                      onChange={(e) => {
                        setAnnuncio({
                          ...annuncio,
                          titoloAnnuncio: e.target.value,
                        });
                      }}
                      className="border-0"
                    />
                    <Form.Label className="form_label_annuncio">
                      *Inserisci un breve titolo per il tuo annuncio ma che sia chiaro su
                      cosa vuoi fare
                    </Form.Label>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepUno: true,
                        isStepDue: false,
                      });
                    }}
                    className="me-1"
                  >
                    Indietro
                  </Button>
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepDue: false,
                        isStepTre: true,
                      });
                    }}
                    className="bg-danger border-0 shadow"
                  >
                    Avanti
                  </Button>
                </div>
              </div>
            )}
            {step.isStepTre && (
              <div className="d-flex flex-column justify-content-between h-100">
                <h2>
                  <span className="text-danger">Descrivi</span> il tuo annuncio
                </h2>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={7}
                      placeholder="Inserisci la descrizione del tuo annuncio.."
                      value={annuncio.descrizioneAnnuncio}
                      onChange={(e) => {
                        setAnnuncio({
                          ...annuncio,
                          descrizioneAnnuncio: e.target.value,
                        });
                      }}
                      className="border-0"
                    />
                    <Form.Label className="form_label_annuncio">
                      *Ora una descrizione su come si svolgeranno le tue lezioni
                    </Form.Label>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepDue: true,
                        isStepTre: false,
                      });
                    }}
                  >
                    Indietro
                  </Button>
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepTre: false,
                        isStepQuattro: true,
                      });
                    }}
                    className="ms-1 bg-danger border-0"
                  >
                    Avanti
                  </Button>
                </div>
              </div>
            )}
            {step.isStepQuattro && (
              <div className="d-flex flex-column justify-content-between h-100">
                <Form>
                  <h2>
                    <span className="text-danger">Tariffa</span> Oraria
                  </h2>
                  <Form.Group
                    as={Row}
                    className="mb-3 justify-content-center"
                    controlId="formPlaintextPassword"
                  >
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="💶 €/h"
                        value={annuncio.tariffaOraria}
                        onChange={(e) => {
                          setAnnuncio({
                            ...annuncio,
                            tariffaOraria: parseInt(e.target.value),
                          });
                        }}
                        className="border-0 justify-content-center"
                      />
                      <Form.Label className="form_label_annuncio">
                        *Inserisci una tariffa oraria che pensi possa essere adeguata per
                        te in base alla tua esperienza e mansione
                      </Form.Label>
                    </Col>
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepTre: true,
                        isStepQuattro: false,
                      });
                    }}
                    className="me-1"
                  >
                    Indietro
                  </Button>
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepQuattro: false,
                        isStepCinque: true,
                      });
                    }}
                    className="bg-danger border-0"
                  >
                    Avanti
                  </Button>
                </div>
              </div>
            )}
            {step.isStepCinque && (
              <div className="d-flex flex-column justify-content-between h-100">
                <h2>
                  <span className="text-danger">Dove</span> insegni?
                </h2>
                <div className="d-flex flex-column">
                  <Button
                    value="ONLINE"
                    onClick={(e) => {
                      console.log(e);
                      setAnnuncio({
                        ...annuncio,
                        tipoLezione: [...annuncio.tipoLezione, e.target.value],
                      });
                    }}
                  >
                    ONLINE
                  </Button>
                  <Button
                    value="DAL_VIVO"
                    className="mt-2"
                    onClick={(e) => {
                      console.log(e);
                      setAnnuncio({
                        ...annuncio,
                        tipoLezione: [...annuncio.tipoLezione, e.target.value],
                      });
                    }}
                  >
                    DAL VIVO
                  </Button>
                  <p className="form_label_annuncio">
                    *Indica ai tuoi futuri studenti in che modo avrai intenzione di
                    svolgere le lezioni. Ricordati sempre che potrai accordarti con loro
                    per una posizione diversa in ogni momento
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={(e) => {
                      setStep({
                        ...step,
                        isStepQuattro: true,
                        isStepCinque: false,
                      });
                    }}
                  >
                    Indietro
                  </Button>

                  <Button
                    onClick={(e) => {
                      addAnnuncioInfo();
                    }}
                    className="ms-1 bg-danger border-0"
                  >
                    Crea Annuncio
                  </Button>
                </div>
              </div>
            )}
            {/*step.isStepSei && (
            <div>
              <Button
                onClick={(e) => {
                  addAnnuncioInfo();
                }}
              >
                Crea Annuncio
              </Button>
            </div>
              )*/}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CreaAnnuncio;
