import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import '../../App.css'


import { graphql, compose } from 'react-apollo'
import { getOwnerProperties } from '../../Queries/queries'


class ShowProperties extends Component {

    constructor(props) {
        super(props)
        this.state = {
            responseData: null,
            propertyData: null,
            redirect: null,
            refresh:false
        }
        this.showDetails = this.showDetails.bind(this)
        this.uploadPropertyImages = this.uploadPropertyImages.bind(this)
    }

    componentDidMount() {
        console.log("Getting all properties")
        this.props.getOwnerProperties({
            variables:{
                id:localStorage.getItem("ownerlogin")
            }
        }) 
        .then(response => {
            console.log(response.data.getOwnerProperties)
            if(response.data.getOwnerProperties){
                this.setState({
                    responseData:response.data.getOwnerProperties.properties
                })
            }
        })       
    }

    showDetails = (e) => {

        // var headers = new Headers()
        // axios.defaults.withCredentials = true

        // axios.get("http://localhost:3001/property/" + e.target.id)
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log("Got the details");
        //             this.setState({
        //                 propertyData: response.data
        //             })
        //         }
        //     })
        this.props.history.push({
            pathname:'/owner/property/edit',
            state : {
                _id : e.target.id
            }
        })
    }

    uploadPropertyImages = (e) => {
        console.log("should be redirected", e.target.id)
        this.setState({
            redirect: e.target.id
        })
    }

    deletePropertyImages = (e) => {
        console.log("should be redirected", e.target.id)
        var headers = new Headers()

        axios.defaults.withCredentials = true;
        axios.delete("http://localhost:3001/property/"+e.target.id+"/upload")
            .then(response => {
                if(response.status === 200){
                    console.log("photos are deleted")
                    this.setState({
                        refresh:true
                    })
                }
            })
    }


    render() {
        let renderRedirect = null;
        if (!localStorage.getItem("ownerlogin")) {
            console.log("should redirect")
            renderRedirect = <Redirect to="/owner/login" />
        }
        // if (this.state.propertyData) {
        //     renderRedirect = <Redirect to={{
        //         pathname: '/owner/property/edit',
        //         state: { responseData: this.state.propertyData }
        //     }} />
        // }
        if (this.state.redirect !== null) {
            console.log("should be redirected")
            renderRedirect = <Redirect to={{
                pathname: '/property/upload',
                state: { _id: this.state.redirect }
            }} />
        }
        var list = null
        if (this.state.responseData) {
            var buttons = this.state.responseData.map(placeDetail => {
                var images = placeDetail.property_images
                console.log(placeDetail.id)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail.id}>{placeDetail.place_name}</a></h3>
                            <p class="text-warning">{placeDetail.headline}</p>
                            <p><b>Description: </b>{placeDetail.description}</p>
                            <p><b>Property Details: </b>{placeDetail.bedrooms} BR &middot;{placeDetail.bathrooms} BA &middot;Sleeps {placeDetail.accomodates}</p>
                            <p><b>Location, City: </b>{placeDetail.location_city}</p>
                            <p class="bg-light"><b>Base Nightly Rate:</b>{" $" + placeDetail.price}</p>
                            <button type="button" id={placeDetail._id} onClick={this.showDetails} class="form-control-login btn-warning">Edit Property</button>
                        </td>
                    </tr>
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
                <div>
                    <h2 class="text-dark text-center">Properties you have added</h2>
                    <div class="form-body">
                        <div class="d-flex justify-content-left">
                            <table class="w-100 table-bordered bg-grey">
                                {buttons}
                            </table>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        )
    }
}


export default compose(
    graphql(getOwnerProperties,{ name: "getOwnerProperties" })
)(ShowProperties)