const Partner = require('../models/partnerModel');

// @desc    Get all partners
exports.getPartners = async (req, res) => {
    try {
        const partners = await Partner.find({ user: req.user.id });
        res.status(200).json({ success: true, count: partners.length, data: partners });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create partner
exports.createPartner = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const partner = await Partner.create(req.body);
        res.status(201).json({ success: true, data: partner });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single partner
exports.getPartner = async (req, res) => {
    try {
        const partner = await Partner.findOne({ _id: req.params.id, user: req.user.id });
        if (!partner) return res.status(404).json({ success: false, error: 'Partner not found' });
        res.status(200).json({ success: true, data: partner });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
