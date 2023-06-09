import { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Dropdown,
  Form,
  Row,
  Container,
  Offcanvas,
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";
import { handleLogout } from "../redux/actions";
import LogIn from "./LogIn";

const CustomNavbar = () => {
  const userName = useSelector((state) => state.userLogin.userLogin?.username);

  const navigate = useNavigate();
  const [searchValue, setSearchvalue] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar key="sm" bg="light" expand="lg" className=" bg-transparent">
        <Container fluid>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand className="logo fw-bold">TutorMe</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header
              closeButton
              className="justify-content-end"
            ></Offcanvas.Header>
            <Offcanvas.Body className=" justify-content-between">
              <div className="w-100 offcanvas_body_small_screen">
                <div className="d-flex">
                  <Form className=" d-flex align-items-center justify-content-center">
                    <Form.Group controlId="formBasicMateria">
                      <Form.Control
                        type="text"
                        className="rounded-pill form_navbar shadow-sm"
                        placeholder="Cosa vuoi imparare?"
                        value={searchValue}
                        onChange={(e) => setSearchvalue(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="w-5 ms-1 rounded-pill shadow-sm"
                      onClick={() => {
                        navigate("/teachers/" + searchValue);
                      }}
                    >
                      🔍
                    </Button>
                  </Form>
                </div>

                <Nav>
                  <div className="d-flex">
                    {userName ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-button-drop-up"
                            className="variant-secondary rounded-circle fw-bold shadow-sm"
                          >
                            {userName.toUpperCase().substr(0, 1)}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="me-5 border-0 shadow">
                            <Link to="/creaAnnuncio" className="text-decoration-none">
                              <Dropdown.Item href="#/action-1">
                                Crea Annuncio
                              </Dropdown.Item>
                            </Link>
                            <Link to="/profilo" className="text-decoration-none">
                              <Dropdown.Item href="#/action-2">Profilo</Dropdown.Item>
                            </Link>
                            <Dropdown.Item
                              href="#/action-3"
                              onClick={() => {
                                handleLogout();
                                navigate("/");
                              }}
                            >
                              Disconnettiti
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => setModalShow(true)}
                          className="rounded-pill shadow-sm"
                        >
                          ACCEDI
                        </Button>
                        <Link to="/signUp">
                          <Button className="rounded-pill ms-3 shadow-sm">
                            Dare lezioni
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </Nav>
              </div>

              <div className="d-lg-none d-flex flex-column">
                {userName ? (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-button-drop-up"
                        className="variant-secondary rounded-4 fw-bold shadow-sm"
                      >
                        {userName.toUpperCase()}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="me-5 border-0 shadow">
                        <Link to="/creaAnnuncio" className="text-decoration-none">
                          <Dropdown.Item href="#/action-1">Crea Annuncio</Dropdown.Item>
                        </Link>
                        <Link to="/profilo" className="text-decoration-none">
                          <Dropdown.Item href="#/action-2">Profilo</Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          href="#/action-3"
                          onClick={() => {
                            handleLogout();
                            navigate("/");
                          }}
                        >
                          Disconnettiti
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button className="rounded-pill ms-3 button d-flex align-items-center shadow-sm">
                      <ion-icon name="heart-outline" className="fs-2"></ion-icon>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                      className="rounded-pill shadow-sm fw-semibold"
                    >
                      Accedi
                    </Button>
                    <Link to="/signUp">
                      <Button className="rounded-pill shadow-sm w-100 mt-2 fw-semibold">
                        Dare Lezioni
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Offcanvas.Body>
            <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
              <LogIn />
            </CustomModal>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
