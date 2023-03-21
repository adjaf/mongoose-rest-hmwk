const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');
const SubjectModel = mongoose.model('Subject');

exports.getAll = function(req, res) {
    // TODO: Get all teachers
}

exports.getOne = async function(req, res) {
    const id = req.params.id;
    
    // TODO: Get one teacher with its subjects (I should display subject's name)
}

exports.createTeacher = function(req, res) {
    const body = req.body;

    // TODO: create teacher
}

exports.updateTeacher = function(req, res) {
    const id = req.params.id;
    const body = req.body;

    // TODO: Update teacher
}

exports.deleteTeacher = function(req, res) {
    const id = req.params.id;
    // TODO: Delete teacher, if it has subjects it shouldn't be deleted
}

exports.assignSubject = async function(req, res) {
    const id = req.params.id;
    const subjectId = req.body.subjectId;

    // TODO: Assign subject to teacher 
}

exports.withoutSubjects = async function(req, res) {
    // TODO: devolver teachers que no tengan subjects
}