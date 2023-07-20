const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MODEL
const NewsModel = require('../models/News');
const UsersModel = require('../models/Users');
const CommentsModel = require('../models/Comments');

// NUMBER OF COMMENTS OF USER
router.get('/users/:user_id', (req, res) => {
   const promise = CommentsModel.find({ 'user_id': req.params.author_id }).count();

   promise.then(data => {
      res.json(data);
   }).catch(err => {
      res.json(err);
   });
});

// NUMBER OF COMMENTS OF NEWS
router.get('/news/:news_id', (req, res) => {
   const promise = CommentsModel.find({ 'news_id': req.params.news_id }).count();

   promise.then(data => {
      res.json(data);
   }).catch(err => {
      res.json(err);
   });
});

// ADD COMMENT
router.post('/', (req, res) => {
   const { news_id, user_id } = req.body;
   // IS EXISTS NEWS
   const isExistsNews = NewsModel.findById(news_id);
   isExistsNews.then(data => {
      if(data){
         // IS EXISTS USER
         const isExistsUser = UsersModel.findById(user_id);
         isExistsUser.then(data => {
            if(data){
               const model = new CommentsModel(req.body);
               const promise = model.save();

               promise.then(data => {
                  res.json({ message: "Your comment added successfully.", code: 200, data });
               }).catch(err => {
                  res.json(err);
               });
            }else{
               res.json({ message: "Comments could not added", code: -1 });
            }
         }).catch(err => {
            res.json({ message: "User not found!!", code: -1 });
         });
      }else{
         res.json({ message: "News not found", code: -1 });
      }
   }).catch(err => {
      res.json({ message: "News not found", code: -1 });
   });

});

// DELETE COMMENT
router.delete('/:comment_id', (req, res) => {
   const promise = CommentsModel.findByIdAndRemove(req.params.comment_id)

   promise.then(data => {
      if(!data) {
         res.json({ message: "Comment not found!", code: -1 });
      }else{
         res.json({ message: "Comment deleted successfully.", code: 200 });
      }
   }).catch(err => {
      res.json({ message: 'Comment could not deleted!', code: -1 })
   });
});

module.exports = router;