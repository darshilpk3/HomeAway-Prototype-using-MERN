import _ from "lodash";
import cookies from 'react-cookies'
import { AUTHENTICATE_TRAVELER, TRAVELER_PROFILE, TRAVELER_BOOKINGS, EDIT_PROFILE, EDIT_PASSWORD,EDIT_PROFILEPIC } from "../Actions";


//Reducer listening to different action types
//initial state is {}
export default function (state = {}, action) {
  switch (action.type) {
    //target 
    case AUTHENTICATE_TRAVELER:
      return {
        ...state,
        travelerInfo: action.payload
      }
    case TRAVELER_PROFILE:
      return {
        ...state,
        profileInfo: action.payload
      }
    case TRAVELER_BOOKINGS:
      return {
        ...state,
        bookingInfo: action.payload
      }
    case EDIT_PROFILE:
      return {
        ...state,
      }
    case EDIT_PROFILEPIC:
      return {
        ...state,
      }
    case EDIT_PASSWORD:
      return {
        ...state,
      }
    default:
      return state;
  }
}

