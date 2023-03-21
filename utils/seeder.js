const mongoDBConnection = require('./database');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

mongoDBConnection.then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('An error ocurred while connecting to db.', err);
});

require('../models/index');
const Student = mongoose.model('Student');
const Subject = mongoose.model('Subject');
const Teacher = mongoose.model('Teacher');

const genders = ['male', 'female'];
 
async function runSeeder() {
    // Clean database
    await Student.deleteMany();
    await Subject.deleteMany();
    await Teacher.deleteMany();


    console.log('CREATING 10 Subjects....\n');
    // 10 Owners
    for (let i = 0; i < 10; i++) {
        const newSubjectData = {
            name: faker.random.words(2),
            hours: faker.datatype.number({ min: 10, max: 30})
        };

        try {
            const fakeSubject = await Subject.create(newSubjectData);
            console.log(fakeSubject);
        } catch (error) {
            console.log('something ocurred');
        }
    }

    // Get all Owners to use their id;
    const allSubjects = await Subject.find();
    const careers = ['IBQ', 'TICS', 'ISC', 'IND', 'IGE', 'MEC'];

    console.log('CREATING 10 STUDENTS WITH SUBJECTS....\n');
    // 10 students with 2 courses
    for (let i = 0; i < 10; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomSubjectIndex = faker.datatype.number({ min: 0, max: 9 });
        let randomSubjectIndex2 = faker.datatype.number({ min: 0, max: 9 });
        const randomStudentId = faker.random.alphaNumeric(6).toUpperCase();

        /** Do random again if repeated course */
        while (randomSubjectIndex2 == randomSubjectIndex) {
            randomSubjectIndex2 = faker.datatype.number({ min: 0, max: 9 });
        } 
    
        const newStudentData = {
            first_name: faker.name.firstName(randomGender),
            last_name: faker.name.lastName(),
            career: faker.helpers.arrayElement(careers),
            student_id: randomStudentId,
            subjects: [
                allSubjects[randomSubjectIndex]._id, // Subject 1 Id
                allSubjects[randomSubjectIndex2]._id // Subject 2 Id
            ]
        };

        newStudentData.email = faker.internet.email(newStudentData.first_name, newStudentData.last_name);

        try {
            // Create new student
            const newStudent = await Student.create(newStudentData);

            console.log(newStudent);
            // Add student id to course's students array
            allSubjects[randomSubjectIndex].students.push(newStudent);
            allSubjects[randomSubjectIndex2].students.push(newStudent);
            await allSubjects[randomSubjectIndex].save();
            await allSubjects[randomSubjectIndex2].save();
        } catch (error) {
            console.log(error);
        }
    }


    console.log('CREATING 10 TEACHERS....');
    // 10 teachers with 1 Subject
    for (let i = 0; i < 10; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomSubjectIndex = faker.datatype.number({ min: 0, max: 9 });

        let newTeacherData = {
            first_name: faker.name.firstName(randomGender),
            last_name: faker.name.lastName(),
            subjects: [
                allSubjects[randomSubjectIndex]._id
            ]
        };

        newTeacherData.email = faker.internet.email(newTeacherData.first_name, newTeacherData.last_name);

        try {
            const newTeacher = await Teacher.create(newTeacherData);

            console.log(newTeacher);

            // Add teacher id to course
            allSubjects[randomSubjectIndex].teacher = newTeacher;
            await allSubjects[randomSubjectIndex].save();
        } catch (error) {
            console.log('something ocurred',error);
        }
    }

    process.exit();
}

runSeeder();