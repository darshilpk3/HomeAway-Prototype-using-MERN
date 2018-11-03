import axios from "axios";
export const GET_PROPERTY = "get_property";
export const EDITING_PROPERTY = "editing_property"
export const GET_PROPERTIES = "get_properties"

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

export const  getProperties= (data) => dispatch => {

    axios.defaults.withCredentials = true
    const request = axios
        .post(`${ROOT_URL}/property/search`,data)
        .then( response => {
            if(response.status === 200){
                dispatch({ 
                    type:GET_PROPERTIES,
                    payload:response.data
                })
            }
            
        });
}