const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MODEL
const NewsModel = require('../models/News');
const UserModel = require('../models/Users');
const CommentModel = require('../models/Comments');

// GET ALL NEWS
router.get('/', (req, res) => {
    const promise = NewsModel.aggregate([
        {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'author_id',
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
                'created_at': -1
            }
        },
        {
            $project: {
                title: '$title',
                content: '$content',
                tag: '$tag',
                image: '$image',
                created_at: '$created_at',
                author: {
                    name: '$news.name',
                    surname: '$news.surname',
                }
            }
        }
    ]);

    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

// GET DYNAMIC LIMITED DATA
router.get('/:limit/get', (req, res) => {
    const limit = req.params.limit;

    if(limit === 4){
        NewsModel.find().sort({ 'created_at': -1 }).limit(limit).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        });
    }else{
        NewsModel.find().sort({ 'created_at': -1 }).skip(4).limit(limit).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        });
    }
});

// GET ONCE
router.get('/:news_id', (req, res) => {
    // GET
    const promise = NewsModel.aggregate([
            {
                $match: {
                    '_id': new mongoose.Types.ObjectId(req.params.news_id)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'author_id',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: '$author'
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        title: '$title',
                        content: '$content',
                        image: '$image',
                        tag: '$tag',
                        created_at: '$created_at'
                    },
                    author: {
                        $first: {
                            _id: '$author._id',
                            name: '$author.name',
                            surname: '$author.surname',
                            email: '$author.email',
                        },
                    },
                }
            },
            {
                $project: {
                    title: '$title',
                    content: '$content',
                    image: '$image',
                    tag: '$tag',
                    created_at: '$created_at',
                    author: '$author',
                }
            }
        ]);

    promise.then(data => {
        const promise2 = CommentModel.aggregate([
            {
                $match: {
                    'news_id': new mongoose.Types.ObjectId(req.params.news_id)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                $project: {
                    comment: '$comment',
                    user: {
                        _id: '$user._id',
                        name: '$user.name',
                        surname: '$user.surname',
                        email: '$user.email'
                    }
                }
            }
        ]);

        promise2.then((data2) => {
            res.json({ news: data[0], comments: data2 });
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json(err);
    })
});

// ADD NEWS
router.post('/', (req, res) => {
    // TAKE DATA
    const { title, content, tag, image, author_id } = req.body;

    // EXISTS USER
    const existsUser = UserModel.findById(author_id, 'role');

    existsUser.then(user => {
        // IS USER A AUTHOR
        if(user.role === 1){
            // ADD NEWS
            const model = new NewsModel({ title, content, tag, image, author_id });
            const promise = model.save();
            promise.then(data => {
                res.json({ message: "News added successfully.", code: 200, data });
            }).catch(err => {
                res.json({ message: "News could not be added!!", code: -1 });
            });
        }else{
            res.json({ message: "You isn't a author.", code: -1 });
        }
    }).catch(err => {
        res.json({ message: 'User not found', code: -1 });
    });
});

// UPDATE NEWS
router.put('/:news_id', (req, res) => {
    // TAKE DATA
    const news_id = req.params.news_id;
    const { title, content, image, tag } = req.body;

    // UPDATE DATA
    const promise = NewsModel.findByIdAndUpdate(news_id, { title, content, image, tag }, { new: true });

    promise.then(data => {
        res.json({ message: "News updated successfully..", code: 200, data });
    }).catch(err => {
        res.json({ message: "News could not update!", code: -1 });
    });
});

// DELETE NEWS
router.delete('/:news_id', (req, res) => {
    const promise = NewsModel.findByIdAndRemove(req.params.news_id);

    promise.then(data => {
        if(!data){
            res.json({ message: "News not found.", code: -1 });
        }else{
            res.json({ message: "News deleted successfully.", code: 200 });
        }
    }).catch(err => {
        res.json({ message: "News could not delete!", code: -1 });
    });
});

module.exports = router;