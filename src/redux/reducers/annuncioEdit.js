import { GET_EDIT_ANNUNCIO, SET_ANNUNCIO_EDIT } from "../actions";

const initialState = {};

const annuncioEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EDIT_ANNUNCIO:
      return {
        ...state,
        annuncioEdit: action.payload,
      };
    case SET_ANNUNCIO_EDIT:
      return {
        ...state,
        annuncioEdit: action.payload,
      };

    default:
      return state;
  }
};

export default annuncioEditReducer;
