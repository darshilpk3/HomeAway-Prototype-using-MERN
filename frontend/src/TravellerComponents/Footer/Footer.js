import React, { Component } from 'react'
import '../../App.css'

class Footer extends Component {
    render() {
        return (
            <footer class="page-footer font-small pt-4">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <img src="http://www.w3.org/2000/svg" alt="image" />
                            <p>Get our newsletter and stay current on vacation rental deals and specials.</p>
                        </div>
                        <div class="col-md-6 mx-auto">
                            <form class="input-group" method="get" action="#">
                                <input type="text" class="form-control-lg" placeholder="Email Address" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div class="clearfix"></div>
                <div class="container text-center text-md-left">
                    <div class="row">
                        <div class="col-md-3 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Very long link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Very long link 2</a>
                                </li>
                                <li>
                                    <a href="#!">Very long link 3</a>
                                </li>
                                <li>
                                    <a href="#!">Very long link 4</a>
                                </li>
                            </ul>
                        </div>
                        <hr class="clearfix w-100 d-md-none" />
                        <div class="col-md-3 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <hr class="clearfix w-100 d-md-none" />
                        <div class="col-md-5 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Get the HomeAway App</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <form action="#">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">+1</span>
                                            </div>
                                            <input type="text" class="form-control" />
                                            <div class="input-group-append">
                                                <input type="submit" class="input-group-text" />
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <hr class="clearfix w-100 d-md-none" />
                <div class="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="#"> MDBootstrap.com</a>
                </div>
            </footer>
        )
    }
}

export default Footer;