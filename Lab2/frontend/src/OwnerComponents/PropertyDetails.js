import React, { Component } from 'react'
import '../App.css'
import cookies from 'react-cookies'
import { Redirect } from 'react-router'
import axios from 'axios';
import cookie from 'react-cookies';
import NavBar from '../TravellerComponents/NavBar/NavBar2';

class PropertyDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            details:null
        }
    }


    componentDidMount() {
        if(this.props.location.state._id){
            
            var headers = new Headers()
            axios.defaults.withCredentials = true
            const id = this.props.location.state._id
            axios.get("http://localhost:3001/property/"+id)
                .then(response => {
                    if(response.status === 200){
                        this.setState({
                            details : response.data
                        })
                    }
                })
        }
    }

    render() {
        let redirectVar = null;

        if (this.state.details) {
            var images = this.state.details.property_images
            var photos = images.map(image => {
                console.log(image)
                return (
                    <div class="carousel-item">
                        <img class="d-block w-100" src={"http://localhost:3001" + image} alt="Photo slide" />
                    </div>
                )
            })
            var buttons =
                <div id={"carouselExampleControls"} class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={"http://localhost:3001/public/uploads/ha.jpeg"} alt="First slide" />
                        </div>
                        {photos}
                    </div>
                    <a class="carousel-control-prev" href={"#carouselExampleControls"} role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href={"#carouselExampleControls"} role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
        }
        return (
            <div>
                {redirectVar}
                <div class="clearfix" />
                <hr></hr>
                <h2 class="text-dark p-2 text-center">Property Details</h2>
                <h3 class="text-dark p-2 text-center"><b>{this.state.details && this.state.details.place_name}</b></h3>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            {buttons}
                            <h3 class="form-header text-left text-dark"><b>{this.state.details && this.state.details.place_name}</b></h3>
                            <p class="form-footer text-left text-warning">{this.state.details && this.state.details.headline}</p>
                            <hr></hr>
                            <h5 class="p-2"><b>Details</b></h5>
                            <div class="d-flex flex-row">

                                <p>Town House</p>
                                <p class="px-4">Sleeps {this.state.details && this.state.details.accomodates}</p>
                                <p class="px-4">Bedrooms {this.state.details && this.state.details.bedrooms}</p>
                                <p class="px-4">Bathrooms: {this.state.details && this.state.details.bathrooms}</p>
                            </div>
                            <hr></hr>
                            <h5><b>About the property</b></h5>
                            <p>{this.state.details && this.state.details.description}</p>
                            <p>What's nearby:</p>
                            <p>This house is located near the North Park neighborhood, where you'll find a bustling collection of cafés, bars, and restaurants. It is also a short drive to the San Diego Zoo, the Air & Space Museum, Morley Field Sports Complex, and Balboa Park, among other attractions. The beach is also within easy driving distance</p>
                            <hr></hr>
                            <h5><b>Amenities</b></h5>
                            <table class="table table-striped mw-100">
                                <tbody>
                                    <tr>
                                        <th scope="row">Property Type:</th>
                                        <td>house</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Floor Area:</th>
                                        <td>468sq ft.</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">House Rules</th>
                                        <td>
                                            <tr>Check-in: 4:00 PM / Check-out: 11:00 AM</tr>
                                            <tr>Max. occupancy: 4</tr>
                                            <tr>Max. adults: 4</tr>
                                            <tr>Min. age of primary renter: 21</tr>
                                            <tr>Children welcome</tr>
                                        </td>
                                        <td>
                                            <tr>Parties/events not allowed</tr>
                                            <tr>Pets not allowed</tr>
                                            <tr>Non smoking only</tr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">General</th>
                                        <td>
                                            <tr>Clothes Dryer</tr>
                                            <tr>Hair Dryer</tr>
                                            <tr>Internet</tr>
                                            <tr>Parking</tr>
                                            <tr>Living Room</tr>
                                        </td>
                                        <td>
                                            <tr>Washing Machine</tr>
                                            <tr>Free Wifi</tr>
                                            <tr>Unlimited Buffet</tr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyDetails;