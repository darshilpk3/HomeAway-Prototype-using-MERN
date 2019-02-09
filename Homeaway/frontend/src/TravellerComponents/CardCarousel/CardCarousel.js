import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import '../../App.css'

class CardCarousel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="container">
                <h2 class="form-header">Trending</h2>
                <p class="form-footer text-left">Explore these trending places</p>
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="flex-it">
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/47a2821d-b39f-4e92-b17d-b3dbfb79510f.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">San Diego</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">New york</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/f41c17cd-a595-4e55-8c4c-212e0132f236.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">Maui</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/03dc5f84-db9b-4fb1-a952-a250e9b69344.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">Orlando</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="flex-it">
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/152e6ed0-faa8-4a48-b36a-ed0f527b68ec.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">Panama City Beach</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/93c6235b-8531-4459-8913-aabb47fa7bb5.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">Tennessee</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/d87e4c30-b5f1-4a30-bb12-7883a29cabbc.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">Florida</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">New york</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a class="carousel-control-prev prev-btn" href="#myCarousel" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next next-btn float-right" href="#myCarousel" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
        )
    }
}

export default CardCarousel;