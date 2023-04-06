const mongoose = require('mongoose')

const feedbacks = new mongoose.Schema({
    vacancyTitle: String,
    feedback: [{title: String, mensage: String}],
    candidate: String
})

module.exports = feedbacks