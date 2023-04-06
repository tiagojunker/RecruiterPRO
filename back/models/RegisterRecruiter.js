const mongoose = require('mongoose')

const recruiter = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        company: {
            type: String,
            default: 'Undefined',
        },
        mode: {
            type: Boolean,
            default: true
        }
});

module.exports = recruiter