import { useEffect } from "react";
import { Card, Badge, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherAction } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

const CardTeacher = () => {
  const dispatch = useDispatch();
  const teachersInStock = useSelector((state) => state.teachers.teacherStock);
  const hasFetchError = useSelector((state) => state.teachers.hasError);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getTeacherAction());
  }, []);

  console.log("parametro", params);

  return (
    <Container>
      <Row>
        <h2 className="mt-5">
          Ricerca per
          <span className="text-primary">{params.searchValue.toUpperCase()}</span>
        </h2>
        {hasFetchError && navigate("*")}
        {teachersInStock
          .filter((obj) =>
            obj.listaMaterie?.some((materia) =>
              materia.toLowerCase().includes(params.searchValue.toLowerCase())
            )
          )
          .map((teacher, i) => (
            <Col
              xs={12}
              md={3}
              className="d-flex , flex-direction-row, wrap, space-between mt-5"
            >
              <Card
                style={{ width: "18rem" }}
                key={i}
                onClick={(e) => {
                  navigate("/paginaAnnuncioSelezionato/" + teacher.id);
                }}
                className="mb-2 mx-0 rounded-4 p-1 card_teacher bg-secondary"
              >
                <Card.Img
                  variant="top"
                  src="https://picsum.photos/500/500"
                  className="rounded-4"
                />
                <Card.Body>
                  <Card.Title>{teacher.user?.name}</Card.Title>
                  <Card.Text>{teacher.listaMaterie}</Card.Text>
                  <Badge bg="primary">{teacher.tariffaOraria} €/h</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default CardTeacher;
