import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import {Redirect} from 'react-router'
import axios from 'axios'
import '../../App.css'

class EditProfile extends Component {

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         email:"",
    //         password:"",
    //         message:"",
    //         redirect:false,
    //         responsedata:null
    //     }
    //     this.handleEmail = this.handleEmail.bind(this);
    //     this.handlePassword = this.handlePassword.bind(this);
    //     this.login = this.login.bind(this)
    // }

    // handleEmail = (e) => {
    //     this.setState({
    //         email:e.target.value,
    //     })
    // }

    // handlePassword = (e) => {
    //     this.setState({
    //         password:e.target.value,
    //     })
    // }

    // login = (e) => {

    //     const data = {
    //         email:this.state.email,
    //         password:this.state.password
    //     }
    //     axios.post("http://localhost:3001/login",data)
    //         .then(response => {
    //             console.log("Got the response",response.data);
    //             if(response.data === "Invalid Credentials"){
    //                 this.setState({
    //                     message: "Invalid Credentials"
    //                 })
    //             }
    //             else{
    //                 console.log(response.data)
    //                 this.setState({
    //                     redirect:true,
    //                     responsedata:response.data
    //                 })
    //             }
    //         })
    // }

    render() {

        // let redirectVar = null;
        // if(this.state.redirect === true){
        //     redirectVar = <Redirect to={{
        //         pathname: "/home", 
        //         state: {user:this.state.responsedata}}}></Redirect>
        // }
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div class="clearfix"></div>
                <div class="bg-grey">
                    <div class="container-fluid bg-grey">
                        <div class="row">
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <h1 class="form-header text-center">Edit Profile</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Keep it up-to-date! <a>Its always better</a></footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body">
                        <fieldset>
                            <p>Traveller's Information</p>
                            <hr></hr>
                            <form class="form-group">
                                <input class="form-control" type="text" placeholder="Email address" id="email" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="password" placeholder="Password" id="password" />
                                <div class="clearfix"></div>
                                <div class="flex-it">
                                    <input class="form-control" type="text" placeholder="First Name" id="firstname" required/>
                                    <input class="form-control" type="text" placeholder="Last Name" id="lastname" required/>
                                </div>
                                <div class="clearfix"></div>
                                <input class="form-control" type="text"  placeholder="City" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="text"  placeholder="School" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="text"  placeholder="Company" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="text"  placeholder="Mobile No" />
                                <div class="clearfix"></div>
                                <input class="form-control" type="text"  placeholder="Gender" />
                                <div class="clearfix"></div>
                                <input type="button" class="form-control btn btn-primary"value="Save changes"></input>
                                <div class="clearfix"></div>
                            </form>
                        </fieldset>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        )
    }
}

export default EditProfile;