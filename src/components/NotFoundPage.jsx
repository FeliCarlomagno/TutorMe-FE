import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div id="not_found">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <Link to="/">
              <Button className="mt-2">TORNA INDIETRO</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
