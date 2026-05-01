const Invoice = require('../models/invoiceModel');
const Deal = require('../models/dealModel');

// @desc    Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id })
            .populate('deal', 'title')
            .populate('client', 'name');
        res.status(200).json({ success: true, count: invoices.length, data: invoices });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create invoice
exports.createInvoice = async (req, res) => {
    try {
        req.body.user = req.user.id;
        
        // Ensure deal belongs to user
        const deal = await Deal.findOne({ _id: req.body.deal, user: req.user.id });
        if (!deal) return res.status(404).json({ success: false, error: 'Deal not found' });

        const invoice = await Invoice.create(req.body);
        res.status(201).json({ success: true, data: invoice });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update invoice status
exports.updateInvoice = async (req, res) => {
    try {
        let invoice = await Invoice.findOne({ _id: req.params.id, user: req.user.id });
        if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });

        invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: invoice });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
