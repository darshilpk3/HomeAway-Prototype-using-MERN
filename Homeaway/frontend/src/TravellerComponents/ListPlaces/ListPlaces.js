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
import { connect } from 'react-redux'
import { getProperties } from '../../Actions/propertyActions'
import ReactPaginate from 'react-paginate'
import {store} from '../../store'

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

    askQuestion = (e) => {
        console.log("asking a question on property id: ", e.target.id)
        var headers = new Headers()
        axios.defaults.withCredentials = true
        const data = {
            _id: e.target.id,
            topic: this.state.topic,
            question: this.state.question
        }
        axios.post("http://localhost:3001/travel/" + localStorage.getItem('loginuser') + "/question", data)
            .then(response => {
                if (response.status === 200) {
                    console.log("Question posted")
                    this.props.history.go(0)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    showDetails = (e) => {

        var headers = new Headers()
        e.preventDefault()
        axios.defaults.withCredentials = true

        const _id = e.target.id
        console.log("Details should be shown: " + _id)
        axios.get("http://localhost:3001/property/" + _id)
            .then(response => {
                console.log("Response from get method: ", response.data)
                // this.setState({
                //     responseData: response.data
                // })
                this.props.history.push({
                    pathname: "/traveller/property/show",
                    state: {
                        response: response.data,
                        book_from: this.props.location.state && this.props.location.state.available_from,
                        book_to: this.props.location.state && this.props.location.state.available_to,
                        guests: this.props.location.state && this.props.location.state.accomodates
                    }
                })
            })
    }

    componentDidMount() {
        console.log("component has mounted")
        if (this.props.location.state) {
            console.log("component did mount should call getProperties")
            console.log("properties from inline: ",this.props.location.state.places_list.length)
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
            
    componentWillReceiveProps(nextProps) {
        console.log("props received: ",nextProps.propertyList)
        if (nextProps.propertyList != this.props.propertyList) {
            console.log("Updated Property List: ",nextProps.propertyList)
            const pageCount = Math.ceil(nextProps.propertyList.length / 2)
            this.setState({
                propertyList: nextProps.propertyList,
                filteredList: nextProps.propertyList,
                pageCount : pageCount
            },() => {
                var temp = this.state.filteredList.slice(0,2)
                this.setState({
                    paginatedList : temp
                })           
            })
        }
    }

    render() {
        let redirectVar = null
        if (!localStorage.getItem("loginuser")) {
            redirectVar = <Redirect to="/" />
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

            var photos = (images) => images.map(image => {
                console.log(image)
                return (
                    <div class="carousel-item">
                        <img class="d-block w-100" src={"http://localhost:3001" + image} alt="Photo slide" />
                    </div>
                )
            })

            var buttons = this.state.paginatedList.map(placeDetail => {
                //var images = placeDetail.property_images
                return (
                    <tr>
                        <td class="property-image-carousel">
                            <div id={"carouselExampleControls" + placeDetail._id} class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src={"http://localhost:3001/public/uploads/ha.jpeg"} alt="First slide" />
                                    </div>
                                    {photos(placeDetail.property_images)}
                                </div>
                                <a class="carousel-control-prev" href={"#carouselExampleControls" + placeDetail._id} role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href={"#carouselExampleControls" + placeDetail._id} role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td class="property-detail p-2">
                            <h3><a href="#" class="text-dark" id={placeDetail._id} onClick={this.showDetails}>{placeDetail.place_name}</a></h3>
                            <p class="text-warning">{placeDetail.headline}</p>
                            <p><b>Description: </b>{placeDetail.description}</p>
                            <p><b>Property Details: </b>{placeDetail.bedrooms} BR &middot;{placeDetail.bathrooms} BA &middot;Sleeps {placeDetail.accomodates}</p>
                            <p><b>Location, City: </b>{placeDetail.location_city}</p>
                            <p class="bg-light"><b>Base Nightly Rate:</b>{" $" + placeDetail.price}</p>
                        </td>
                        <td>
                            <button type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target={"#exampleModalCenter" + placeDetail._id}>
                                Ask Owner a Question
                          </button>
                            <div class="modal fade" id={"exampleModalCenter" + placeDetail._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Ask a question</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <input type="text" class="form-control" placeholder="Title" name="topic" onChange={this.handleChange}></input>
                                                <textarea class="form-control" rows={10} placeholder="Type your question" name="question" onChange={this.handleChange} />
                                                <input type="button" id={placeDetail._id} onClick={this.askQuestion} class="form-control-login btn-primary" value="Ask" />
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

ListPlaces.propTypes = {
    getProperties: PropTypes.func.isRequired,
    propertyList: PropTypes.object,
}

const mapStatetoProps = state => ({
    propertyList: state.property.propertyList,
})


export default connect(mapStatetoProps, { getProperties })(ListPlaces);