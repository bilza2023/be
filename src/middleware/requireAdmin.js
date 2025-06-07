
// src/middleware/requireAdmin.js
// src/middleware/requireAdmin.js

function requireAdmin(req, res, next) {
  const adminSecret = req.headers['x-admin-secret'];
  const expected = process.env.ADMIN_SECRET;

  // console.log('[ADMIN] Received:', adminSecret);
  // console.log('[ADMIN] Expected:', expected);

  if (!adminSecret || adminSecret !== expected) {
    return res.status(401).json({ error: 'Unauthorized: invalid admin secret' });
  }

  next();
}

module.exports = requireAdmin;
