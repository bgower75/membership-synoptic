const membershipSchema = require('../schema/memberships');
const mongoose = require('mongoose');
const Member = mongoose.model("Member", membershipSchema);
const { validationReturned } = require('express-validator');

async function getAllMemberships(req, res) {
    try {
        let returnedMembers
        returnedMembers = await Member.find();
        if(returnedMembers.length === 0) {
            res.status(404).json({
                "message": "No members found"
            });
        } else {
            res.send(returnedMembers)
        };
    }
    catch(err) {
        res.status(500).json({
            "message": `Unable to complete request. ${err}`
        });
    };
};
async function getMemberById(req, res) {
    let returnedMember
    try{
        returnedMembers = await Member.findById(req.params.empid);
        res.send(returnedMember);
    }
    catch(err) {
        if(!returnedMember) {
            res.status(404).json({
                "message": `No memeber found. ${err}`
            });
        } else {
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            });
        };
    };
};
async function createNewMember(req, res) {
    const newMember = new Member({
        empid: req.body.empid,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        balance: req.body.balance
    });
    try{
        const errors = await validationReturned(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array()
            });
        } else {
            await newMember.save();
            res.send(newMember);
        };
    }
    catch(err) {
        res.status(500).json({
            "message": `Unable to complete request. ${err}`
        });
    };
};
async function updateMember(req, res) {
    try {
        const returnedMember = await Member.find({empid: req.params.empid});
        returnedMember.empid = req.body.empid || returnedMember.empid;
        returnedMember.name = req.body.name || returnedMember.name;
        returnedMember.email = req.body.email || returnedMember.email;
        returnedMember.mobile = req.body.mobile || returnedMember.mobile;
        returnedMember.balance = req.body.balance + returnedMember.balance || returnedMember.balance;

        const errors = await validationReturned(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array()
            });
        };
    }
    catch(err) {
        if(err.name == 'CastError') {
            res.status(404).json({
                "message": `No member found. ${err}`
            });
        } else {
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            });
        };
    };
};
async function deleteMember(req, res) {
    try{
        await Member.findOneAndDelete(req.params.empid);
        res.status(200).json({
            "message": `Member ${req.params.empid} has been sucessfully deleted.`
        });
    }
    catch(err) {
        if(err.name == 'CastError') {
            res.status(404).json({
                "message": `No member found. ${err}`
            });
        } else {
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            });
        };
    };
};

module.exports = {
    getAllMemberships,
    getMemberById,
    createNewMember,
    updateMember,
    deleteMember
}
