const wordController = require('./word.controller')


class PhraseController{
    etiquettePhrase(lang,phrase){
        return new Promise((resolve,reject) =>{
            try {
                var newPraseBlindfold = phrase
                var badWordsFounded = []

                var phraseArray = phrase.split(' ')
                var verify = 0

                phraseArray.forEach(element => {
                    wordController.getWordByLanguage(lang,element).then(result =>{

                        if(result[0] != null){
                            if(result[0].words[0] != null){
                                badWordsFounded.push(element)
                                newPraseBlindfold = newPraseBlindfold.replace(element,result[0].words[0].blindfold)                
                            }
    
                            verify++
    
                            if(verify===phraseArray.length){
                                resolve({
                                    originalPhrase: phrase,
                                    badwords: badWordsFounded,
                                    changedPhraseBy:{
                                        blindfold: newPraseBlindfold
                                    }
                                })   
                            }
                        } else{
                            resolve({message:'Language not found'})
                        }
                    })
                });
            } catch (error) {
                reject(error)
            }
        })
        
    }
}

module.exports = new PhraseController()