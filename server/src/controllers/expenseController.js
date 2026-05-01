const Expense = require('../models/expenseModel');

// @desc    Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id })
            .populate('deal', 'title')
            .populate('client', 'name')
            .populate('partner', 'name');
        res.status(200).json({ success: true, count: expenses.length, data: expenses });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create expense
exports.createExpense = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const expense = await Expense.create(req.body);
        res.status(201).json({ success: true, data: expense });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
