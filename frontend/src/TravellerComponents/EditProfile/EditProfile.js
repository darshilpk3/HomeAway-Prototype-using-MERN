import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import md5 from 'md5'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            school: "",
            company: "",
            address: "",
            number: "",
            message: "",
            selectedFile: "",
            image: "",
            bookingDetails: null,
            responseData : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    componentWillMount() {
        this.setState({
            message: ""
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
                        password: md5(data.password),
                        lastname: data.lastname,
                        school: data.school,
                        address: data.address,
                        company: data.company,
                        number: data.number,
                        image: "http://localhost:3001" + data.profilepic
                    })
                }
            })

        console.log("Sending get request to http://localhost:3001/bookingdetails/" + id)
        axios.get("http://localhost:3001/bookingdetails/" + id)
            .then(response => {
                console.log("Booking details available")
                if (response.status == 200) {
                    this.setState({
                        bookingDetails: response.data
                    })
                }
            })
    }

    handleChange = (e) => {
        console.log("handleChange called")
        if ([e.target.name] == "profileImage") {
            console.log("e.target.file: ", e.target.files[0])
            this.setState({
                selectedFile: e.target.files[0]
            })
            console.log(this.state.selectedFile)
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveChange = (e) => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        const data = {
            email: this.state.email,
            password: this.state.password,
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


    changeProfilePic = (e) => {

        var headers = new Headers();
        e.preventDefault();

        axios.defaults.withCredentials = true;
        console.log("While sending post request: " + this.state.selectedFile)
        let formData = new FormData();

        formData.append('email', this.state.email)
        formData.append('selectedFile', this.state.selectedFile)

        console.log("formData is: ", formData.get('selectedFile'))
        axios.post("http://localhost:3001/upload", formData)
            .then(response => {
                console.log("file should be  uploaded")
                if (response.status === 200) {
                    console.log("http://localhost:3001/" + response.data)
                    this.setState({
                        image: "http://localhost:3001" + response.data
                    })
                }
            })
    }

    showDetails = (e) => {

        var headers = new Headers()
        e.preventDefault()
        axios.defaults.withCredentials = true

        const place_id = e.target.id
        console.log("Details should be shown: " + place_id)
        axios.get("http://localhost:3001/property/" + place_id)
            .then(response => {
                console.log("Response from get method: ", response.data)
                this.setState({
                    responseData: response.data[0]
                })
            })
    }

    render() {

        let redirectVar = null
        if (!cookie.load("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        }
        if (this.state.responseData) {
            console.log("should be redirected")
            redirectVar = <Redirect to={{
                pathname: "/traveller/property/show",
                state: {
                    response: this.state.responseData,
                }
            }} />
        }
        console.log("Rendering")
        console.log(this.state.bookingDetails)
        var placeDetail = null;
        console.log(typeof this.state.bookingDetails)
        if (this.state.bookingDetails) {
            var buttons = this.state.bookingDetails.map(placeDetail => {
                return (
                    <tr>
                        <td class="property-image-carousel">
                            <div id={"carouselExampleControls" + placeDetail.place_id} class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/walk-thru-closet-100x50.jpg" alt="First slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/living-room-windows.jpg" alt="Second slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="http://www.33souththird.com/wp-content/uploads/revslider/interior/bathroom.jpg" alt="Third slide" />
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href={"#carouselExampleControls" + placeDetail.place_id} role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href={"#carouselExampleControls" + placeDetail.place_id} role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail.place_id} onClick={this.showDetails}>{placeDetail.place_name}</a></h3>
                            <p><b>Location, City: </b>{placeDetail.location_city}</p>
                            <p class="text-warning">{placeDetail.headline}</p>
                            <p><b>From: </b>{placeDetail.booking_from}</p>
                            <p><b>To: </b>{placeDetail.booking_to}</p>
                            <p><b>Guests: </b>{placeDetail.guests}</p>
                            <p class="bg-light"><b>Base Nightly Rate was:</b>{" $" + placeDetail.price}</p>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <Navbar />
                </div>
                <div class="clearfix"></div>
                <div>
                    <Tabs defaultIndex={1}>
                        <TabList>
                            <Tab>My Trips</Tab>
                            <Tab>Profile</Tab>
                            <Tab>Account</Tab>
                        </TabList>
                        <TabPanel>
                            <h1><b>Previous Trips</b></h1>
                            <div class="form-body">
                                <div class="d-flex justify-content-left">
                                    <table class="w-100">
                                        {buttons}
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
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
                                        <h3><b>Profile Information</b></h3>
                                        <hr></hr>
                                        <form class="form-group">
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
                                            <input type="button" class="form-control-login btn btn-warning" value="Save changes" onClick={this.saveChange}></input>
                                            <div class="clearfix"></div>
                                        </form>
                                    </fieldset>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <div class="bg-grey">
                                    <div class="container-fluid bg-grey">
                                        <div class="row">
                                            <div class="col-md-4 offset-md-4 text-align-center">
                                                <h1 class="form-header text-center">Account Settings</h1>
                                            </div>
                                            <div class="col-md-4 offset-md-4 text-align-center">
                                                <footer class="form-footer">Keep it up-to-date! <a>Its always better</a></footer>
                                                <footer class="form-footer text-danger">{this.state.message}</footer>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <hr></hr>
                                    <form class="md-form" enctype="multipart/form-data" onSubmit={this.changeProfilePic}>
                                        <div class="file-field d-flex justify-content-center">
                                            <div class="mb-4">
                                                <img src={"http://localhost:3001/public/uploads/" + this.state.email + "/profile.jpg"} class="rounded-circle z-depth-1-half avatar-pic" alt="example placeholder avatar" />
                                                <h4><b>Darshil Kapadia</b></h4>
                                            </div>
                                        </div>
                                        <div class="file-field d-flex justify-content-center ">
                                            <input type="file" name="profileImage" onChange={this.handleChange}></input>
                                            <input type="submit" class="btn btn-warning" value="Change" />
                                        </div>
                                    </form>

                                    <div class="form-body">
                                        <fieldset>
                                            <h5><b>Change your email address</b></h5>
                                            <hr></hr>
                                            <form class="form-group">
                                                <div class="flex-it">
                                                    <label>Email Address: </label>
                                                    <input class="form-control" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email address" name="email" />
                                                </div>
                                                <br></br>
                                                <p class="text-danger text-center">This will update your account email address for future reservations. If you need to update your email address for an existing reservation, please reach out to the owner or property manager, and they can update their records.</p>
                                                <div class="clearfix"></div>
                                                <input type="button" class="form-control-login btn btn-warning" value="Save changes" onClick={this.saveChange}></input>
                                                <div class="clearfix"></div>
                                            </form>
                                        </fieldset>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="form-body">
                                        <fieldset>
                                            <h5><b>Change your password</b></h5>
                                            <hr></hr>
                                            <form class="form-group">
                                                <div class="flex-it">
                                                    <label>Password: </label>
                                                    <input class="form-control" type="password" onChange={this.handleChange} value={this.state.password} placeholder="password" name="password" />
                                                </div>
                                                <div class="clearfix"></div>
                                                <input type="button" class="form-control-login btn btn-warning" value="Save changes" onClick={this.saveChange}></input>
                                                <div class="clearfix"></div>
                                            </form>
                                        </fieldset>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

        )
    }
}

export default EditProfile;