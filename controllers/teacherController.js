const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');
const SubjectModel = mongoose.model('Subject');

exports.getAll = async function (req, res) {
    // TODO: Get all teachers
    const teachers = await TeacherModel.find();
    return res.status(200).json({
        message: "This are all the teachers found:",
        data: teachers
    });
}

exports.getOne = async function (req, res) {
    const id = req.params.id;

    // TODO: Get one teacher with its subjects (I should display subject's name)
    try {
        const teacher = await TeacherModel.findById(id).populate('subjects');

        if (!teacher) {
            return res.status(404).send({ err: "Teacher not found" });
        }

        return res.send(teacher);
    } catch (error) {
        return res.status(400).send({ error });
    }
}

exports.createTeacher = function (req, res) {
    const body = req.body;
    // TODO: create teacher
    if (!body || body === '') {
        res.status(400).json({
            message: "The teacher properties cannot be empty"
        });
        return;
    }
   TeacherModel.create(body, function(err, teacher) {
        if (!teacher) {
            return res.status(422).send({ "error": true });
        }

        if (err) {
            return res.status(400).send({ "error": true });
        }

        return res.send(teacher);
    });
}

exports.updateTeacher = function (req, res) {
    const id = req.params.id;
    const body = req.body;

    // TODO: Update teacher

    TeacherModel.findByIdAndUpdate(id, body, { new: true }, function (err, teacher) {
        if (!teacher) {
            return res.status(404).send({ err: "Teacher not found " });
        }

        if (err) {
            return res.send({ err });
        }

        return res.send(teacher);
    })

}

exports.deleteTeacher = async function (req, res) {
    const id = req.params.id;
    // TODO: Delete teacher, if it has subjects it shouldn't be deleted
    const teacher = await TeacherModel.findById(id);
    if(teacher.subjects.length === 0){
        return res.send({err: "The teacher has subjects so it cannot be deleted"});
    }
    TeacherModel.findByIdAndDelete(id, function (err, teacher) {
        if (err) {
            return res.send({ err });
        }

        return res.status(204).send();
    })
}

exports.assignSubject = async function (req, res) {
    const id = req.params.id;
    const subjectId = req.body.subjectId;

    // TODO: Assign subject to teacher 
    try {
        const teacher = await TeacherModel.findById(id);

        if (!teacher) {
            return res.status(404).send({ err: "Teacher not found" });
        }

        if (!subjectId) {
            return res.status(422).send({ err: "Please send subject" });
        }

        const subject = await SubjectModel.findById(subjectId);

        teacher.subjects.push(subjectId);
        subject.teacher.push(id);

        await subject.save();
        const updatedTeacher = await teacher.save();

        return res.send(updatedTeacher);
    } catch (error) {
        return res.status(400).send({ error });
    }
}