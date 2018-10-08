import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import Footer from '../Footer/Footer'
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import InlineForm from '../InlineForm/InlineForm';
import axios from 'axios'
class ListPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null
        }
        this.showDetails = this.showDetails.bind(this);
    }

    showDetails = (e) => {

        var headers = new Headers()
        e.preventDefault()
        axios.defaults.withCredentials = true

        const place_id = e.target.id
        console.log("Details should be shown: " + place_id)
        axios.get("http://localhost:3001/property/" + place_id)
            .then(response => {
                console.log("Response from get method: ", response.data)
                this.setState({
                    responseData: response.data[0]
                })
            })
    }
    render() {
        let redirectVar = null
        if (!cookie.load("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        }
        if (this.state.responseData) {
            console.log("should be redirected")
            redirectVar = <Redirect to={{
                pathname: "/traveller/property/show",
                state: {
                    response: this.state.responseData,
                    book_from: this.props.location.state && this.props.location.state.available_from,
                    book_to: this.props.location.state && this.props.location.state.available_to,
                    guests: this.props.location.state && this.props.location.state.accomodates
                }
            }} />
        }
        console.log(this.props.location.state && this.props.location.state.place)
        var form_values = {
            place: this.props.location.state && this.props.location.state.place,
            available_from: this.props.location.state && this.props.location.state.available_from,
            available_to: this.props.location.state && this.props.location.state.available_to,
            accomodates: this.props.location.state && this.props.location.state.accomodates
        }
        console.log(form_values)
        //var places_list = this.props.loaction.state && this.props.location.state.places_list;
        //console.log(this.props.location.state.places_list)
        if (typeof this.props.location.state != "undefined") {
            var buttons = this.props.location.state.places_list.map(placeDetail => {
                var images = placeDetail.property_images.split(",")
                return (
                    <tr>
                        <td class="property-image-carousel">
                            <div id={"carouselExampleControls" + placeDetail.place_id} class="carousel slide" data-ride="carousel">
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
                                <a class="carousel-control-prev" href={"#carouselExampleControls" + placeDetail.place_id} role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href={"#carouselExampleControls" + placeDetail.place_id} role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail.place_id} onClick={this.showDetails}>{placeDetail.place_name}</a></h3>
                            <p class="text-warning">{placeDetail.headline}</p>
                            <p><b>Description: </b>{placeDetail.description}</p>
                            <p><b>Property Details: </b>{placeDetail.bedrooms} BR &middot;{placeDetail.bathrooms} BA &middot;Sleeps {placeDetail.accomodates}</p>
                            <p><b>Location, City: </b>{placeDetail.location_city}</p>
                            <p class="bg-light"><b>Base Nightly Rate:</b>{" $" + placeDetail.price}</p>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <div>
                {redirectVar}
                <NavBar />
                <div class="clearfix" />
                <br></br>
                <h1 class="text-primary">Modify Search</h1>
                <div class="d-flex justify-content-center">
                    <InlineForm form_values={form_values} />
                </div>
                <div class="clearfix"></div>
                <hr></hr>
                <div>
                    <h2 class="text-dark text-center">Search Results</h2>
                    <div class="form-body">
                        <div class="d-flex justify-content-left">
                            <table class="w-100 table-bordered bg-grey">
                                {buttons}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPlaces