const controller = require('../controller/suggestion.controller')

class SuggestionRoute{
    applyRoute(server){
        server.get('/suggestion/:language', (req,resp,next) =>{
            controller.getSuggestionsByLanguage(req.params.language).then(result =>{
                if(result==false)
                    resp.json({message:'Language not exit',code:1})
                else if(result[0].suggestionReference.length==0)
                    resp.json({message:'Suggestions not found',code:2})
                else
                    resp.json(result)
                return next()
            })
        })

        server.get('/suggestion/:language/:word', (req,resp,next) =>{
            controller.getSuggestionsByLanguageAndWord(req.params.language,req.params.word).then(result =>{
                if(result[0].suggestionReference.length==0)
                    resp.json({message:'Language or word not exit',code:2})
                else
                    resp.json(result)
                return next()
            })
        })

        server.post('/suggestion', (req,resp,next) =>{
            controller.submitSuggestionByLanguage(JSON.parse(req.body)).then(result =>{
                console.log(result)
                resp.json(result)
                return next()
            })
        })

        server.post('/vote', (req,resp,next) =>{            
            controller.voteSuggestionByWord(JSON.parse(req.body)).then(async result =>{
                if(result.votes == 4){
                    await controller.addWordToLanguage(result.language,result.word,result._id)
                }
                resp.json(result)
                return next()
            })            
        })
    }
}

module.exports = new SuggestionRoute()