
const controller = require('../controller/word.controller')

class WordsRoute{
    applyRoute(server){
        // server.get('/words/:language',(req,resp,next) =>{
        //     controller.getAllWordsByLanguage(req.params.language).then(result => {
        //         if(result.length>0)
        //             resp.json(result)
        //         else
        //             resp.json({message:'Language not found'})
        //         return next()
        //     })
        // })

        // server.get('/words/:language/:word',(req,resp,next) =>{
        //    controller.getWordByLanguage(req.params.language,req.params.word).then(result => {
        //        ifg(result[0].words.length>0)
        //             resp.json(result)
        //         else
        //             resp.json({message:'Word not found'})

        //         return next()
        //     })
        // })

        // server.post('/words',(req,resp,next) =>{
        //     const body = JSON.parse(req.body)
        //     controller.addWord(body).then(result =>{
        //         resp.json(result)
        //         return next()
        //     })
        //  })
    }
}

module.exports = new WordsRoute()