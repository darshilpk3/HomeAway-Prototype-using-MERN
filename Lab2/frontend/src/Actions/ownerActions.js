import axios from "axios";
export const AUTHENTICATE_TRAVELER = "authenticate_traveler";
export const TRAVELER_PROFILE = "traveler_profile"
export const TRAVELER_BOOKINGS = "traveler_bookings"
export const EDIT_PROFILE = "edit_profile"
export const EDIT_PROFILEPIC = "edit_profilepic"
export const EDIT_PASSWORD = "edit_password"


const ROOT_URL = "http://localhost:3001";

//target action
export const authenticateowner = (credentials) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/owner/login`, credentials)
        .then( response => {
            dispatch({ 
                type:AUTHENTICATE_OWNER,
                payload:response.data
            })
        });
}

export const  ownerProfile= (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/owner/${id}`)
        .then( response => {
            dispatch({ 
                type:OWNER_PROFILE,
                payload:response.data
            })
        });
}

export const ownerBookings= (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/owner/${id}/bookingdetails`)
        .then( response => {
            dispatch({ 
                type:OWNER_BOOKINGS,
                payload:response.data
            })
        });
}

export const  editProfile= (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .put(`${ROOT_URL}/owner/${id}`,data)
        .then( response => {
            dispatch({ 
                type:EDIT_PROFILE,
                payload:response.data
            })
        });
}


export const  editPassword= (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .put(`${ROOT_URL}/owner/editpassword/${id}`,data)
        .then( response => {
            dispatch({ 
                type:EDIT_PASSWORD,
                payload:response.data
            })
        });
}