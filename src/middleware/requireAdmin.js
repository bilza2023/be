
// src/middleware/requireAdmin.js

function requireAdmin(req, res, next) {
    const adminSecret = req.headers['x-admin-secret'];
  
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized: invalid admin secret' });
    }
  
    next();
  }
  
  module.exports = requireAdmin;
  