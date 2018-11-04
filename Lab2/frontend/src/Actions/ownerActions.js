import axios from "axios";
export const AUTHENTICATE_OWNER = "authenticate_owner";
export const OWNER_PROFILE = "owner_profile"
export const OWNER_BOOKINGS = "owner_bookings"
export const EDIT_PROFILE = "edit_profile"
export const EDIT_PROFILEPIC = "edit_profilepic"
export const EDIT_PASSWORD = "edit_password"
export const GET_PROPERTIES = "get_properties"
export const LOAD_QUESTIONS = "load_questions"
export const ANSWER_QUESTION = "answer_question"


const ROOT_URL = "http://localhost:3001";

//target action
export const authenticateowner = (credentials) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/ownerlogin`, credentials)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:AUTHENTICATE_OWNER,
                    payload:response.data
                })    
            }
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
        .get(`${ROOT_URL}/owner/${id}/dashboard`)
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

 export const  getProperties = (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/owner/${id}/property`)
        .then( response => {
            dispatch({ 
                type:GET_PROPERTIES,
                payload:response.data
            })
        });
}

export const  loadInbox = (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/owner/${id}/question`)
        .then( response => {
            dispatch({ 
                type:LOAD_QUESTIONS,
                payload:response.data
            })
        });
}

export const  answerQuestion = (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/owner/${id}/question`,data)
        .then( response => {
            dispatch({ 
                type:ANSWER_QUESTION,
                payload:response.data
            })
        });
}