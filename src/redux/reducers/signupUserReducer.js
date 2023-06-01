import { SET_USER_INFORMATION } from "../actions";

const initialState = {
  userSignUp: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
};
const signupUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFORMATION:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default signupUserReducer;
