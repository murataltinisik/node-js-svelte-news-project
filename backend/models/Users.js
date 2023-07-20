const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// USERS MODEL
const UsersSchema = new Schema({
    name: { type: String, required: true, maxLength: 30, minLength: 2 },
    surname: { type: String, required: true, maxLength: 30, minLength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [0,1,2], default: 0},
    status: { type: Number, enum: [0,1], default: 1 },
    last_login: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', UsersSchema);