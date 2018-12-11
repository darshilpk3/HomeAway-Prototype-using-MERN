import React, { Component } from 'react'
//import cookie from 'react-cookies'
// import 'C:/Users/darsh/Desktop/CMPE 273/HomeAway/frontend/src/App.css'
import '../../App.css'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'


class OwnerNavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logininfo: "Login",
            userinfo: this.props.user
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
        localStorage.removeItem("ownerlogin")
        localStorage.removeItem("owneremail")
        //this.props.history.go(0)
        window.location.reload()

    }

    componentWillMount() {
        this.loginCheck()
    }
    render() {

        let navVar = null;
        if (!localStorage.getItem("ownerlogin")) {
            navVar = <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Login</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="/traveller/login">Traveller Login</a>
                    <a class="dropdown-item" href="/owner/login">Owner Login</a>
                </div>
            </li>
        }
        else {
            navVar = <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Welcome {localStorage.getItem('owneremail') && localStorage.getItem('owneremail')}</a>
                <div class="dropdown-menu">
                    <Link class="dropdown-item" to={"/owner/edit/" + localStorage.getItem("ownerlogin")}>Profile Settings</Link>
                    <Link class="dropdown-item" to={"/owner/property/show"}>Property Details</Link>
                    <Link class="dropdown-item" to={"/owner/property/add"}>Add new Property</Link>
                    <Link class="dropdown-item" to={"/owner/inbox"}>Inbox</Link>
                    <button class="dropdown-item" onClick={this.handleLogout}>Sign out</button>
                </div>
            </li>
        }
        return (
            <nav class="navbar navbar-expand navbar-light">
                <div class="container-fluid padding">
                    <a href="/owner/home" class="navbar-brand p-3"><img class="navbar-brand" src="../../logo-white.svg" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            {navVar}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                                    Help
                        </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Visit Help Center</a>
                                    <div class="dropdown-divider"></div>
                                    <p class="dropdown-header">Travelers</p>
                                    <a class="dropdown-item" href="#">How it works</a>
                                    <a class="dropdown-item" href="#">Security Center</a>
                                    <div class="dropdown-divider"></div>
                                    <p class="dropdown-header">Homeowners</p>
                                    <a class="dropdown-item" href="#">How it works</a>
                                    <a class="dropdown-item" href="#">Community</a>
                                    <a class="dropdown-item" href="#">Discovery Hub</a>
                                </div>
                            </li>
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