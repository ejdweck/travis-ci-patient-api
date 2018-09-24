import mongoose from 'mongoose';
import { PersonSchema } from '../models/personModel';
// using require instead of import
// is there a way to use import with helper functions
import {isValidDate, getPatientAge } from '../helpers/helperMethods';

const Person = mongoose.model('Person', PersonSchema, 'person');

export const addPatient = (req, res) => {
    const dob = req.body.dob;
    // check dob is valid
    if (isValidDate(dob) == false) {
        return res.status(400).send('patient to be added sent with a bad date')
    }
    // check that the patient is 8 or older
    const patientAge = getPatientAge(dob)
    if (patientAge < 8) {
        return res.status(400).send('patient cannot be younger than 8 years old')
    }
    // create the patient record
    const newPatient = new Person(req.body);
    newPatient.save((err, person) => {
        if (err) {
            return res.send(err);
        }
        return res.status(201).json(person);
    });
};

export const getAllPatients = (req, res) => {
    Person.find({}, (err, patients) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).send(patients)
    });
};

export const getPatients = (req, res) => {
    Person.paginate({}, { page: req.params.pageNo, limit: 10, sort: { last_name: 'asc' }}, (err, result) => {
        if (err) {
          return res.send(err);
        }
        return res.json(result)
    });
};

export const getPatientWithId = (req, res) => {
    // find the person by their patient ID
    Person.find({id: req.params.patientId}, (err, person) => {
        if (err) {
            res.send(err);
        }
        return res.status(200).send(person);
    });
}

export const updatePatient = (req, res) => {
    // TODO? if a coworker sends bad body data, do nothing and don't update record?
    const patientId = req.params.patientId;

    // check if date is valid date to be updated
    const dob = req.body.dob;
    if (dob != null) {
        const valid = isValidDate(dob);
        if (valid == false) {
            return res.status(400).send('BADDATE in the update request - date not a valid date')
        }
        const age = getPatientAge(dob);
        if (age < 8) {
            return res.status(400).send('BADDATE in the update request - patient is younger than 8 and should be deleted from the database')
        }
    }

    Person.findOneAndUpdate({ id: req.params.patientId}, req.body, { new: true }, (err, patient) => {
        if (err) {
            return res.send(err);
        }
        // check to make sure person is found via their patientId
        if ((Array.isArray(patient) && patient.length == 0) || patient == null) {
            return res.status(400).send('patient to be deleted not found with the patientId provided in the request')
        } else {
            return res.status(200).send({message: 'Success, updated patient record', patientId: patientId });
        }
    });
}

export const deletePatient = (req, res) => {
    // keep patientId so if successfully deleted, can send patientId in response
    const id = req.params.patientId;
    Person.findOneAndRemove({ id: req.params.patientId }, (err, patient) => {
        if (err) {
            return res.send(err);
        }
        // check to make sure person is found via their patientId
        if ((Array.isArray(patient) && patient.length == 0) || patient == null) {
            return res.status(400).send('patient to be deleted not found with the patientId provided in the request')
        } else {
            return res.status(202).send({ message: 'Success! deleted patient', patientId: id });
        }
    });
}

export const getPatientAgeWithId = (req, res) => {
    const patientId = req.params.patientId;
    Person.find({id: req.params.patientId}, (err, patient) => {
        if(err) {
            return res.send(err)
        }
        console.log(patient)
        // check to make sure person is found via their patientId
        if (Array.isArray(patient) && patient.length == 0) {
            return res.status(400).send('person not found with the patientId provided in the request')
        } else {
            // check dob is valid
            const validDob = isValidDate(patient.dob)
            const age = getPatientAge(patient.dob)
            if (validDob == false) {
              // this should only happen if there was an invalid record that prexisted
              // in the database as we check for valid date strings when adding
              // new patient records in this API
              return res.status(500).send('Database record indicates invalid birthdate')
            } else {
              // send the patients age
              return res.status(200).send({ patientId: patientId, age: age })
            }
        }
    });
}
