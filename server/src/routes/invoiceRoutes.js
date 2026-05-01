const express = require('express');
const { getInvoices, createInvoice, updateInvoice } = require('../controllers/invoiceController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').put(updateInvoice);

module.exports = router;
