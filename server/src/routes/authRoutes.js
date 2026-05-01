const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate, registerSchema, loginSchema } = require('../middleware/validatorMiddleware');
const User = require('../models/userModel');
const { ApiResponse } = require('../utils/apiResponse');

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', protect, logoutUser);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
        // Generate tokens for the user
        const accessToken = req.user.generateAccessToken();
        const refreshToken = req.user.generateRefreshToken();

        req.user.refreshToken = refreshToken;
        await req.user.save({ validateBeforeSave: false });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        // Redirect to FE dashboard
        res.redirect(`${process.env.CORS_ORIGIN}/dashboard`);
    }
);

router.get('/me', protect, (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User profile fetched"));
});

module.exports = router;
