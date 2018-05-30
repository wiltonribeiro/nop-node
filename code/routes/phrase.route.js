const controller = require('../controller/phrase.controller') 

class PhraseRoute{
    applyRoute(server){

        server.get('/phrase/?language&phrase',(req,resp,next) =>{
            controller.nop(req.query.language,req.query.phrase).then(result =>{
                resp.json(result)
                return next()
            })
        })
    }
}

module.exports = new PhraseRoute()