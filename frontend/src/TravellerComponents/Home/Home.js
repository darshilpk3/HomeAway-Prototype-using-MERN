import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import Footer from '../Footer/Footer'
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import {Redirect} from 'react-router'

class Home extends Component {

    constructor(props){
        super(props)
        console.log(props)
    }

    componentDidMount(){
        // if(this.props.location.user && this.props.location.state.user){
            console.log(this.props.location.state && this.props.location.state.user.email)
        // }
    }
    render() {

        let redirectVar = null;
        console.log(cookie.load("loginuser"))
        if(!cookie.load("loginuser")){
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <div class="home-header">
                    <NavBar user={this.props.location.state && this.props.location.state.user}/>
                </div>
                <div class="clearfix"></div>
                <CardCarousel />    
                <div class="clearfix"></div>
                <div class="flex-container" id="listproperty">
                    <p class=" list-property-header text-center">List your property on HomeAway and open your door to rental income</p>
                    <button class="btn btn-primary btn-inverse text-center">List Your Property</button>
                </div>
                <div class="clearfix"></div>
                <CardCarousel />
                <div class="clearfix"></div>
                <Footer />              
            </div>
        )
    }
}

export default Home;