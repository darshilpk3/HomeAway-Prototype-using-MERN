import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import '../../App.css'

import PropTypes from 'prop-types';
import {getProperties} from '../../Actions/ownerActions'


import {connect} from 'react-redux'

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
        var headers = new Headers();
        var id = localStorage.getItem("ownerlogin") && localStorage.getItem("ownerlogin")
        axios.defaults.withCredentials = true;
        console.log("Getting the list of properties")
        this.props.getProperties(id)
        // axios.get("http://localhost:3001/owner/" + id + "/property")
        //     .then(response => {
        //         console.log(response.data)
        //         if (response.status === 200) {
                    // this.setState({
                    //     responseData: response.data
                    // })
        //         }
        //     })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ownerProperties){
            this.setState({
                responseData: nextProps.ownerProperties
            })
        }
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
        // if (this.state.redirect !== null) {
        //     console.log("should be redirected")
        //     renderRedirect = <Redirect to={{
        //         pathname: '/property/upload',
        //         state: { _id: this.state.redirect }
        //     }} />
        // }
        var list = null
        if (this.state.responseData) {

            var photos = (images) => images.map(image => {
                console.log(image)
                return (
                    <div class="carousel-item">
                        <img class="d-block w-100" src={"http://localhost:3001" + image} alt="Photo slide" />
                    </div>
                )
            })
            var buttons = this.state.responseData.map(placeDetail => {
                //var images = placeDetail.property_images
                console.log(placeDetail._id)
                return (
                    <tr>
                        <td class="property-image-carousel">
                            <div id={"carouselExampleControls" + placeDetail._id} class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src={"http://localhost:3001/public/uploads/ha.jpeg"} alt="First slide" />
                                    </div>
                                    {photos(placeDetail.property_images)}
                                </div>
                                <a class="carousel-control-prev" href={"#carouselExampleControls" + placeDetail._id} role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href={"#carouselExampleControls" + placeDetail._id} role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail._id} onClick={this.showDetails}>{placeDetail.place_name}</a></h3>
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

ShowProperties.PropTypes = {
    getProperties : PropTypes.func.isRequired,
    ownerProperties : PropTypes.object
}

const mapStatetoProps = state => ({
    ownerProperties: state.owner.ownerProperties
})

export default connect(mapStatetoProps,{getProperties})(ShowProperties)