import {
    getAllPatients,
    addPatient,
    getPatients,
    getPatientWithId,
    updatePatient,
    deletePatient,
    getPatientAgeWithId,
} from '../controllers/controller';

const routes = (app) => {
    app.route('/allPatients')
        .get(getAllPatients)

    app.route('/patients/:pageNo')
        .get(getPatients);

    app.route('/addPatient')
        .post(addPatient);

    app.route('/patient/:patientId')
        .get(getPatientWithId)
        .patch(updatePatient)
        .delete(deletePatient);

    app.route('/patient/:patientId/age')
        .get(getPatientAgeWithId)
}

export default routes;
