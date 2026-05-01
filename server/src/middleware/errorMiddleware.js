const { ApiError } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    logger.error(`${req.method} ${req.url} - ${error.message}`);
    
    return res.status(error.statusCode).json(response);
};

const routeNotFound = (req, res, next) => {
    const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
    next(error);
};

module.exports = { errorHandler, routeNotFound };
