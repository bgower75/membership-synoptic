const expressJwt = require('express-jwt');
const config = require('config.json');
const membershipSchema = require('../schema/memberships');
const membershipFunctionality = require('../api/controller/membership-functionality');

function jwt() {
    const secret = config.secret;
    return expressJwt({secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            'memberships/authenticate'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const returnedMember = await membershipFunctionality.getMemberById(payload.sub);
    if(!returnedMember) {
        return done(null, true)
    }
}
