const Server = require('./server/server')
const phraseRoute = require('./routes/phrase.route')
const suggestionRoute = require('./routes/suggestion.route')
const languageRoute = require('./routes/language.route')
const myServer = new Server()

myServer.init([phraseRoute,suggestionRoute,languageRoute]).then((result) => {
    console.log('Server is getting listening on:', result.application.address())
})