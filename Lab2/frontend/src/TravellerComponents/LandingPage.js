import React, { Component } from 'react'
import LoginNavBar from '../LoginNavBar'
import { Link } from 'react-router-dom'

class LandingPage extends Component {
    render() {
        return (
            <div>
                <LoginNavBar />
                <div class="conatiner-fluid">
                    <ul class="text-center">
                        <li><h1 class="form-header">Welcome to HomeAway</h1></li>
                        <li>
                            <Link to="/login" class="btn btn-primary btn-lg">Traveller Login</Link>
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