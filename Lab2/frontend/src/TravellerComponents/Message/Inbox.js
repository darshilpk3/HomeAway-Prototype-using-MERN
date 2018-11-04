import React, { Component } from 'react'
import Navbar from '../NavBar/NavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';
class Inbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: null
        }
    }

    componentDidMount() {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        var id = localStorage.getItem("loginuser")
        // console.log("Sending get request to http://localhost:3001/edit/" + id)
        axios.get("http://localhost:3001/travel/" + id + "/question")
            .then(response => {
                console.log("inside response")
                if (response.status === 200) {
                    var data = response.data
                    this.setState({
                        questions: data
                    })
                    console.log(data)
                }
            })
    }

    render() {

        let redirectVar = null
        console.log(this.state.image)
        if (!localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        }
        console.log("Rendering")
        console.log(this.state.bookingDetails)
        var placeDetail = null;
        console.log(typeof this.state.bookingDetails)

        if (this.state.questions) {
            var buttons = this.state.questions.map(question => {
                console.log(question)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={question.property._id}>{question.property.place_name}</a></h3>
                            <p>{question.property.location_city}</p>
                            <h3 class="text-dark"><b>Topic:</b>{question.topic}</h3>
                            <p><b>Question: {question.question}</b></p>
                            <p><b>Answer: </b>{question.answer}</p>
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
                    <h2 class="text-dark text-center">Inbox</h2>
                    <div class="form-body">
                        <div class="d-flex justify-content-left">
                            <table class="w-100 table-bordered bg-grey">
                                {buttons}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inbox;