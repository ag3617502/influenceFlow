const Deal = require('../models/dealModel');
const Client = require('../models/clientModel');
const Partner = require('../models/partnerModel');

// @desc    Get all deals for logged in user
// @route   GET /api/v1/deals
// @access  Private
exports.getDeals = async (req, res, next) => {
    try {
        const deals = await Deal.find({ user: req.user.id })
            .populate('client', 'name industry')
            .populate('partner', 'name category');

        res.status(200).json({
            success: true,
            count: deals.length,
            data: deals
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single deal
// @route   GET /api/v1/deals/:id
// @access  Private
exports.getDeal = async (req, res, next) => {
    try {
        const deal = await Deal.findOne({ _id: req.params.id, user: req.user.id })
            .populate('client')
            .populate('partner')
            .populate('invoices')
            .populate('expenses');

        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        res.status(200).json({
            success: true,
            data: deal
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create new deal
// @route   POST /api/v1/deals
// @access  Private
exports.createDeal = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        const deal = await Deal.create(req.body);

        // Update Client total deals count
        await Client.findByIdAndUpdate(req.body.client, {
            $inc: { totalDeals: 1 }
        });

        // Update Partner total deals count if applicable
        if (req.body.partner) {
            await Partner.findByIdAndUpdate(req.body.partner, {
                $inc: { totalDeals: 1 }
            });
        }

        res.status(201).json({
            success: true,
            data: deal
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update deal
// @route   PUT /api/v1/deals/:id
// @access  Private
exports.updateDeal = async (req, res, next) => {
    try {
        let deal = await Deal.findOne({ _id: req.params.id, user: req.user.id });

        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: deal
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete deal
// @route   DELETE /api/v1/deals/:id
// @access  Private
exports.deleteDeal = async (req, res, next) => {
    try {
        const deal = await Deal.findOne({ _id: req.params.id, user: req.user.id });

        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        await deal.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
