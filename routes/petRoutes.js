const router = require('express').Router();
const petController = require('../controllers/petController');

router.get('/', petController.getAll);
router.get('/julianEndpoint', petController.julianEndpoint);
router.get('/searchPets', petController.searchPetsByName);
router.get('/:id', petController.findOne);
router.post('/', petController.createPet);
router.patch('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;