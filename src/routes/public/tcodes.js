import express from 'express';
import { Tcode } from '../../../mongo/models.js';
import { respondOk, respondNotFound, respondError } from '../../utils/restUtils.js';

const router = express.Router();

// GET /tcodes/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Tcode.findById(req.params.id);
    if (!item) return respondNotFound(res);
    respondOk(res, item);
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
