const mongoose = require('mongoose')
const words = require('../models/words.model')

const languageSchema = new mongoose.Schema({
    languageText:{
        type: String,
    },
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        select:false,
        auto:true
    },
    languageShort:{
        type: String,
    },
    wordsReference:{  
        type: mongoose.Schema.Types.ObjectId, ref: 'Word'
    },
    suggestionReference:[{  
        type: mongoose.Schema.Types.ObjectId, ref: 'Word',_id: false
    }],
    __v: { type: Number, select: false}
})

const Language = mongoose.model('Language',languageSchema,'languages')
module.exports = Language