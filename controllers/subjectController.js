const mongoose = require('mongoose');
const SubjectModel = mongoose.model('Subject');

exports.getAll = function(req, res) {
    // TODO: get all subjects
    SubjectModel.find()
        .then((subjects) => {
            return res.send(subjects);
        })
        .catch(err => {
            return res.status(400).send(err);
        })
}

exports.getOne = async function(req, res) {
    // TODO: get one subject with their teachers and students
    const id = req.params.id;
    try {
        const subject = await SubjectModel.findById(id);
        if (!subject) {
            return res.status(404).send({ err: "Subject not found" });
        }
        return res.status(200).json({
            subject: subject.name,
            data: {
                teachers: subject.teacher,
                students: subject.students
            }
        })
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.createSubject = function(req, res) {
    // TODO: Create subject
    const body = req.body;
    SubjectModel.create(body, function(err, subject) {
        if (!subject) {
            return res.status(422).send({ "error": true });
        }
        if (err) {
            return res.status(400).send({ "error": true });
        }
        return res.send(subject);
    });
}

exports.updateSubject = function(req, res) {
    // TODO: update subject
    const id = req.params.id;
    const body = req.body;

    SubjectModel.findByIdAndUpdate(id, body,{ new: true }, function(err, subject) {
        if (!subject) {
            return res.status(404).send({ err: "Subject not found"});
        }
        if (err) {
            return res.send({ err });
        }
        return res.send(subject);
    })
}

exports.deleteSubject = function(req, res) {
    // TODO: Delete subject, if it has students, it can't be deleted
    const id = req.params.id;

    SubjectModel.findByIdAndDelete(id, function(err, subject) {
        if (err) {
            return res.send({ err });
        }
        return res.status(204).send().json({message: 'Subject deleted successfully'});
    })
}

exports.getByName = async function(req, res) {
    // TODO: search subject by name
    const search = req.params.search;
    if (!search) {
        let subjects = await SubjectModel.find();
        return res.send(subjects);
    }

    try {
        const subjects = await SubjectModel.find({
             name: { '$regex': search, '$options': 'i' } 
        });
        
        if (!subjects) {
            return res.status(404).send({ err: "Subject not found" });
        }

        return res.send(subjects);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.assignTeacher = async function(req, res) {
    const teacherId = req.body.teacherId;
    const id = req.params.id;
    // TODO: assign teacher to the subject, if it has a teacher, replace it
    try {
        const subject = await SubjectModel.findById(id);
        
        if (!subject) {
            return res.status(404).send({ err: "Subject not found" });
        }

        if (!teacherId) {
            return res.status(422).send({ err: "Please send a teacher" });
        }

        const teacher = await SubjectModel.findById(teacherId);

        subject.teacher.push(teacherId);
        teacher.subject.push(id);

        await teacher.save();
        const updatedSubject = await subject.save();

        return res.send(updatedSubject);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.withoutStudents = function(req, res) {
    // TODO: devolver materias sin students
    SubjectModel.find({students:[]})
        .then((subjects) => {
            return res.send(subjects);
        })
        .catch(err => {
            return res.status(400).send(err);
        })
}