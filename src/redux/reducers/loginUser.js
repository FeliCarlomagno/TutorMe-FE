import { SET_LOGIN_INFORMATION } from "../actions";

const initialState = {
  userLogin: null,
  isLogged: null,
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_INFORMATION:
      return {
        ...state,
        userLogin: action.payload,
      };

    case "SET_IS_LOGGED":
      return {
        ...state,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
