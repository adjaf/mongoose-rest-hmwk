const mongoose = require('mongoose');
const SubjectModel = mongoose.model('Subject');

exports.getAll = function(req, res) {
    // TODO: get all subjects
}

exports.getOne = function(req, res) {
    // TODO: get one subject with their teachers and students
}

exports.createSubject = function(req, res) {
    // TODO: Create subject
}

exports.updateSubject = function(req, res) {
    // TODO: update subject
}

exports.deleteSubject = function(req, res) {
    // TODO: Delete subject, if it has students, it can't be deleted
}

exports.getByName = function(req, res) {
    // TODO: search subject by name
}

exports.assignTeacher = function(req, res) {
    const teacherId = req.body.teacherId;
    const id = req.params.id;

    // TODO: assign teacher to the subject, if it has a teacher, replace it
}