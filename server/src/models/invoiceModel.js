const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: [true, 'Please add an invoice number'],
        unique: true,
        trim: true
    },
    deal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deal',
        required: true
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an invoice amount'],
        default: 0
    },
    status: {
        type: String,
        enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
        default: 'Draft'
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: [true, 'Please add a due date']
    },
    paidDate: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
