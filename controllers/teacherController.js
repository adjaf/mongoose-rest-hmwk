const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');
const SubjectModel = mongoose.model('Subject');

exports.getAll = function(req, res) {
    // TODO: Get all teachers
    TeacherModel.find().then((teacher) => {
        return res.send(teacher);
    })
    .catch(err => {
        return res.status(400).send(err)
    })
}

exports.getOne = async function(req, res) {
    const id = req.params.id;
    
    // TODO: Get one teacher with its subjects (I should display subject's name)
    try{
        const teacher = await TeacherModel.findById(id);
        if(!teacher){
            return res.status(404).send({ err: "Teacher not foud" });
        }
        return res.send(teacher);
    }catch(error){
        return res.status(400),send({ error });
    }
}

exports.createTeacher = function(req, res) {
    const body = req.body;

    // TODO: create teacher

    TeacherModel.create(body, function(err, teacher){
        if(!teacher){
            return res.status(422).send({ "error": true });
        }
        if(err){
            return res.status(400).send({ "error": true });
        }
        return res.send(teacher);
    });
}

exports.updateTeacher = function(req, res) {
    const id = req.params.id;
    const body = req.body;

    // TODO: Update teacher
    TeacherModel.findByIdAndUpdate(id, body, { new: true }, function(err, teacher){
        if(!teacher){
            return res.status(404).send({ err: "Teacher not found" });
        }
        if(err){
            return res.send({ err });

        }
        return res.send(teacher);
    })
}

exports.deleteTeacher = async function(req, res) {
    const id = req.params.id;
    const teacher = await TeacherModel.findById(id);
    // TODO: Delete teacher, if it has subjects it shouldn't be deleted
    if(teacher.subjects.length !== 0){
        return res.send({ err: "Can't delete teacher"});
    }
    else{
        TeacherModel.findByIdAndDelete(id, function(err, teacher){
            if(err){
                return res.send({ err });
            }
            return res.send("Deleted teacher");
        });
    }
}

exports.assignSubject = async function(req, res) {
    const id = req.params.id;
    const subjectId = req.body.subjectId;

    // TODO: Assign subject to teacher
    try{
        const teacher = await TeacherModel.findById(id);

        if(!teacher){
            return res.status(404).send({ err: "Teacher not found" });
        }
        if(!subjectId){
            return res.status(422).send({ err: "Please send a Subject"});
    }
    const subject = await SubjectModel.findById(subjectId);

    teacher.subject = subjectId;
    subject.teacher = await teacher.save();

    return res.send(updateTeacher);
    }
catch(error){
    return res.status(400).send({ error });
    }
}