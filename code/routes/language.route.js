const controller = require('../controller/languages.controller')
const teste = require('../general/fillDataLanguages')

class WordsRoute{
    applyRoute(server){
        server.get('/languages',(req,resp,next) =>{                        
            controller.getLanguages().then(result =>{
                if(result.length>0){
                    result.forEach(element => {
                        element._doc.wordsReference =  element._doc.wordsReference.words.length
                    });
                    resp.statusCode = 200
                    resp.json(result)
                } else 
                    resp.json({message:'error'})
                return next()
            })
        })

        // server.get('/languages/fill',(req,resp,next) =>{
        //         teste.criar();
        //         resp.json({message:'ok'})
        //         return next()
        // })


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
                if(result==null)
                    resp.json({message:'Language not exit',code: 1})
                else if(result.words == null) 
                    resp.json({message:'Word not exit',code:1})
                else
                    resp.json(result)                
                return next()
            })
        })
    }
}

module.exports = new WordsRoute()