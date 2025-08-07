const router = require('express').Router();
const {
  createPatient,
  updatePatient,
  deletePatient,
  getPatients
} = require('../controllers/patient.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);
router.post('/', createPatient);
router.get('/', getPatients);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
