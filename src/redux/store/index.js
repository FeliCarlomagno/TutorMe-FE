import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupUserReducer from "../reducers/signupUserReducer";
import teacherReducer from "../reducers/teacherReducer";
import loginUserReducer from "../reducers/loginUser";
import annuncioReducer from "../reducers/AnnunciReducer";
import annuncioSelezionatoReducer from "../reducers/annuncioSelezionato";
import annuncioEditReducer from "../reducers/annuncioEdit";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
};

const rootReducer = combineReducers({
  userSignUp: signupUserReducer,
  teachers: teacherReducer,
  userLogin: loginUserReducer,
  annuncioCreato: annuncioReducer,
  annuncioSelezionato: annuncioSelezionatoReducer,
  annuncioEdit: annuncioEditReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
