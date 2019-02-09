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
import PropertyDetails from '../OwnerComponents/PropertyDetails';


class Main extends Component{

    render(){
        console.log("Inside Main");
        return(
            <div>
                <Route exact path="/" component = {LoginPage}/>
                <Route exact path="/traveller/signup" component = {SignUpPage}/>
                <Route exact path="/traveller/home" component = {Home}/>
                <Route exact path="/traveller/edit" component = {EditProfile}/>
                <Route exact path="/traveller/show" component={ListPlaces}/>
                <Route exact path="/traveller/property/show" component={BookProperty}/>
                <Route exact path="/owner/login" component={OwnerLoginPage}/>
                <Route exact path="/owner/signup" component={OwnerSignUpPage}/>
                <Route exact path="/owner/edit" component={OwnerEditProfile} />
                <Route exact path="/owner/home" component={OwnerHomePage}/>
                <Route exact path="/owner/property/show" component={ShowProperties}/>
                <Route exact path="/owner/property/add" component={AddProperty2}/>
                <Route exact path="/owner/property/edit" component={EditProperty}/>
                <Route exact path="/property/upload" component={AddPropertyPhoto}/>
                <Route exact path="/traveller/inbox" component={Inbox} />
                <Route exact path="/owner/inbox" component={OwnerInbox} />
                <Route exact path="/property/details" component={PropertyDetails}/>
            </div>
        )
    }
}

export default Main;