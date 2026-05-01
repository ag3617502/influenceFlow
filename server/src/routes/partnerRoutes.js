const express = require('express');
const { getPartners, createPartner, getPartner } = require('../controllers/partnerController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getPartners).post(createPartner);
router.route('/:id').get(getPartner);

module.exports = router;
