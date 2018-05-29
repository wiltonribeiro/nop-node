const mongoose = require('mongoose')
const words = require('../models/words.model')

const languageSchema = new mongoose.Schema({
    languageText:{
        type: String,
    },
    _id:{
        type: String,
        select:false
    },
    languageShort:{
        type: String,
    },
    wordsReference:{  
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' }
        
    } 
})

const Language = mongoose.model('Language',languageSchema,'languages')
module.exports = Language