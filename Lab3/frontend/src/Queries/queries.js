import { gql } from 'apollo-boost'

const signUpTraveler = gql`
mutation($email:String!,$password:String!,$firstname:String!,$lastname:String!){
    signUpTraveler(email:$email,password:$password,firstname:$firstname,lastname:$lastname)
}
`
const signUpOwner = gql`
mutation($email:String!,$password:String!,$firstname:String!,$lastname:String!){
    signUpOwner(email:$email,password:$password,firstname:$firstname,lastname:$lastname)
}
`

const loginTraveler = gql`
mutation($email:String!,$password:String!){
    loginTraveler(email:$email,password:$password){
        id,
        email
    }
}
`

const loginOwner = gql`
mutation($email:String!,$password:String!){
    loginOwner(email:$email,password:$password){
        id,
        email
    }
}
`

const searchResults = gql`
mutation($place:String!,$available_from:String!,$available_to:String!,$accomodates:String!){
    searchResults(place:$place,available_from:$available_from,available_to:$available_to,accomodates:$accomodates){
        id,
        place_name,
        headline,
        description,
        street,
        apt,
        location_city,
        state,
        zipcode,
        country,
        bedrooms,
        bathrooms,
        accomodates,
        price
    }
}
`

const getPropertyDetails = gql`
mutation($id:ID!){
    getPropertyDetails(id:$id){
        id,
        place_name,
        headline,
        description,
        street,
        apt,
        location_city,
        state,
        zipcode,
        country,
        bedrooms,
        bathrooms,
        accomodates,
        price
    }
}
`
const bookProperty = gql`
mutation($travel_id:ID!,$property_id:ID!,$booking_from:String!,$booking_to:String!,$guests:String!){
    bookProperty(travel_id:$travel_id,property_id:$property_id,booking_from:$booking_from,booking_to:$booking_to,guests:$guests)
}
`

const getTravelerDetails = gql`
mutation($id:ID!){
    getTravelerDetails(id:$id){
        firstname,
        lastname,
        company,
        number,
        address,
        school,
        aboutme,
        languages,
        gender
        email
    }
}
`

const editTravelerDetails = gql`
mutation($id:ID!,$firstname:String!,$lastname:String!,$company:String!,$number:String!,$address:String!,$school:String!,$aboutme:String!,$languages:String!,$gender:String){
    editTravelerDetails(id:$id,firstname:$firstname,lastname:$lastname,company:$company,number:$number,address:$address,school:$school,aboutme:$aboutme,languages:$languages,gender:$gender)
}
`
const getTravelerBookings = gql`
mutation($travel_id:ID!){
    getTravelerBookings(travel_id:$travel_id){
        id
        booking_from,
        booking_to,
        guests
        owner{
          firstname,
          lastname,
          id
        },
        property{
          place_name,
          headline,
          price,
          id,
          location_city
        }
      }
}
`

const getOwnerBookings = gql`
mutation($owner_id:ID!){
    getOwnerBookings(owner_id:$owner_id){
        id
        booking_from,
        booking_to,
        guests
        traveler{
          firstname,
          lastname,
          id
        },
        property{
          place_name,
          headline,
          price,
          id,
          location_city
        }
      }
}
`

const getOwnerProperties = gql`
mutation($id:ID!){
    getOwnerProperties(id:$id){
        properties{
            id,
            place_name,
            headline,
            description,
            street,
            apt,
            location_city,
            state,
            zipcode,
            country,
            bedrooms,
            bathrooms,
            accomodates,
            price
        }
    }
}
`

export { signUpTraveler, loginTraveler, searchResults, getPropertyDetails, bookProperty, getTravelerDetails, editTravelerDetails, getTravelerBookings, getOwnerProperties, loginOwner, signUpOwner, getOwnerBookings }