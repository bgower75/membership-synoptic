const express = require('express');
const Router = express.Router

const router = new Router();
router.use((req, res, next) => {
    console.log('In the router');
    next();
})

router.use('/memberships', require('../controller/membership-controller'));

module.exports = router;
