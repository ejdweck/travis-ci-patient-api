# Patient-API
This project is a NodeJS application that provides CRUD access to a MongoDB database.

### Patient Data
    {
    "_id": "5ba68657643554066dbc0992",
    "id": "pdihevds",
    "first_name": "Rasheed",
    "middle_name": "Kaitlin",
    "last_name": "Hauck",
    "email": "Wilfred.Bahringer14@hotmail.com",
    "dob": "1964-08-17",
    "gender": "male",
    "status": "active",
    "terms_accepted": 1,
    "terms_accepted_at": "2018-01-25T12:54:28.437Z",
    "address_street": "6970 Schiller Key",
    "address_city": "Lake Romaine",
    "address_state": "Kentucky",
    "address_zip": "04803-5823",
    "phone": "(873) 641-8319 x277"
    },

### HTTP requests

To get all patients in the database

    GET /allPatients

To get a paginated lists of patients (10 per page).

    GET /patients/:pageNo

To add a patient.

    POST /addPatient

To get a specific patient by their respective patientId.

    GET /patient/:patientId

To update a patient record by their respective patientId.

    PATCH /patient/:patientId

To delete a patient by their respective patientId.

    DELETE /patient/:patientId

To get a specific patient's birthday by their respective patientId.

    GET /patient/:patientId/age

### Running the Application
#### with docker
Build your docker image

    $ docker build -t patient-api .

Run the docker image

    $ docker run -p 3001:3000 patient-api

Use Postman or curl to call the API at the exposed port 3001

#### with yarn

Install dependancies

    $ yarn install

Start the development server

    $ yarn start

### Testing the Application
To run the test suite, ensure the application isn't already running via yarn start and run

    $ yarn test
