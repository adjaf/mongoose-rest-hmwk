const mongoose = require('mongoose');

const TeacherModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ]
});

mongoose.model('Teacher', TeacherModel);