import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import '../../App.css'
import OwnerNavBar from '../NavBar/OwnerNavBar';

class OwnerEditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            company: "",
            address: "",
            city:"",
            state:"",
            zipcode:"",
            country:"",
            number: "",
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
        var id = cookie.load("ownerlogin")
        console.log("Sending get request to http://localhost:3001/owner/edit/" + id)
        axios.get("http://localhost:3001/owner/edit/" + id)
            .then(response => {
                console.log("inside response")
                if (response.status === 200) {
                    var data = response.data[0]
                    console.log(data.email)
                    this.setState({
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        address: data.billing_address,
                        company: data.company,
                        city:data.city,
                        state:data.state,
                        zipcode:data.zipcode,
                        country:data.country,
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
            company: this.state.company,
            city:this.state.city,
            state:this.state.state,
            zipcode:this.state.zipcode,
            country:this.state.country
        }
        const id = cookie.load("ownerlogin")

        axios.post("http://localhost:3001/owner/edit/" + id, data)
            .then(response => {
                //console.log("Trying to update")
                if (response.status === 200) {
                    console.log("Updated")
                    this.setState({
                        message: response.data
                    })
                }else{
                    console.log("Couldn't Update")
                    this.setState({
                        message: "Something wrong with data"
                    })
                }
            })
    }

    render() {

        let redirectVar = null;
        if (!cookie.load("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <OwnerNavBar />
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
                                <input class="form-control" value={this.state.address} onChange={this.handleChange} type="text" placeholder="Billing Address " name="address" />
                                <div class="clearfix"></div>
                                <div class="flex-it">
                                    <input class="form-control" type="text" value={this.state.city} onChange={this.handleChange} placeholder="City" name="city" required />
                                    <input class="form-control" type="text" value={this.state.state} onChange={this.handleChange} placeholder="State" name="state" required />
                                </div>
                                <div class="clearfix"/>
                                <div class="flex-it">
                                    <input class="form-control" type="text" value={this.state.zipcode} onChange={this.handleChange} placeholder="Zipcode" name="zipcode" required />
                                    <input class="form-control" type="text" value={this.state.country} onChange={this.handleChange} placeholder="Country" name="country" required />
                                </div>
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

export default OwnerEditProfile;