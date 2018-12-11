import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';

import { store } from '../../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { travelerProfile, travelerBookings, editProfile, editPassword, editProfilePic } from '../../Actions'

import { graphql, compose } from 'react-apollo'
import { getTravelerDetails, editTravelerDetails, getTravelerBookings } from '../../Queries/queries'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            school: "",
            company: "",
            address: "",
            number: "",
            aboutme: "",
            languages: "",
            gender: "",
            message: "",
            selectedFile: "",
            image: "",
            bookingDetails: null,
            filteredBookingDetails: null,
            paginatedBookingDetails: null,
            pageCount: 0,
            filterDate: "",
            filterPlace: "",
            responseData: null,
            emailValid: false,
            firstnameValid: false,
            lastnameValid: false,
            passwordValid: false,
            schoolValid: false,
            addressValid: false,
            companyValid: false,
            numberValid: false,
            formValid: false,
            formErrors: { email: "", firstname: "", lastname: "", password: "", school: "", address: "", company: "", number: "" }
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            message: ""
        })
    }

    componentDidMount() {
        // console.log(this.props.travelerId)
        // var id = localStorage.getItem("loginuser")
        // this.props.travelerProfile(id)
        // this.props.travelerBookings(id)
        // console.log("Sending get request to http://localhost:3001/edit/" + id)
        const id = localStorage.getItem("loginuser")
        console.log("getting details of User: ", id)
        this.props.getTravelerDetails({
            variables: {
                id: id
            }
        })
            .then(response => {
                console.log(response.data.getTravelerDetails)
                if (response.data.getTravelerDetails) {
                    var data = response.data.getTravelerDetails
                    this.setState({
                        email: data.email,
                        firstname: data.firstname,
                        password: data.password,
                        lastname: data.lastname,
                        school: data.school,
                        address: data.address,
                        company: data.company,
                        number: data.number,
                        aboutme: data.aboutme,
                        languages: data.languages,
                        gender: data.gender,
                        emailValid: true,
                        firstnameValid: true,
                        lastnameValid: true,
                        passwordValid: true,
                        schoolValid: true,
                        addressValid: true,
                        companyValid: true,
                        numberValid: true,
                        formValid: true
                    })
                }
            })
        this.props.getTravelerBookings({
            variables: {
                travel_id: localStorage.getItem("loginuser")
            }
        })
            .then(response => {
                console.log("Bookings are: ", response.data.getTravelerBookings)
                const pageCount = Math.ceil(response.data.getTravelerBookings.length / 2)
                this.setState({
                    bookingDetails: response.data.getTravelerBookings,
                    filteredBookingDetails: response.data.getTravelerBookings,
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
        if ([e.target.name] == "profileImage") {
            console.log("e.target.file: ", e.target.files[0])
            this.setState({
                selectedFile: e.target.files[0]
            })
            console.log(this.state.selectedFile)
        } else {
            const name = e.target.name
            const value = e.target.value
            this.setState({
                [name]: value
            }, () => {
                this.validateField(name, value)
            });
        }

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let passwordValid = this.state.passwordValid;
        let schoolValid = this.state.schoolValid;
        let addressValid = this.state.addressValid;
        let companyValid = this.state.companyValid;
        let numberValid = this.state.numberValid;

        switch (fieldName) {
            case 'email':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailValid = value.length >= 1;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'firstname':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                firstnameValid = value.length > 0;
                fieldValidationErrors.firstname = firstnameValid ? '' : ' is invalid';
                break;
            case 'lastname':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                lastnameValid = value.length > 0;
                fieldValidationErrors.lastname = lastnameValid ? '' : ' is invalid';
                break;
            case 'password':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                passwordValid = value.length > 0;
                fieldValidationErrors.password = passwordValid ? '' : ' is invalid';
                break;
            case 'address':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                addressValid = value.length > 0;
                fieldValidationErrors.address = addressValid ? '' : ' is invalid';
                break;
            case 'school':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                schoolValid = value.length > 0;
                fieldValidationErrors.school = schoolValid ? '' : ' is invalid';
                break;
            case 'company':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                companyValid = value.length > 0;
                fieldValidationErrors.company = companyValid ? '' : ' is invalid';
                break;
            case 'number':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                numberValid = value.length == 10;
                fieldValidationErrors.number = numberValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid,
            passwordValid: passwordValid,
            schoolValid: schoolValid,
            addressValid: addressValid,
            companyValid: companyValid,
            numberValid: numberValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.firstnameValid && this.state.lastnameValid && this.state.passwordValid && this.state.addressValid && this.state.numberValid && this.state.schoolValid && this.state.companyValid });
    }


    saveChange = (e) => {
        // var headers = new Headers();
        // axios.defaults.withCredentials = true;
        e.preventDefault()
        console.log("Editing Profile")
        this.props.editTravelerDetails({
            variables: {
                id: localStorage.getItem("loginuser"),
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                number: this.state.number,
                school: this.state.school,
                company: this.state.company,
                aboutme: this.state.aboutme,
                languages: this.state.languages,
                gender: this.state.gender
            }
        })
            .then(response => {
                console.log(response.data.editTravelerDetails)
            })
    }

    handlePageClick = (e) => {
        var temp = this.state.filteredBookingDetails.slice(e.selected * 2, (e.selected * 2) + 2)
        console.log(temp)
        this.setState({
            paginatedBookingDetails: temp
        })
    }

    filterResult = () => {
        if (this.state.filterPlace && !this.state.filterDate) {
            const oldList = this.state.bookingDetails
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
            const oldList = this.state.bookingDetails
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
            const oldList = this.state.bookingDetails
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
        const oldList = this.state.bookingDetails
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

        let redirectVar = null
        console.log(this.state.image)
        if (!localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        }
        if (this.state.responseData) {
            console.log("should be redirected")
            redirectVar = <Redirect to={{
                pathname: "/traveller/property/show",
                state: {
                    response: this.state.responseData,
                }
            }} />
        }
        console.log("Rendering")
        console.log(this.state.bookingDetails)
        var placeDetail = null;
        console.log(typeof this.state.bookingDetails)

        if (this.state.paginatedBookingDetails) {
            var buttons = this.state.paginatedBookingDetails.map(placeDetail => {
                console.log(new Date(placeDetail.booking_from))
                console.log("booking from while making buttons: ", new Date(placeDetail.booking_from))
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail._id}>{placeDetail.property.place_name}</a></h3>
                            <p><b>Location, City: </b>{placeDetail.property.location_city}</p>
                            <p class="text-warning">{placeDetail.property.headline}</p>
                            <p><b>From: </b>{new Date(placeDetail.booking_from.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</p>
                            <p><b>To: </b>{new Date(placeDetail.booking_to.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</p>
                            <p><b>Guests: </b>{placeDetail.guests}</p>
                            <p class="bg-light"><b>Base Nightly Rate was:</b>{" $" + placeDetail.property.price}</p>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <Navbar />
                </div>
                <div class="clearfix"></div>
                <div>
                    <Tabs defaultIndex={1}>
                        <TabList>
                            <Tab>My Trips</Tab>
                            <Tab>Profile</Tab>
                            <Tab>Account</Tab>
                        </TabList>
                        <TabPanel>
                            <div>
                                <div class="d-flex justify-content-center">
                                    <div class="row">
                                        <div class="col-sm-3 mx-auto">
                                            <input type="text" class="form-control" onChange={this.handleChange} value={this.state.filterPlace} placeholder="Place Name" name="filterPlace" />
                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Place by Name</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 mx-auto">
                                            <div class="input-group">
                                                <input type="date" class="form-control" value={this.state.filterDate} onChange={this.handleChange} name="filterDate" />
                                            </div>
                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter By Date</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 mx-auto">
                                            <button type="button" class="form-control-login btn-warning" onClick={this.clearFilter} >Clear Filter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1><b>Recent Trips</b></h1>
                            <div class="form-body">
                                <div class="d-flex justify-content-left">
                                    <table class="w-100">
                                        {buttons}
                                    </table>
                                </div>
                            </div>
                            <div class="center">
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
                        </TabPanel>
                        <TabPanel>
                            <div class="bg-grey">
                                <div class="container-fluid bg-grey">
                                    <div class="row">
                                        <div class="col-md-4 offset-md-4 text-align-center">
                                            <h1 class="form-header text-center">Edit Profile</h1>
                                        </div>
                                        <div class="col-md-4 offset-md-4 text-align-center">
                                            <footer class="form-footer">Keep it up-to-date! <a>Its always better</a></footer>
                                            <footer class="form-footer">{this.state.message}</footer>
                                            <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="form-body">
                                    <fieldset>
                                        <h3><b>Profile Information</b></h3>
                                        <hr></hr>
                                        <form class="form-group"     >
                                            <div class="flex-it">
                                                <input class="form-control" type="text" value={this.state.firstname} onChange={this.handleChange} placeholder="First Name" name="firstname" required />
                                                <input class="form-control" type="text" value={this.state.lastname} onChange={this.handleChange} placeholder="Last Name" name="lastname" required />
                                            </div>
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.address} onChange={this.handleChange} type="text" placeholder="city" name="address" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.school} type="text" onChange={this.handleChange} placeholder="school" name="school" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="text" value={this.state.company} onChange={this.handleChange} placeholder="company" name="company" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="text" value={this.state.number} onChange={this.handleChange} placeholder="mobile No" name="number" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="textarea" rows="10" value={this.state.aboutme} onChange={this.handleChange} placeholder="About yourself" name="aboutme" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="text" value={this.state.languages} onChange={this.handleChange} placeholder="languages" name="languages" />
                                            <div class="clearfix"></div>
                                            <select class="form-control" name="gender" value={this.state.gender} onChange={this.handleChange}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <div class="clearfix"></div>
                                            <input type="button" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes" onClick={this.saveChange}></input>
                                            <div class="clearfix"></div>
                                        </form>
                                    </fieldset>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <div class="bg-grey">
                                    <div class="container-fluid bg-grey">
                                        <div class="row">
                                            <div class="col-md-4 offset-md-4 text-align-center">
                                                <h1 class="form-header text-center">Account Settings</h1>
                                            </div>
                                            <div class="col-md-4 offset-md-4 text-align-center">
                                                <footer class="form-footer">Keep it up-to-date! <a>Its always better</a></footer>
                                                <footer class="form-footer text-danger">{this.state.message}</footer>
                                                <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <hr></hr>
                                    <form class="md-form" enctype="multipart/form-data">
                                        <div class="file-field d-flex justify-content-center">
                                            <div class="mb-4">
                                                <img src={this.state.image} class="rounded-circle z-depth-1-half avatar-pic" alt="example placeholder avatar" />
                                                <h4><b>{this.state.firstname + " " + this.state.lastname}</b></h4>
                                            </div>
                                        </div>
                                        <div class="file-field d-flex justify-content-center ">
                                            <input type="file" name="profileImage" onChange={this.handleChange}></input>
                                            <input type="submit" class="btn btn-warning" value="Change" />
                                        </div>
                                    </form>

                                    <div class="form-body">
                                        <fieldset>
                                            <h5><b>Change your email address</b></h5>
                                            <hr></hr>
                                            <form class="form-group"     >
                                                <div class="flex-it">
                                                    <label>Email Address: </label>
                                                    <input class="form-control" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email address" name="email" />
                                                </div>
                                                <br></br>
                                                <p class="text-danger text-center">This will update your account email address for future reservations. If you need to update your email address for an existing reservation, please reach out to the owner or property manager, and they can update their records.</p>
                                                <div class="clearfix"></div>
                                                <input type="submit" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes"></input>
                                                <div class="clearfix"></div>
                                            </form>
                                        </fieldset>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="form-body">
                                        <fieldset>
                                            <h5><b>Change your password</b></h5>
                                            <hr></hr>
                                            <form class="form-group">
                                                <div class="flex-it">
                                                    <label>Password: </label>
                                                    <input class="form-control" type="password" onChange={this.handleChange} value={this.state.password} placeholder="password" name="password" />
                                                </div>
                                                <div class="clearfix"></div>
                                                <input type="submit" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes"></input>
                                                <div class="clearfix"></div>
                                            </form>
                                        </fieldset>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

        )
    }
}



export default compose(
    graphql(editTravelerDetails, { name: "editTravelerDetails" }),
    graphql(getTravelerDetails, { name: "getTravelerDetails" }),
    graphql(getTravelerBookings, { name: "getTravelerBookings" })
)(EditProfile);