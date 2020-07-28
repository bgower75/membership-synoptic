const mongoose = require('mongoose');
// const { validation } = require('./schema-validation');
// const { Decimal128 } = require('bson');

const membershipSchema = mongoose.Schema({
    empid: {
        type: Number,
        // validate: {
        //     // validator: validation.empid,
        //     message: props => `${props.value} please enter a valid employee ID`
        // },
        required: [true, 'please enter your Employee ID']
    },
    name: {
        type: String,
        // validate: {
        //     // validator: validation.name,
        //     message: props => `${props.value} please enter a valid name`
        // },
        required: [true, 'please enter your name']
    },
    email: {
        type: String,
        // validate: {
        //     // validator: validation.email,
        //     message: props => `${props.value} please enter a valid .com email address`
        // },
        required: [true, 'please enter a valid .com email address'],
        trim: true
    },
    mobile: {
        type: Number,
        // validate: {
        //     // validator: validation.mobile,
        //     message: props => `${props.value} please enter a valid mobile number`
        // },
        required: [true, 'please enter a valid mobile number'],
        trim: true
    },
    pin: {
        type: String,
        required: [true, 'Please enter your pin number'],
        trim: true
    }
    // balance: {
    //     type: String,
    //     validate: {
    //         validator: validation.balance,
    //         message: props => `${props.value} please enter a valid amount`,
    //         // default: '00.00'
    //     },
    //     trim: true
    // }
});

module.exports = membershipSchema;
