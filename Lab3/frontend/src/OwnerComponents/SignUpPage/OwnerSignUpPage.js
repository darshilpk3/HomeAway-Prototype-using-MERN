import React, { Component } from 'react'
import { Redirect } from 'react-router'
import '../../App.css'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar';
import { FormErrors } from '../../FormErrors';

import { graphql, compose } from 'react-apollo'
import { signUpOwner } from '../../Queries/queries'

class OwnerSignUpPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            redirect: false,
            message: "",
            formErrors: { email: "", password: "", firstname: "", lastname: "" },
            emailValid: false,
            passwordValid: false,
            firstnameValid: "",
            lastnameValid: "",
            formValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(name, " - ", value)
        this.setState({
            [name]: value,
        }, () => {
            this.validateField(name, value)
        })
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid

        switch (fieldName) {
            case 'email':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailValid = value.length >= 1;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'firstname':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                firstnameValid = value.length >= 1;
                fieldValidationErrors.firstname = firstnameValid ? '' : ' is invalid';
                break;
            case 'lastname':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                lastnameValid = value.length >= 1;
                fieldValidationErrors.lastname = lastnameValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 1;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid });
    }

    signUp = (e) => {

        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        console.log("Trying to sign up");
        this.props.signUpOwner({
            variables: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            console.log(response.data.signUpOwner)
                if (response.data.signUpOwner == "Success") {
                    this.props.history.push('/owner/login')
                } else if (response.data.signUpOwner == "User Already exists") {
                    this.setState({
                        message: "Email-Id already exist"
                    })
                }else{
                    this.setState({
                        message: "Something went wrong"
                    })
                }
        })
    }

render() {
    let renderRedirect = null;
    if (this.state.redirect == true) {
        console.log("should redirect")
        renderRedirect = <Redirect to="/owner/login" />
    }
    return (

        <div>
            {renderRedirect}
            <div>
                <OwnerNavBar />
            </div>
            <div class="clearfix"></div>
            <div class="bg-grey">

                <div class="d-flex flex-row justify-content-center align-items-center">
                    <div class="px-2">
                        <img src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" id="#personyzeContent" />
                    </div>
                    <div class="d-flex flex-column px-5">
                        <h1 class="form-header text-center">Owner SignUp</h1>
                        <footer class="form-footer">Already have an account? <a href="/owner/login">Log in</a></footer>
                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                        <footer class="form-footer text-danger">{this.state.message}</footer>
                        <hr></hr>
                        <form class="form-group">
                            <div class="flex-it">
                                <input class="form-control" type="text" placeholder="First Name" onChange={this.handleChange} value={this.state.firstname} name="firstname" required />
                                <input class="form-control" type="text" onChange={this.handleChange} value={this.state.lastname} placeholder="Last Name" name="lastname" required />
                            </div>
                            <div class="clearfix"></div>
                            <input class="form-control" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email Address" name="email" required />
                            <div class="clearfix"></div>
                            <input class="form-control" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" name="password" required />
                            <div class="clearfix"></div>
                            <button class="form-control-login btn btn-warning" value="Sign me up" disabled={!this.state.formValid} onClick={this.signUp}>Sign me up</button>
                            <div class="clearfix"></div>
                            <footer class="form-footer">By creating an account you are accepting our <a href="#">Terms and Conditions and Privacy Policy</a>.</footer>
                        </form>
                    </div>
                </div>
                <div class="clearfix"></div>
                <p class="text-center form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.</p>
                <p class="text-center form-footer">©2018 HomeAway. All rights reserved.</p>
            </div>
        </div>
    )
}
}

export default compose(
    graphql(signUpOwner,{name:"signUpOwner"})
)(OwnerSignUpPage);
