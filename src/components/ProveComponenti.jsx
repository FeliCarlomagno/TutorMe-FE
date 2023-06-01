import { useState } from "react";
import { Button, Col, Form, OverlayTrigger, Popover, Toast } from "react-bootstrap";
import { materieInsegnabili } from "../redux/actions";

const ProveComponenti = () => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover_custom">
            <Popover.Header as="h3">Cerca una materia</Popover.Header>
            <Popover.Body>
              <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="secondary">Clicca</Button>
      </OverlayTrigger>

      <Col xs={3}>
        <div id="searcbar_with_toast_container">
          <Form type="text" className="mb-2"></Form>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                className="rounded-pill form_navbar shadow-sm"
                placeholder="Cosa vuoi imparare?"
                value=""
                onClick={toggleShowA}
              />
            </Form.Group>
          </Form>
          <Toast show={showA} onClose={toggleShowA} className="border-0">
            <Toast.Body className="d-flex flex-column mt-1" id="toast_body">
              {materieInsegnabili.map((e) => (
                <Button className="m-1 bg-light">{e}</Button>
              ))}
            </Toast.Body>
          </Toast>
        </div>
      </Col>
    </>
  );
};

export default ProveComponenti;
