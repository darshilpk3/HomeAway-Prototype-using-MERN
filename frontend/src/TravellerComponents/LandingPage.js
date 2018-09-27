import React, { Component } from 'react'
import LoginNavBar from '../LoginNavBar'
class LandingPage extends Component {
    render() {
        return (
            <div>
                <LoginNavBar />
                <div class="conatiner-fluid">
                    <ul class="text-center">
                        <li><h1 class="form-header">Welcome to HomeAway</h1></li>
                        <li>
                            <a href="/login" class="btn btn-primary btn-lg">Traveller Login</a>
                        </li>
                        <li>
                            <button class="btn btn-primary btn-lg">Owner Login</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default LandingPage