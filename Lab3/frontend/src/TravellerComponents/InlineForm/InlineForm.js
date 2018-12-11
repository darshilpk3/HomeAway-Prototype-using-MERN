import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import { FormErrors } from '../../FormErrors';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getProperties } from '../../Actions/propertyActions'
import {graphql, compose} from 'react-apollo'
import {searchResults, loginTraveler} from '../../Queries/queries'

class InlineForm extends Component {

    constructor(props) {
        super(props)
        this.submitSearch = this.submitSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log("inside inline form: " + (this.props.form_values && this.props.form_values.place))
        this.state = {
            place: (((this.props.form_values && this.props.form_values.place)) || (this.props.place && this.props.place)),
            available_from: (this.props.form_values && this.props.form_values.available_from),
            available_to: (this.props.form_values && this.props.form_values.available_to),
            accomodates: (this.props.form_values && this.props.form_values.accomodates),
            responsedata: null,
            placeValid: false,
            available_fromValid: false,
            available_toValid: false,
            accomodatesValid: false,
            formErrors: { place: "", available_from: "", available_to: "", accomodates: "" },
            message:""
        }
    }

    componentDidMount() {
        if (this.props.form_values) {
            console.log("form should be valid")
            this.setState({
                place: (((this.props.form_values && this.props.form_values.place)) || (this.props.place && this.props.place)),
                available_from: (this.props.form_values && this.props.form_values.available_from),
                available_to: (this.props.form_values && this.props.form_values.available_to),
                accomodates: (this.props.form_values && this.props.form_values.accomodates),
                placeValid: true,
                available_fromValid: true,
                available_toValid: true,
                accomodatesValid: true,
                formValid: true
            })
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: e.target.value
        }, () => {
            this.validateField(name, value)
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let placeValid = this.state.placeValid;
        let available_fromValid = this.state.available_fromValid;
        let available_toValid = this.state.available_toValid;
        let accomodatesValid = this.state.accomodatesValid;

        switch (fieldName) {
            case 'place':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                placeValid = value.length >= 1;
                fieldValidationErrors.place = placeValid ? '' : ' is invalid';
                break;
            case 'available_from':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                available_fromValid = new Date(value) >= Date.now();
                fieldValidationErrors.available_from = available_fromValid ? '' : ' is invalid';
                break;
            case 'available_to':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                available_toValid = new Date(value) >= Date.now() && new Date(value) > new Date(this.state.available_from);
                fieldValidationErrors.available_to = available_toValid ? '' : ' is invalid';
                break;
            case 'accomodates':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                accomodatesValid = value > 0;
                fieldValidationErrors.accomodates = accomodatesValid ? '' : ' is invalid';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            placeValid: placeValid,
            available_fromValid: available_fromValid,
            available_toValid: available_toValid,
            accomodatesValid: accomodatesValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.placeValid && this.state.available_fromValid && this.state.available_toValid && this.state.accomodatesValid });
    }


    submitSearch = (e) => {
        e.preventDefault();
        console.log("Searching Properties")
        console.log(this.props)
        this.props.searchResults({
            variables: {
                place: this.state.place,
                available_from: this.state.available_from,
                available_to: this.state.available_to,
                accomodates: this.state.accomodates
            }
        })
            .then(response => {
                console.log(response.data.searchResults)
                if(response.data.searchResults && response.data.searchResults.length !=0){
                    this.setState({
                        responsedata: response.data.searchResults
                    })
                }else{
                    this.setState({
                        message : "No Places found in your criteria"
                    })
                }
                
            })

        // axios.post("http://localhost:3001/property/search", data)
        //     .then(response => {
        //         console.log("properties should be listed")
        //         var rowdata;
        //         if (response.status === 400) {
        //             console.log(response.data)
        //         } else if (response.status === 200 && response.data !== "No places available") {
        //             for (rowdata of response.data) {
        //                 console.log(rowdata.place_name)
        //             }
        //             this.setState({
        //                 responsedata: response.data
        //             })
        //         } else {
        //             console.log(response.data)
        //         }
        //     })
    }

    render() {
        var redirectVar = null
        if (!localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        } else if (this.state.responsedata) {
            redirectVar = <Redirect to={{
                pathname: '/traveller/show',
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
                <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                <p class="form-footer text-danger">{this.state.message}</p>
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
                            <button type="submit" class="form-control-login btn btn-primary" disabled={!this.state.formValid} onClick={this.submitSearch}>Search</button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}



export default compose(
    graphql(searchResults,{ name: "searchResults"})
)(InlineForm);