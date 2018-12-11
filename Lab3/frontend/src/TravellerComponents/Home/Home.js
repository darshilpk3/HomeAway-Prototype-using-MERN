import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import '../../App.css'
import {connect} from 'react-redux'
import Footer from '../Footer/Footer'
import PropTypes from 'prop-types';
import CardCarousel from '../CardCarousel/CardCarousel'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import InlineForm from '../InlineForm/InlineForm';
import {fetchtraveler} from '../../Actions'
import NavBar2 from '../NavBar/NavBar2';

class Home extends Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    componentDidMount() {

    }
    render() {

        let redirectVar = null;
        console.log(this.props)
        return (
            <div>
                {redirectVar}
                <div class="home-header">
                    <NavBar2/>
                    <div class="jumbotron transparent">
                        <h1 class="form-header text-white">Book beach houses, cabins,</h1>
                        <h1 class="form-header text-white">condos and more, worldwide</h1>
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

export default (Home);