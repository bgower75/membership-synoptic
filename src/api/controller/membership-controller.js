const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router;
const controller = new Router();
const { getAllMemberships, getMemberById, createNewMember, deleteMember, updateMember } = require('./membership-functionality')

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
controller.get('/:id', async(req, res) => {
    getMemberById(req, res);
});
controller.put('/:id', async(req,res) => {
    updateMember(req, res);
});
controller.delete('/:id', async(req, res) => {
    deleteMember(req, res);
});

module.exports = controller
