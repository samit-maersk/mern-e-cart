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
        tags: [String]
      })
}
