import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import Footer from '../Footer/Footer'
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
//import Pagination from '../Pagination/Pagination'
import InlineForm from '../InlineForm/InlineForm';
import axios from 'axios'
import Filter from '../Filter/Filter'
import _ from "lodash";

import PropTypes from 'prop-types';
import { getProperties } from '../../Actions/propertyActions'
import ReactPaginate from 'react-paginate'
import {getPropertyDetails} from '../../Queries/queries'
import {graphql,compose} from 'react-apollo'

class ListPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            propertyList: null,
            filteredList:null,
            paginatedList:null,
            topic: "",
            question: "",
            rerender: false,
            price: "",
            bedrooms: "",
            pageCount:null
        }
        this.showDetails = this.showDetails.bind(this);
    }

    componentWillMount(){
        this.setState({
            price : "",
            bedrooms : ""
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePageClick = (e) => {
        var temp = this.state.filteredList.slice(e.selected*2,(e.selected*2)+2)
        console.log(temp)
        this.setState({
            paginatedList:temp
        })
    }
    filterResult = (e) => {
        if(this.state.price && !this.state.bedrooms){
            const oldList = this.state.propertyList
            const filterPrice = this.state.price
            console.log("price to be filtered ",filterPrice)
            this.setState({
                filteredList : _.filter(oldList,function(o) { return o.price <= filterPrice})
            },() => {
                var tempList = this.state.filteredList
                this.setState({
                    pageCount : Math.ceil(tempList.length / 2),
                    paginatedList : tempList.slice(0,2)
                })
                console.log("Filtered List: ",this.state.filteredList)
            })
        }else if(!this.state.price && this.state.bedrooms){
            const oldList = this.state.propertyList
            const filterBedroom = this.state.bedrooms
            console.log("bedrooms to be filtered ",filterBedroom)
            this.setState({
                filteredList : _.filter(oldList,function(o) { return o.bedrooms >= filterBedroom})
            },() => {
                var tempList = this.state.filteredList
                this.setState({
                    pageCount : Math.ceil(tempList.length / 2),
                    paginatedList : tempList.slice(0,2)
                })
                console.log("Filtered List: ",this.state.filteredList)
            })
        }else if(this.state.price && this.state.bedrooms){
            const oldList = this.state.propertyList
            const filterPrice = this.state.price
            const filterBedroom = this.state.bedrooms
            console.log("bedrooms to be filtered ",filterBedroom)
            var filteredList = _.filter(oldList,function(o) { return o.bedrooms >= filterBedroom})
            filteredList = _.filter(filteredList,function(o) { return o.price <= filterPrice})
            this.setState({
                filteredList : filteredList
            },() => {
                var tempList = this.state.filteredList
                this.setState({
                    pageCount : Math.ceil(tempList.length / 2),
                    paginatedList : tempList.slice(0,2)
                })
                console.log("Filtered List: ",this.state.filteredList)
            })
        }
    }

    clearFilter = (e) =>{
        const oldList = this.state.propertyList
        this.setState({
            price:"",
            bedrooms:"",
            filteredList : oldList
        },() => {
            var tempList = this.state.filteredList
                this.setState({
                    pageCount : Math.ceil(tempList.length / 2),
                    paginatedList : tempList.slice(0,2)
                })
            console.log("Filtered List: ",this.state.filteredList)
        })
    }

    showDetails = (e) => {

        e.preventDefault()
        console.log("Booking Details of: ",e.target.id)
        this.props.getPropertyDetails({
            variables:{
                id:e.target.id
            }
        })
        .then(response => {
            console.log("Got response: ",response.data.getPropertyDetails)
            this.setState({
                responseData: response.data.getPropertyDetails
            })
        })

    }

    componentDidMount() {
        console.log("component has mounted")
        if (this.props.location.state) {
            console.log("component did mount should call getProperties")
            console.log("properties from inline: ",this.props.location.state.places_list)
            const pageCount = Math.ceil(this.props.location.state.places_list.length / 2)
            this.setState({
                propertyList: this.props.location.state.places_list,
                filteredList: this.props.location.state.places_list,
                pageCount: pageCount
            }, () => {
                var temp = this.state.filteredList.slice(0, 2)
                this.setState({
                    paginatedList: temp
                })
            })
        }
    }
            
    // componentWillReceiveProps(nextProps) {
    //     console.log("props received: ",nextProps.propertyList)
    //     if (nextProps.propertyList != this.props.propertyList) {
    //         console.log("Updated Property List: ",nextProps.propertyList)
    //         const pageCount = Math.ceil(nextProps.propertyList.length / 2)
    //         this.setState({
    //             propertyList: nextProps.propertyList,
    //             filteredList: nextProps.propertyList,
    //             pageCount : pageCount
    //         },() => {
    //             var temp = this.state.filteredList.slice(0,2)
    //             this.setState({
    //                 paginatedList : temp
    //             })           
    //         })
    //     }
    // }

    render() {
        let redirectVar = null
        if (!localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/traveller/login" />
        }
        if (this.state.responseData) {
            console.log("should be redirected")
            redirectVar = <Redirect to={{
                pathname: "/traveller/property/show",
                state: {
                    response: this.state.responseData,
                    book_from: this.props.location.state && this.props.location.state.available_from,
                    book_to: this.props.location.state && this.props.location.state.available_to,
                    guests: this.props.location.state && this.props.location.state.accomodates
                }
            }} />
        }
        console.log(this.props.location.state && this.props.location.state.place)
        var form_values = {
            place: this.props.location.state && this.props.location.state.place,
            available_from: this.props.location.state && this.props.location.state.available_from,
            available_to: this.props.location.state && this.props.location.state.available_to,
            accomodates: this.props.location.state && this.props.location.state.accomodates
        }
        console.log(form_values)
        //var places_list = this.props.loaction.state && this.props.location.state.places_list;
        //console.log(this.props.location.state.places_list)
        if (this.state.paginatedList) {
            var buttons = this.state.paginatedList.map(placeDetail => {
                console.log(placeDetail)
                return (
                    <tr>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail.id} onClick={this.showDetails}>{placeDetail.place_name}</a></h3>
                            <p class="text-warning">{placeDetail.headline}</p>
                            <p><b>Description: </b>{placeDetail.description}</p>
                            <p><b>Property Details: </b>{placeDetail.bedrooms} BR &middot;{placeDetail.bathrooms} BA &middot;Sleeps {placeDetail.accomodates}</p>
                            <p><b>Location, City: </b>{placeDetail.location_city}</p>
                            <p class="bg-light"><b>Base Nightly Rate:</b>{" $" + placeDetail.price}</p>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <div>
                {redirectVar}
                <NavBar />
                <div class="clearfix" />
                <br></br>
                <h1 class="text-primary">Modify Search</h1>
                <div class="d-flex justify-content-center">
                    <InlineForm form_values={form_values} />
                </div>
                <br></br>
                <div class="d-flex justify-content-center">
                    <div class="row">
                        <div class="col-sm-3 mx-auto">
                            <input type="text" class="form-control" onChange={this.handleChange} value={this.state.price} placeholder="Maximum Price" name="price" />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Maximum Price</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-3 mx-auto">
                            <div class="input-group">
                                <input type="number" class="form-control" value={this.state.bedrooms} onChange={this.handleChange} placeholder="No of " name="bedrooms" />
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <button type="button" class="form-control-login btn-warning" onClick={this.filterResult}>Filter Minimum Bedrooms</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-3 mx-auto">
                            <button type="button" class="form-control-login btn-warning" onClick={this.clearFilter} >Clear Filter</button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div class="clearfix"></div>
                <hr></hr>
                <div>
                    <h2 class="text-dark text-center">Search Results</h2>
                    <div class="form-body">
                        <div class="d-flex justify-content-left">
                            <table class="w-100 table-bordered bg-grey">
                                {buttons}
                            </table>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"} 
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                </div>
                
            </div>
        )
    }
}

export default compose(
    graphql(getPropertyDetails,{ name: "getPropertyDetails" })
)(ListPlaces);