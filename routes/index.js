const router = require('express').Router();
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoutes');
const subjectRoutes = require('./subjectRoutes');
const teacherRoutes = require('./teacherRoutes');

router.use('/auth', userRoutes);
router.use('/students', studentRoutes);
router.use('/subjects', subjectRoutes);
router.use('/teachers', teacherRoutes);

module.exports = router;