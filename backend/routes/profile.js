const express = require('express');
const router = express.Router();

// BCRYPT
const bcrypt = require('bcrypt');

// MODEL
const UserModel = require('../models/Users');

// GET PROFILE INFORMATION
router.get("/:user_id", (req, res) => {
    // TAKE DATA
    const user_id = req.params.user_id;

    // GET INFORMATION
    const promise = UserModel.findById(user_id, 'name surname email last_login created_at role');

    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// CHANGE PASSWORD
router.put('/:user_id/change-password', (req, res) => {
    // TAKE DATA
    const user_id = req.params.user_id;
    const { old_pass, new_pass, confirm_pass } = req.body;

    // EXISTS USER
    const userExists = UserModel.findById(user_id, 'password');

    userExists.then((data) => {
        // OLD PASSWORD CONTROL
        bcrypt.compare(old_pass, data.password)
            .then(result => {
                if(result){
                    if(old_pass === new_pass){
                        res.json({ message: "Your old password mustn't equal new password", code: -1 });
                    }else if(new_pass === confirm_pass){
                        // CHANGE PASSWORD
                        bcrypt.hash(new_pass, 10)
                            .then(hash => {
                                // UPDATE
                                const promise = UserModel.findByIdAndUpdate(user_id, { password: hash }, { new: true });

                                promise.then((data) => {
                                    res.json({ message: "Change password successfully.", code: 200, data });
                                }).catch(err => {
                                    res.json(err);
                                });
                            }).catch(err => res.json(err));
                    }else{
                        res.json({ message: "Your passwords not match!", code: -1 });
                    }
                }else{
                    res.json({ message: "Your old password is wrong!", code: -1 });
                }
            }).catch(err => {
                res.json(err);
            });
    }).catch((err) => {
        res.json({ message: "User not found", code: -1 });
    });
});

// CHANGE ACCOUNT INFORMATION
router.put('/:user_id/change-account-information', (req, res) => {
    // TAKE DATA
    const user_id = req.params.user_id;
    const { name, surname, email } = req.body;

    // EXISTS USER
    const existsUser = UserModel.findById(user_id, "name surname email");

    existsUser.then(data => {
        // UPDATE
        const promise = UserModel.findByIdAndUpdate(user_id, { name, surname, email }, { new: true });
        promise.then(user => {
            res.json({ message: 'Your account information changed successfully.', code: 200, data });
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json({ message: "User not found", code: -1 });
    })
});

// DELETE ACCOUNT
router.delete('/:user_id', (req, res) => {
    // TAKE DATA
    const user_id = req.params.user_id;

    // DELETE ACCOUNT
    const user = UserModel.findById(user_id, 'status');

    user.then(data => {
        // DELETE USER, DO UPDATE -> STATUS: 0
        const promise = UserModel.findByIdAndUpdate(data._id, { status: 0 }, { new: true });
        promise.then((user) => {
            res.json({ message: "Your account deleted successfully.", code: 200 });
        }).catch((err) => {
            res.json(err);
        });
    }).catch(err => {
        res.json({ message: "User not found", code: -1 });
    });
});

module.exports = router;