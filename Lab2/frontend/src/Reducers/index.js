import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import TravelReducer from "./traveler_reducer";

const rootReducer = combineReducers({
  traveler: TravelReducer
//   form: formReducer
});

export default rootReducer;
  