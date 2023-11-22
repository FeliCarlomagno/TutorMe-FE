import { SET_LOGIN_INFORMATION, SET_IS_LOGGED, LOGOUT } from "../actions";

const initialState = {
  userLogin: null,
  isLogged: false,
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_INFORMATION:
      return {
        ...state,
        userLogin: action.payload,
      };

    case SET_IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      };

    case LOGOUT:
      return {
        userLogin: null,
        isLogged: false,
      };

    default:
      return state;
  }
};

export default loginUserReducer;
