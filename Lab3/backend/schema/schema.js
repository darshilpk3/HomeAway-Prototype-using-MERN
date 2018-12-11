const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = graphql
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const Traveler = require('../models/traveler')
const Property = require('../models/property')
const Owner = require('../models/owner')
const Booking = require('../models/booking')
const graphqlTypeJson = require('graphql-type-json')
const { GraphQLJSON } = graphqlTypeJson
const TravelerType = new GraphQLObjectType({
    name: 'Travelers',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lastname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        company: {
            type: GraphQLString
        },
        number: {
            type: GraphQLInt
        },
        address: {
            type: GraphQLString
        },
        school: {
            type: GraphQLString
        },
        aboutme: {
            type: GraphQLString
        },
        languages: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        bookings: {
            type: new GraphQLList(BookingType),
            // async resolve(parent,args){
            //     Booking.find({
            //         traveler:parent.id
            //     })
            // }
        }
    })
})

const BookingGuestsType = new GraphQLObjectType({
    name: "BookingGuests",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        guests: {
            type: GraphQLString
        }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owners',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lastname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        company: {
            type: GraphQLString
        },
        number: {
            type: GraphQLString
        },
        billing_address: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        zipcode: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        bookings: {
            type: new GraphQLList(BookingType)
        },
        properties:{
            type: new GraphQLList(PropertyType)
        }
    })
})

const PropertyType = new GraphQLObjectType({
    name: "Properties",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        place_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        headline: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        street: {
            type: GraphQLString
        },
        apt: {
            type: GraphQLString
        },
        location_city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        zipcode: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        available_from: {
            type: GraphQLString
        },
        available_to: {
            type: GraphQLString
        },
        bedrooms: {
            type: GraphQLInt
        },
        bathrooms: {
            type: GraphQLInt
        },
        accomodates: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLInt
        },
        dates: {
            type: new GraphQLList(GraphQLString)
        },
        property_images: {
            type: new GraphQLList(GraphQLString)
        }
    })
})
const BookingType = new GraphQLObjectType({
    name: 'Bookings',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        booking_from: {
            type: GraphQLString
        },
        booking_to: {
            type: GraphQLString
        },
        guests: {
            type: GraphQLString
        },
        property: {
            type: PropertyType
        },
        traveler: {
            type: TravelerType
        },
        owner: {
            type: OwnerType
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        traveler: {
            type: TravelerType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Traveler.findById(args.id)
            }
        },
        searchResults: {
            type: PropertyType,
            args: {
                place: {
                    type: GraphQLString
                },
                available_from: {
                    type: GraphQLString
                },
                available_to: {
                    type: GraphQLString
                },
                accomodates: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                var range = Array(Math.floor((new Date(args.available_to) - new Date(args.available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(args.available_from).getTime() + idx * 86400000)))
                var properties = await Property.find({
                    available_from: { $lte: args.available_from },
                    available_to: { $gte: args.available_to },
                    accomodates: { $gte: args.accomodates },
                    location_city: { $regex: new RegExp('^' + args.place, 'i') },
                    dates: { $all: range }
                }).exec()
                if (properties && properties.length != 0) {
                    return properties
                }
            }
        },
        travelers: {
            type: new GraphQLList(TravelerType),
            async resolve(parent, args) {
                return (Traveler.find({})
                    .populate({
                        path: 'bookings',
                        select: 'guests + owner'
                    })
                    .exec()
                    .then(result => {
                        console.log("Result obtained: ", result[0].bookings)
                        return result
                    }))
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUpTraveler: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var result = await Traveler.find({
                    email: args.email
                }).exec()
                console.log("Checking: ", result && result.length == 0)
                if (result && result.length == 0) {
                    var traveler = new Traveler({
                        email: args.email,
                        password: bcrypt.hashSync(args.password, 10),
                        firstname: args.firstname,
                        lastname: args.lastname
                    });
                    console.log("traveler details loaded")
                    var user = await traveler.save()
                    if (user && user.length != 0) {
                        return "Success"
                    }
                } else {
                    return "User Already exists"
                }
            }

        },
        loginTraveler: {
            type: TravelerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var result = null
                var user = await Traveler.findOne({
                    email: args.email
                }).exec()
                if (user && user.length != 0) {
                    if (bcrypt.compareSync(args.password, user.password)) {
                        result = user
                    }
                }
                return result
            }
        },
        searchResults: {
            type: new GraphQLList(PropertyType),
            args: {
                place: {
                    type: GraphQLString
                },
                available_from: {
                    type: GraphQLString
                },
                available_to: {
                    type: GraphQLString
                },
                accomodates: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log("Arguements are: ", args)
                var range = Array(Math.floor((new Date(args.available_to) - new Date(args.available_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(args.available_from).getTime() + idx * 86400000)))
                var properties = await Property.find({
                    available_from: { $lte: args.available_from },
                    available_to: { $gte: args.available_to },
                    accomodates: { $gte: args.accomodates },
                    location_city: { $regex: new RegExp('^' + args.place, 'i') },
                    dates: { $all: range }
                }, { 'dates': 0 }).exec()
                console.log(properties)
                if (properties && properties.length != 0) {
                    console.log("Returning property results")
                    return properties
                }
            }
        },
        getPropertyDetails: {
            type: PropertyType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                var property = await Property.findById(args.id).exec()
                if (property && property.length != 0) {
                    return property
                }
            }
        },
        bookProperty: {
            type: GraphQLString,
            args: {
                travel_id: { type: GraphQLID },
                property_id: { type: GraphQLID },
                booking_from: { type: GraphQLString },
                booking_to: { type: GraphQLString },
                guests: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let range = Array(Math.floor((new Date(args.booking_to) - new Date(args.booking_from)) / 86400000) + 1).fill().map((_, idx) => (new Date(new Date(args.booking_from).getTime() + idx * 86400000)))
                var owner = await Owner.findOne({
                    properties: args.property_id
                }).exec()
                if (owner && owner.length != 0) {
                    var booking = new Booking({
                        booking_from: args.booking_from,
                        booking_to: args.booking_to,
                        guests: args.guests,
                        property: args.property_id,
                        traveler: args.travel_id,
                        owner: owner._id
                    })
                    var bookingConfirmation = await booking.save()
                    await Property.findByIdAndUpdate(args.property_id, {
                        $push: {
                            bookings: bookingConfirmation._id
                        }
                    }).exec()
                    await Traveler.findByIdAndUpdate(args.travel_id, {
                        $push: {
                            bookings: bookingConfirmation._id
                        }
                    }).exec()
                    await Owner.findByIdAndUpdate(owner._id, {
                        $push: {
                            bookings: bookingConfirmation._id,
                        }
                    }).exec()
                    await Property.findByIdAndUpdate(args.property_id, {
                        $pull: { dates: { $in: range } }
                    }).exec()
                    return "Successfully Booked"
                }
            }
        },
        getTravelerDetails: {
            type: TravelerType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                var traveler = await Traveler.findById(args.id)
                if (traveler && traveler.length != 0) {
                    return traveler
                }
            }
        },
        editTravelerDetails: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                email: { type: GraphQLString },
                company: { type: GraphQLString },
                number: { type: GraphQLString },
                address: { type: GraphQLString },
                school: { type: GraphQLString },
                aboutme: { type: GraphQLString },
                languages: { type: GraphQLString },
                gender: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args)
                var traveler = await Traveler.findByIdAndUpdate(args.id, {
                    $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        company: args.company,
                        number: args.number,
                        address: args.address,
                        school: args.school,
                        aboutme: args.aboutme,
                        languages: args.languages,
                        gender: args.gender,
                    }
                }).exec()
                if (traveler && traveler.length != 0) {
                    return "Successfully Updated"
                }
            }
        },
        getTravelerBookings: {
            type: new GraphQLList(BookingType),
            args: {
                travel_id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                var bookings = await Booking.find({
                    traveler: args.travel_id
                })
                    .populate('owner')
                    .populate('property')
                    .exec()
                if (bookings) {
                    return bookings
                }
            }
        },
        getOwnerBookings: {
            type: new GraphQLList(BookingType),
            args: {
                owner_id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                var bookings = await Booking.find({
                    owner: args.owner_id
                })
                    .populate('traveler')
                    .populate('property')
                    .exec()
                if (bookings) {
                    return bookings
                }
            }
        },
        getOwnerProperties: {
            type: OwnerType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                var properties = await Owner.findById(args.id)
                    .populate('properties')
                if (properties) {
                    return properties
                }
            }
        },
        signUpOwner: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString }
            },
            async resolve(parent, args) {

                var result = await Owner.find({
                    email: args.email
                }).exec()
                console.log("Checking: ", result && result.length == 0)
                if (result && result.length == 0) {
                    var owner = new Owner({
                        email: args.email,
                        password: bcrypt.hashSync(args.password, 10),
                        firstname: args.firstname,
                        lastname: args.lastname
                    });
                    console.log("Owner details loaded")
                    var user = await owner.save()
                    if (user && user.length != 0) {
                        return "Success"
                    }
                } else {
                    return "User Already exists"
                }
            }
        },
        loginOwner: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var result = null
                var user = await Owner.findOne({
                    email: args.email
                }).exec()
                if (user && user.length != 0) {
                    if (bcrypt.compareSync(args.password, user.password)) {
                        result = user
                    }
                }
                return result
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})