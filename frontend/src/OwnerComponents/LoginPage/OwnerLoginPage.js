import React, { Component } from 'react'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import {Redirect} from 'react-router'
import axios from 'axios'
import '../../App.css'
import cookie from 'react-cookies';
import NavBar from '../../TravellerComponents/NavBar/NavBar';

class OwnerLoginPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            message:"",
            redirect:false,
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this)
    }

    handleEmail = (e) => {
        this.setState({
            email:e.target.value,
        })
    }

    handlePassword = (e) => {
        this.setState({
            password:e.target.value,
        })
    }

    login = (e) => {

        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;
        
        const data = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://localhost:3001/owner/login",data)
            .then(response => {
                console.log("Got the response",response.data);
                if(response.data === "Invalid Credentials"){
                    this.setState({
                        message: "Invalid Credentials"
                    })
                }
                else{
                    console.log(response.data)
                    console.log("logged in")
                    this.setState({
                        redirect:true,
                    })
                }
            })
    }

    render() {

        let redirectVar = null;
        if(cookie.load("owneruser") || this.state.redirect){
            console.log("should be redirected")
            redirectVar = <Redirect to="/owner/home"/>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <NavBar/>
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">
                    <div class="container-fluid bg-grey">
                        <div class="row">
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <h1 class="form-header text-center">Log in to HomeAway</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Need an account? <a href="/owner/signup">Sign Up</a></footer>
                                <footer class="form-footer text-danger">{this.state.message}</footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body-login">
                        <fieldset>
                            <p>Owner Account login</p>
                            <hr></hr>
                            <form class="form-group">
                                <input class="form-control" type="text" onChange = {this.handleEmail} placeholder="Email address" id="email" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="password" onChange = {this.handlePassword} placeholder="Password" id="password" />
                                <div class="clearfix"></div>
                                <a class="form-footer" href="#">Forgot password?</a>
                                <div class="clearfix"></div>
                                <input type="button" class="form-control btn btn-primary" onClick = {this.login} value="Log in"></input>
                                <div class="clearfix"></div>
                                <input type="checkbox" value="Keep me signed in" checked></input>
                                <label class="form-footer">Keep me signed in</label>
                            </form>
                        </fieldset>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        )
    }
}

export default OwnerLoginPage;