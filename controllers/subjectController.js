const mongoose = require('mongoose');
const SubjectModel = mongoose.model('Subject');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function (req, res) {
    // TODO: get all subjects
    SubjectModel.find()
        .then((subjects)=>{
            return res.send(subjects);
        })
        .catch(err=>{
            res.status(400).send(err);
        })
}

exports.getOne = async function (req, res) {
    // TODO: get one subject with their teachers and students
    try {
        const subject = await StudentModel.findById(id).populate('subjects', 'teachers');

        if (!subject) {
            return res.status(404).send({ err: "Subject not found" });
        }

        return res.send(subject);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.createSubject = function (req, res) {
    // TODO: Create subject
    const body = req.body;

    StudentModel.create(body, function(err, subject) {
        if (!subject) {
            return res.status(422).send({ "error": true });
        }
        if (err) {
            return res.status(400).send({ "error": true });
        }
        return res.send(subject);
    });
}

exports.updateSubject = function (req, res) {
    // TODO: update subject
    const id = req.params.id;
    const body = req.body;

    SubjectModel.findByIdAndUpdate(id, body, { new: true }, function (err, subject) {
        if (!subject) {
            return res.status(404).send({ err: "Subject not found " });
        }

        if (err) {
            return res.send({ err });
        }

        return res.send(subject);
    })
}

exports.deleteSubject = function (req, res) {
    // TODO: Delete subject, if it has students, it can't be deleted
    const id = req.params.id;

    StudentModel.findByIdAndDelete(id, function(err, student) {
        if (err) {
            return res.send({ err });
        }

        return res.status(204).send();
    })
}

exports.getByName = async function (req, res) {
    // TODO: search subject by name
    const name = req
    const subject = SubjectModel.findOne(n)
}

exports.assignTeacher = async function (req, res) {
    const teacherId = req.body.teacherId;
    const id = req.params.id;

    // TODO: assign teacher to the subject, if it has a teacher, replace it

    try {
        const subject = await SubjectModel.findById(id);

        if (!subject) {
            return res.status(404).send({ err: "Subject not found" });
        }

        if (!teacherId) {
            return res.status(422).send({ err: "Please send teacher" });
        }

        const teacher = await TeacherModel.findById(teacherId);

        subject.teacher.push(teacherId);
        teacher.student.push(id);

        await teacher.save();
        const updatedSubject = await subject.save();

        return res.send(updatedSubject);
    } catch (error) {
        return res.status(400).send({ error });
    }
}