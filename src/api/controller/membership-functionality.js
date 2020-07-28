const membershipSchema = require('../schema/memberships');
const mongoose = require('mongoose');
const Member = mongoose.model("Member", membershipSchema);
const bcrypt = require('bcrypt');

async function getAllMemberships(req, res) {
    try {
        let returnedMembers = []
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
    try {
        returnedMember = await Member.findById(req.params.id)
            res.send(returnedMember);
    }
    catch(err) {
        if(!returnedMember) {
            res.status(404).json({
                "message": `Card not found. Please register your card. ${err}`
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
        pin: req.body.pin
    });
    try{
        let hash = bcrypt.hashSync(req.body.pin, 10);
        newMember.pin = hash;
        newMember.validate((err) => {
            if(err) {
                // logger.err(`Wrong format to create new vinyl ${err}`);
                res.status(400).json({
                    "message": `Wrong format to create a new member ${err}`
                });
            }else {
                newMember.save();
                let message = `Hello ${newMember.name}`
                res.status(200).send(message + ' ' + newMember);
            }
        })
    }
    catch(err) {
        res.status(500).json({
            "message": `Unable to complete request. ${err}`
        })
    }
};
async function updateMember(req, res) {
   // updateMember(req, res);
   const foundMember = await Member.findById(req.params.id)
   console.log(foundMember)
   
   foundMember.empid = req.body.empid || foundMember.empid
   foundMember.name = req.body.name || foundMember.name
   foundMember.email = req.body.email || foundMember.email
   foundMember.mobile = req.body.mobile || foundMember.mobile
   try{
       foundMember.validate((err)  => {
           if(err) {
            // logger.error(`Wrong format to update a member`);
               res.status(400).json({
                  "message": `wrong format to update a member`
               });
           }else{
               foundMember.save()
               // console.log(returnedMember)
               res.send(foundMember)
           }
       })
   }
   catch (err) {
       // logger.error(`No member with employee id ${req.params.empid} found`);
       res.status(404).json({
           "message": `Card not registered. Please register your card.`
       });
   }
};
async function deleteMember(req, res) {
    try{
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "message": `Member ${req.params.id} has been sucessfully deleted.`
        });
    }
    catch(err) {
        if(err.name == 'CastError') {
            res.status(404).json({
                "message": `No member found. ${err}`
            })
        } else {
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            })
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
