import _ from "lodash";
import cookies from 'react-cookies'
import { GET_PROPERTY, EDITING_PROPERTY } from "../Actions/propertyActions";


//Reducer listening to different action types
//initial state is {}
export default function (state = {}, action) {
  switch (action.type) {
    //target 
    case GET_PROPERTY:
      return {
        ...state,
        propertyInfo: action.payload
      }
    case EDITING_PROPERTY:
      return {
        ...state,
      }
    default:
      return state;
  }
}

