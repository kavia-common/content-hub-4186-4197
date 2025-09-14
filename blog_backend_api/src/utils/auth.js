const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * PUBLIC_INTERFACE
 * hashPassword
 * Hash a plaintext password.
 */
function hashPassword(password) {
  /** This is a public function. */
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * PUBLIC_INTERFACE
 * verifyPassword
 * Verify a plaintext password against a hash.
 */
function verifyPassword(password, hash) {
  /** This is a public function. */
  return bcrypt.compareSync(password, hash);
}

/**
 * PUBLIC_INTERFACE
 * signJwt
 * Sign a JWT with user payload.
 */
function signJwt(payload, options = {}) {
  /** This is a public function. */
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.sign(payload, secret, { expiresIn, ...options });
}

/**
 * PUBLIC_INTERFACE
 * verifyJwt
 * Verify a JWT token string and return payload.
 */
function verifyJwt(token) {
  /** This is a public function. */
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.verify(token, secret);
}

module.exports = {
  hashPassword,
  verifyPassword,
  signJwt,
  verifyJwt,
};
