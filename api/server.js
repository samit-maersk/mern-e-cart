const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const package = require('./package.json')
var jwt = require('jsonwebtoken');
const { userSchema } = require('./models');

//Cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Dotenv
require('dotenv').config()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cors
var cors = require('cors')
app.use(cors())

//Generic Error
class HttpError extends Error {
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

//mongo Db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Db Connected!'))
    .catch(e => console.error(`Db Connection error: ${e.message}`));
const Users = mongoose.model('Users', userSchema);

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Routers
app.get('/', (req, res) => {
    res.json({ 
        name: package.name,
        version: package.version
    })
})

app.post('/register', async (req, res, next) => {
    const {name, email, password} = req.body
    
    const username = name?.toLowerCase()?.replaceAll(' ', '')

    const user = await Users.findOne({username: username})
    if (user) {
        next(new HttpError('User already exists', 409))
    } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new Users({name: name, username: username, password: hash, email: email})
        await newUser.save()
        res.json({
            message: `Welcome ${newUser.name}. Your Username is ${newUser.username} , which you can use for login.`
        })
    }
})

app.post('/login', async (req, res, next) => {
    const {username, password} = req.body
    //const user = users.find(u => u.name === username && u.password === password)
    const user = await Users.findOne({username: username})
    if (user) {
        if(bcrypt.compareSync(password, user.password)) {
            
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data : {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    doj: user.doj,
                }
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

app.route('/products')
  .get((req, res) => {
    res.json({})
  })
  .post((req, res) => {
    res.json(req.body)
  })

  app.route('/products/:id')
  .get((req, res) => {
    res.json({})
  })
  .put((req, res) => {
    res.json(req.body)
  })
  .delete((req, res) => {
    res.json({})
  })


app.route('/categories')
  .get((req, res) => {
    res.json({})
  })
  .post((req, res) => {
    res.json(req.body)
  })

app.route('/categories/:id')
  .get((req, res) => {
    res.json({})
  })
  .put((req, res) => {
    res.json(req.body)
  })
  .delete((req, res) => {
    res.json({})
  })



//Generic error handler Middleware
app.use((error, req, res, next) => {
    console.log('Path: ', req.path)
    console.error('ErrorType: ', error.type)
    console.error('Error: ', error.message)
    res.status(error?.statusCode).json({ error: error?.message })
})

app.listen(port, () => {
  console.log(`${package.name} listening on port ${port}`)
})