import React, { Component } from 'react';
import '../../App.css'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import axios from 'axios'

import PropTypes from 'prop-types';
import {ownerBookings} from '../../Actions/ownerActions'


import {connect} from 'react-redux'

class OwnerHomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            responseData: null
        }
    }

    componentDidMount() {
        var headers = new Headers()
        axios.defaults.withCredentials = true;

        let id = cookie.load("ownerlogin")
        this.props.ownerBookings(id)
        // axios.get("http://localhost:3001/owner/" + id+"/dashboard")
        //     .then(response => {
        //         if (response.status === 200) {
                    // this.setState({
                    //     responseData: response.data
                    // })
        //         }
        //     })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bookingInfo){
            this.setState({
                responseData: nextProps.bookingInfo
            })
        }
    }

    render() {

        let redirectVar = null;
        console.log(cookie.load("ownerlogin"))
        if (!cookie.load("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }

        if (this.state.responseData) {
            var buttons = this.state.responseData.map(placeDetail => {
                console.log(placeDetail)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><p class="text-dark" id={placeDetail.property._id}>{placeDetail.property.place_name}</p></h3>
                            <p class="text-warning">{placeDetail.property.headline}</p>
                            <p><b>Booked By: </b>{placeDetail.traveler.firstname + " " +placeDetail.traveler.lastname}</p>
                            <p><b>From: </b>{new Date(placeDetail.booking_from).getFullYear()+"-"+new Date(placeDetail.booking_from).getMonth() +"-"+new Date(placeDetail.booking_from).getDate()}</p>
                            <p><b>To: </b>{new Date(placeDetail.booking_to).getFullYear()+"-"+new Date(placeDetail.booking_to).getMonth()+"-"+new Date(placeDetail.booking_to).getDate()}</p>
                            <p><b>Guests: </b>{placeDetail.guests}</p>
                            <p class="bg-light"><b>Base Nightly Rate:</b>{" $" + placeDetail.property.price}</p>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <OwnerNavBar />
                </div>
                <div class="clearfix"></div>
                <div>
                    <h2 class="text-dark text-center">Recent Bookings</h2>
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
OwnerHomePage.PropTypes = {
    ownerBookings:PropTypes.func.isRequired,
    bookingInfo : PropTypes.object
}

const mapStatetoProps = state => ({
    bookingInfo:state.owner.bookingInfo
})


export default connect(mapStatetoProps,{ownerBookings})(OwnerHomePage);
