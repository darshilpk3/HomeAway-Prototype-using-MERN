import _ from "lodash";
import cookies from 'react-cookies'
import { FETCH_TRAVELER,AUTHENTICATE_TRAVELER } from "../Actions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case FETCH_TRAVELER:
      console.log(...state)
      return {
        trial:action.payload 
      }
    case AUTHENTICATE_TRAVELER:
      return{
        ...state,
        travelerInfo:action.payload
      }
    default:
      return state;
  }
}
 