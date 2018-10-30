import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';
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
            languages:"",
            gender:"",
            message: "",
            selectedFile: "",
            image: "",
            bookingDetails: null,
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
        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentWillMount() {
        this.setState({
            message: ""
        })
    }

    componentDidMount() {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        var id = cookie.load("loginuser")
        console.log("Sending get request to http://localhost:3001/edit/" + id)
        axios.get("http://localhost:3001/travel/" + id)
            .then(response => {
                console.log("inside response")
                if (response.status === 200) {
                    var data = response.data
                    console.log(data.profilePic)
                    this.setState({
                        email: data.email,
                        firstname: data.firstname,
                        password: data.password,
                        lastname: data.lastname,
                        school: data.school,
                        address: data.address,
                        company: data.company,
                        number: data.number,
                        aboutme:data.aboutme,
                        languages:data.languages,
                        gender:data.gender,
                        image: "http://localhost:3001" + data.profilePic,
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

        console.log("Sending get request to http://localhost:3001/bookingdetails/" + id)
        axios.get("http://localhost:3001/travel/"+id+"/bookingdetails" )
            .then(response => {
                console.log("Booking details available")
                if (response.status == 200) {
                    this.setState({
                        bookingDetails: response.data
                    })
                }
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
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        const data = {
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
        const id = cookie.load("loginuser")

        axios.put("http://localhost:3001/travel/" + id, data)
            .then(response => {
                //console.log("Trying to update")
                if (response.status === 200) {
                    console.log("Updated")
                    this.setState({
                        message: response.data,
                        edited:true
                    })
                }
            })
    }


    changeProfilePic = (e) => {

        var headers = new Headers();
        e.preventDefault();

        axios.defaults.withCredentials = true;
        console.log("While sending post request: " + this.state.selectedFile)
        let formData = new FormData();

        formData.append('email', this.state.email)
        formData.append('selectedFile', this.state.selectedFile)
        formData.append('id', cookie.load('loginuser'))

        console.log("formData is: ", formData.get('selectedFile'))
        axios.post("http://localhost:3001/travel/"+cookie.load('loginuser')+"/upload", formData)
            .then(response => {
                console.log("file should be  uploaded")
                if (response.status === 200) {
                    console.log("http://localhost:3001/" + response.data)
                    this.setState({
                        image: "http://localhost:3001" + response.data
                    })
                }
            })
    }

    changePassword = (e) => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        const data = {
            password: this.state.password
        }
        const id = cookie.load("loginuser")

        axios.put("http://localhost:3001/travel/editpassword/" + id, data)
            .then(response => {
                //console.log("Trying to update")
                if (response.status === 200) {
                    console.log("Updated")
                    this.setState({
                        message: response.data
                    })
                }
            })
    }
    showDetails = (e) => {

        var headers = new Headers()
        e.preventDefault()
        axios.defaults.withCredentials = true

        const _id = e.target.id
        console.log("Details should be shown: " + _id)
        axios.get("http://localhost:3001/property/" + _id)
            .then(response => {
                console.log("Response from get method: ", response.data)
                this.setState({
                    responseData: response.data[0]
                })
            })
    }

    render() {

        let redirectVar = null
        console.log(this.state.image)
        if (!cookie.load("loginuser")) {
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

        if (this.state.bookingDetails) {
            var buttons = this.state.bookingDetails.map(placeDetail => {
                console.log(placeDetail)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail._id} onClick={this.showDetails}>{placeDetail.property.place_name}</a></h3>
                            <p><b>Location, City: </b>{placeDetail.property.location_city}</p>
                            <p class="text-warning">{placeDetail.property.headline}</p>
                            <p><b>From: {new Date(placeDetail.booking_from).toDateString}</b></p>
                            <p><b>To: </b>{new Date(placeDetail.booking_to).getFullYear() + "-" + new Date(placeDetail.booking_to).getMonth() + "-" + new Date(placeDetail.booking_to).getDate()}</p>
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
                            <h1><b>Previous Trips</b></h1>
                            <div class="form-body">
                                <div class="d-flex justify-content-left">
                                    <table class="w-100">
                                        {buttons}
                                    </table>
                                </div>
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
                                    <form class="md-form"   enctype="multipart/form-data">
                                        <div class="file-field d-flex justify-content-center">
                                            <div class="mb-4">
                                                <img src={this.state.image} class="rounded-circle z-depth-1-half avatar-pic" alt="example placeholder avatar" />
                                                <h4><b>{this.state.firstname +" "+this.state.lastname}</b></h4>
                                            </div>
                                        </div>
                                        <div class="file-field d-flex justify-content-center ">
                                            <input type="file" name="profileImage" onChange={this.handleChange}></input>
                                            <input type="submit" class="btn btn-warning" value="Change" onClick={this.changeProfilePic}/>
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
                                                <input type="submit" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes" onClick={this.saveChange}></input>
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
                                                <input type="submit" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes" onClick={this.changePassword}></input>
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

export default EditProfile;