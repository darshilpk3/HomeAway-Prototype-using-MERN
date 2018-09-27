import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import Footer from '../Footer/Footer'
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import InlineForm from '../InlineForm/InlineForm';

class ListPlaces extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        console.log(this.props.location.state && this.props.location.state.place)
        var form_values = {
            place:this.props.location.state && this.props.location.state.place,
            available_from:this.props.location.state && this.props.location.state.available_from,
            available_to:this.props.location.state && this.props.location.state.available_to,
            accomodates:this.props.location.state && this.props.location.state.accomodates
        }
        console.log(form_values)
        //var places_list = this.props.loaction.state && this.props.location.state.places_list;
        var buttons = this.props.location.state.places_list.map(placeDetail => {
            return(
                <button type="button" class="btn btn-primary" id={placeDetail.place_id}>{placeDetail.place_name}</button>
            )
        });
        return(
            <div>
                <NavBar />
                <div class="clearfix"/>
                <InlineForm form_values = {form_values}/>
                <div class="clearfix"></div>
                <div>
                    {buttons}
                </div>
            </div>
        )
    }
}

export default ListPlaces