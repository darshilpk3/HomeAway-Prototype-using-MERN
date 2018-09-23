import React,{Component} from 'react';
import {Route} from 'react-router-dom';
// import Home from './Home/Home'
import LoginPage from './LoginPage/LoginPage'
import SignUpPage from './SignUpPage/SignUpPage'
import Home from './Home/Home'
import {Redirect} from 'react-router'
import '../App.css'
import EditProfile from './EditProfile/EditProfile';
import LoginNavBar from '../LoginNavBar'

class Main extends Component{

    render(){
        return(
            <div>
                <Route path="/login" component = {LoginPage}/>
                <Route path="/signup" component = {SignUpPage}/>
                <Route path="/home" component = {Home}/>
                <Route path="/edit" component = {EditProfile}/>
            </div>
        )
    }
}

export default Main;