const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NEWS MODEL
const NewsSchema = new Schema({
    title: { type: String, required: true, maxLength: 160, minLength: 8 },
    content: { type: String, required: true, maxLength: 1000, minLength: 10 },
    tag: { type: String, required: true },
    image: { type: String },
    author_id: Schema.Types.ObjectId, // This equal users.id
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('news', NewsSchema);