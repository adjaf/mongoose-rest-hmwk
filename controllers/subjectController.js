const mongoose = require('mongoose');
const SubjectModel = mongoose.model('Subject');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function (req, res) {
    // TODO: get all subjects
    SubjectModel.find()
        .then((subjects) => {
            return res.send(subjects);
        })
        .catch(err => {
            return res.status(400).send(err);
        })
}

exports.getOne = async function (req, res) {
    const id = req.params.id;
    // TODO: get one subject with their teachers and students
    try {
        const subject = await SubjectModel.findById(id).populate('teachers', 'students');

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

    SubjectModel.create(body, function (err, subject) {
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

exports.deleteSubject = async function (req, res) {
    // TODO: Delete subject, if it has students, it can't be deleted
    const id = req.params.id;
    const subject = await SubjectModel.findById(id);
    if(subject.students.length === 0){
        return res.send({err: "The subject has students enrolled so it cannot be deleted"});
    }
    StudentModel.findByIdAndDelete(id, function(err, student) {
        if (err) {
            return res.send({ err });
        }

        return res.status(204).send();
    })
}

exports.getByName = async function (req, res) {
    // TODO: search subject by name
    const search = req.params.search;

    if (!search) {
        let subject = await SubjectModel.find();

        return res.send(subject);
    }

    try {
        const subject = await SubjectModel.find({
            name: { '$regex': search, '$options': 'i' }
        });

        if (!subject) {
            return res.status(404).send({ err: "Student not found" });
        }

        return res.send(subject);
    } catch (error) {
        return res.status(400).send({ error });
    }
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