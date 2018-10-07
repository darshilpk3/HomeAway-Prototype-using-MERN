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
            responseData: null,
            propertyData: null,
            redirect: false
        }
        this.showDetails = this.showDetails.bind(this)
    }

    componentDidMount() {
        var headers = new Headers();
        var id = cookie.load("ownerlogin") && cookie.load("ownerlogin")
        axios.defaults.withCredentials = true;
        console.log("Getting the list of properties")
        axios.get("http://localhost:3001/owner/" + id + "/property")
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({
                        responseData: response.data
                    })
                }
            })

    }

    showDetails = (e) => {

        var headers = new Headers()
        axios.defaults.withCredentials = true

        axios.get("http://localhost:3001/property/" + e.target.id)
            .then(response => {
                if (response.status === 200) {
                    console.log("Got the details");
                    this.setState({
                        propertyData: response.data
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
        if (this.state.propertyData) {
            renderRedirect = <Redirect to={{
                pathname: '/owner/property/edit',
                state: { responseData: this.state.propertyData }
            }} />
        }
        var list = null
        if (this.state.responseData) {
            var buttons = this.state.responseData.map(placeDetail => {
                return (
                    <tr>
                        <td class="property-image-carousel">
                            <div id={"carouselExampleControls" + placeDetail.place_id} class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/walk-thru-closet-100x50.jpg" alt="First slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/living-room-windows.jpg" alt="Second slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/bathroom.jpg" alt="Third slide" />
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

export default ShowProperties