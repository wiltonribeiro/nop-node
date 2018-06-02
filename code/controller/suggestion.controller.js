const suggestion = require('../models/suggestion.model')
const languages = require('../models/language.model')
const words = require('../models/words.model')

class SuggestionController{

    getSuggestionsByLanguage(lang){
        return new Promise(resolve => {
            languages.find({languageShort:lang},{suggestionReference:1}).populate({
                path: 'suggestionReference',
                model: 'Suggestion',
                select: '-__v -_id'
            }).exec((err, resul) => {
                if (err) {resolve(err)}
                else {resolve(resul)};
            });
        }) 
    }

    getSuggestionsByLanguageAndWord(lang,word){
        return new Promise(resolve => {
            languages.find({languageShort:lang},{suggestionReference:1}).populate({
                path: 'suggestionReference',
                model: 'Suggestion',
                select: '-__v -_id',
                match: { word: word},
            }).exec((err, resul) => {
                if (err) {resolve(err)}
                else {resolve(resul)};
            });
        }) 
    }

    async submitSuggestionByLanguage(body){
        var response;
        await this.getSuggestionsByLanguageAndWord(body.language,body.word).then(res =>{
            response = res  
        })

        if(response[0].suggestionReference.length!=0){
            return Promise.resolve({message:'already exist'})
        } else{
            const suggestion = new Suggestion(body)
            var suggestionId;
            
            await suggestion.save().then(resul =>{
                suggestionId = resul._id
            })

            return languages.findOneAndUpdate({languageShort:body.language},{$push:{ suggestionReference: suggestionId  }})
        }
    }

    async voteSuggestionByWord(body){
        var response;
        await this.getSuggestionsByLanguageAndWord(body.language,body.word).then(res =>{
            response = res    
        })

        if(response[0].suggestionReference.length!=0){
            return suggestion.findOneAndUpdate({language:body.language,word:body.word},{$inc : {votes : 1} })
        } else{
            return Promise.resolve({message:'Suggestion was not found'})
        }
    }

    async addWordToLanguage(lang,word){
        var reference;

        await languages.findOne({languageShort:lang}).select('wordsReference').then(result =>{
            reference = result.wordsReference
        })

        let blindfold = '*'.repeat(word.length)
        await words.findOneAndUpdate({_id:reference},{$push:{ words: {word:word,blindfold:blindfold}}}).then(result =>{
            console.log(result)
        })

    }
}

module.exports = new SuggestionController()