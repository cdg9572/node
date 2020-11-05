const mongoose = require('mongoose')

const userSchmea = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email: {
        type: String,
        trim: true,
    },
    lastname : {
        type: String,
        maxlength : 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchmea)

module.exports = {User}
