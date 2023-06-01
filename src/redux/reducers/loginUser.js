import { SET_LOGIN_INFORMATION } from "../actions";

const initialState = {
  userLogin: null,
};

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_INFORMATION:
      return {
        ...state,
        userLogin: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
