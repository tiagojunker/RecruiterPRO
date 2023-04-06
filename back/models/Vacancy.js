const mongoose = require('mongoose')

const vacancy = new mongoose.Schema({
    title: String,
    description: String,
    recruiterId: String,
    candidates: [String]
})

module.exports = vacancy