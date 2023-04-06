const jwt = require('jsonwebtoken')
const secret = 'aoskjd0219834jkf09dm256'

module.exports = (req, res, next) => {
    const loginToken = req.headers['authorization']

    if(loginToken != undefined){
        const bearer = loginToken.split(' ')
        let token = bearer[1]

        try {
            let decoded = jwt.verify(token, secret)
            next();
            return;
        } catch (err) {
            res.status(403);
            res.send('Você não está autenticado.')
            return;
        }

    } else {
        res.status(403);
        res.send('Você não está autenticado.')
        return;
    }
}