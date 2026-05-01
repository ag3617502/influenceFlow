const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an expense title'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an expense amount'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
        enum: ['Equipment', 'Travel', 'Outsourcing', 'Marketing', 'Software', 'Legal', 'Other']
    },
    date: {
        type: Date,
        default: Date.now
    },
    deal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deal' // Also referred to as project
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    },
    partner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Partner'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    receiptUrl: String,
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
