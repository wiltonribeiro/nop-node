const mongoose = require('mongoose')

const suggestionModel = new mongoose.Schema({
    language:{
        type:String
    },
    word:{
        type:String
    },
    votes:{
        type:Number,
        default: 0
    }
})

const Suggestion = mongoose.model('Suggestion', suggestionModel)
module.exports = Suggestion