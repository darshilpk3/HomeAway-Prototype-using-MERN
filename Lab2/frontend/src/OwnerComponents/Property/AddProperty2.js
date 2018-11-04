import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';


class AddProperty2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            street: "",
            apt: "",
            location_city: "",
            state: "",
            zipcode: "",
            country: "",
            available_from: "",
            available_to: "",
            place_name: "",
            headline: "",
            description: "",
            bedrooms: "",
            bathrooms: "",
            accomodates: "",
            price: "",
            propertyImages: null,
            streetValid: false,
            location_cityValid: false,
            stateValid: false,
            zipcodeValid: false,
            countryValid: false,
            available_fromValid: false,
            available_toValid: false,
            place_nameValid: false,
            bedroomsValid: false,
            bathroomsValid: false,
            accomodatesValid: false,
            propertyImagesValid: "",
            priceValid: false,
            formValid: false,
            formErrors: {
                street: "",
                location_city: "",
                state: "",
                zipcode: "",
                country: "",
                available_from: "",
                available_to: "",
                place_name: "",
                bedrooms: "",
                bathrooms: "",
                accomodates: "",
                price: "",
                propertyImages: ""
            },
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.addProperty = this.addProperty.bind(this);
    }

    //componentDidMount() {
    //     if (this.props.location.state) {
    //         this.setState({
    //             street: (this.props.location.state && this.props.location.state.responseData[0].street),
    //             apt: (this.props.location.state && this.props.location.state.responseData[0].apt),
    //             location_city: (this.props.location.state && this.props.location.state.responseData[0].location_city),
    //             state: (this.props.location.state && this.props.location.state.responseData[0].state),
    //             zipcode: (this.props.location.state && this.props.location.state.responseData[0].zipcode),
    //             country: (this.props.location.state && this.props.location.state.responseData[0].country),
    //             place_name: (this.props.location.state && this.props.location.state.responseData[0].place_name),
    //             headline: (this.props.location.state && this.props.location.state.responseData[0].headline),
    //             description: (this.props.location.state && this.props.location.state.responseData[0].description),
    //             bedrooms: (this.props.location.state && this.props.location.state.responseData[0].bedrooms),
    //             bathrooms: (this.props.location.state && this.props.location.state.responseData[0].bathrooms),
    //             accomodates: (this.props.location.state && this.props.location.state.responseData[0].accomodates),
    //             price: (this.props.location.state && this.props.location.state.responseData[0].price),
    //             streetValid: true,
    //             location_cityValid: true,
    //             stateValid: true,
    //             zipcodeValid: true,
    //             countryValid: true,
    //             place_nameValid: true,
    //             bedroomsValid: true,
    //             bathroomsValid: true,
    //             accomodatesValid: true,
    //             priceValid: true,
    //             formValid: false,

    //         })
    //     }
    // }
    handleChange = (e) => {
        if (e.target.name == "propertyImages") {
            const name = e.target.name
            const value = e.target.files.length
            console.log(e.target.files.length)
            this.setState({
                propertyImages: e.target.files
            }, () => {
                this.validateField(name, value)
            })
        } else {
            const name = e.target.name
            const value = e.target.value
            this.setState({
                [name]: value
            }, () => {
                this.validateField(name, value)
            });
        }

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let streetValid = this.state.streetValid;
        let location_cityValid = this.state.location_cityValid;
        let stateValid = this.state.stateValid;
        let zipcodeValid = this.state.zipcodeValid;
        let countryValid = this.state.countryValid;
        let available_fromValid = this.state.available_fromValid;
        let available_toValid = this.state.available_toValid;
        let place_nameValid = this.state.place_nameValid;
        let bedroomsValid = this.state.bedroomsValid;
        let bathroomsValid = this.state.bathroomsValid;
        let accomodatesValid = this.state.accomodatesValid;
        let priceValid = this.state.priceValid;
        let propertyImagesValid = this.state.propertyImagesValid

        switch (fieldName) {
            case 'street':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                streetValid = value.length >= 1;
                console.log("streetValid: ", streetValid)
                fieldValidationErrors.street = streetValid ? '' : ' is invalid';
                break;
            case 'available_from':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                available_fromValid = new Date(value) >= Date.now();
                fieldValidationErrors.available_from = available_fromValid ? '' : ' should be 2 days from current date, as we take 2 days time to review your property';
                break;
            case 'available_to':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                available_toValid = new Date(value) >= Date.now() && new Date(value) > new Date(this.state.available_from);
                fieldValidationErrors.available_to = available_toValid ? '' : ' should be after the available_from date';
                break;
            case 'location_city':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                location_cityValid = value.length > 0;
                fieldValidationErrors.location_city = location_cityValid ? '' : ' is invalid';
                break;
            case 'state':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                stateValid = value.length > 0;
                fieldValidationErrors.state = stateValid ? '' : ' is invalid';
                break;
            case 'zipcode':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                zipcodeValid = value.length > 0;
                fieldValidationErrors.zipcode = zipcodeValid ? '' : ' is invalid';
                break;
            case 'country':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                countryValid = value.length > 0;
                fieldValidationErrors.country = countryValid ? '' : ' is invalid';
                break;
            case 'place_name':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                place_nameValid = value.length > 0;
                fieldValidationErrors.place_name = place_nameValid ? '' : ' is invalid';
                break;
            case 'bedrooms':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                bedroomsValid = value > 0;
                fieldValidationErrors.bedrooms = bedroomsValid ? '' : ' is invalid';
                break;
            case 'bathrooms':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                bathroomsValid = value > 0;
                fieldValidationErrors.bathrooms = bathroomsValid ? '' : ' is invalid';
                break;
            case 'price':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                priceValid = value > 0;
                fieldValidationErrors.price = priceValid ? '' : ' is invalid';
                break;
            case 'accomodates':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                accomodatesValid = value > 0;
                fieldValidationErrors.accomodates = accomodatesValid ? '' : ' is invalid';
                break;
            case 'propertyImages':
                propertyImagesValid = (value > 1 && value < 6)
                console.log((value > 1 && value < 6), " ", propertyImagesValid)
                fieldValidationErrors.propertyImages = propertyImagesValid ? '' : 'should be minimum 2 and maximum 5';
                console.log(fieldValidationErrors.propertyImages)
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            streetValid: streetValid,
            location_cityValid: location_cityValid,
            stateValid: stateValid,
            zipcodeValid: zipcodeValid,
            countryValid: countryValid,
            available_fromValid: available_fromValid,
            available_toValid: available_toValid,
            place_nameValid: place_nameValid,
            bedroomsValid: bedroomsValid,
            bathroomsValid: bathroomsValid,
            accomodatesValid: accomodatesValid,
            priceValid: priceValid,
            propertyImagesValid: propertyImagesValid
        }, this.validateForm);
    }

    validateForm() {
        console.log("this.state.streetValid: ", this.state.propertyImagesValid, "this.state.location_cityValid: ", this.state.location_cityValid, "this.state.stateValid: ", this.state.stateValid, "this.state.countryValid: ", this.state.countryValid, "this.state.zipcodeValid", this.state.zipcodeValid, "this.state.bedroomsValid", this.state.bedroomsValid, "this.state.bathroomsValid: ", this.state.bathroomsValid, "this.state.accomodatesValid", this.state.accomodatesValid, "this.state.priceValid: ", this.state.priceValid)
        this.setState({ formValid: this.state.streetValid && this.state.location_cityValid && this.state.stateValid && this.state.countryValid && this.state.zipcodeValid && this.state.bedroomsValid && this.state.bathroomsValid && this.state.accomodatesValid && this.state.priceValid && this.state.available_fromValid && this.state.available_toValid && this.state.propertyImagesValid });
    }

    addProperty = (e) => {
        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;
        console.log("Trying to add property");
        console.log("ownerlogin", localStorage.getItem("ownerlogin") && localStorage.getItem("ownerlogin"))
        const data = {
            owner_id: localStorage.getItem("ownerlogin") && localStorage.getItem("ownerlogin"),
            place_name: this.state.place_name,
            location_city: this.state.location_city,
            street: this.state.street,
            apt: this.state.apt,
            state: this.state.state,
            zipcode: this.state.zipcode,
            available_from: this.state.available_from,
            available_to: this.state.available_to,
            country: this.state.country,
            bedrooms: this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            accomodates: this.state.accomodates,
            headline: this.state.headline,
            description: this.state.description,
            price: this.state.price
        }

        axios.post("http://localhost:3001/property/", data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200 && response.data === "Could not add the property") {
                    console.log("couldnt add")
                    this.setState({
                        message: "Property addition unsuccessfull"
                    })
                } else {
                    console.log(response.data)
                    var file;
                    for (file of this.state.propertyImages) {
                        console.log("While sending post request: " + file)
                        let formData = new FormData();

                        formData.append('id', response.data)
                        formData.append('file', file)

                        console.log("formData is: ", formData.get('id'))
                        axios.post("http://localhost:3001/property/" + formData.get('id') + "/upload", formData)
                            .then(response => {
                                console.log("file should be  uploaded")
                                if (response.status === 200) {
                                    console.log("Photos Uploaded")
                                }
                            })
                        console.log("added")
                        this.props.history.push("/owner/home")
                    }
                }
            })
    }

    render() {
        console.log("rendering")
        console.log("Tab while rendering: ", this.state.tab)
        console.log(this.state.available_from)
        let redirectVar = null
        if (!localStorage.getItem("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }
        if (this.state.redirect) {
            redirectVar = <Redirect to="/owner/home" />
        }
        return (
            <div>
                {redirectVar}
                <OwnerNavBar />
                <hr class="clearfix"></hr>
                <div class="bg-grey">
                    <div class="container-fluid">
                        <Tabs defaultIndex={this.state.tab}>
                            <TabList className="float-left d-flex flex-column w-40 p-5 bg-grey justify-content-center">
                                <Tab className="p-3">Welcome</Tab>
                                <Tab className="p-3">Location</Tab>
                                <Tab className="p-3">Availability</Tab>
                                <Tab className="p-3">General Information</Tab>
                                <Tab className="p-3">Add Photos</Tab>
                                <Tab className="p-3">Pricing</Tab>
                            </TabList>

                            <form class="form-body mx-auto w-50" enctype="multipart/form-data">
                                <TabPanel>
                                    <h4><b>Welcome! Verify the location</b></h4>
                                    <h4><b>of your rental</b></h4>
                                    <p>Just 4 steps remaining</p>
                                    <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                </TabPanel>

                                <TabPanel id="2">
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Address</b></h2>
                                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        <br></br>
                                        <p>Street Address</p>
                                        <input type="text" class="form-control" onChange={this.handleChange} value={this.state.street} placeholder="Street Address" name="street"></input>
                                        <br></br>
                                        <p>Apt #</p>
                                        <input type="text" class="form-control" onChange={this.handleChange} value={this.state.apt} placeholder="Apt #" name="apt"></input>
                                        <br></br>
                                        <p>City</p>
                                        <input type="text" class="form-control" placeholder="City" onChange={this.handleChange} value={this.state.location_city} name="location_city"></input>
                                        <br></br>
                                        <p>State</p>
                                        <input type="text" class="form-control" onChange={this.handleChange} value={this.state.state} placeholder="State" name="state"></input>
                                        <br></br>
                                        <p>Zip Code</p>
                                        <input type="text" class="form-control" placeholder="Zip Code" onChange={this.handleChange} value={this.state.zipcode} name="zipcode"></input>
                                        <br></br>
                                        <p>Country</p>
                                        <input type="text" class="form-control" placeholder="Country" onChange={this.handleChange} value={this.state.country} name="country"></input>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Availability</b></h2>
                                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        <p>Already know when would you like your property to be available?</p>
                                        <p>You can also make changes after publishing your listing</p>
                                        <br></br>
                                        <p><b>Start Date</b></p>
                                        <input type="date" class="form-control" onChange={this.handleChange} value={this.state.available_from} name="available_from"></input>
                                        <p><b>Start Date</b></p>
                                        <input type="date" class="form-control" onChange={this.handleChange} value={this.state.available_to} name="available_to"></input>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Describe your property</b></h2>
                                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        <hr></hr>
                                        <p>Start out by entering the property name</p>
                                        <input type="text" class="form-control" onChange={this.handleChange} value={this.state.place_name} placeholder="Property Name" name="place_name"></input>
                                        <br></br>
                                        <p>Tell us a headline</p>
                                        <input type="text" class="form-control" onChange={this.handleChange} value={this.state.headline} placeholder="Headline" name="headline"></input>
                                        <br></br>
                                        <p>Give us a detailed description of your property</p>
                                        <input type="textarea" class="form-control" onChange={this.handleChange} value={this.state.description} placeholder="Description" rows="10" name="description"></input>
                                        <br></br>
                                        <p>How many bedrooms do you have?</p>
                                        <input type="number" class="form-control" onChange={this.handleChange} value={this.state.bedrooms} placeholder="No of Bedrooms" name="bedrooms"></input>
                                        <br></br>
                                        <p>What about bathrooms?</p>
                                        <input type="number" class="form-control" onChange={this.handleChange} value={this.state.bathrooms} placeholder="No of Bathrooms" name="bathrooms"></input>
                                        <br></br>
                                        <p>Amenities you will provide</p>
                                        <div class="d-flex flex-wrap">
                                            <input type="checkbox" name="swimming pool" checked={true}></input>
                                            <label>Swimming Pool</label>
                                            <input type="checkbox" name="parking" checked={true}></input>
                                            <label>Parking</label>
                                            <input type="checkbox" name="wifi" checked={true}></input>
                                            <label>Free Wifi</label>
                                            <input type="checkbox" name="washer" checked={true}></input>
                                            <label>Washer</label>
                                            <input type="checkbox" name="dryer" checked={true}></input>
                                            <label>Dryer</label>
                                        </div>
                                        <br></br>
                                        <p>Finally, let us know how many guests can be accomodated in your property</p>
                                        <input type="number" class="form-control" onChange={this.handleChange} value={this.state.accomodates} placeholder="Accomodates" name="accomodates"></input>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2 class="text-center"><b>Add up to 5 photos of your property</b></h2>
                                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        <hr></hr>
                                        <p class="text-center">Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.</p>
                                        <p class="text-center form-footer text-danger">You cannot edit the photos later that you will upload right now.Be Careful!</p>
                                        <hr></hr>
                                        <h2 class="text-center p-2">Drop photos here</h2>
                                        <p class="text-center p-2">or</p>
                                        <input type="file" id="files" name="propertyImages" onChange={this.handleChange} class="hidden" multiple />
                                        <label for="files" class="btn btn-primary btn-lg">Select photos to upload</label>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>How much do you want to charge?</b></h2>
                                        <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                                        <p>We recommend starting with a low price to get initial bookings and earn some guests reviews. You can update your rates at any time.</p>
                                        <br></br>
                                        <p>Enter the amount you want to charge for 1 night(in $)</p>
                                        <input type="number" class="form-control" onChange={this.handleChange} value={this.state.price} placeholder="Nightly Base Rate" name="price"></input>
                                        <br></br>
                                        <input type="submit" class="btn btn-primary btn-large" disabled={!this.state.formValid} onClick={this.addProperty} value="Add my property"></input>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>
                            </form>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProperty2
