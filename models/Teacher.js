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

// TODO: crear un metodo virtual fullName que devuelva first_name + last_name

mongoose.model('Teacher', TeacherModel);