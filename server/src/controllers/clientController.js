const Client = require('../models/clientModel');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');

// @desc    Create new client
// @route   POST /api/v1/clients
// @access  Private
const createClient = asyncHandler(async (req, res) => {
    const { name, email, industry, website, location, avatar, contactPerson, phone, notes } = req.body;

    if (!name || !email || !industry) {
        throw new ApiError(400, "Name, email and industry are required");
    }

    const client = await Client.create({
        name,
        email,
        industry,
        website,
        location,
        avatar,
        contactPerson,
        phone,
        notes,
        user: req.user._id
    });

    logger.info(`Client created: ${client.name} by user ${req.user.email}`);

    return res.status(201).json(
        new ApiResponse(201, client, "Client created successfully")
    );
});

// @desc    Get all clients for user
// @route   GET /api/v1/clients
// @access  Private
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, clients, "Clients fetched successfully")
    );
});

// @desc    Get single client
// @route   GET /api/v1/clients/:id
// @access  Private
const getClientById = asyncHandler(async (req, res) => {
    const client = await Client.findOne({ _id: req.params.id, user: req.user._id });

    if (!client) {
        throw new ApiError(404, "Client not found");
    }

    return res.status(200).json(
        new ApiResponse(200, client, "Client fetched successfully")
    );
});

// @desc    Update client
// @route   PATCH /api/v1/clients/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!client) {
        throw new ApiError(404, "Client not found");
    }

    logger.info(`Client updated: ${client.name}`);

    return res.status(200).json(
        new ApiResponse(200, client, "Client updated successfully")
    );
});

// @desc    Delete client
// @route   DELETE /api/v1/clients/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!client) {
        throw new ApiError(404, "Client not found");
    }

    logger.info(`Client deleted: ${client.name}`);

    return res.status(200).json(
        new ApiResponse(200, {}, "Client deleted successfully")
    );
});

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
};
