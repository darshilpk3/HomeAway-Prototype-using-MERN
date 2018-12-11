import React, { Component } from 'react'
import cookie from 'react-cookies'
import {Redirect} from 'react-router'

class LoginNavBar extends Component {
    render() {
        let redirectVar = null;
        if(localStorage.getItem("loginuser")){
            redirectVar = <Redirect to="/home"/>
        }
        return (
            <nav class="navbar navbar-expand navbar-dark">
                <div class="container-fluid padding">
                    <a href="index.html" class="navbar-brand"><img class="navbar-brand" src="logo-white.svg" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-tosggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown navbar-brand">
                                <img class="navbar-brand" src="birdhouse-bceheader-white.svg" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default LoginNavBar;