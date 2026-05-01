const express = require('express');
const { getExpenses, createExpense } = require('../controllers/expenseController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getExpenses).post(createExpense);

module.exports = router;
