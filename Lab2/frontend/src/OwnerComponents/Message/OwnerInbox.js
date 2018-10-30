import React, { Component } from 'react'
import OwnerNavbar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';
class OwnerInbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: null,
            answer:"",
            redirect:false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    } 

    answerQuestion = (e) => {
        var headers = new Headers()
        axios.defaults.withCredentials = true
        const data = {
            _id : e.target.id,
            answer:this.state.answer
        }
        axios.post("http://localhost:3001/owner/"+cookie.load("ownerlogin")+"/question",data)
            .then(response => {
                if(response.status === 200){
                    console.log("Answered")
                    this.setState({
                        redirect:true
                    })
                }                
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        var id = cookie.load("ownerlogin")
        // console.log("Sending get request to http://localhost:3001/edit/" + id)
        axios.get("http://localhost:3001/owner/" + id + "/question")
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
        if (!cookie.load("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }
        if(this.state.redirect){
            redirectVar = <Redirect to="/owner/inbox" />
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
                            <button type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                Answer
                            </button>
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Answer</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <textarea class="form-control" rows={10} placeholder="Type your answer" value = {this.state.answer} name="answer" onChange={this.handleChange}/>
                                                <input type="button" id={question._id} onClick={this.answerQuestion} class="form-control-login btn-primary" value="Submit"/>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <OwnerNavbar />
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

export default OwnerInbox;