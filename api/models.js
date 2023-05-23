const mongoose = require('mongoose');

module.exports = {
  
    userSchema : new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
          type: String,
          required: true
        },
        password: {
            type: String,
            required: true
        },
        doj: {
          type: Date,
          default: Date.now
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        tags: [String]
      }),

      categorySchema : new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        description: {
            type: String,
            required: true
        }
      }),

      productSchema : new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        tags: [String]
      }),
      
      quantitySchema : new mongoose.Schema({
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
      }),

      orderSchema : new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }],
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
      })

}
