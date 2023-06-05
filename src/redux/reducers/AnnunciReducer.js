import { SEND_ANNUNCIO } from "../actions";

const initialState = {
  annuncioCreato: {},
  isCreated: null,
};

const annuncioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ANNUNCIO:
      return {
        ...state,
        annuncio: action.payload,
      };

    case "IS_CREATED":
      return {
        ...state,
        isCreated: true,
      };
    default:
      return state;
  }
};

export default annuncioReducer;
