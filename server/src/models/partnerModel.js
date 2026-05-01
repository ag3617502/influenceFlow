const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a partner name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
        enum: ['Agency', 'Management', 'PR', 'Legal', 'Platform', 'Other']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    contactPerson: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    totalDeals: {
        type: Number,
        default: 0
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);
