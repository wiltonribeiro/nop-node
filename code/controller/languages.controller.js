const languages = require('../models/language.model')
const words = require('../models/words.model')

class LanguageController{

    getLanguages(){
        return new Promise((resolve,reject) => {
            languages.find({},{suggestionReference:0}).populate({
                path: 'wordsReference',
                model: 'Word'
            }).exec((err, resul) => {
                if (err) {reject(err)}
                else {resolve(resul)};
            });
        }) 
    }

    getLanguageByShortId(shortId){
        return languages.findOne({languageShort:shortId},{suggestionReference:0})
    }

    getLanguageBadWords(shortId){
        return new Promise((resolve,reject) => {
            languages.find({languageShort:shortId},{suggestionReference:0}).populate({
                path: 'wordsReference',
                model: 'Word'
            }).exec((err, resul) => {
                if (err) {reject(err)}
                else {resolve(resul)};
            });
        }) 
    }

    async getWordByLanguage(shortId,word){
        var result;
        await languages.findOne({languageShort:shortId}).select("wordsReference").exec(function (err, someValue) {
            if (err) result = new Promise(reject =>{reject(err)})
            else{                            
                if(someValue)
                    result = words.findById(someValue.wordsReference,{words: {$elemMatch:{word: word}}}).select('-_id').exec()
                else
                    result = new Promise(reject => reject())
            }
        }) 

        return result
    } 
    
}

module.exports = new LanguageController()