import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import LoginNavBar from '../../LoginNavBar'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import '../../App.css'
import cookie from 'react-cookies';
import { FormErrors } from '../../FormErrors';

import { connect } from 'react-redux'
import { store } from '../../store';
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import { loginTraveler } from '../../Queries/queries'


class LoginPage extends Component {

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

        e.preventDefault();
        console.log("Login of traveller")
        this.props.loginTraveler({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then(response => {
                console.log(response.data.loginTraveler)
                if(response.data.loginTraveler){
                    localStorage.setItem("loginuser",response.data.loginTraveler.id)
                    localStorage.setItem("loginemail",response.data.loginTraveler.email)
                    this.props.history.push('/traveller/home')
                }else{
                    this.setState({
                        message:"Invalid Username or Password"
                    })
                }
            })
    }

    render() {

        let redirectVar = null;
        if (localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/traveller/home" />
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <Navbar />
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">
                    <div class="container-fluid bg-grey">
                        <div class="row">
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <h1 class="form-header text-center">Log in to HomeAway</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Need an account? <Link to="/traveller/signup">Sign Up</Link></footer>
                                <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                <footer class="form-footer text-danger">{this.state.message}</footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body-login">
                        <fieldset>
                            <p>Travel Account login</p>
                            <hr></hr>
                            <form class="form-group">
                                <input class="form-control" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email address" name="email" />
                                <p class="form-footer text-danger">{this.state.emailError}</p>
                                <div class="clearfix"></div>
                                <input class="form-control" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" name="password" />
                                <p class="form-footer text-danger">{this.state.passwordError}</p>
                                <div class="clearfix"></div>
                                <a class="form-footer" href="#">Forgot password?</a>
                                <div class="clearfix"></div>
                                <input type="checkbox" value="Keep me signed in" checked></input>
                                <label class="form-footer">Keep me signed in</label>
                                <input type="submit" class="form-control-login btn btn-warning btn-lg" disabled={!this.state.formValid} onClick={this.login} value="Log in"></input>
                                <div class="clearfix"></div>
                            </form>
                        </fieldset>
                    </div>
                    <div class="clearfix"></div>
                    <p class="form-footer text-center">Use of this Web site constitutes acceptance of the HomeAway.com <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</p>
                    <p class="form-footer text-center">©2018 HomeAway. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(loginTraveler, { name: 'loginTraveler' })
)(LoginPage);