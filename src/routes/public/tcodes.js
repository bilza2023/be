const express = require('express');
const { Tcode } = require('../../../mongo/models');
const { respondOk, respondNotFound, respondError } = require('../../utils/restUtils');

const router = express.Router();

// GET /tcodes/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Tcode.findById(req.params.id);
    if (!item) {
      return respondNotFound(res, `Tcode not found: ${req.params.id}`);
    }
    respondOk(res, item);
  } catch (err) {
    respondError(res, err);
  }
});

module.exports = router;
