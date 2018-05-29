const Suggestion = require('../models/suggestion.model')

class SuggestionController{

    getSuggestionsByLanguage(lang){
        return Suggestion.find({language:lang})
    }

    getSuggestionsByLanguageAndWord(lang,word){
        return Suggestion.find({language:lang,word:word})
    }

    async submitSuggestionByLanguage(body){
        var response;
        await this.getSuggestionsByLanguageAndWord(body.language,body.word).then(res =>{
            response = res    
        })

        if(response[0]){
            return Promise.resolve({message:'already exist'})
        } else{
            const suggestion = new Suggestion(body)
            return suggestion.save()
        }
    }

    async voteSuggestionByWord(body){
        var response;
        await this.getSuggestionsByLanguageAndWord(body.language,body.word).then(res =>{
            response = res    
        })

        if(response[0]){
            return Suggestion.findOneAndUpdate({language:body.language,word:body.word},{$inc : {votes : 1} })
        } else{
            return Promise.resolve({message:'Suggestion was not found'})
        }
    }
}

module.exports = new SuggestionController()