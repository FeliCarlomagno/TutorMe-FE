export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const SET_USER_INFORMATION = "SET_USER_INFORMATION";
export const GET_TEACHER = "GET_TEACHER";
export const GET_TEACHER_ERROR = "GET_TEACHER_ERROR";
export const SET_LOGIN_INFORMATION = "SET_LOGIN_INFORMATION";
export const SET_IS_LOGGED = "SET_IS_LOGGED";
export const SEND_ANNUNCIO = "SEND_ANNUNCIO";
export const IS_CREATED = "IS_CREATED";
export const GET_ANNUNCIO_SELEZIONATO = "GET_ANNUNCIO_SELEZIONATO";
export const GET_ANNUNCI_ERROR = "GET_ANNUNCI_ERROR";
export const IS_SIGNUP = "IS_SIGNUP";
export const GET_EDIT_ANNUNCIO = "GET_EDIT_ANNUNCIO";
export const SET_ANNUNCIO_EDIT = "SET_ANNUNCIO_EDIT";
export const LOGOUT = "LOGOUT";
export const materieInsegnabili = [
  "Matematica",
  "Inglese",
  "Italiano",
  "Storia",
  "Geografia",
  "Scienze",
  "Fisica",
  "Chimica",
  "Biologia",
  "Arte",
  "Musica",
  "Letteratura",
  "Filosofia",
  "Economia",
  "Informatica",
  "Programmazione",
  "Psicologia",
  "Sociologia",
  "HTML",
  "CSS",
  "JAVA",
  "JavaScript",
  "Educazione fisica",
  "Sport",
  "Yoga",
  "Pittura",
  "Scultura",
  "Cucina",
  "Fotografia",
  "Teatro",
  "Canto",
  "Danza",
  "Design",
  "Architettura",
  "Marketing",
  "Grafica",
  "Gestione aziendale",
  "Finanza",
  "Contabilità",
  "Diritto",
  "Relazioni internazionali",
  "Politica",
  "Antropologia",
  "Scienze sociali",
  "Astrologia",
  "Medicina",
  "Nutrizione",
  "Farmacologia",
  "Terapia fisica",
  "Logopedia",
  "Terapia occupazionale",
  "Infermieristica",
  "Scienze dell'educazione",
  "Psicoterapia",
  "Sostenibilità ambientale",
  "Energia rinnovabile",
  "Cambiamenti climatici",
  "Economia circolare",
  "Educazione ambientale",
  "Lingua cinese",
  "Lingua spagnola",
  "Lingua francese",
  "Lingua tedesca",
  "Lingua giapponese",
  "Lingua russa",
  "Lingua araba",
  "Lingua portoghese",
  "Lingua coreana",
  "Lingua italiana per stranieri",
  "Lingua dei segni",
  "Studi di genere",
  "Geologia",
  "Astronomia",
  "Meteorologia",
  "Filosofia orientale",
  "Studi religiosi",
  "Educazione speciale",
  "Studi di genere",
  "Counseling",
  "Musica elettronica",
  "Analisi finanziaria",
  "Programmazione web",
  "Startup",
  "Modellazione 3D",
  "Comunicazione",
  "Scrittura creativa",
  "Gestione del tempo",
  "Pianificazione finanziaria",
  "Marketing digitale",
  "Fotografia di paesaggio",
  "Scienza dei dati",
  "Storia dell'arte",
  "Cucina vegana",
  "Fitness",
  "Risorse umane",
  "Cybersecurity",
  "Robotica",
  "Educazione online",
  "Leadership",
  "Filosofia occidentale",
  "Scienze cognitive",
  "Criptovalute",
  "Biochimica",
  "Design di moda",
  "Economia comportamentale",
  "Letteratura classica",
  "Web design",
  "Diritto internazionale",
  "Sviluppo di app mobile",
];
export const recensioniLezione = [
  {
    nome: "Alessia Rossi",
    recensione:
      "Lezione fantastica! Il docente ha spiegato in modo chiaro, mantenendo alta l'attenzione. Piattaforma intuitiva e coinvolgente.",
    photo: " https://picsum.photos/300",
  },
  {
    nome: "Marco Bianchi",
    recensione:
      "Materiale ben organizzato, spiegazioni chiare e dettagliate. Ottima interazione con il docente.",
    photo: " https://picsum.photos/100",
  },
  {
    nome: "Francesca Verdi",
    recensione:
      "Lezione interessante e informativa. Docente competente con esempi pratici. Piattaforma stabile.",
    photo: " https://picsum.photos/200",
  },
  {
    nome: "Luca Neri",
    recensione:
      "Lezione online eccezionale! Docente coinvolgente, attività interattive e flessibilità nell'apprendimento.",
    photo: " https://picsum.photos/400",
  },
  {
    nome: "Giulia Rossetti",
    recensione: "Flessibilità apprezzata. Comunicazione efficace, partecipazione da qualsiasi luogo.",
    photo: " https://picsum.photos/500",
  },
  {
    nome: "Roberto Conti",
    recensione:
      "Lezione ben strutturata, ambiente collaborativo. Risposte immediate alle domande degli studenti.",
    photo: " https://picsum.photos/600",
  },
  {
    nome: "Elena Mancini",
    recensione: "Esperienza positiva. Docente attento alle domande, registrazione utile per la revisione.",
    photo: "https://picsum.photos/700",
  },
  {
    nome: "Andrea Russo",
    recensione: "Lezione utile e interattiva. Approccio pratico, discussione stimolante.",
    photo: " https://picsum.photos/800",
  },
  {
    nome: "Valentina Ferri",
    recensione: "Lezione ben organizzata, flessibilità nell'accesso. Risorse aggiuntive apprezzate.",
    photo: " https://picsum.photos/900",
  },
  {
    nome: "Giovanni Leone",
    recensione: "Eccellente lezione! Docente competente, piattaforma user-friendly, interazione arricchente.",
    photo: " https://picsum.photos/150",
  },
];

//FUNZIONE CHE FETCHA GLI INSEGNANTI:
export const getTeacherAction = () => {
  return async (dispatch) => {
    //const token = state.userLogin?.userLogin?.accessToken;

    //possiamo chiamare la funzione dispatch(primo parametro, che è un dispatcher interno alla funzione) dopo la funzione asincrona
    try {
      const response = await fetch("http://localhost:8080/annuncio/listaAnnunci", {
        /* headers: {
          Authorization: `Bearer ${token}`,
        },*/
      });

      if (response.ok) {
        const fetchedTeachers = await response.json();
        dispatch({
          type: GET_TEACHER,
          payload: fetchedTeachers,
        });
      } else {
        dispatch({
          type: GET_TEACHER_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TEACHER_ERROR,
      });
    }
  };
};

//FEATURE PER AGGIUNGERE UN INSEGNANTE AI FAVORITI:(funzione che torna l'azione)
export const addToFavourite = (insegnante) => ({
  type: ADD_TO_FAVOURITE,
  payload: insegnante,
});

//Funzione disconnetti
export const handleLogout = () => {
  window.location.reload();
};

//funzione di aggiunta nel database di un nuovo annuncio creato
export const addAnnuncioInfoAction = (annuncio, userName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/annuncio/creaAnnuncio/${userName?.username}`, {
        method: "POST",
        body: JSON.stringify(annuncio),
        headers: {
          Authorization: `Bearer ${userName?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({
          type: SEND_ANNUNCIO,
          payload: annuncio,
        });
        dispatch({
          type: "IS_CREATED",
        });
      } else {
        alert("qualcosa è andato storto");
      }
    } catch (error) {
      alert("Errore", error);
    }
  };
};

//funzione prima lettera di una stringa in maiuscolo
export const firstLetterUpperCaseAction = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

//fetch di utente selezionato da un annuncio:
export const searchFetchedProfileAction = (setSelectedUser, url) => {
  return async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/trovaUtenteByUsername` + url);
      if (response.ok) {
        const responseData = await response.json();
        setSelectedUser(responseData);
        console.log("chiamata action");
      } else {
      }
    } catch (error) {
      alert("FATAL ERROR", error);
    }
  };
};

//ACTION DI LOGIN
export const loginAction = (e, user, navigate, timeout) => {
  return async (dispatch) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: SET_LOGIN_INFORMATION,
          payload: data,
        });

        dispatch({
          type: "SET_IS_LOGGED",
        });

        if (timeout) {
          timeout();
        }
      } else {
        navigate("*");
      }
    } catch (error) {
      navigate("*");
    }
  };
};
