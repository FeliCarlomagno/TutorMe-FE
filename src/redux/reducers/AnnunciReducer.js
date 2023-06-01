import { SEND_ANNUNCIO } from "../actions";

const initialState = {
  annuncioCreato: {},
};

const annuncioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ANNUNCIO:
      return {
        ...state,
        annuncio: action.payload,
      };
    default:
      return state;
  }
};

export default annuncioReducer;
