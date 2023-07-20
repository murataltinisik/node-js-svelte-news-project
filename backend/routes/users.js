const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MODEL
const UserModel = require('../models/Users');

// END FIVE POST OF AUTHOR
router.get('/:author_id', (req, res) => {
    // EXISTS USER
    const existsUser = UserModel.findById(req.params.author_id);

    existsUser.then(data => {
        const promise = UserModel.aggregate([
            {
                $match: {
                    '_id': new mongoose.Types.ObjectId(req.params.author_id),
                    'role': 1
                }
            },
            {
                $lookup: {
                    from: 'news',
                    localField: '_id',
                    foreignField: 'author_id',
                    as: 'news'
                }
            },
            {
                $unwind: {
                    path: '$news'
                }
            },
            {
                $sort: {
                    'news.created_at': -1
                }
            },
            {
                $limit: 5
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        name: '$name',
                        surname: '$surname'
                    },
                    news: {
                        $push: {
                            _id: '$news._id',
                            title: '$news.title',
                            content: '$news.content',
                            image: '$news.image',
                            tag: '$news.tag',
                            created_at: '$news.created_at'
                        }
                    }
                }
            },
            {
                $project: {
                    name: '$name',
                    surname: '$surname',
                    news: '$news'
                }
            }
        ]);

        promise.then(data => {
            if(!data || data.length === 0){
                res.json({ message: 'Not found anything data', code: -1 });
            }else{
                res.json(data);
            }
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json({ message: "User not found!", code: -1 })
    });

});

// BE WRITER
router.put('/be-writer/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    UserModel.findById(user_id).then(data => {
       if(!data){
           res.json({ message: "User not found!!", code: -1 });
       } else{
           if(data.role === 1){
               res.json({ message: "Already, You are a writer!!", code: -1 });
           }else{
               const promise = UserModel.findByIdAndUpdate(user_id, { role: 1 }, { new: true });
               promise.then(user => {
                   res.json({ message: "You be a writer successfully.", code: 200, user });
               }).catch(err => {
                   res.json({ message: "You could not be a writer", code: -1 });
               });
           }
       }
    }).catch(err => {
        res.json({ message: "User not found!!", code: -1 });
    });
});

// DON'T BE WRITER
router.put('/dont-be-writer/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    UserModel.findById(user_id).then(data => {
        if(!data){
            res.json({ message: "User not found!!", code: -1 });
        } else{
            const promise = UserModel.findByIdAndUpdate(user_id, { role: 0 }, { new: true });
            promise.then(user => {
                res.json({ message: "You be a writer successfully.", code: 200, user });
            }).catch(err => {
                res.json({ message: "You could not be a writer", code: -1 });
            });
        }
    }).catch(err => {
        res.json({ message: "User not found!!", code: -1 });
    });
});

module.exports = router;