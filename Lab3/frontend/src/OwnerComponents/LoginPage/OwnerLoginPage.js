import React, { Component } from 'react'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import '../../App.css'
import cookie from 'react-cookies';
import NavBar from '../../TravellerComponents/NavBar/NavBar';
import { FormErrors } from '../../FormErrors';

import { graphql, compose } from 'react-apollo'
import { loginOwner } from '../../Queries/queries'

class OwnerLoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            message: "",
            redirect: false,
            formErrors: { email: "", password: "" },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this)
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
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

        switch (fieldName) {
            case 'email':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailValid = value.length >= 1;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
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
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }


    login = (e) => {

        this.props.loginOwner({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then(response => {
                console.log(response.data.loginOwner)
                if(response.data.loginOwner){
                    localStorage.setItem("ownerlogin",response.data.loginOwner.id)
                    localStorage.setItem("owneremail",response.data.loginOwner.email)
                    this.props.history.push('/owner/home')
                }else{
                    this.setState({
                        message:"Invalid Username or Password"
                    })
                }
            })
    }

    render() {

        let redirectVar = null;
        // if (localStorage.getItem("owneruser") || this.state.redirect) {
        //     console.log("should be redirected")
        //     redirectVar = <Redirect to="/owner/home" />
        // }
        return (
            <div>
                {redirectVar}
                <div>
                    <NavBar />
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">

                <div class = "d-flex flex-row justify-content-center align-items-center">
                    <div class="px-2">
                        <img src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" id="#personyzeContent" />
                    </div>
                    <div class="d-flex flex-column px-5">
                        <h1 class="form-header text-center">Owner Login</h1>
                        <footer class="form-footer">Need an account? <a href="/owner/signup">Sign Up</a></footer>
                        <hr></hr>
                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                        <footer class="form-footer text-danger">{this.state.message}</footer>
                        <form class="form-group">
                            <input class="form-control" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email address" name="email" />
                            <div class="clearfix"></div>
                            <input class="form-control" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" name="password" />
                            <div class="clearfix"></div>
                            <a class="form-footer" href="#">Forgot password?</a>
                            <div class="clearfix"></div>
                            <input type="checkbox" value="Keep me signed in" checked></input>
                            <label class="form-footer">Keep me signed in</label>
                            <div class="clearfix"></div>
                            <input type="button" class="form-control-login btn btn-warning" disabled={!this.state.formValid} onClick={this.login} value="Log in"></input>
                        </form>
                    </div>
                </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        )
    }
}


export default compose(
    graphql(loginOwner,{ name: "loginOwner" })
)(OwnerLoginPage);
