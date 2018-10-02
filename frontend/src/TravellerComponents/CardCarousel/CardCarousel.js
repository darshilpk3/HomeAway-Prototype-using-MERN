import React,{Component} from 'react'
import Popup from 'reactjs-popup'
import '../../App.css'

class CardCarousel extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div class="container">
                    <h2 class="form-header">Trending</h2>
                    <p class="form-footer text-left">Explore these trending places</p>
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="flex-it">
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
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                        </div>
                                        <div class="card-footer">
                                            <a href="#">New york</a>
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
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                        </div>
                                        <div class="card-footer">
                                            <a href="#">New york</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item">
                                <div class="flex-it">
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
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                        </div>
                                        <div class="card-footer">
                                            <a href="#">New york</a>
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
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                        </div>
                                        <div class="card-footer">
                                            <a href="#">New york</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item">
                                <div class="flex-it">
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
                                        <a href="#"><img class="card-img" src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg" /></a>
                                        </div>
                                        <div class="card-footer">
                                            <a href="#">New york</a>
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