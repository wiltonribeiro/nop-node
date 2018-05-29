const controller = require('../controller/suggestion.controller')

class SuggestionRoute{
    applyRoute(server){
        server.get('/suggestion/:language', (req,resp,next) =>{
            controller.getSuggestionsByLanguage(req.params.language).then(result =>{
                if(result[0])
                    resp.json(result)
                else
                    resp.json({message:'No suggestion found'})
                return next()
            })
        })

        server.get('/suggestion/:language/:word', (req,resp,next) =>{
            controller.getSuggestionsByLanguageAndWord(req.params.language,req.params.word).then(result =>{
                if(result[0])
                    resp.json(result)
                else
                    resp.json({message:'No suggestion found'})
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
            controller.voteSuggestionByWord(JSON.parse(req.body)).then(result =>{
                console.log(result)
                resp.json(result)
                return next()
            })
        })
    }
}

module.exports = new SuggestionRoute()