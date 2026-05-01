require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        logger.error("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error("MONGO db connection failed !!! ", err);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
});
