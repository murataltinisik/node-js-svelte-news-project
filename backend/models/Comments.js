const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// COMMENTS MODEL
const CommentsSchema = new Schema({
    news_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    comment: { type: String, required: true, maxLength: 500, minLength: 5 }
});

module.exports = mongoose.model('comments', CommentsSchema);