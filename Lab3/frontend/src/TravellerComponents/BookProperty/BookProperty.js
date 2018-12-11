import React, { Component } from 'react'
import '../../App.css'
import cookies from 'react-cookies'
import { Redirect } from 'react-router'
import axios from 'axios';
import cookie from 'react-cookies';
import NavBar from '../NavBar/NavBar';
import { graphql, compose } from 'react-apollo'
import { bookProperty } from '../../Queries/queries'

var swal = require('sweetalert')

class BookProperty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookingConfirmation: "",
            formValid: false,
            booking_from: "",
            booking_to: "",
            guests: ""
        }
        this.bookPlace = this.bookPlace.bind(this)
    }

    bookPlace = (e) => {
        e.preventDefault()
        console.log(this.props.location.state && this.props.location.state.response.id)

        this.props.bookProperty({
            variables: {
                travel_id: localStorage.getItem("loginuser"),
                property_id: this.props.location.state && this.props.location.state.response.id,
                booking_from: this.props.location.state && this.props.location.state.book_from,
                booking_to: this.props.location.state && this.props.location.state.book_to,
                guests: this.props.location.state && this.props.location.state.guests
            }
        })
        .then(response => {
            console.log(response.data.bookProperty)
            if(response.data.bookProperty && response.data.bookProperty=="Successfully Booked"){
                swal("Done","Booked","success")
                this.props.history.push("/traveller/home")
            }   
        })
    }

    componentDidMount() {
        this.setState({
            booking_from: this.props.location.state && this.props.location.state.book_from,
            booking_to: this.props.location.state && this.props.location.state.book_to,
            guests: this.props.location.state && this.props.location.state.guests
        }, () => {
            if (this.props.location.state && this.props.location.state.book_from) {
                this.setState({
                    formValid: true
                })
            }
        })
    }

    render() {
        console.log("this.props.location.state.response", this.props.location.state.response)
        Date.daysBetween = function (date1, date2) {
            //Get 1 day in milliseconds
            var one_day = 1000 * 60 * 60 * 24;

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();

            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;

            // Convert back to days and return
            return Math.round(difference_ms / one_day);
        }
        let nights = Date.daysBetween(new Date((this.props.location.state && this.props.location.state.book_from)), new Date((this.props.location.state && this.props.location.state.book_to)))
        //console.log(nights)
        let redirectVar = null;
        if (this.state.bookingConfirmation == "Booked") {
            redirectVar = <Redirect to="/traveller/home"></Redirect>
        }

        if (this.props.location.state && this.props.location.state.response.property_images) {
            var images = this.props.location.state.response.property_images
            var buttons =
                <div id={"carouselExampleControls"} class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={"http://localhost:3001" + images[1]} alt="First slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={"http://localhost:3001" + images[2]} alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={"http://localhost:3001" + images[3]} alt="Third slide" />
                        </div>
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
                < NavBar />
                <div class="clearfix" />
                <hr></hr>
                <h2 class="text-dark p-2">Property Details</h2>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            {buttons}
                            <h3 class="form-header text-left text-dark"><b>{this.props.location.state.response && this.props.location.state.response.place_name}</b></h3>
                            <p class="form-footer text-left text-warning">{this.props.location.state.response && this.props.location.state.response.headline}</p>
                            <hr></hr>
                            <h5 class="p-2"><b>Details</b></h5>
                            <div class="d-flex flex-row">

                                <p>Town House</p>
                                <p class="px-4">Sleeps {this.props.location.state.response && this.props.location.state.response.accomodates}</p>
                                <p class="px-4">Bedrooms {this.props.location.state.response && this.props.location.state.response.bedrooms}</p>
                                <p class="px-4">Bathrooms: {this.props.location.state.response && this.props.location.state.response.bathrooms}</p>
                                <p class="px-4">Stay: {nights}</p>
                            </div>
                            <hr></hr>
                            <h5><b>About the property</b></h5>
                            <p>{this.props.location.state.response && this.props.location.state.response.description}</p>
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
                        <div class="col-md-4 mx-auto sticky-top">
                            <div class="form-body">
                                <h3 class="text-center"><strong>Booking Overview</strong></h3>
                                <label class="text-center"><strong>Arrival: </strong></label>
                                <p>{this.props.location.state && this.props.location.state.book_from}</p>
                                <label class="text-center"><strong>Departure: </strong></label>
                                <p>{this.props.location.state && this.props.location.state.book_to}</p>
                                <label class="text-center"><strong>Base rate/night: </strong></label>
                                <p>${this.props.location.state && this.props.location.state.response.price}</p>
                                <label class="text-center"><strong>Total Nights: </strong></label>
                                <p>{nights}</p>
                                <h4 class="text-center text-danger"><strong>Total to be paid at checkout</strong></h4>
                                <h4 class="text-center text-danger"><strong>${nights * (this.props.location.state && this.props.location.state.response.price)}</strong></h4>
                                <button class="form-control-login btn btn-warning btn-lg" disabled={!this.state.formValid} onClick={this.bookPlace}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(bookProperty, { name: "bookProperty" })
)(BookProperty)