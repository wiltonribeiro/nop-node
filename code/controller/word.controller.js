const words = require('../models/words.model')

class WordsController{

    getAllWordsByLanguage(lang){
        return words.find({language: [lang]},{words:{ $slice: 20}})
    }

    getWordByLanguage(lang,word){
        return words.find({language: [lang]},{words:{$elemMatch:{word: [word]}}})
    }

    addWord(body){
        return words.findOneAndUpdate({language: body.language},
            {$addToSet: {words: body.content}},
            {safe: true, upsert: true})
    }

}

module.exports = new WordsController()