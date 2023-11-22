import { GET_ANNUNCIO_SELEZIONATO, GET_ANNUNCI_ERROR } from "../actions";

const initialState = {
  hasError: null,
};

const annuncioSelezionatoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANNUNCIO_SELEZIONATO:
      return {
        ...state,
        annuncioSelezionato: action.payload,
      };

    case GET_ANNUNCI_ERROR:
      return {
        hasError: true,
      };
    default:
      return state;
  }
};

export default annuncioSelezionatoReducer;
