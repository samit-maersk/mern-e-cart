var jwt = require('jsonwebtoken');
const { users } = require('../db');
const HttpError = require('./error');
module.exports = function(app){

    app.post('/login', (req, res, next) => {
        const {username, password} = req.body
        const user = users.find(u => u.name === username && u.password === password)
        if (user) {
            delete user['password']
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user
              }, process.env.JWT_SECRET);
    
            
            res.cookie('token', token, { httpOnly: true , secure: true, path: '/'});
            res.session = {token: token}
            res.json({
                message: `Welcome ${user.name}`,
                token: token
            })
        } else {
            next(new HttpError('Login failed', 401))
        } 
    })
    
    app.get('/user-info', (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                res.json(decoded?.data)
            } catch(err) {
                next(new HttpError('Invalid Token', 403))
            }
        } else {
            next(new HttpError('authorization header missing', 403))
        }
    })
}