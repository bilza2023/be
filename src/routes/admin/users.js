const express = require('express');
const { User } = require('../../../mongo/models');
const {
  parseFilters,
  respondOk,
  respondError
} = require('../../utils/restUtils');

const router = express.Router();

// GET /admin/users
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await User.find(filters);
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

module.exports = router;
