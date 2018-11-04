import React, { Component } from 'react'
import OwnerNavbar from '../NavBar/OwnerNavBar'
import { Redirect } from 'react-router'
import axios from 'axios'
import cookie from 'react-cookies'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import '../../App.css'
import 'react-tabs/style/react-tabs.css'
import { FormErrors } from '../../FormErrors';


import PropTypes from 'prop-types';
import {loadInbox, answerQuestion} from '../../Actions/ownerActions'


import {connect} from 'react-redux'


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
        // var headers = new Headers()
        // axios.defaults.withCredentials = true
        console.log(e.target.id)
        const data = {
            _id : e.target.id,
            answer:this.state.answer
        }
        const id = localStorage.getItem("ownerlogin")
        this.props.answerQuestion(id,data)
        this.props.history.go(0)
    }
    componentDidMount() {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        var id = localStorage.getItem("ownerlogin")

        this.props.loadInbox(id);
        // console.log("Sending get request to http://localhost:3001/edit/" + id)
        // axios.get("http://localhost:3001/owner/" + id + "/question")
        //     .then(response => {
        //         console.log("inside response")
        //         if (response.status === 200) {
        //             var data = response.data
                    // this.setState({
                    //     questions: data
                    // })
        //             console.log(data)
        //         }
        //     })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ownerInbox){
            this.setState({
                questions: nextProps.ownerInbox
            })
        }
    }
    render() {

        let redirectVar = null
        console.log(this.state.image)
        if (!localStorage.getItem("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }
        console.log("Rendering")
        console.log(this.state.bookingDetails)
        var placeDetail = null;
        console.log(typeof this.state.questions)

        if (this.state.questions !== null) {
            var buttons = this.state.questions.map(question => {
                console.log(question._id)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={question.property._id}>{question.property.place_name}</a></h3>
                            <p>{question.property.location_city}</p>
                            <h3 class="text-dark"><b>Topic:</b>{question.topic}</h3>
                            <p><b>Question: {question.question}</b></p>
                            <p><b>Answer: </b>{question.answer}</p>
                            <button type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target={"#exampleModalCenter"+question._id}>
                                Answer
                            </button>
                            <div class="modal fade" id={"exampleModalCenter"+question._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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


OwnerInbox.PropTypes = {
    loadInbox : PropTypes.func.isRequired,
    answerQuestion : PropTypes.func.isRequired,
    ownerInbox : PropTypes.object   
}

const mapStatetoProps = state => ({
    ownerInbox:state.owner.ownerInbox
})

export default connect(mapStatetoProps,{loadInbox,answerQuestion})(OwnerInbox);