import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
  Toast,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomFooter from "./CustomFooter";
import { useSelector } from "react-redux";
import { useState } from "react";
import { materieInsegnabili } from "../redux/actions";

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchvalue] = useState();

  const userName = useSelector((state) => state.userLogin.userLogin?.username);
  return (
    <>
      <Container>
        <Row className="row_home">
          <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
            <h1>IMPARA CON NOI</h1>
            <h2>Scegli tra migliaia di tutor e corsi </h2>
            <Form className=" d-flex align-items-center justify-content-center mt-3 ">
              <Form.Group controlId="formBasicMateria" id="form_container_principal">
                <Form.Control
                  type="text"
                  className="rounded-pill border-0 shadow-sm"
                  id="form_principal"
                  placeholder="Cosa vuoi imparare?"
                  value={searchValue}
                  onChange={(e) => setSearchvalue(e.target.value)}
                />
              </Form.Group>
              <Button
                className="w-5 ms-1 rounded-pill"
                onClick={() => {
                  navigate("/teachers/" + searchValue);
                }}
              >
                🔍
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <div className="photo_cointainer_home_top justify-content-center">
              <img
                src="/assets/58167.jpg"
                alt="people_job"
                className="img_home rounded-4 shadow"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="container_center">
        <Row className="row_center_top d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className="d-flex justify-content-center">
              <img
                src="/assets/56893.jpg"
                alt="people_togheter"
                className="img_people_togheter rounded-4 shadow "
              />
            </div>
          </Col>
          <Col>
            <h2>1. Scegli il tuo TUTOR</h2>
            <p>
              Consulta liberamente i profili e contatta l'insegnante che fa per te secondo
              le tue esigenze (tariffe, diploma, commenti, lezioni online o a domicilio).
            </p>
          </Col>
        </Row>

        <Row className="row_center">
          <Col>
            <h2>2. Contattalo e scegli una data per la tua lezione</h2>
            <p>
              Veloci come un lampo, gli insegnanti ti rispondono in qualche ora! E se non
              trovi l'insegnante perfetto, la nostra equipe ti aiuterà nella ricerca.
            </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className="d-flex justify-content-center">
              <img
                src="/assets/55058.jpg"
                alt="img_people_talk"
                className="img_people_talk rounded-4 shadow"
              />
            </div>
          </Col>
        </Row>

        <Row className="row_center_end">
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className="d-flex justify-content-center">
              <img
                src="/assets/58255.jpg"
                alt="people_whit_smartphone"
                className="img_people_smartphone rounded-4 shadow"
              />
            </div>
          </Col>
          <Col>
            <h2>3. Concorda con il tuo tutor quando vedervi</h2>
            <p>
              Discuti e programma le lezioni con il tuo insegnante o istruttore
              direttamente tramite la messaggeria del tuo account.
            </p>
          </Col>
        </Row>
      </Container>

      {/**Carousel */}
      <Container id="container_carousel">
        <Carousel className="carousel_home">
          <Carousel.Item>
            <img
              className="img_carousel rounded-4 justify-content-between"
              src="/assets/students-coffee-break.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="text-dark text-start ">
                <h3>Allievo e insegnante: l'alchimia perfetta</h3>
                <p className="fs-6">
                  "Tutorme è la piattaforma che ha permesso ai miei due figli di
                  migliorare i loro voti, di sviluppare un vero metodo di studio e di
                  avere maggiore fiducia in loro stessi."
                </p>
                <p className="text-bold">Mamma di Carlotta Allieva di 3a media</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="img_carousel rounded-4"
              src="/assets/friendly-students.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <div className="text-dark text-start">
                <h3>Imparare può essere divertente:</h3>
                <p className="fs-6">
                  Le lezioni online possono sembrare noiose e monotone, ma questo sito ha
                  il potere di rendere lo studio divertente e coinvolgente. Non solo ho
                  imparato tantissimo, ma mi sono anche divertito lungo il percorso!
                </p>
                <p className="text-bold">Federico Allievo di 3° superiore</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="img_carousel rounded-4"
              src="/assets/teen-girl-doing-homework-with-friends.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className="text-dark text-start">
                <h3>Studia condividendo le tue passioni</h3>
                <p className="fs-6">
                  Gli insegnanti sono eccezionali e riescono a trasmettere la loro
                  passione per il sapere in modo contagioso. Ho avuto l'impressione di
                  essere seduto in una classe con il professore
                </p>
                <p className="text-bold">Alessia Allieva al primo anno di univeristà</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      {/**Carousel */}

      <div></div>

      <Container className="d-flex justify-content-center container_banner_tutor" xs={12}>
        <Row>
          <Col>
            <div className=" rounded-4 div_banner_Tutor d-flex flex-column justify-content-evenly p-3">
              <div>
                <h2 className="text-start">Diventa anche tu un SUPER TUTOR</h2>
                <p className="p_banner_tutor">
                  Condividi le tue conoscenze,
                  <br /> vivi della tua passione!
                </p>
              </div>
              {userName ? (
                <Link to="/creaAnnuncio" className="mt-5">
                  <Button className="rounded-pill ms-3">Crea il tuo annuncio</Button>
                </Link>
              ) : (
                <Link to="/signUp" className="a_banner_tutor">
                  <Button className="rounded-pill  button_banner_tutor">
                    Dare lezioni
                  </Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <CustomFooter />
    </>
  );
};

export default Home;
