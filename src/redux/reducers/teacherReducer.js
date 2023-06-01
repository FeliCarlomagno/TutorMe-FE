import { GET_TEACHER, GET_TEACHER_ERROR } from "../actions";

const initialState = {
  //QUI FINIRANNO GLI INSEGNANTI UNA VOLTA FETCHATI dalla nostra funzione asincrona creata nell'action creator
  teacherStock: [],
  hasError: false,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER:
      return {
        ...state,
        teacherStock: action.payload,
      };

    case GET_TEACHER_ERROR:
      return {
        ...state,
        hasError: true,
      };

    default:
      return state;
  }
};

export default teacherReducer;
