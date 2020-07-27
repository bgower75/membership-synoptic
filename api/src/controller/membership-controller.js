const express = require('express');
const Router = express.Router;
const controller = new Router();
const { validatePUT, validatePost } = require('./membership-validation');
const { getAllMemberships, getMemberById, createNewMember, updateMember } = require('./membership-functionality')

controller.post('/', validatePOST(), async(req, res) => {
    createNewMember(req, res);
});
controller.get('/', async(req, res) => {
    getAllMemberships(req, res);
});
controller.get('/:id', async(req, res) => {
    getMemberById(req, res);
});
controller,put('/:id', validatePUT(), async(req,res) => {
    updateMember(req, res);
});
controller.delete('/:id', async(req, res) => {
    deleteMember(req, res);
});

module.exports = controller
