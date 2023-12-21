import { IS_SIGNUP, LOGOUT, SET_USER_INFORMATION } from "../actions";

const initialState = {
  userSignUp: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
  isSignup: false,
};
const signupUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFORMATION:
      return {
        ...state,
        userSignUp: action.payload,
      };

    case IS_SIGNUP:
      return {
        ...state,
        isSignup: true,
      };

    case LOGOUT: {
      return {
        userSignUp: null,
        isSignup: false,
      };
    }

    default:
      return state;
  }
};

export default signupUserReducer;
