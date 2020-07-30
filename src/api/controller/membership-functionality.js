const membershipSchema = require('../schema/memberships');
const mongoose = require('mongoose');
const Member = mongoose.model("Member", membershipSchema);
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { number } = require('yargs');
// const { isNumber } = require('util');
const logger = require('../../utilities/logger');

async function getAllMemberships(req, res) {
    try {
        let returnedMembers = []
        returnedMembers = await Member.find();
        if(returnedMembers.length === 0) {
            logger.error('No members found');
            res.status(404).json({
                "message": "No members found"
            });
        } else {
            logger.info(`Members found`);
            res.status(200).send(returnedMembers)
        };
    }
    catch(err) {
        logger.error(`Unable to complete request ${err}`);
        res.status(500).json({
            "message": `Unable to complete request. ${err}`
        });
    };
};
async function getMemberById(req, res) {
    let returnedMember
    try {
        returnedMember = await Member.findById(req.params.id)
        logger.info(`Member with id ${req.params.id} found`)
        returnedPin = comparePin(req.body.pin, returnedMember.pin)
        if(returnedPin) {
            logger.info(`Member authentication successful`);
            let message = `Hello ${returnedMember.name}`
            res.write( `${message} ${returnedMember}`)
            res.end()
        } else {
            logger.error(`incorrect pin ${req.params.pin} ${err}`);
            res.status(400).json({
                "message": `Pin incorrect`
            })
        }
    }
    catch(err) {
        if(!returnedMember) {
            logger.error(`No card found with id ${req.params.id} ${err}`);
            res.status(404).json({
                "message": `Card not found. Please register your card. ${err}`
            });
        } else {
            logger.error(`Unable to complete request ${err}`);
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
        pin: req.body.pin,
        balance: req.body.balance
    });
    try{
        let hash = bcrypt.hashSync(req.body.pin, 10);
        newMember.pin = hash;
        newMember.validate((err) => {
            if(err) {
                logger.error(`Wrong format to create new member ${err}`);
                res.status(400).json({
                    "message": `Wrong format to create a new member ${err}`
                });
            }else {
                logger.info(`Member ${newMember.id} created`)
                newMember.save();
                let message = `Hello ${newMember.name}`
                res.status(201).send(message + ' ' + newMember);
            }
        })
    }
    catch(err) {
        logger.error(`Unable to complete request ${err}`);
        res.status(500).json({
            "message": `Unable to complete request. ${err}`
        })
    }
};
async function updateMember(req, res) {
   let newBalance = new Number().toFixed(2)
   const foundMember = await Member.findById(req.params.id)
   foundMember.empid = req.body.empid || foundMember.empid
   foundMember.name = req.body.name || foundMember.name
   foundMember.email = req.body.email || foundMember.email
   foundMember.mobile = req.body.mobile || foundMember.mobile
    newBalance = parseInt((req.body.balance).toFixed(2)) + parseInt(foundMember.balance)
    foundMember.balance = newBalance || foundMember.balance
   try{
       foundMember.validate((err)  => {
           if(err) {
               logger.error(`Wrong format to update a member`);
               res.status(400).json({
                  "message": `wrong format to update a member`
               });
           }else{
               logger.info(`${foundMember.id} balance updated successfully`)
               foundMember.save()
               res.status(200).send(foundMember)
           }
       })
   }
   catch (err) {
       logger.error(`Card not registered ${err}`);
       res.status(404).json({
           "message": `Card not registered. Please register your card.`
       });
   }
};
async function deleteMember(req, res) {
    try{
        await Member.findByIdAndDelete(req.params.id);
        logger.info(`Member ${req.params.id} found and deleted`);
        res.status(200).json({
            "message": `Member ${req.params.id} has been sucessfully deleted.`
        });
    }
    catch(err) {
        if(err.name == 'CastError') {
            logger.error(`Member with id ${req.params.id} not found`);
            res.status(404).json({
                "message": `No member found. ${err}`
            })
        } else {
            logger.error(`Unable to complete request ${err}`);
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            })
        };
    };
};
async function authenticate(req, res) {
    let returnedMember
    try {
        returnedMember = await Member.findById(req.params.id)
        if (returnedMember && bcrypt.compareSync(pin, returnedMember.pin)) {
            const token =  jwt.sign({ sub: returnedMember.id}, config.secret, {expiresIn: '30d'});
            return {
                ...returnedMember.toJSON(),
                token
            };
        }
    }
    catch(err) {
        if(!returnedMember) {
            logger.error(`Card not found ${err}`);
            res.status(404).json({
                "message": `Card not found. Please register your card. ${err}`
            });
        } else {
            logger.error(`Unable to complete request ${err}`);
            res.status(500).json({
                "message": `Unable to complete request. ${err}`
            });
        };
    };
}

async function comparePin(userPin, hash) {
    bcrypt.compareSync(userPin, hash, function (err){
        if(err) {
            logger.error(`Unable to complete request ${err}`);
            return false
        } else {
            logger.info(`Password matches`);
            return true
        }
    })
}

module.exports = {
    getAllMemberships,
    getMemberById,
    createNewMember,
    updateMember,
    deleteMember,
    authenticate
}
