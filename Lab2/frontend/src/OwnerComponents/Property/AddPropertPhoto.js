import React, { Component } from 'react'
import axios from 'axios'
import OwnerNavBar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import '../../App.css'

class AddPropertyPhoto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            propertyImage: null,
            imagePaths: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.addImage = this.addImage.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            propertyImage: e.target.files
        }) 
    }

    addImage = (e) => {
        var headers = new Headers();
        e.preventDefault();

        axios.defaults.withCredentials = true;
        console.log(this.state.propertyImage.length)
        var file;
        for (file of this.state.propertyImage) {

            console.log("While sending post request: " + file)
            let formData = new FormData();

            formData.append('id', this.props.location.state._id)
            formData.append('file', file)

            console.log("formData is: ", formData.get('id'))
            axios.post("http://localhost:3001/property/" + formData.get('id') + "/upload", formData)
                .then(response => {
                    console.log("file should be  uploaded")
                    if (response.status === 200) {
                        console.log("Photos Uploaded")
                    }
                })
        }
    }
    render() {
        console.log("while rendering: ", this.state.imagePaths)
        let redirectVar = null
        if(!localStorage.getItem("ownerlogin")){
            redirectVar = <Redirect to ="/owner/home"/>
        }
        return (
            <div>
            {redirectVar}
            <OwnerNavBar />
                <div class="d-flex flex-column justify-content-center p-5">
                    <h2 class="text-center"><b>Add up to 3 photos of your property</b></h2>
                    <hr></hr>
                    <p class="text-center">Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 6 photos minimum. Need photos? Hire a professional.</p>
                    <p class="text-center form-footer text-danger">You cannot edit the photos later that you will upload right now.Be Careful!</p>
                    <hr></hr>
                    <h2 class="text-center p-2">Drop photos here</h2>
                    <p class="text-center p-2">or</p>
                    <form enctype="multipart/form-data" class="d-flex flex-column justify-content-center">
                        <input type="file" id="files" name="propertyImages" onChange={this.handleChange} class="hidden" multiple />
                        <label for="files" class="btn btn-primary btn-lg">Select photos to upload</label>
                        <br></br>
                        <button type="button" class="btn btn-warning btn-lg" onClick={this.addImage}>Done</button>
                    </form>
                    <br></br>
                    <p class="form-footer">Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.</p>
                    <p class="form-footer">©2018 HomeAway. All rights reserved</p>
                    <p class="form-footer">Start Co-browse</p>
                </div>
            </div>
        )
    }
}


export default AddPropertyPhoto