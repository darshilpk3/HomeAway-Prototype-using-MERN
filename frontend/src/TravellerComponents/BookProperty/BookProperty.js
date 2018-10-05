import React, { Component } from 'react'
import '../../App.css'
import cookies from 'react-cookies'
import { Redirect } from 'react-router'
import axios from 'axios';
import cookie from 'react-cookies';
import NavBar from '../NavBar/NavBar';

class BookProperty extends Component {

    constructor(props) {
        super(props)
        this.bookPlace = this.bookPlace.bind(this)
    }

    bookPlace = (e) => {
        var headers = new Headers()
        e.preventDefault()
        axios.defaults.withCredentials = true

        const data = {
            travel_id: cookie.load("loginuser"),
            place_id: this.props.location.state && this.props.location.state.response.place_id,
            booking_from: this.props.location.state && this.props.location.state.book_from,
            booking_to: this.props.location.state && this.props.location.state.book_to,
            guests: this.props.location.state && this.props.location.state.guests
        }
        console.log(this.props.location.state && this.props.location.state.response.place_id)
        const id = e.target.id
        axios.post("http://localhost:3001/property/" + id + "/book", data)
            .then(response => {
                console.log("Got the data from post request to localhost")
                if (response.status === 200) {
                    console.log("Booked")
                }
            })
    }

    render() {
        console.log(this.props.location.state.response)
        return (
            <div>
                <NavBar />
                <div class="clearfix" />
                <hr></hr>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="https://odis.homeaway.com/odis/listing/dc0b37b7-e70b-4d76-b18f-336c4223b0f3.c10.jpg" alt="First slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://odis.homeaway.com/odis/listing/dc0b37b7-e70b-4d76-b18f-336c4223b0f3.c10.jpg" alt="Second slide" />
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://odis.homeaway.com/odis/listing/fc82ec6c-f85d-4d84-b985-b4fee1a13672.c10.jpg" alt="Third slide" />
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <h2 class="py-5"><b>{this.props.location.state.response && this.props.location.state.response.place_name}</b></h2>
                            <hr></hr>
                            <div class="d-flex flex-row">
                                <h2 class="p-2">Details</h2>
                                <svg class="svg-brand px-5" xmlns="http://www.w3.org/1999/xlink" width="70" height="70" viewBox="0 0 36 36">
                                    <path d="M26.3142263,33.7636362 L10.6854895,33.7636362 C7.95790408,33.7636362 5.74985789,31.5816898 5.74985789,28.8952106 L5.74985789,13.4498064 L5.47959391,14.0263074 L18.9795939,2.79226479 L18.0201219,2.79226478 L31.5201219,14.0263074 L31.2498579,13.4498064 L31.2498579,28.8952106 C31.2498579,31.5816898 29.0418117,33.7636362 26.3142263,33.7636362 L26.3142263,33.7636362 Z M26.3142263,35.2636362 C29.8662725,35.2636362 32.7498579,32.4141357 32.7498579,28.8952106 L32.7498579,13.4498064 L32.7498579,13.098206 L32.4795939,12.8733054 L18.9795939,1.63926288 L18.4998579,1.24004992 L18.0201219,1.63926287 L4.52012187,12.8733054 L4.24985789,13.098206 L4.24985789,13.4498064 L4.24985789,28.8952106 C4.24985789,32.4141357 7.13344325,35.2636362 10.6854895,35.2636362 L26.3142263,35.2636362 L26.3142263,35.2636362 Z" />
                                </svg>
                                <svg class="svg-brand px-5" xmlns="http://www.w3.org/1999/xlink" width="70" height="70" viewBox="0 0 36 36">
                                    <path d="M21.1725783,6.51206734 C21.3284864,3.05543297 18.4017626,0.249852632 14.83914,0.249852632 C11.2693655,0.249852632 8.30727504,3.0836659 8.50619226,6.52159592 C8.52283557,6.80709098 8.62292131,7.4434514 8.78926351,8.38179814 C8.80758336,8.48492954 8.80758336,8.48492954 8.82596657,8.58763255 C8.89438915,8.96922077 8.96763092,9.36662572 9.04086528,9.75661813 C9.08481204,9.99064627 9.11902533,10.170381 9.13865622,10.2724505 C9.72431625,13.4699292 11.8767497,15.7498526 14.83914,15.7498526 C17.7998673,15.7498526 19.9122498,13.5115836 20.5394378,10.2734141 C20.5588793,10.1737554 20.5930784,9.99644588 20.6370011,9.76530353 C20.7101922,9.38013742 20.7833909,8.98695338 20.8517787,8.6084315 C20.8721125,8.49564543 20.8721125,8.49564543 20.8923603,8.38229101 C21.0603279,7.43957943 21.1595389,6.80258641 21.1725857,6.51190209 L21.1725783,6.51206734 Z M19.6740943,6.44464527 C19.6653783,6.63883894 19.5681632,7.26301702 19.4156177,8.11917249 C19.3957052,8.23065004 19.3957052,8.23065004 19.3756766,8.34174324 C19.3081743,8.71536401 19.2357766,9.10424562 19.1633711,9.48527753 C19.119936,9.71385399 19.08619,9.88881431 19.0669973,9.98720086 C18.5640758,12.5837793 16.9917071,14.2498526 14.83914,14.2498526 C12.686657,14.2498526 11.0805046,12.5485667 10.6128841,9.99566896 C10.5924203,9.88911352 10.5586099,9.71149526 10.5150977,9.47978079 C10.4425669,9.0935355 10.3700437,8.70002899 10.3024188,8.32288989 C10.2842845,8.22157696 10.2842845,8.22157696 10.2662359,8.11997292 C10.1135803,7.25883305 10.0152823,6.63383914 10.0036688,6.43462536 C9.85671853,3.89485016 12.0988129,1.74985263 14.83914,1.74985263 C17.5751846,1.74985263 19.7900826,3.87307128 19.6741017,6.44448002 L19.6740943,6.44464527 Z" />

                                </svg>
                                <svg class="svg-brand px-5" xmlns="http://www.w3.org/1999/xlink" width="70" height="70" viewBox="0 0 36 36">
                                    <path d="M2.46844716,29.0612296 L3.91525567,11.3770191 L3.33332727,12.0473584 C3.37965952,12.0368711 3.47467769,12.0162789 3.61625489,11.9870195 C3.85497737,11.9376833 4.13601952,11.8825512 4.4572531,11.8230602 C5.37822102,11.6525009 6.43452199,11.4817196 7.60910976,11.3221987 C10.9683022,10.8659863 14.5972904,10.592179 18.3592426,10.592179 C22.1211948,10.592179 25.7501829,10.8659863 29.1093753,11.3221987 C30.2839631,11.4817196 31.3402641,11.6525009 32.261232,11.8230602 C32.5824656,11.8825512 32.8635077,11.9376833 33.1022302,11.9870195 C33.2438074,12.0162789 33.3388256,12.0368711 33.3851578,12.0473584 L32.8032294,11.3770191 L34.2500379,29.0612296 L35.7450429,28.9389178 L34.2982344,11.2547073 L34.2533365,10.705925 L33.716306,10.584368 C33.6609095,10.571829 33.5567089,10.5492468 33.405816,10.5180622 C33.1570884,10.4666582 32.8659065,10.409537 32.5343808,10.3481399 C31.5903221,10.1733044 30.5103198,9.99869101 29.3112374,9.83584349 C25.888515,9.37100315 22.1930351,9.09217895 18.3592426,9.09217895 C14.5254501,9.09217895 10.8299701,9.37100315 7.40724769,9.83584349 C6.20816525,9.99869101 5.12816302,10.1733044 4.18410434,10.3481399 C3.85257861,10.409537 3.5613967,10.4666582 3.31266905,10.5180622 C3.16177616,10.5492468 3.05757558,10.571829 3.00217911,10.584368 L2.46514856,10.705925 L2.42025071,11.2547073 L0.973442198,28.9389178 L2.46844716,29.0612296 L2.46844716,29.0612296 Z" />
                                </svg>
                                <svg class="svg-brand px-5" xmlns="http://www.w3.org/1999/xlink" width="70" height="70" viewBox="0 0 36 36">
                                    <path d="M27.75,34 L27.75,9.42553191 C27.75,4.35630895 23.5945725,0.25 18.4736842,0.25 C13.3527959,0.25 9.19736842,4.35630895 9.19736842,9.42553191 L10.6973684,9.42553191 C10.6973684,5.18875487 14.1772567,1.75 18.4736842,1.75 C22.7701117,1.75 26.25,5.18875487 26.25,9.42553191 L26.25,34 L27.75,34 L27.75,34 Z" />
                                </svg>
                                <svg class="svg-brand px-5" xmlns="http://www.w3.org/1999/xlink" width="70" height="70" viewBox="0 0 36 36">
                                    <path d="M24.5862427,24.7385968 C26.0457162,23.2791233 27.1562995,21.5278835 27.8639543,19.6126542 L28.4280615,18.0859284 L26.9009644,18.6490296 C22.2545467,20.3623478 16.9939948,19.2697903 13.4426239,15.7178952 C9.89065047,12.1664459 8.79809288,6.90589414 10.5114112,2.25947639 L11.0745124,0.732379293 L9.54778661,1.29648652 C7.63255734,2.00414124 5.88131754,3.11472448 4.42184398,4.57419804 C-1.14061467,10.1366567 -1.14061467,19.1761382 4.42184399,24.7385968 C9.98430262,30.3010554 19.0237841,30.3010554 24.5862427,24.7385968 L24.5862427,24.7385968 Z M23.5255825,23.6779366 C18.5489103,28.6546088 10.4591764,28.6546088 5.48250415,23.6779366 C0.505831945,18.7012644 0.505831945,10.6115304 5.48250416,5.63485822 C6.78717589,4.33018648 8.35347463,3.33688725 10.0676665,2.70351348 L9.10404199,1.74052361 C7.19049096,6.92996068 8.41141734,12.8085949 12.3819638,16.7785553 C16.3518459,20.7490234 22.2304801,21.9699498 27.4199172,20.0563988 L26.4569273,19.0927742 C25.8235535,20.8069662 24.8302543,22.373265 23.5255825,23.6779366 L23.5255825,23.6779366 Z" />
                                </svg>
                            </div>
                            <div class="d-flex flex-row">
                                <h2 class="p-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                                <p class="px-4">House</p>
                                <p class="px-4">Sleeps</p>
                                <p class="px-4">Bedrooms</p>
                                <p class="px-4">Bathrooms</p>
                                <p class="px-4">Stay</p>
                            </div>
                            <hr></hr>
                            <h1>About the property</h1>
                            <p>This modern house in San Diego is an ideal retreat for a couple or small family, with a full kitchen, shared patio space, and gas grill for cookouts on sunny days. A flatscreen TV offers entertainment after a long day.</p>
                            <p>What's nearby:</p>
                            <p>This house is located near the North Park neighborhood, where you'll find a bustling collection of cafés, bars, and restaurants. It is also a short drive to the San Diego Zoo, the Air & Space Museum, Morley Field Sports Complex, and Balboa Park, among other attractions. The beach is also within easy driving distance</p>
                            <hr></hr>
                            <h1>Amenities</h1>
                            <table class="table table-striped mw-100">
                                <tbody>
                                    <tr>
                                        <th scope="row">Property Type:</th>
                                        <td>house</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Floor Area:</th>
                                        <td>468sq ft.</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">House Rules</th>
                                        <td>
                                            <tr>Check-in: 4:00 PM / Check-out: 11:00 AM</tr>
                                            <tr>Max. occupancy: 4</tr>
                                            <tr>Max. adults: 4</tr>
                                            <tr>Min. age of primary renter: 21</tr>
                                            <tr>Children welcome</tr>
                                        </td>
                                        <td>
                                            <tr>Parties/events not allowed</tr>
                                            <tr>Pets not allowed</tr>
                                            <tr>Non smoking only</tr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">General</th>
                                        <td>
                                            <tr>Clothes Dryer</tr>
                                            <tr>Hair Dryer</tr>
                                            <tr>Internet</tr>
                                            <tr>Parking</tr>
                                            <tr>Living Room</tr>
                                        </td>
                                        <td>
                                            <tr>Washing Machine</tr>
                                            <tr>Free Wifi</tr>
                                            <tr>Unlimited Buffet</tr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="col-md-4 mx-auto sticky-top">
                            <div class="form-body">
                                <h2 class="py-5"><b>$86</b></h2>
                                <p class="form-footer">avg/night</p>
                                <label>Arrive:</label>
                                <br></br>
                                <label>Depart:</label>
                                <br></br>
                                <button class="btn btn-primary btn-warning">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookProperty