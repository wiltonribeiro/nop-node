const mongoose = require('mongoose')


const wordsSchema = new mongoose.Schema({
    words:[
        {
            word:{
                type: String,
                unique:true
            },
            blindfold:{
                type: String
            },
            _id:false
        }
    ],
    _id:{
        type: mongoose.Schema.Types.ObjectId
    }
})

const Word = mongoose.model('Word',wordsSchema)
module.exports = Word