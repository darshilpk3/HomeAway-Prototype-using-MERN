import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class NavBar extends Component {
    render() {
        return (
            <div class="container-fluid">
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                    <a href="#" class="navbar-brand">Simple Calculator</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to="/start" class="nav-link"> StartCalculator <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/" class="nav-link">StopCalculator</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
