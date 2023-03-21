const mongoose = require('mongoose');

const SubjectModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

// TODO: Crear metodo virtual "formattedHours", que devuelva "${hours} hours."

mongoose.model('Subject', SubjectModel);
