const restify = require('restify');
const mongoose = require('mongoose');
const environment = require('../general/environment');

class Server{

    constructor(){
        this.application = restify.Server
    }

    initDB(){
        mongoose.Promise = global.Promise
        return mongoose.connect(environment.db.url,{
            useMongoClient: true
        })
    }

    initRoutes(routes) {
        return new Promise((resolve,reject) =>{

            try {
                this.application = restify.createServer({
                    name: 'Etiquette-API',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                //routes
                routes.forEach(route => {
                    route.applyRoute(this.application)
                });


                this.application.listen(environment.server.port, () =>{
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)                
            }

        })
    }
    
    init(routes = []){
        return this.initDB().then(() => this.initRoutes(routes).then(() => this)) 
    }
}

module.exports = Server