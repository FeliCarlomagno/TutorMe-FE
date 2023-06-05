import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singup from "./components/Signup";
import NotFoundPage from "./components/NotFoundPage";
import CustomNavbar from "./components/CustomNavbar";
import CardTeacher from "./components/CardTeacher";
import Home from "./components/Home";
import CreaAnnuncio from "./components/CreaAnnuncio";
import LogIn from "./components/LogIn";
import PaginaUtenti from "./components/PaginaUtenti";
import PaginaPrenotazione from "./components/PaginaPrenotazione";
import Profilo from "./components/Profilo";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signUp" element={<Singup />} />
          <Route path="/teachers/:searchValue" element={<CardTeacher />} />
          <Route
            path="/paginaAnnuncioSelezionato/:annuncioId"
            element={<PaginaUtenti />}
          />
          <Route path="/creaAnnuncio" element={<CreaAnnuncio />} />
          <Route path="/paginaPrenotazione/:annuncio" element={<PaginaPrenotazione />} />
          <Route path="/profilo" element={<Profilo />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
