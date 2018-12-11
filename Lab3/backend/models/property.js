var mongoose = require('mongoose')

// var bookingSchema = mongoose.Schema({
//     booking_from:{
//         type:Date,
//         required:true,
//     },
//     booking_to:{
//         type:Date,
//         required:true
//     },
//     guests: {
//         type: Number,
//         required:true,
//         min:1
//     },
//     property:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'Property'
//     },
//     owner:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'Owner'
//     },
//     traveler:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'Traveler'
//     }
// })

var propertySchema = mongoose.Schema({
    place_name:{
        type:String,
        required:true,
    },
    headline:String,
    description:String,
    street:{
        type:String,
        required:true
    },
    apt:String,
    location_city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    available_from:{
        type:Date,
        required:true
    },
    available_to:{
        type:Date,
        required:true
    },
    bedrooms:{
        type:Number,
        min : 1
    },
    bathrooms:{
        type:Number,
        required:true,
        min : 1
    },
    accomodates:{
        type:Number,
        min : 1,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    dates:[Date],
    property_images: [String]
})

module.exports = mongoose.model('Property',propertySchema)