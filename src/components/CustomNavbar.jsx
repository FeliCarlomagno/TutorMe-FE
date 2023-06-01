import { useState } from "react";
import { Navbar, Nav, Button, Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";

const CustomNavbar = () => {
  const userName = useSelector((state) => state.userLogin.userLogin?.username);

  const navigate = useNavigate();
  const [searchValue, setSearchvalue] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar className="px-5 justify-content-between">
        <div className=" d-flex">
          <Link to="/" className="navbar-brand">
            <strong className="text-dark logo">TutorMe</strong>
          </Link>
          <Form className=" d-flex align-items-center justify-content-center ">
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
                    <Dropdown.Item href="#/action-1">Crea Annuncio</Dropdown.Item>
                  </Link>
                  <Link to="/profilo" className="text-decoration-none">
                    <Dropdown.Item href="#/action-2">Profilo</Dropdown.Item>
                  </Link>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
                className="rounded-pill shadow-sm"
              >
                ACCEDI
              </Button>
              <Link to="/signUp">
                <Button className="rounded-pill ms-3 shadow-sm">Dare lezioni</Button>
              </Link>
            </>
          )}
        </Nav>

        <CustomModal show={modalShow} onHide={() => setModalShow(false)} />
      </Navbar>
    </>
  );
};

export default CustomNavbar;
