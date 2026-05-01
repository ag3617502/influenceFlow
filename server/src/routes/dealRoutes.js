const express = require('express');
const {
    getDeals,
    getDeal,
    createDeal,
    updateDeal,
    deleteDeal
} = require('../controllers/dealController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router
    .route('/')
    .get(getDeals)
    .post(createDeal);

router
    .route('/:id')
    .get(getDeal)
    .put(updateDeal)
    .delete(deleteDeal);

module.exports = router;
