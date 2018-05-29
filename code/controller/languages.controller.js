const languages = require('../models/language.model')
const words = require('../models/words.model')

class LanguageController{

    getLanguages(){
        return languages.find({})
    }

    getLanguageByShortId(shortId){
        return languages.findOne({languageShort:shortId})
    }

    getLanguageBadWords(shortId){
        return new Promise(resolve => {
            languages.find({languageShort:shortId}).populate({
                path: 'wordsReference',
                model: 'Word'
            }).exec((err, resul) => {
                if (err) {resolve(err)}
                else resolve(resul);
            });
        }) 
    }
}

module.exports = new LanguageController()