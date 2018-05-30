const controller = require('../controller/languages.controller')

class WordsRoute{
    applyRoute(server){
        server.get('/languages',(req,resp,next) =>{
            controller.getLanguages().then(result =>{
                if(result.length>0){
                    result.forEach(element => {
                        element.wordsReference = undefined 
                    });
                    resp.json(result)
                } else 
                    resp.json({message:'error'})
                return next()
            })
        })

        server.get('/languages/:shortId',(req,resp,next) =>{
            controller.getLanguageByShortId(req.params.shortId).then(result =>{
                if(result){
                    result.wordsReference = undefined
                    resp.json(result)
                }
                else{
                    resp.statusCode = 404
                    resp.json({message:'Language not exit',code:1})
                }
                return next()
            })
        })

        server.get('/languages/:shortId/words',(req,resp,next) =>{
            controller.getLanguageBadWords(req.params.shortId).then(result =>{
                if(result[0]){
                    result[0]._doc.wordsReference._id = undefined
                    resp.json(result)
                } else
                    resp.statusCode = 404
                    resp.json({message:'error', cause:'Probably the language is not registred',code:3})
                
                                
                return next()
            })
        })

         server.get('/languages/:shortId/words/:word',(req,resp,next) =>{
            controller.getWordByLanguage(req.params.shortId,req.params.word).then(result =>{
                if(result.words == null) 
                    resp.json({message:'Language not exit',code:1})
                else if(result.words.length<=0)
                    resp.json({message:'Word not found',code: 2})
                else
                    resp.json(result)                
                return next()
            })
        })
    }
}

module.exports = new WordsRoute()