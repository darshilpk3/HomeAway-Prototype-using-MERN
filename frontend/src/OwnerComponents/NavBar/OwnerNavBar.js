import React, { Component } from 'react'
//import cookie from 'react-cookies'
// import 'C:/Users/darsh/Desktop/CMPE 273/HomeAway/frontend/src/App.css'
import '../../App.css'
import cookie from 'react-cookies'
import {Redirect} from 'react-router'

class OwnerNavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logininfo: "Login",
            userinfo:this.props.user
        }
        this.loginCheck = this.loginCheck.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    loginCheck = () => {
        //console.log(this.props.user.email)
        if (this.props.user) {
            this.setState({
                logininfo: this.props.user.email
            })
        }
    }
    
    handleLogout = (e) => {
        console.log(cookie.load('loginuser'))
        cookie.remove('ownerlogin',{
            path:"/"
        });
        cookie.remove('owneremail',{
            path:"/"
        });
        this.setState({
            logininfo:"Logged out"
        })
    }

    componentWillMount(){
        this.loginCheck()
    }
    render() {

        let navVar = null;
        if (!cookie.load("ownerlogin")) {
            <Redirect to="/owner/login"/>
        }
        else{
            navVar = <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Welcome {cookie.load('owneremail') && cookie.load('owneremail')}</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href={"/owner/edit/"+cookie.load("ownerlogin")}>Profile Settings</a>
                    <a class="dropdown-item" href={"/owner/property/show"}>Property Details</a>
                    <a class="dropdown-item" href={"/owner/property/add"}>Add new Property</a>
                    <button class="dropdown-item" onClick={this.handleLogout}>Sign out</button>
                </div>
            </li>
        }
        return (
            <nav class="navbar navbar-expand navbar-light">
                <div class="container-fluid padding">
                    <a href="/owner/home" class="navbar-brand"><img class="navbar-brand" src="../../logo-white.svg" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            {navVar}
                            <li class="nav-item dropdown navbar-brand">
                                <img class="navbar-brand" src="../../birdhouse-bceheader-white.svg" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default OwnerNavBar;