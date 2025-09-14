const { User } = require('../models');
const { hashPassword, verifyPassword, signJwt } = require('../utils/auth');

/**
 * PUBLIC_INTERFACE
 * login
 * Admin login endpoint; issues JWT on success.
 */
async function login(req, res) {
  /** This is a public function. */
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
    let user = await User.findOne({ email }).lean();
    // If no user exists in DB at all, bootstrap an admin user from env for first login
    const usersCount = await User.countDocuments();
    if (!user && usersCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (email === adminEmail && password === adminPassword) {
        const created = await User.create({
          email: adminEmail,
          passwordHash: hashPassword(adminPassword),
          role: 'admin',
          name: 'Administrator',
        });
        user = created.toObject();
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userDoc = await User.findById(user._id);
    const valid = verifyPassword(password, userDoc.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signJwt({ id: userDoc._id.toString(), email: userDoc.email, role: userDoc.role });
    return res.json({ token, user: { id: userDoc._id, email: userDoc.email, role: userDoc.role, name: userDoc.name } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * me
 * Returns current user info from JWT.
 */
async function me(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.user || {};
    if (!id) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(id).select('-passwordHash').lean();
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  login,
  me,
};
