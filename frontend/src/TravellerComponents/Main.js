import React,{Component} from 'react';
import {Route} from 'react-router-dom';
// import Home from './Home/Home'
import LoginPage from './LoginPage/LoginPage'
import SignUpPage from './SignUpPage/SignUpPage'
import Home from './Home/Home'
import {Redirect} from 'react-router'
import '../App.css'
import EditProfile from './EditProfile/EditProfile';
import LandingPage from './LandingPage';
import ListPlaces from '../TravellerComponents/ListPlaces/ListPlaces'
import OwnerLoginPage from '../OwnerComponents/LoginPage/OwnerLoginPage';
import OwnerSignUpPage from '../OwnerComponents/SignUpPage/OwnerSignUpPage';
import OwnerEditProfile from '../OwnerComponents/EditProfile/OwnerEditProfile'
import OwnerHomePage from '../OwnerComponents/HomePage/OwnerHomePage';
import AddProperty from '../OwnerComponents/Property/AddProperty';
import ShowProperties from '../OwnerComponents/Property/ShowProperties';

class Main extends Component{

    render(){
        return(
            <div>
                <Route path="/login" component = {LoginPage}/>
                <Route path="/signup" component = {SignUpPage}/>
                <Route path="/home" component = {Home}/>
                <Route path="/edit" component = {EditProfile}/>
                <Route path="/list" component={ListPlaces}/>
                <Route path="/owner/login" component={OwnerLoginPage}/>
                <Route path="/owner/signup" component={OwnerSignUpPage}/>
                <Route path="/owner/edit" component={OwnerEditProfile} />
                <Route path="/owner/home" component={OwnerHomePage}/>
                <Route path="/owner/property" component={ShowProperties}/>
                <Route path="/owner/property/add" component={AddProperty}/>
            </div>
        )
    }
}

export default Main;