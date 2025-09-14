const { verifyJwt } = require('../utils/auth');

/**
 * PUBLIC_INTERFACE
 * requireAuth
 * Express middleware to validate JWT and attach user to request.
 */
function requireAuth(req, res, next) {
  /** This is a public function. */
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const payload = verifyJwt(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

/**
 * PUBLIC_INTERFACE
 * requireAdmin
 * Express middleware to ensure user is admin.
 */
function requireAdmin(req, res, next) {
  /** This is a public function. */
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};
