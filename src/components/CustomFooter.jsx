import { Button, Col, Container, Row } from "react-bootstrap";

const CustomFooter = () => {
  return (
    <>
      <div className="text-light pt-5" id="footer">
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <h3 className="fs-3">Su di noi</h3>
              <p>Chi siamo?</p>
              <p>privacy</p>
              <p>Informativa</p>
              <p>Menzioni legali</p>
            </Col>
            <Col>
              <h3 className="fs-3">Assistenza</h3>
              <p>Bisogno di aiuto?</p>
              <p>Contatti</p>
            </Col>
            <Col>
              <h3 className="fs-3">Seguici</h3>
              <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                <ion-icon name="logo-instagram"></ion-icon>
              </Button>
              <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                <ion-icon name="logo-linkedin"></ion-icon>
              </Button>
              <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </Button>
            </Col>
            <Col>Colonna 4</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CustomFooter;
