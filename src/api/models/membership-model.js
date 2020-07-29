const mongoose = require('mongoose')
const membershipSchema = require('../schema/memberships')
const Member = mongoose.model("Member", membershipSchema)

module.exports = Member
