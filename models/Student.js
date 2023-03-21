const mongoose = require('mongoose');

const StudentModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true,
        enum: ['IBQ', 'TICS', 'ISC', 'IND', 'IGE', 'MEC']
    },
    student_id: {
        type: String,
        length: 6,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject' 
        }   
    ]
});

mongoose.model('Student', StudentModel);