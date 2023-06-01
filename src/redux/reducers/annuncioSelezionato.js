import { GET_ANNUNCIO_SELEZIONATO } from "../actions";

const initialState = {};

const annuncioSelezionatoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANNUNCIO_SELEZIONATO:
      return {
        ...state,
        annuncioSelezionato: action.payload,
      };
    default:
      return state;
  }
};

export default annuncioSelezionatoReducer;
