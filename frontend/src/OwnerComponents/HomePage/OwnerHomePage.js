import React, { Component } from 'react';
import '../../App.css'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import OwnerNavBar from '../NavBar/OwnerNavBar'

class OwnerHomePage extends Component {

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
        console.log(cookie.load("ownerlogin"))
        if (!cookie.load("ownerlogin")) {
            redirectVar = <Redirect to="/owner/login" />
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <OwnerNavBar owner={cookie.load("owneremail") && cookie.load("owneremail")} />
                </div>
                <div class="clearfix"></div>
            </div>
        )
    }
}

export default OwnerHomePage;
    // <div class="clearfix"></div>
    //     <div class="flex-container" id="listproperty">
    //         <p class=" list-property-header text-center">List your property on HomeAway and open your door to rental income</p>
    //         <button class="btn btn-primary btn-inverse text-center">List Your Property</button>
    //     </div>
    //     <div class="clearfix"></div>