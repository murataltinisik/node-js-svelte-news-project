const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    _id: false,
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },
    author: { type: String, required: true },
    maintenance: { type: Number, enum: [0,1], default: 0 },
});


module.exports = mongoose.model('setting', SettingSchema);