const asyncHandler = require('express-async-handler')

const Expense = require('../models/expenseModel')

const getExpenses = asyncHandler(async (req, res) => {

    const expenses = await Expense.find({user: req.user.id})

    res.status(200).json(expenses)
})

const postExpenses = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        //res.status(400).json({ message: 'Por favor teclea un gasto' })
        res.status(400)
        throw new Error('Por favor agregue un gasto')
    }

    const expenses = await Expense.create({
        text: req.body.text,
        mount:req.body.mount,
        user: req.user.id
    })

    res.status(200).json(expenses)
})

const putExpenses = asyncHandler(async (req, res) => {

    const expenses = await Expense.findById(req.params.id)

    if (!expenses) {
        res.status(400)
        throw new Error('Gasto no encontrado')
    }

    if(expenses.user.toString() !== req.user.id) {

        res.status(401)
        throw new Error ('Acceso no autorizado')
    }

    const expenseUpdated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(expenseUpdated)
})

const deleteExpenses = asyncHandler(async (req, res) => {

    const expenses = await Expense.findById(req.params.id)

    if (!expenses) {
        res.status(400)
        throw new Error('Gasto no encontrado')
    }
    if(expenses.user.toString() !== req.user.id) {

        res.status(401)
        throw new Error ('Acceso no autorizado')
    }

    await expenses.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getExpenses,
    postExpenses,
    putExpenses,
    deleteExpenses
}