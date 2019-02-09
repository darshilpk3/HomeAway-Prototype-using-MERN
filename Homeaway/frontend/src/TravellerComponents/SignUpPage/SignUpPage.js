import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import '../../App.css'
import axios from 'axios'
import { FormErrors } from '../../FormErrors';
import {Link} from 'react-router-dom'

class SignUpPage extends Component {

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
        console.log(name," - ",value)
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
            firstnameValid:firstnameValid,
            lastnameValid:lastnameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid});
    }



    signUp = (e) => {

        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        console.log("Trying to sign up");
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        axios.post("http://localhost:3001/travelsignup", data)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    if (response.data == "Email-Id already exist") {
                        console.log(response.data)
                        this.setState({
                            message: "Email-Id already exist"
                        })
                    }
                    else {
                        console.log("added")
                        this.props.history.push('/traveller/login')
                    }
                }
            })
    }

    render() {
        let renderRedirect = null;
        if (this.state.redirect == true) {
            console.log("should redirect")
            renderRedirect = <Redirect to="/traveller/login" />
        }
        return (

            <div>
                {renderRedirect}
                <div>
                    <Navbar />
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">
                    <div class="container-fluid bg-grey">
                        <div class="row">
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <h1 class="form-header text-center">SignUp HomeAway</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Already have an account? <Link to="/traveller/login">Log in</Link></footer>
                                <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                <footer class="form-footer text-danger">{this.state.message}</footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body-login">
                        <fieldset>
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
                        </fieldset>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        )
    }
}

export default SignUpPage;
