import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import '../../App.css'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            school: "",
            company: "",
            address: "",
            number: "",
            message: ""
        }
        // this.handleemail = this.handleemail.bind(this);
        // this.handlefirstname = this.handlefirstname.bind(this);
        // this.handlelastname = this.handlelastname.bind(this);
        // this.handleschool = this.handleschool.bind(this);
        // this.handlecompany = this.handlecompany.bind(this);
        // this.handleaddress = this.handleaddress.bind(this);
        // this.handlenumber = this.handlenumber.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleemail = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handlefirstname = (e) => {
        this.setState({
            firstname: e.target.value
        });
    }
    handlelastname = (e) => {
        this.setState({
            lastname: e.target.value
        });
    }
    handleschool = (e) => {
        this.setState({
            school: e.target.value
        });
    }
    handlecompany = (e) => {
        this.setState({
            company: e.target.value
        });
    }
    handleaddress = (e) => {
        this.setState({
            address: e.target.value
        });
    }
    handlenumber = (e) => {
        this.setState({
            number: e.target.value
        });
    }

    componentWillMount(){
        this.setState({
            message:""
        })
    }
    componentDidMount() {

        var headers = new Headers();
        axios.defaults.withCredentials = true;
        var id = cookie.load("loginuser")
        console.log("Sending get request to http://localhost:3001/edit/" + id)
        axios.get("http://localhost:3001/edit/" + id)
            .then(response => {
                console.log("inside response")
                if (response.status === 200) {
                    var data = response.data[0]
                    console.log(data.email)
                    this.setState({
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        school: data.school,
                        address: data.address,
                        company: data.company,
                        number: data.number,
                    })
                }
            })
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
            school: this.state.school,
            company: this.state.company
        }
        const id = cookie.load("loginuser")

        axios.post("http://localhost:3001/edit/" + id, data)
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

    render() {

        let redirectVar = null;
        if (!cookie.load("loginuser")) {
            redirectVar = <Redirect to="/login" />
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
                                <h1 class="form-header text-center">Edit Profile</h1>
                            </div>
                            <div class="col-md-4 offset-md-4 text-align-center">
                                <footer class="form-footer">Keep it up-to-date! <a>Its always better</a></footer>
                                <footer class="form-footer">{this.state.message}</footer>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-body">
                        <fieldset>
                            <p>Traveller's Information</p>
                            <hr></hr>
                            <form class="form-group">
                                <input class="form-control" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email address" name="email" />
                                <div class="clearfix"></div>
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
                                <input type="button" class="form-control btn btn-primary" value="Save changes" onClick={this.saveChange}></input>
                                <div class="clearfix"></div>
                                <input type="button" class="form-control btn btn-primary" value="back"></input>
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