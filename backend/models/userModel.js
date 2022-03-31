const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'por favor teclea un nombre']
    },
    email:{
        type: String,
        required: [true, 'Por favor teclea un Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea un password']
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model('User',userSchema)