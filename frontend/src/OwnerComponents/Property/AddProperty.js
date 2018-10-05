// import React,{Component} from 'react'
// import axios from 'axios'
// import OwnerNavBar from '../NavBar/OwnerNavBar'
// import {Redirect} from 'react-router'
// import cookie from 'react-cookies'
// import '../../App.css'

// class AddProperty extends Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             place_name:"",
//             location_city:"",
//             available_from:"",
//             available_to:"",
//             bedrooms:"",
//             bathrooms:"",
//             accomodates:"",
//             headline:"",
//             description:"",
//             amenities:"",
//             redirect:false,
//             message:""
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.addProperty = this.addProperty.bind(this);
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]:e.target.value
//         });
//     }

    

//     addProperty = (e) => {
        
//         var headers = new Headers(); 
//         e.preventDefault(); 
//         axios.defaults.withCredentials = true; 

//         console.log("Trying to add property");
//         const data = {
//             owner_id:cookie.load("ownerlogin") && cookie.load("ownerlogin"),
//             place_name:this.state.place_name,
//             location_city:this.state.location_city,
//             available_from:this.state.available_from,
//             available_to:this.state.available_to,
//             bedrooms:this.state.bedrooms,
//             bathrooms:this.state.bathrooms,
//             accomodates:this.state.accomodates,
//             headline:this.state.headline,
//             description:this.state.description,
//             amenities:this.state.amenities
//         }

//         axios.post("http://localhost:3001/owner/property",data)
//             .then(response=>{
//                 console.log(response.data);

//                 if(response.data === "Could not add the user"){
//                     console.log("couldnt add")
//                     this.setState({
//                         message:"Account creation unsuccessfull"
//                     })
//                 }
//                 else{
//                     console.log("added")
//                     this.setState({
//                         redirect:true
//                     })
//                 }
//         })
//     }

//     render() {
//         let renderRedirect = null;
//         if(this.state.redirect == true){
//             console.log("should redirect")
//             renderRedirect = <Redirect to="/owner/home"/>
//         } 
//         return (
            
//             <div>
//                 {renderRedirect}
//                 <div>
//                     <OwnerNavBar />
//                 </div>
//                 <div class="clearfix"></div>
//                 <div class="bg-grey">
//                     <div class="container-fluid bg-grey">
//                         <div class="row">
//                             <div class="col-md-4 offset-md-4 text-align-center">
//                                 <h1 class="form-header text-center">Adding a Property</h1>
//                             </div>
//                             <div class="col-md-4 offset-md-4 text-align-center">
//                                 <footer class="form-footer">Get ready to do a business <a href="#">Learn More</a></footer>
//                                 <footer class="form-footer">{this.state.message}</footer>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="clearfix"></div>
//                     <div class="form-body">
//                         <fieldset>
//                             <form class="form-group">
//                                 <div class="flex-it">
//                                     <input class="form-control" type="text" placeholder="Place Name" onChange={this.handleChange} name="place_name" required/>
//                                     <input class="form-control" type="text" onChange={this.handleChange} placeholder="Location_city" name="location_city" required/>
//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <input class="form-control" type="text" onChange={this.handleChange} placeholder="Headline" name="headline" required/>
//                                 <div class="clearfix"></div>
//                                 <input class="form-control" type="textarea" onChange={this.handleChange} placeholder="Description" name="description" required/>
//                                 <div class="clearfix"></div>
//                                 <div class="flex-it">
//                                     <input class="form-control" type="date" placeholder="Available-from" onChange={this.handleChange} name="available_from" required/>
//                                     <input class="form-control" type="date" onChange={this.handleChange} placeholder="available_to" name="available_to" required/>
//                                 </div>
//                                 <div class="clearfix"/>
//                                 <div class="flex-it">
//                                 <input class="form-control" type="number" onChange={this.handleChange} placeholder="No of Bedrooms" name="bedrooms" required/>
//                                 <input class="form-control" type="number" onChange={this.handleChange} placeholder="No of Bathrooms" name="bathrooms" required/>
//                                 </div>
//                                 <div class="clearfix"/>
//                                 <input class="form-control" type="number" onChange={this.handleChange} placeholder="Accomodates" name="accomodates" required/>
//                                 <div class="clearfix"/>
//                                 <input class="form-control" type="textarea" onChange={this.handleChange} placeholder="Amenities" name="amenities" required/>
//                                 <div class="clearfix"/>
//                                 <button class="form-control btn btn-primary" value="Add a property" onClick={this.addProperty}>Add a property</button>
//                                 <div class="clearfix"></div>
//                                 <footer class="form-footer">By creating an account you are accepting our <a href="#">Terms and Conditions and Privacy Policy</a>.</footer>
//                             </form>
//                         </fieldset>
//                     </div>
//                     <div class="clearfix"></div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default AddProperty