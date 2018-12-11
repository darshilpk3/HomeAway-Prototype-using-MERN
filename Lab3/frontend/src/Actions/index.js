import axios from "axios";
export const AUTHENTICATE_TRAVELER = "authenticate_traveler";
export const TRAVELER_PROFILE = "traveler_profile"
export const TRAVELER_BOOKINGS = "traveler_bookings"
export const EDIT_PROFILE = "edit_profile"
export const EDIT_PROFILEPIC = "edit_profilepic"
export const EDIT_PASSWORD = "edit_password"


const ROOT_URL = "http://localhost:3001";

//target action
export const authenticatetraveler = (credentials) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/travellogin`, credentials)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:AUTHENTICATE_TRAVELER,
                    payload:response.data
                })
            }
        });
}

export const  travelerProfile= (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/travel/${id}`)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:TRAVELER_PROFILE,
                    payload:response.data
                })
            }
        });
}

export const  travelerBookings= (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/travel/${id}/bookingdetails`)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:TRAVELER_BOOKINGS,
                    payload:response.data
                })
            }
        });
}

export const  editProfile= (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .put(`${ROOT_URL}/travel/${id}`,data)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:EDIT_PROFILE,
                    payload:response.data
                })
            }
        });
}

export const  editProfilePic= (id,formData) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/travel/${id}/upload`,formData)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:EDIT_PROFILEPIC,
                    payload:response.data
                })
            }
        });
}

export const  editPassword= (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .put(`${ROOT_URL}/travel/editpassword/${id}`,data)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:EDIT_PASSWORD,
                    payload:response.data
                })
            }
        });
}