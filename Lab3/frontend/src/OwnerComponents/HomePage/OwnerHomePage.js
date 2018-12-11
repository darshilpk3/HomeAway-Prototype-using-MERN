import React, { Component } from 'react';
import '../../App.css'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import axios from 'axios'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

import PropTypes from 'prop-types';
import { ownerBookings } from '../../Actions/ownerActions'

import { graphql, compose } from 'react-apollo'
import { getOwnerBookings } from '../../Queries/queries'



class OwnerHomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            responseData: null,
            filteredBookingDetails: null,
            paginatedBookingDetails: null,
            pageCount: 0,
            filterDate: "",
            filterPlace: ""
        }
    }

    componentDidMount() {
        var headers = new Headers()
        let id = localStorage.getItem("ownerlogin")
        this.props.getOwnerBookings({
            variables: {
                owner_id: localStorage.getItem("ownerlogin")
            }
        })
            .then(response => {
                console.log("Bookings are: ", response.data.getOwnerBookings)
                const pageCount = Math.ceil(response.data.getOwnerBookings.length / 2)
                this.setState({
                    bookingDetails: response.data.getOwnerBookings,
                    filteredBookingDetails: response.data.getOwnerBookings,
                    pageCount: pageCount
                }, () => {
                    console.log(this.state.filteredBookingDetails)
                    const filteredBookingDetails = this.state.filteredBookingDetails
                    this.setState({
                        paginatedBookingDetails: filteredBookingDetails.slice(0, 2)
                    })
                })
            })
    }

    handleChange = (e) => {
        console.log("handleChange called")
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    filterResult = () => {
        if (this.state.filterPlace && !this.state.filterDate) {
            const oldList = this.state.responseData
            const filterPlace = this.state.filterPlace.toLowerCase()
            console.log("place to be filtered ", filterPlace)
            console.log("oldList: ", oldList)
            this.setState({
                filteredBookingDetails: _.filter(oldList, function (o) { return o.property.place_name.toLowerCase().includes(filterPlace) })
            }, () => {
                var tempList = this.state.filteredBookingDetails
                this.setState({
                    pageCount: Math.ceil(tempList.length / 2),
                    paginatedBookingDetails: tempList.slice(0, 2)
                })
                console.log("Filtered List: ", this.state.filteredBookingDetails)
            })
        } else if (!this.state.filterPlace && this.state.filterDate) {
            const oldList = this.state.responseData
            const filterDate = this.state.filterDate
            this.setState({
                filteredBookingDetails: _.filter(oldList, function (o) { return (new Date(o.booking_from).valueOf() == new Date(filterDate).valueOf() || new Date(o.booking_to).valueOf() == new Date(filterDate).valueOf()) })
            }, () => {
                var tempList = this.state.filteredBookingDetails
                this.setState({
                    pageCount: Math.ceil(tempList.length / 2),
                    paginatedBookingDetails: tempList.slice(0, 2)
                })
                console.log("Filtered List: ", this.state.filteredBookingDetails)
            })
        } else if (this.state.filterPlace && this.state.filterDate) {
            const oldList = this.state.responseData
            const filterPlace = this.state.filterPlace.toLowerCase()
            console.log("place to be filtered ", filterPlace)
            console.log("oldList: ", oldList)
            this.setState({
                filteredBookingDetails: _.filter(oldList, function (o) { return o.property.place_name.toLowerCase().includes(filterPlace) })
            }, () => {
                var tempList = this.state.filteredBookingDetails
                const filterDate = this.state.filterDate
                this.setState({
                    filteredBookingDetails: _.filter(tempList, function (o) { return (new Date(o.booking_from).valueOf() == new Date(filterDate).valueOf() || new Date(o.booking_to).valueOf() == new Date(filterDate).valueOf()) })
                }, () => {
                    var tempList = this.state.filteredBookingDetails
                    this.setState({
                        pageCount: Math.ceil(tempList.length / 2),
                        paginatedBookingDetails: tempList.slice(0, 2)
                    })
                    console.log("Filtered List: ", this.state.filteredBookingDetails)
                })

            })
        }
    }

    clearFilter = (e) => {
        const oldList = this.state.responseData
        this.setState({
            filterPlace: "",
            filterDate: "",
            filteredBookingDetails: oldList
        }, () => {
            var tempList = this.state.filteredBookingDetails
            this.setState({
                pageCount: Math.ceil(tempList.length / 2),
                paginatedBookingDetails: tempList.slice(0, 2)
            })
            console.log("Filtered List: ", this.state.filteredBookingDetails)
        })
    }


    render() {

        let redirectVar = null;
        console.log(localStorage.getItem("ownerlogin"))
        if (!localStorage.getItem("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }

        if (this.state.paginatedBookingDetails) {
            var buttons = this.state.paginatedBookingDetails.map(placeDetail => {
                console.log(placeDetail)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><p class="text-dark" id={placeDetail.property._id}>{placeDetail.property.place_name}</p></h3>
                            <p class="text-warning">{placeDetail.property.headline}</p>
                            <p><b>Booked By: </b>{placeDetail.traveler.firstname + " " + placeDetail.traveler.lastname}</p>
                            <p><b>From: </b>{new Date(placeDetail.booking_from.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</p>
                            <p><b>To: </b>{new Date(placeDetail.booking_to.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</p>
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
                <br></br><br></br><br></br>
                <div class="d-flex flex-row justify-content-center align-items-center px-5">
                    <input type="text" class="form-control" onChange={this.handleChange} value={this.state.filterPlace} placeholder="Place Name" name="filterPlace" />
                    <div class="input-group-append">
                        <span class="input-group-text">
                            <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Place by Name</button>
                        </span>
                    </div>
                    <input type="date" class="form-control" value={this.state.filterDate} onChange={this.handleChange} name="filterDate" />
                    <div class="input-group-append">
                        <span class="input-group-text">
                            <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter By Date</button>
                        </span>
                    </div>
                    <button type="button" class="form-control-login btn-warning" onClick={this.clearFilter} >Clear Filter</button>
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
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        )
    }
}

export default compose(
    graphql(getOwnerBookings, { name: "getOwnerBookings" })
)(OwnerHomePage);
