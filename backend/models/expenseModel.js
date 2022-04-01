const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },


    text: {
        type: String,
        required: [true, 'Por favor escribe un texto']
    },

    mount: {
        type: Number,
        required: [true, 'Por favor escribe el monto']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Expense', expenseSchema)