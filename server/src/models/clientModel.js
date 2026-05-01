const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a client name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add a contact email'],
        lowercase: true,
        trim: true
    },
    industry: {
        type: String,
        required: [true, 'Please specify an industry'],
        enum: ['Fashion', 'Tech', 'Sports', 'Food', 'Lifestyle', 'Music', 'Media', 'Other']
    },
    website: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    avatar: {
        type: String, // URL to the client logo/avatar
    },
    contactPerson: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    paymentBehavior: {
        type: String,
        enum: ['Early', 'On Time', 'Late', 'Overdue', 'New'],
        default: 'New'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    totalRevenue: {
        type: Number,
        default: 0
    },
    totalDeals: {
        type: Number,
        default: 0
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Client', clientSchema);
