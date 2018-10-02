import React, { Component } from 'react'
import {Redirect} from 'react-router'
import '../../App.css'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar';

class OwnerSignUpPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            redirect:false,
            message:""
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleFirstName = (e) => {
        this.setState({
            firstname:e.target.value
        });
    }

    handleLastName = (e) => {
        this.setState({
            lastname:e.target.value
        });
    }

    handleEmail = (e) => {
        this.setState({
            email:e.target.value
        });
    }

    handlePassword = (e) => {
        this.setState({
            password:e.target.value
        });
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

        axios.post("http://localhost:3001/owner/signup",data)
            .then(response=>{
                console.log(response.data);

                if(response.data === "Could not add the user"){
                    console.log("couldnt add")
                    this.setState({
                        message:"Account creation unsuccessfull"
                    })
                }
                else{
                    console.log("added")
                    this.setState({
                        redirect:true
                    })
                }
        })
    }

    render() {
        let renderRedirect = null;
        if(this.state.redirect == true){
            console.log("should redirect")
            renderRedirect = <Redirect to="/owner/login"/>
        } 
        return (
            
            <div>
                {renderRedirect}
                <div>
                    <OwnerNavBar />
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">
                    <div class="container-fluid bg-grey">
                        <div class="row">
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <h1 class="form-header text-center">Owner SignUp</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Already have an account? <a href="/owner/login">Log in</a></footer>
                                <footer class="form-footer">{this.state.message}</footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body">
                        <fieldset>
                            <form class="form-group">
                                <div class="flex-it">
                                    <input class="form-control" type="text" placeholder="First Name" onChange={this.handleFirstName} id="firstname" required/>
                                    <input class="form-control" type="text" onChange={this.handleLastName} placeholder="Last Name" id="lastname" required/>
                                </div>
                                <div class="clearfix"></div>
                                <input class="form-control" type="email" onChange={this.handleEmail} placeholder="Email Address" id="password" required/>
                                <div class="clearfix"></div>
                                <input class="form-control" type="password" onChange={this.handlePassword} placeholder="Password" id="password" required/>
                                <div class="clearfix"></div>
                                <button class="form-control btn btn-primary" value="Sign me up" onClick={this.signUp}>Sign me up</button>
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

export default OwnerSignUpPage;
