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
    },
    __v: { type: Number, select: false}
})

const Suggestion = mongoose.model('Suggestion', suggestionModel)
module.exports = Suggestion