import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import LoginNavBar from '../../LoginNavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import '../../App.css'
import cookie from 'react-cookies';
import { FormErrors } from '../../FormErrors';
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

        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:3001/travel/login", data)
            .then(response => {
                console.log("Got the response", response.data);
                if (response.data === "Invalid Credentials") {
                    this.setState({
                        message: "Invalid Credentials"
                    })
                }
                else {
                    console.log(response.data)
                    this.setState({
                        redirect: true,
                    })
                }
            })
    }

    render() {

        let redirectVar = null;
        if (cookie.load("loginuser")) {
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
                                <footer class="form-footer">Need an account? <a href="/traveller/signup">Sign Up</a></footer>
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
            </div >
        )
    }
}

export default LoginPage;



// <fieldset>
//                         <div class="container-fluid padding">
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4 form-body">
//                                     <legend>Account Login</legend>
//                                     <hr></hr>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <input type="text" placeholder="Email address"></input>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <input type="password" placeholder="Password"></input>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <a href="#">Forgot Password</a>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <button class="btn btn-primary">Log In</button>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <input type="checkbox" class="custom-control-input" id="customCheck1" />
//                                     <label class="custom-control-label" for="customCheck1">Keep me signed in</label>
//                                 </div>
//                             </div>
//                             <div class="row form-group">
//                                 <div class="col-md-4 offset-md-4">
//                                     <hr></hr>
//                                 </div>
//                             </div>
//                         </div>
//                     </fieldset>