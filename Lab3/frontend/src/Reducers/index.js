import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import TravelReducer from "./traveler_reducer";
import OwnerReducer from "./owner_reducer"
import PropertyReducer from './property_reducer'

const rootReducer = combineReducers({
  traveler: TravelReducer,
  owner : OwnerReducer,
  property : PropertyReducer
});

export default rootReducer;
  