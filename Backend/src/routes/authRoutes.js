import express from 'express';
import passport from 'passport';
import { generateToken } from '../services/jwtService.js';
import { googleAuthSuccess, googleAuthFailure, logout, home, handleGoogleCode } from '../controllers/authController.js';

const router = express.Router();

// Google OAuth login route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { 
    session: true,
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    // Send user data to frontend
    const userData = {
      id: req.user.googleId,
      email: req.user.email,
      displayName: req.user.displayName,
      photo: req.user.photo
    };
    const token = generateToken({userData});
    // Redirect to frontend with user data
    // res.redirect(
    //   `${process.env.FRONTEND_URL}/home?user=${encodeURIComponent(JSON.stringify(userData))}`
    // );
    res.redirect(
      `${process.env.FRONTEND_URL}/home?token=${token}`
    );
  }
);

// Handle code-based authentication
router.post('/google/callback', handleGoogleCode);

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.googleId,
        email: req.user.email,
        displayName: req.user.displayName,
        photo: req.user.photo
      }
    });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error during logout',
        error: err.message
      });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

router.get('/failure', googleAuthFailure);
router.get('/home', home);

export default router; 