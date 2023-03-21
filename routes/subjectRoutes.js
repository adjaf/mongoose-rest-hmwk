const router = require('express').Router();
const subjectController = require('../controllers/subjectController');

router.post('', subjectController.createSubject);
router.get('', subjectController.getAll);
router.get('/search/:name', subjectController.getByName);
router.post('/assign-teacher/:id', subjectController.assignTeacher);
router.get('/:id', subjectController.getOne);
router.patch('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);


module.exports = router;
