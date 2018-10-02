import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import Footer from '../Footer/Footer'
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import InlineForm from '../InlineForm/InlineForm';

class Home extends Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    componentDidMount() {
        // if(this.props.location.user && this.props.location.state.user){
        console.log(this.props.location.state && this.props.location.state.user.email)
        // }
    }
    render() {

        let redirectVar = null;
        console.log(cookie.load("loginuser"))
        if (!cookie.load("loginuser")) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <div class="home-header">
                    <NavBar user={cookie.load("loginemail") && cookie.load("loginemail")} />
                    <div class="jumbotron transparent">
                        <h1 class="form-header">Book beach houses, cabins,</h1>
                        <h1 class="form-header">condos and more, worldwide</h1>
                        <div class="clearfix"></div>
                        <InlineForm />
                    </div>
                    <div class="ValueProps">
                        <ul class="ValueProps__list">
                            <li class="ValueProps__item">
                                <strong class="ValueProps__title">Your whole vacation starts here</strong>
                                <span class="ValueProps__blurb">Choose a rental from the world's best selection</span>
                            </li>
                            <li class="ValueProps__item">
                                <strong class="ValueProps__title">Book and stay with confidence</strong>
                                <span class="ValueProps__blurb"><a href="#">Secure payments, peace of mind</a></span>
                            </li>
                            <li class="ValueProps__item">
                                <strong class="ValueProps__title">Your vacation your way</strong>
                                <span class="ValueProps__blurb">More space, more privacy, no compromises</span>
                            </li>
                        </ul>
                    </div>
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
    // <div class="clearfix"></div>
    //     <div class="flex-container" id="listproperty">
    //         <p class=" list-property-header text-center">List your property on HomeAway and open your door to rental income</p>
    //         <button class="btn btn-primary btn-inverse text-center">List Your Property</button>
    //     </div>
    //     <div class="clearfix"></div>