//const wordController = require('./word.controller')
const languageController = require('./languages.controller')

class PhraseController{

    nop(lang,phrase){
        return new Promise((resolve,reject) =>{
            try {
                var badWordsFounded = []
                var blindfoldPhrase = phrase
                var phraseArray = phrase.split(' ')
                var verify = 0

                phraseArray.forEach(element => {
                    languageController.getWordByLanguage(lang,element).then(result =>{                        
                        if(result.words != null){                         
                            if(result.words.length >= 1){
                                badWordsFounded.push(element)
                                blindfoldPhrase = blindfoldPhrase.replace(element,result.words[0].blindfold)
                            }                            
                        }

                        verify++                            
                        if(verify===phraseArray.length){                        
                            resolve({                                
                                originalPhrase: phrase,
                                badwords: badWordsFounded,
                                changedPhraseBy:{
                                    blindfold: blindfoldPhrase
                                }
                            })   
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