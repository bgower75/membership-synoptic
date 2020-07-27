const { check } = require('express-validator');

function validatePost() {
    return [
        check('empid')
            .isLength({min: 4, max: 4}).withMessage('Employee ID must be 4 digits long')
            .isNumeric().withMessage('Employee ID must be numeric')
            .trim(),
        check('name')
            .isLength({min: 2, max: 40}).withMessage('Name must have more than 2 characters, maximum of 40')
            .isString().withMessage('Name must be a string')
            .matches(/^[A-Za-z-' ]+$/).withMessage('Name must be in English characters')
            .trim(),
        check('email')
            .isEmail().withMessage('Please provide a valid email address')
            .matches(/[a-z]+[.]+[a-z]+@+[a-z]+[.]+com/).withMessage('Please provide a valid .com email address')
            .normalizeEmail({all_lowercase: true})
            .trim(),
        check('mobile')
            .isNumeric().withMessage('Please provide a valid mobile number')
            .isLength({min: 11, max: 11}).withMessage('Mobile number must contain 11 digits')
            .trim()
    ]
};
function validatePut() {
    return [
        check('empid')
            .isLength({min: 4, max: 4}).withMessage('Employee ID must be 4 digits long')
            .isNumeric().withMessage('Employee ID must be numeric')
            .optional({ checkFalsy: true })
            .trim(),
        check('name')
            .isLength({ min: 2, max: 40 }).withMessage('Name must have more than 2 characters, maximum of 40')
            .isString().withMessage('Name must be a string')
            .matches(/^[A-Za-z' -]+$/).withMessage('Name must be in English characters')
            .optional({ checkFalsy: true})
            .trim(),
        check('email')
            .isEmail().withMessage('Please provide a valid email address')
            .matches(/[a-z]+[.]+[a-z]+@+[a-z]+[.]+com/).withMessage('Please provide a valid .com email address')
            .optional({ checkFalsy: true})
            .trim(),
        check('mobile')
            .isNumeric().withMessage('Please provide a valid mobile number')
            .isLength({ min: 11, max: 11 }).withMessage('Mobile number must contain 11 digits')
            .optional({ checkFalsy: true})
            .trim(),
        check('balance')
            .isNumeric().withMessage('Please enter a valid amount')
            .isLength({ min: 4, max: 5 }).withMessage('Amount must be to 2 decimal places, no more than 5 digits long')
            .optional({ checkFalsy: true})
            .trim(),
    ]
};

module.exports = {
    validatePost,
    validatePut
}
