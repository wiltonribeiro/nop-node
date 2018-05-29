const controller = require('../controller/languages.controller')

class WordsRoute{
    applyRoute(server){
        server.get('/languages',(req,resp,next) =>{
            controller.getLanguages().then(result =>{
                resp.json(result)
                return next()
            })
        })

        server.get('/languages/:shortId',(req,resp,next) =>{
            controller.getLanguageByShortId(req.params.shortId).then(result =>{
                if(result[0])
                    resp.json(result)
                else
                    resp.json({message:'Language not found'})
                return next()
            })
        })

        server.get('/languages/:shortId/words',(req,resp,next) =>{
            controller.getLanguageBadWords(req.params.shortId).then(result =>{                
                resp.json(result)
                return next()
            })
        })
    }
}

module.exports = new WordsRoute()