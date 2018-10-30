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
import ShowProperties from '../OwnerComponents/Property/ShowProperties';
import BookProperty from './BookProperty/BookProperty';
import AddProperty2 from '../OwnerComponents/Property/AddProperty2';
import EditProperty from '../OwnerComponents/Property/EditProperty';
import AddPropertyPhoto from '../OwnerComponents/Property/AddPropertPhoto';
import Inbox from './Message/Inbox';
import OwnerInbox from '../OwnerComponents/Message/OwnerInbox';


class Main extends Component{

    render(){
        console.log("Inside Main");
        return(
            <div>
                <Route path="/traveller/login" component = {LoginPage}/>
                <Route path="/traveller/signup" component = {SignUpPage}/>
                <Route path="/traveller/home" component = {Home}/>
                <Route path="/traveller/edit" component = {EditProfile}/>
                <Route path="/traveller/show" component={ListPlaces}/>
                <Route path="/traveller/property/show" component={BookProperty}/>
                <Route path="/owner/login" component={OwnerLoginPage}/>
                <Route path="/owner/signup" component={OwnerSignUpPage}/>
                <Route path="/owner/edit" component={OwnerEditProfile} />
                <Route path="/owner/home" component={OwnerHomePage}/>
                <Route path="/owner/property/show" component={ShowProperties}/>
                <Route path="/owner/property/add" component={AddProperty2}/>
                <Route path="/owner/property/edit" component={EditProperty}/>
                <Route path="/property/upload" component={AddPropertyPhoto}/>
                <Route path="/traveller/inbox" component={Inbox} />
                <Route path="/owner/inbox" component={OwnerInbox} />
            </div>
        )
    }
}

export default Main;