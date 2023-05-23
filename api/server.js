const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const package = require('./package.json')
var jwt = require('jsonwebtoken');
const { userSchema, categorySchema, productSchema, quantitySchema, orderSchema } = require('./models');

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

//Logger
const myLogger = function (req, res, next) {
  console.log(`${req.method} ${req.url} ${req.headers['user-agent']} `)
  next()
}
app.use(myLogger)

//mongo Db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Db Connected!'))
    .catch(e => console.error(`Db Connection error: ${e.message}`));
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Quantity = mongoose.model('Quantity', quantitySchema);
const Order = mongoose.model('Order', orderSchema);
 

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

    const user = await User.findOne({username: username})
    if (user) {
        next(new HttpError('User already exists', 409))
    } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({name: name, username: username, password: hash, email: email})
        await newUser.save()
        res.json({
            message: `Welcome ${newUser.name}. Your Username is ${newUser.username} , which you can use for login.`
        })
    }
})

app.post('/login', async (req, res, next) => {
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if (user) {
        if(bcrypt.compareSync(password, user.password)) {
            
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data : {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    doj: user.doj,
                    isAdmin: user.isAdmin
                }
            }, process.env.JWT_SECRET);

            res.cookie('token', token, { httpOnly: true , path: '/'});
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
            next(new HttpError(err.message, 403))
        }
    } else {
        next(new HttpError('authorization header missing', 403))
    }
})


app.route('/products')
  .get((req, res, next) => {

    Product.find().then((product) => {
        res.json(product)
    }).catch((err) => {
        next(new HttpError(err.message, 500))
    })
  })
  .post((req, res, next) => {
    const {name, description, price, category} = req.body
    const newProduct = new Product({name: name, description: description, price: price, category: category, tags: []})
    newProduct.save().then((product) => {
        res.json(product)
    }).catch((err) => {
        next(new HttpError(err.message, 500))
    })
  })


app.route('/products/:id')
  .get((req, res, next) => {
    Product.findById(req.params.id).then((product) => {
        res.json(product)
    }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
  })
  .put((req, res, next) => {
    const {name, description, price, category} = req.body
    Product
      .findByIdAndUpdate(req.params.id, {name: name, description: description, price: price, category: category, tags: []}, {new: true})
      .then((product) => {
        res.json(product)
      }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
  })
  .delete((req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        res.json(product)
    }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
  })


app.route('/category')
  .get((req, res, next) => {
    Category.find().then((category) => {
        res.json(category)
    }).catch((err) => {
        next(new HttpError(err.message, 500))
    })
  })
  .post((req, res, next) => {
    const {name, description} = req.body
    const newCategory = new Category({name: name, description: description})
    newCategory.save().then((category) => {
        res.json(category)
    }).catch((err) => {
        next(new HttpError(err.message, 500))
    })
  })

app.route('/category/:id')
  .get((req, res, next) => {
    Category.findById(req.params.id).then((category) => {
        res.json(category)
    }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
   })
  .put((req, res, next) => {
    const {name, description} = req.body
    Category
      .findByIdAndUpdate(req.params.id, {name: name, description: description}, {new: true})
      .then((category) => {
        res.json(category)
      }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
  })
  .delete((req, res, next) => {
    Category.findByIdAndDelete(req.params.id).then((category) => {
        res.json(category)
    }).catch((err) => {
        next(new HttpError(err.message, 404))
    })
  })


  app.route('/test/:user_id')
    .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
      next()
    })
    .get((req, res, next) => {
      res.json(req.user)
    })
    .put((req, res, next) => {
    // just an example of maybe updating the user
      req.user.name = req.params.name
      // save user ... etc
      res.json(req.user)
    })
    .post((req, res, next) => {
      next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
      next(new Error('not implemented'))
    })


//Generic error handler Middleware
app.use((error, req, res, next) => {
  console.log('Path: ', req.path)
  console.error('ErrorMessage: ', error.message)
  console.error('Error: ', error)
  res.status(error?.statusCode).json({ error: error?.message })
})

app.listen(port, () => {
  console.log(`${package.name} listening on port ${port}`)
})