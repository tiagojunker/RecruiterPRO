const mongoose = require('mongoose')

const candidate = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        description: String,
        linkCV: String,
        linkedIn: String,
        mode: {
                type: Boolean,
                default: false
        }
});

module.exports = candidate