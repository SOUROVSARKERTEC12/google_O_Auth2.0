import User from '../models/User.js';

export const findOrCreateUser = async (profile, tokens) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    });

    if (!created) {
      await user.update({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
    }

    return user;
  } catch (error) {
    throw new Error(`Error in findOrCreateUser: ${error.message}`);
  }
};

