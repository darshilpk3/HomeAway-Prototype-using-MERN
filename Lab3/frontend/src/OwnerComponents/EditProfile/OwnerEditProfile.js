import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import md5 from 'md5'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';
import OwnerNavBar from '../NavBar/OwnerNavBar';

import PropTypes from 'prop-types';
import {ownerProfile,editProfile,editPassword} from '../../Actions/ownerActions'


import {connect} from 'react-redux'

class OwnerEditProfile extends Component {

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
            city: "",
            state: "",
            zipcode: "",
            country: "",
            number: "",
            message: "",
            selectedFile: "",
            image: "",
            responseData: null,
            emailValid: false,
            firstnameValid: false,
            lastnameValid: false,
            passwordValid: false,
            schoolValid: false,
            addressValid: false,
            cityValid: false,
            zipcodeValid: false,
            stateValid: false,
            countryValid: false,
            companyValid: false,
            numberValid: false,
            formValid: false,
            formErrors: { email: "", firstname: "", lastname: "", password: "", school: "", address: "", city: "", state: "", zipcode: "", country: "", company: "", number: "" }
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
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
        var id = localStorage.getItem("ownerlogin")
        console.log("Sending get request to http://localhost:3001/owner/edit/" + id)
        this.props.ownerProfile(id)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profileInfo){
            var data = nextProps.profileInfo
            this.setState({
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.billing_address,
                company: data.company,
                city: data.city,
                state: data.state,
                zipcode: data.zipcode,
                country: data.country,
                number: data.number,
                emailValid: true,
                firstnameValid: true,
                lastnameValid: true,
                passwordValid: true,
                addressValid: true,
                cityValid: true,
                stateValid: true,
                zipcodeValid: true,
                countryValid: true,
                companyValid: true,
                numberValid: true,
                formValid: true
            })
        }
    }
    handleChange = (e) => {
        console.log("handleChange called")
        const name = e.target.name
        const value = e.target.value
        console.log(name,": ",value)
        this.setState({
            [name]: value
        }, () => {
            this.validateField(name, value)
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let passwordValid = this.state.passwordValid;
        let addressValid = this.state.addressValid;
        let cityValid = this.state.cityValid;
        let stateValid = this.state.stateValid;
        let zipcodeValid = this.state.zipcodeValid;
        let countryValid = this.state.countryValid;
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
            case 'city':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                cityValid = value.length > 0;
                fieldValidationErrors.city = cityValid ? '' : ' is invalid';
                break;
            case 'state':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                stateValid = value.length > 0;
                fieldValidationErrors.state = stateValid ? '' : ' is invalid';
                break;
            case 'zipcode':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                zipcodeValid = value.length > 0;
                fieldValidationErrors.zipcode = zipcodeValid ? '' : ' is invalid';
                break;
            case 'country':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                countryValid = value.length > 0;
                fieldValidationErrors.country = countryValid ? '' : ' is invalid';
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
            addressValid: addressValid,
            cityValid: cityValid,
            stateValid: stateValid,
            zipcodeValid: zipcodeValid,
            countryValid: countryValid,
            companyValid: companyValid,
            numberValid: numberValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.firstnameValid && this.state.lastnameValid && this.state.passwordValid && this.state.addressValid && this.state.numberValid && this.state.cityValid && this.state.stateValid && this.state.countryValid && this.state.zipcodeValid && this.state.companyValid });
    }


    saveChange = (e) => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        const data = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            number: this.state.number,
            company: this.state.company,
            city:this.state.city,
            state:this.state.state,
            zipcode:this.state.zipcode,
            country:this.state.country
        }
        const id = localStorage.getItem("ownerlogin")
        this.props.editProfile(id,data)
        this.props.history.push('/owner/home')
        // axios.put("http://localhost:3001/owner/" + id, data)
        //     .then(response => {
        //         //console.log("Trying to update")
        //         if (response.status === 200) {
        //             console.log("Updated")
        //             this.setState({
        //                 message: response.data
        //             })
        //         }else{
        //             console.log("Couldn't Update")
        //             this.setState({
        //                 message: "Something wrong with data"
        //             })
        //         }
        //     })
    }


    changePassword = (e) => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        const data = {
            password: this.state.password
        }
        const id = localStorage.getItem("ownerlogin")
        this.props.editPassword(id,data)
        this.props.history.push('owner/home')
        // axios.put("http://localhost:3001/owner/"+id+"/editpassword", data)
        //     .then(response => {
        //         //console.log("Trying to update")
        //         if (response.status === 200) {
        //             console.log("Updated")
        //             this.setState({
        //                 message: response.data
        //             })
        //         }
        //     })
    }

    render() {

        let redirectVar = null
        if (!localStorage.getItem("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }

        console.log("Rendering")

        return (
            <div>
                {redirectVar}
                <div>
                    <OwnerNavBar />
                </div>
                <div class="clearfix"></div>
                <div>
                    <Tabs defaultIndex={0}>
                        <TabList>
                            <Tab>Profile</Tab>
                            <Tab>Account</Tab>
                        </TabList>

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
                                        <form class="form-group"   >
                                            <div class="flex-it">
                                                <input class="form-control" type="text" value={this.state.firstname} onChange={this.handleChange} placeholder="First Name" name="firstname" required />
                                                <input class="form-control" type="text" value={this.state.lastname} onChange={this.handleChange} placeholder="Last Name" name="lastname" required />
                                            </div>
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.address} onChange={this.handleChange} type="text" placeholder="address" name="address" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.city} type="text" onChange={this.handleChange} placeholder="city" name="city" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.state} type="text" onChange={this.handleChange} placeholder="state" name="state" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.zipcode} type="text" onChange={this.handleChange} placeholder="zipcode" name="zipcode" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" value={this.state.country} type="text" onChange={this.handleChange} placeholder="country" name="country" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="text" value={this.state.company} onChange={this.handleChange} placeholder="company" name="company" />
                                            <div class="clearfix"></div>
                                            <input class="form-control" type="text" value={this.state.number} onChange={this.handleChange} placeholder="mobile No" name="number" />
                                            <div class="clearfix"></div>
                                            <input type="submit" class="form-control-login btn btn-warning" disabled={!this.state.formValid} value="Save changes" onClick={this.saveChange}></input>
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
                                    <div class="form-body">
                                        <fieldset>
                                            <h5><b>Change your email address</b></h5>
                                            <hr></hr>
                                            <form class="form-group"   >
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

OwnerEditProfile.PropTypes = {
    ownerProfile : PropTypes.func.isRequired,
    editProfile : PropTypes.func.isRequired,
    editPassword : PropTypes.func.isRequired,
    profileInfo : PropTypes.object
}

const mapStatetoProps = state => ({
    profileInfo:state.owner.profileInfo
})

export default connect(mapStatetoProps,{ownerProfile,editProfile,editPassword})(OwnerEditProfile);


