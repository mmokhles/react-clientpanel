import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyB3x6W7UBrNK7MgMgdnrK6NXtlRs-9mO-c",
  authDomain: "reactclientpanel-cf073.firebaseapp.com",
  databaseURL: "https://reactclientpanel-cf073.firebaseio.com",
  projectId: "reactclientpanel-cf073",
  storageBucket: "reactclientpanel-cf073.appspot.com",
  messagingSenderId: "137856077852",
  appId: "1:137856077852:web:616c60f5222ee7413f8fd9",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

//init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

//check for settings in local storage

if (localStorage.getItem("settings") === null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };
  // set to local storage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
// Create init state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(rootReducer, initialState, composeEnhancers());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;
