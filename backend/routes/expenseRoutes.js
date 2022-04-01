const express = require ('express')
const router = express.Router()
const { getExpenses, postExpenses, putExpenses, deleteExpenses} = require('../controllers/expenseControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getExpenses).post(protect, postExpenses)
router.route('/:id').put(protect, putExpenses).delete(protect, deleteExpenses) 

module.exports = router