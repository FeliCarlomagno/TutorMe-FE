import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomFooter = () => {
  return (
    <>
      <div className="text-light rounded-4" id="footer">
        <Container className="d-flex justify-content-center flex-column">
          <Row className="w-100 py-3 footer_row">
            <Col className="d-flex flex-column justify-content-between align-items-center lh-1">
              <h3 className="fs-3">Su di noi</h3>
              <div>
                <p>Chi siamo?</p>
                <p>privacy</p>
                <p>Informativa</p>
                <p>Menzioni legali</p>
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center lh-1">
              <h3 className="fs-3">Assistenza</h3>
              <div>
                <p>Bisogno di aiuto?</p>
                <p>Contatti</p>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-evenly align-items-center footer_end">
              <h3 className="fs-3 d-none d-sm-block h3_footer">Seguici</h3>
              <Link to="https://www.instagram.com/feli_carlomagno/" target="_blank">
                <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                  <ion-icon name="logo-instagram"></ion-icon>
                </Button>
              </Link>
              <Link to="https://www.linkedin.com/in/feliciano-carlomagno-85743020b/" target="_blank">
                <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </Button>
              </Link>
              <Button className="rounded-circle d-flex align-items-center b-0 p-2">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CustomFooter;
