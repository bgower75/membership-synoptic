const { validate } = require('express-validator');

function validatePost() {
    return [
        validate('empid')
            .isLength({min: 4, max: 4}).withMessage('Employee ID must be 4 digits long')
            .isNumeric().withMessage('Employee ID must be numeric')
            .trim(),
        validate('name')
            .isLength({min: 2, max: 40}).withMessage('Name must have more than 2 characters, maximum of 40')
            .isString().withMessage('Name must be a string')
            .matches(/^[A-Za-z-' ]+$/).withMessage('Name must be in English characters')
            .trim(),
        validate('email')
            .isEmail().withMessage('Please provide a valid email address')
            .matches(/[a-z]+[.]+[a-z]+@+[a-z]+[.]+com/).withMessage('Please provide a valid .com email address')
            .normalizeEmail({all_lowercase: true})
            .trim(),
        validate('mobile')
            .isNumeric().withMessage('Please provide a valid mobile number')
            .isLength({min: 11, max: 11}).withMessage('Mobile number must contain 11 digits')
            .trim()
    ]
};
function validatePut() {
    return [
        validate('empid')
            .isLength({min: 4, max: 4}).withMessage('Employee ID must be 4 digits long')
            .isNumeric().withMessage('Employee ID must be numeric')
            .isOptional({ checkFalsy: true })
            .trim(),
        validate('name')
            .isLength({ min: 2, max: 40 }).withMessage('Name must have more than 2 characters, maximum of 40')
            .isString().withMessage('Name must be a string')
            .matches(/^[A-Za-z'- ]+$/).withMessage('Name must be in English characters')
            .isOptional({ checkFalsy: true})
            .trim(),
        validate('email')
            .isEmail().withMessage('Please provide a valid email address')
            .matches(/[a-z]+[.]+[a-z]+@+[a-z]+[.]+com/).withMessage('Please provide a valid .com email address')
            .isOptional({ checkFalsy: true})
            .trim(),
        validate('mobile')
            .isNumeric().withMessage('Please provide a valid mobile number')
            .isLength({ min: 11, max: 11 }).withMessage('Mobile number must contain 11 digits')
            .isOptional({ checkFalsy: true})
            .trim()
    ]
};

module.exports = {
    validatePost,
    validatePut
}
