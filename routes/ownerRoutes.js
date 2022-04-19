const router = require('express').Router();
const ownerController = require('../controllers/ownerController');

router.get('/', ownerController.getAll);
router.get('/marioEndpoint', ownerController.marioEndpoint);
router.get('/:id', ownerController.findOne);
router.post('/', ownerController.createOwner);
router.patch('/:id', ownerController.updateOwner);
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;