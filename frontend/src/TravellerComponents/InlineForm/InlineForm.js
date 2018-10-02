import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
class InlineForm extends Component {

    constructor(props) {
        super(props)
        this.submitSearch = this.submitSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log("inside inline form: "+(this.props.form_values && this.props.form_values.place))
        this.state = {
            place: (((this.props.form_values && this.props.form_values.place))||(this.props.place && this.props.place)),
            available_from: (this.props.form_values && this.props.form_values.available_from),
            available_to: (this.props.form_values && this.props.form_values.available_to),
            accomodates: (this.props.form_values && this.props.form_values.accomodates),
            responsedata: null
        }
        // this.responsedata = this.responsedata.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitSearch = (e) => {
        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        const data = {
            place: this.state.place,
            available_from: this.state.available_from,
            available_to: this.state.available_to,
            accomodates: this.state.accomodates
        }

        axios.post("http://localhost:3001/search", data)
            .then(response => {
                console.log("properties should be listed")
                var rowdata;
                if (response.status === 400) {
                    console.log(response.data)
                } else if (response.status === 200 && response.data !== "No places available") {
                    for(rowdata of response.data){
                        console.log(rowdata.place_name)
                    }
                    this.setState({
                        responsedata: response.data
                    })
                } else {
                    console.log(response.data)
                }
            })

    }

    render() {
        var redirectVar = null
        if (!cookie.load("loginuser")) {
            redirectVar = <Redirect to="/login" />
        } else if (this.state.responsedata) {
            redirectVar = <Redirect to={{
                pathname: '/list',
                state: {
                    places_list: this.state.responsedata,
                    place: this.state.place,
                    available_from: this.state.available_from,
                    available_to: this.state.available_to,
                    accomodates: this.state.accomodates
                }
            }} />
        }

        return (
            <div>
                {redirectVar}
                <form class="form-inline text-center">
                    <div class="row">
                        <div class="col-sm-2 mx-auto">
                            <input type="text" class="form-control" onChange={this.handleChange} value={this.state.place} placeholder="Select a destination" name="place" />
                        </div>
                        <div class="col-sm-2 mx-auto">
                            <input type="date" class="form-control" onChange={this.handleChange} value={this.state.available_from} placeholder="Arrival Date" name="available_from" />
                        </div>
                        <div class="col-sm-2 ">
                            <input type="date" class="form-control" onChange={this.handleChange} value={this.state.available_to} placeholder="Departure Date" name="available_to" />
                        </div>
                        <div class="col-sm-2 mx-auto">
                            <div class="input-group">
                                <input type="number" class="form-control" onChange={this.handleChange} value={this.state.accomodates} placeholder="No of " name="accomodates" />
                                <div class="input-group-append">
                                    <span class="input-group-text">Guests</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 ">
                            <button type="button" class="btn btn-primary" onClick={this.submitSearch}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default InlineForm