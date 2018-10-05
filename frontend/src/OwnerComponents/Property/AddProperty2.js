import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'


class AddProperty2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: 0
        }
        this.handleTabs = this.handleTabs.bind(this)
    }

    handleTabs = (e) => {
        this.setState({
            tab: Number(e.target.id)
        })
        console.log("changing the state of tab index", this.state.tab)
    }
    render() {
        console.log("rendering")
        console.log("Tab while rendering: ", this.state.tab)
        return (
            <div>
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
                                <Tab className="p-3">Photos</Tab>
                                <Tab className="p-3">Pricing</Tab>
                            </TabList>

                            <form class="form-body mx-auto w-50">
                                <TabPanel>
                                    <h4><b>Welcome! Verify the location</b></h4>
                                    <h4><b>of your rental</b></h4>
                                    <p>Just 5 steps remaining</p>
                                    <button type="button" id="1" class="btn btn-primary btn-large" onClick={this.handleTabs}>Continue</button>
                                </TabPanel>

                                <TabPanel id="2">
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Address</b></h2>
                                        <br></br>
                                        <p>Street Address</p>
                                        <input type="text" class="form-control" placeholder="Street Address"></input>
                                        <br></br>
                                        <p>Apt #</p>
                                        <input type="text" class="form-control" placeholder="Apt #"></input>
                                        <br></br>
                                        <p>City</p>
                                        <input type="text" class="form-control" placeholder="City"></input>
                                        <br></br>
                                        <p>State</p>
                                        <input type="text" class="form-control" placeholder="State"></input>
                                        <br></br>
                                        <p>Zip Code</p>
                                        <input type="text" class="form-control" placeholder="Zip Code"></input>
                                        <br></br>
                                        <p>Country</p>
                                        <input type="text" class="form-control" placeholder="Country"></input>
                                        <br></br>
                                        <button type="button" id="1" class="btn btn-primary btn-large" onClick={this.handleTabs}>Continue</button>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Availability</b></h2>
                                        <p>Already know when would you like your property to be available?</p>
                                        <p>You can also make changes after publishing your listing</p>
                                        <br></br>
                                        <p><b>Start Date</b></p>
                                        <input type="date" class="form-control"></input>
                                        <p><b>Start Date</b></p>
                                        <input type="date" class="form-control"></input>
                                        <br></br>
                                        <button type="button" class="btn btn-primary btn-lg">Continue</button>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Describe your property</b></h2>
                                        <hr></hr>
                                        <p>Start out by entering the property name</p>
                                        <input type="text" class="form-control" placeholder="Property Name"></input>
                                        <br></br>
                                        <p>Tell us a headline</p>
                                        <input type="text" class="form-control" placeholder="Headline"></input>
                                        <br></br>
                                        <p>Give us a detailed description of your property</p>
                                        <input type="textarea" class="form-control" placeholder="Description" rows="10"></input>
                                        <br></br>
                                        <p>How many bedrooms do you have?</p>
                                        <input type="number" class="form-control" placeholder="No of Bedrooms"></input>
                                        <br></br>
                                        <p>What about bathrooms?</p>
                                        <input type="number" class="form-control" placeholder="No of Bathrooms"></input>
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
                                        <input type="number" class="form-control" placeholder="Accomodates"></input>
                                        <br></br>
                                        <button type="button" id="1" class="btn btn-primary btn-large" onClick={this.handleTabs}>Continue</button>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>Add up to 50 photos of your property</b></h2>
                                        <hr></hr>
                                        <p class="text-center">Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.</p>
                                        <hr></hr>
                                        <h2 class="text-center p-2">Drop photos here</h2>
                                        <p class="text-center p-2">or</p>
                                        <input type="file" id="files" class="hidden" />
                                        <label for="files" class="btn btn-primary btn-lg">Select photos to upload</label>
                                        <br></br>
                                        <button type="button" id="1" class="btn btn-primary btn-large" onClick={this.handleTabs}>Continue</button>
                                        <br></br>
                                        <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                                        <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                                        <p class="form-footer">Start Co-browse</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div class="d-flex flex-column justify-content-center p-5">
                                        <h2><b>How much do you want to charge?</b></h2>
                                        <p>We recommend starting with a low price to get initial bookings and earn some guests reviews. You can update your rates at any time.</p>
                                        <br></br>
                                        <p>Enter the amount you want to charge for 1 night(in $)</p>
                                        <input type="number" class="form-control" placeholder="Nightly Base Rate"></input>
                                        <br></br>
                                        <input type="submit" class="btn btn-primary btn-large" onClick={this.handleTabs} value="Add my property"></input>
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
