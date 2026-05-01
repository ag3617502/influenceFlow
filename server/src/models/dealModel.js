const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a deal title'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Negotiating', 'Active', 'Completed', 'Cancelled'],
        default: 'Negotiating'
    },
    value: {
        type: Number,
        required: [true, 'Please add a deal value'],
        default: 0
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true
    },
    partner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Partner'
    },
    platforms: [{
        type: String,
        enum: ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook', 'Other']
    }],
    startDate: Date,
    endDate: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    notes: String,
    description: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate for invoices related to this deal
dealSchema.virtual('invoices', {
    ref: 'Invoice',
    foreignField: 'deal',
    localField: '_id'
});

// Virtual populate for expenses related to this deal
dealSchema.virtual('expenses', {
    ref: 'Expense',
    foreignField: 'deal',
    localField: '_id'
});

module.exports = mongoose.model('Deal', dealSchema);
