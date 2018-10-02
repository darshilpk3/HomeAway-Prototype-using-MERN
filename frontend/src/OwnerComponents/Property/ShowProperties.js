import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import '../../App.css'

class ShowProperties extends Component {

    constructor(props) {
        super(props)
        this.state = {
            properties: null
        }
    }

    componentDidMount() {
        var headers = new Headers();
        var id = cookie.load("ownerlogin") && cookie.load("ownerlogin")
        axios.defaults.withCredentials = true;
        console.log("Getting the list of properties")
        axios.get("http://localhost:3001/owner/"+id+"/property/")
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({
                        properties: response.data
                    })
                }
            })

    }

    render() {
        let renderRedirect = null;
        if (!cookie.load("ownerlogin")) {
            console.log("should redirect")
            renderRedirect = <Redirect to="/owner/login" />
        }
        var list = null
        if(this.state.properties!==null){
            list = this.state.properties.map(property => {
                console.log(property.place_name)
                return(
                    <tr id={property.place_id}><button type="button" class="btn btn-primary">{property.place_name}</button></tr>
                )
            });
        }
        
        return (

            <div>
                {renderRedirect}
                <div>
                    <OwnerNavBar />
                </div>
                <div class="clearfix" />
                <table>
                    <th>Properties you have added</th>
                    {list}
                </table>
                <div class="clearfix"></div>
            </div>
        )
    }
}

export default ShowProperties