import _ from "lodash";
import cookies from 'react-cookies'
import { AUTHENTICATE_OWNER, OWNER_PROFILE, OWNER_BOOKINGS, EDIT_PROFILE, EDIT_PASSWORD,EDIT_PROFILEPIC,GET_PROPERTIES,LOAD_QUESTIONS,ANSWER_QUESTION } from "../Actions/ownerActions";


//Reducer listening to different action types
//initial state is {}
export default function (state = {}, action) {
  switch (action.type) {
    //target 
    case AUTHENTICATE_OWNER:
      console.log(action.payload)
      if(action.payload == "Invalid Credentials"){
        return {
          ...state,
          error: action.payload
        }
      }else{
        return {
          ...state,
          ownerInfo: action.payload
        }
      }
      
    case OWNER_PROFILE:
      return {
        ...state,
        profileInfo: action.payload
      }
    case OWNER_BOOKINGS:
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
    case GET_PROPERTIES:
      return {
        ...state,
        ownerProperties:action.payload
      }
    case LOAD_QUESTIONS : 
      return{
        ...state,
        ownerInbox : action.payload
      }
    case ANSWER_QUESTION : 
      return{
        ...state,
        ownerInbox : action.payload
      }
    default:
      return state;
  }
}

