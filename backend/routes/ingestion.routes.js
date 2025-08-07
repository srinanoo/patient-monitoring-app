const router = require('express').Router();
const { ingest } = require('../controllers/ingestion.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);
router.post('/', ingest);

module.exports = router;
