const Suggestion = require('../models/suggestion.model')
const languages = require('../models/language.model')
const words = require('../models/words.model')

const languageController = require("./languages.controller")

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
        var responseSuggestion, responseWord;
        await this.getSuggestionsByLanguageAndWord(body.language,body.word).then(res =>{
            responseSuggestion = res  
        })

        await languageController.getWordByLanguage(body.language,body.word).then(res =>{
            responseWord = res
        })

        if(responseSuggestion[0].suggestionReference.length!=0 || (responseWord.words != null && responseWord.words.length>=1)){
            return Promise.resolve({message:'already exist',code:0})
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
            return Suggestion.findOneAndUpdate({language:body.language,word:body.word},{$inc : {votes : 1} })
        } else{
            return Promise.resolve({message:'Suggestion was not found',code:2})
        }
    }

    async addWordToLanguage(lang,word,suggestionId){
        var reference;

        await languages.findOne({languageShort:lang}).select('wordsReference').then(result =>{
            reference = result.wordsReference
        })

        let blindfold = '*'.repeat(word.length)
        await words.findOneAndUpdate({_id:reference},{$push:{ words: {word:word,blindfold:blindfold}}})
        await languages.findOneAndUpdate({languageShort:lang},{$pull:{ suggestionReference: suggestionId  }}, { safe: true, upsert: true })
    }

    // async addInitialWords(body) {        
    //     return new Promise(async (resolve, reject) =>{        
            
    //         try {
    //             var reference;
    //             await languages.findOne({languageShort:body.lang}).select('wordsReference').then(result =>{
    //                 reference = result.wordsReference
    //             })

    //             let bla = body.words;
    //             bla.forEach(async word => {
    //                 let blindfold = '*'.repeat(word.length);
    //                 await words.findOneAndUpdate({_id:reference},{$push:{ words: {word:word,blindfold:blindfold}}})                
    //             });
                
    //             resolve({message:reference})   
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
}

module.exports = new SuggestionController()