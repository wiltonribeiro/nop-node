const languages = require('../models/language.model')
const words = require('../models/words.model')

class LanguageController{

    getLanguages(){
        return languages.find({},{suggestionReference:0})
    }

    getLanguageByShortId(shortId){
        return languages.findOne({languageShort:shortId},{suggestionReference:0})
    }

    getLanguageBadWords(shortId){
        return new Promise(resolve => {
            languages.find({languageShort:shortId},{suggestionReference:0}).populate({
                path: 'wordsReference',
                model: 'Word'
            }).exec((err, resul) => {
                if (err) {resolve(err)}
                else {resolve(resul)};
            });
        }) 
    }

    async getWordByLanguage(shortId,word){
        var result;
        await languages.findOne({languageShort:shortId}).select("wordsReference").exec(function (err, someValue) {
            if (err) result = new Promise(resolve =>{resolve(err)})
            else{            
                if(someValue)
                    result = words.findById(someValue.wordsReference,{words: {$elemMatch:{word: word}}}).select('-_id').exec()
                else
                    result = new Promise(resolve =>{resolve({message:'Language not exit',code:1})})
            }
        }) 

        return result
    } 
    
}

module.exports = new LanguageController()