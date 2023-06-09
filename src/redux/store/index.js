import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signupUserReducer from "../reducers/signupUserReducer";
import teacherReducer from "../reducers/teacherReducer";
import loginUserReducer from "../reducers/loginUser";
import annuncioReducer from "../reducers/AnnunciReducer";
import annuncioSelezionatoReducer from "../reducers/annuncioSelezionato";
import annuncioEditReducer from "../reducers/annuncioEdit";

const rootReducer = combineReducers({
  userSignUp: signupUserReducer,
  teachers: teacherReducer,
  userLogin: loginUserReducer,
  annuncioCreato: annuncioReducer,
  annuncioSelezionato: annuncioSelezionatoReducer,
  annuncioEdit: annuncioEditReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
