const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router;
const controller = new Router();
const { getAllMemberships, getMemberByCardId, createNewMember, deleteMember, updateMember, authenticate } = require('./membership-functionality')

// const userService = require('./user.service');
// const logger = require('../../utils/logger');

const membershipSchema = require('../schema/memberships');
const Member = mongoose.model("Member", membershipSchema);

controller.post('/', async(req, res) => {
    createNewMember(req, res);
});
controller.get('/', async(req, res) => {
    getAllMemberships(req, res);
});
controller.get('/:cardId', async(req, res) => {
    getMemberByCardId(req, res);
});
controller.post('/authenticate', async(req, res) => {
    authenticate(req,res);
})
controller.put('/:cardId', async(req,res) => {
    updateMember(req, res);
});
controller.delete('/:cardId', async(req, res) => {
    deleteMember(req, res);
});

module.exports = controller
