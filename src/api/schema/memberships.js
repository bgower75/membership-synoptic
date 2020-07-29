const mongoose = require('mongoose');
const { validation } = require('./schema-validation');

const membershipSchema = mongoose.Schema({
    empid: {
        type: Number,
        validate: {
            validator: validation.empid,
            message: props => `${props.value} please enter a valid employee ID`
        },
        required: [true, 'please enter your Employee ID']
    },
    name: {
        type: String,
        validate: {
            validator: validation.name,
            message: props => `${props.value} please enter a valid name`
        },
        required: [true, 'please enter your name']
    },
    email: {
        type: String,
        validate: {
            validator: validation.email,
            message: props => `${props.value} please enter a valid .com email address`
        },
        required: [true, 'please enter a valid .com email address'],
        trim: true
    },
    mobile: {
        type: String,
        validate: {
            validator: validation.mobile,
            message: props => `${props.value} please enter a valid mobile number`
        },
        required: [true, 'please enter a valid mobile number'],
        trim: true
    },
    pin: {
        type: String,
        required: [true, 'Please enter your pin number'],
        trim: true
    },
    balance: {
        type: Number,
        get: getPrice,
        set: setPrice,
        trim: true
        
    }
});

function getPrice(num) {
    return(num/100).toFixed(2);
};

function setPrice(num) {
    return num*100;
}

module.exports = membershipSchema;
