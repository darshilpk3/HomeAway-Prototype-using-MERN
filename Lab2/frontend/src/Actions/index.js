import axios from "axios";
import cookies from 'react-cookies'
export const AUTHENTICATE_TRAVELER = "authenticate_traveler";
export const FETCH_TRAVELER = "fetch_traveler";
//export const CREATE_BOOK = "create_book";

const ROOT_URL = "http://localhost:3001";

//target action
export const authenticatetraveler = (credentials) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/travel/login`, credentials)
        .then( response => {
            dispatch({ 
                type:AUTHENTICATE_TRAVELER,
                payload:response.data
            })
        });

    return {
        type: AUTHENTICATE_TRAVELER,
        payload: request
    };
}

export const fetchtraveler = () => dispatch => {
    dispatch({
        type: FETCH_TRAVELER,
        payload: "hello"
    })
}