import { findOrCreateUser } from '../services/authService.js';
import { generateToken } from '../services/jwtService.js';
import passport from 'passport';

export const handleGoogleCode = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }

    // Use passport to authenticate with the code
    passport.authenticate('google', async (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Authentication error',
          error: err.message
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed'
        });
      }

      // Generate JWT token
      const token = generateToken(user);

      // Return success response with token and user data
      res.json({
        success: true,
        message: 'Authentication successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          photo: user.photo
        }
      });
    })(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing Google authentication',
      error: error.message
    });
  }
};

export const googleAuthSuccess = async (req, res) => {
  try {
    if (req.user) {
      // Generate JWT token
      const token = generateToken(req.user);
      
      // Redirect to React app with token
      res.redirect(`${process.env.REACT_APP_URL}?token=${token}`);
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in googleAuthSuccess',
      error: error.message,
    });
  }
};

export const googleAuthFailure = (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed',
  });
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error during logout',
        error: err.message,
      });
    }
    res.redirect(process.env.REACT_APP_URL);
  });
};

export const home = (req, res) => {
  if (req.user) {
    const token = generateToken(req.user);
    res.redirect(`${process.env.REACT_APP_URL}?token=${token}`);
  } else {
    res.redirect('/auth/google');
  }
}; 