import axios from "axios";
export const GET_PROPERTY = "get_property";
export const EDITING_PROPERTY = "editing_property"


const ROOT_URL = "http://localhost:3001";

//target action
export const getProperty = (id) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .get(`${ROOT_URL}/property/${id}`)
        .then( response => {
            dispatch({ 
                type:GET_PROPERTY,
                payload:response.data
            })
        });
}


export const  editingProperty= (id,data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .put(`${ROOT_URL}/property/${id}`,data)
        .then( response => {
            dispatch({ 
                type:EDITING_PROPERTY,
                payload:response.data
            })
        });
}