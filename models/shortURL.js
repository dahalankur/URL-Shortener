const mongoose = require('mongoose')
const shortId = require('shortid')

const shortURLSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: () => shortId.generate(),
        unique: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('shortURL', shortURLSchema)