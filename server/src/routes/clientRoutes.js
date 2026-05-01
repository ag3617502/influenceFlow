const express = require('express');
const { 
    createClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient 
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.route('/')
    .post(createClient)
    .get(getClients);

router.route('/:id')
    .get(getClientById)
    .patch(updateClient)
    .delete(deleteClient);

module.exports = router;
