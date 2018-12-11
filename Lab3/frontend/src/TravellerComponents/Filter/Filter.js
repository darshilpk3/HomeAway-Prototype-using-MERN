import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { Redirect } from 'react-router'
import cookie from 'react-cookies'
import { FormErrors } from '../../FormErrors';
class Filter extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        console.log("inside inline form: " + (this.props.form_values && this.props.form_values.place))
        this.state = {
            place: ((this.props.form_values && this.props.form_values.place)),
            available_from: (this.props.form_values && this.props.form_values.available_from),
            available_to: (this.props.form_values && this.props.form_values.available_to),
            accomodates: (this.props.form_values && this.props.form_values.accomodates),
            price: (this.props.form_values && this.props.form_values.price),
            bedrooms: (this.props.form_values && this.props.form_values.bedrooms),
            responsedata: null,
            priceValid: false,
            bedroomsValid: false,
            formErrors: { price: "", bedrooms: "" }
        }
        // this.responsedata = this.responsedata.bind(this)
    }

    componentDidMount() {
        if (this.props.form_values) {
            console.log("form should be valid")
            this.setState({
                place: (((this.props.form_values && this.props.form_values.place)) || (this.props.place && this.props.place)),
                available_from: (this.props.form_values && this.props.form_values.available_from),
                available_to: (this.props.form_values && this.props.form_values.available_to),
                accomodates: (this.props.form_values && this.props.form_values.accomodates),
                price: (this.props.form_values.price && this.props.form_values.price),
                bedrooms: (this.props.form_values && this.props.form_values.bedrooms),
                priceValid: (this.props.form_values.bedrooms && true),
                bedroomsValid: (this.props.form_values.price && true),
                formValid: (this.props.form_values.bedrooms && this.props.form_values.price)
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
        let priceValid = this.state.priceValid;
        let bedroomsValid = this.state.bedroomsValid;
        switch (fieldName) {
            case 'price':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                priceValid = value.length > 0;
                fieldValidationErrors.price = priceValid ? '' : ' is invalid';
                break;
            case 'bedrooms':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                bedroomsValid = value > 0;
                fieldValidationErrors.bedrooms = bedroomsValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            priceValid: priceValid,
            bedroomsValid: bedroomsValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.priceValid || this.state.bedroomsValid });
    }


    filterResult = (e) => {
        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        const data = {
            place: this.state.place,
            available_from: this.state.available_from,
            available_to: this.state.available_to,
            accomodates: this.state.accomodates,
            price: this.state.price,
            bedrooms : this.state.bedrooms
        }
        console.log(data)
        axios.post("http://localhost:3001/property/filter", data)
            .then(response => {
                console.log("properties should be listed")
                var rowdata;
                if (response.status === 400) {
                    console.log(response.data)
                } else if (response.status === 200 && response.data !== "No places available") {
                    for (rowdata of response.data) {
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

    filterBedrooms = (e) => {
        var headers = new Headers();
        e.preventDefault();
        axios.defaults.withCredentials = true;

        const data = {
            place: this.state.place,
            available_from: this.state.available_from,
            available_to: this.state.available_to,
            accomodates: this.state.accomodates,
            bedrooms: this.state.bedrooms,
        }
        console.log(data)
        axios.post("http://localhost:3001/property/filterbedrooms", data)
            .then(response => {
                console.log("properties should be listed")
                var rowdata;
                if (response.status === 400) {
                    console.log(response.data)
                } else if (response.status === 200 && response.data !== "No places available") {
                    for (rowdata of response.data) {
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
                    accomodates: this.state.accomodates,
                    price: this.state.price,
                    bedrooms: this.state.bedrooms
                }
            }} />
        }

        return (
            <div>
                {redirectVar}
                <p class="form-footer text-danger"><FormErrors formErrors={this.state.formErrors} /></p>
                    <div class="row">
                        <div class="col-sm-5 mx-auto">
                            <input type="text" class="form-control" onChange={this.handleChange}  placeholder="Maximum Price" name="price" />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Maximum Price</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-5 mx-auto">
                            <div class="input-group">
                                <input type="number" class="form-control" onChange={this.handleChange}  placeholder="No of " name="bedrooms" />
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Minimum Bedrooms</button>
                                </span>
                            </div>
                        </div>
                    </div>

            </div>
        )
    }
}

export default Filter