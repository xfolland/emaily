import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  survey: surveyReducer,
});
