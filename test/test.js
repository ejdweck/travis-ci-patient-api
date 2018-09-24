import chai from 'chai';
import server from '../index';
import chaiHttp from 'chai-http';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

describe('GET /patients/1 ', () => {
    it('As paginated list, sorted lexically by last_name, ascending, limited to 10 results per page, should return row id 1zsjhd0d as the first result of the second page.', (done) => {
        chai.request(server)
            .get('/patients/2')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                expect(res.body.docs[0]).to.have.property('id').with.lengthOf(8).to.equal('1zsjhd0d');
                done()
            });
    });
});

/*{
    "_id": "5ba68657643554066dbc096e",
    "id": "sani7sg5",
    "first_name": "Bria",
    "middle_name": "Santiago",
    "last_name": "Emard",
    "email": "Elda.Beer83@gmail.com",
    "dob": "1993-11-03",
    "gender": "male",
    "status": "inactive",
    "terms_accepted": 1,
    "terms_accepted_at": "2017-07-05T08:45:00.249Z",
    "address_street": "80103 Jakubowski Prairie",
    "address_city": "Haileeburgh",
    "address_state": "Illinois",
    "address_zip": "37988-7281",
    "phone": "275.160.5924 x78685"
} */
describe('GET /patient/sani7sg5', (done) => {
    it('Reads a correct record when supplied with an id. Should return Bria Santiagos information based on the id supplied', (done) => {
        chai.request(server)
            .get('/patient/sani7sg5')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array');
                expect(res.body[0]).to.have.property('id').to.equal("sani7sg5")
                expect(res.body[0]).to.have.property('first_name').to.equal("Bria")
                expect(res.body[0]).to.have.property('middle_name').to.equal("Santiago")
                expect(res.body[0]).to.have.property('last_name').to.equal("Emard")
                expect(res.body[0]).to.have.property('email').to.equal("Elda.Beer83@gmail.com")
                expect(res.body[0]).to.have.property('dob').to.equal("1993-11-03")
                expect(res.body[0]).to.have.property('gender').to.equal("male")
                expect(res.body[0]).to.have.property('status').to.equal("inactive")
                expect(res.body[0]).to.have.property('terms_accepted').to.equal(1)
                expect(res.body[0]).to.have.property('terms_accepted_at').to.equal("2017-07-05T08:45:00.249Z")
                expect(res.body[0]).to.have.property('address_street').to.equal("80103 Jakubowski Prairie")
                expect(res.body[0]).to.have.property('address_city').to.equal("Haileeburgh")
                expect(res.body[0]).to.have.property('address_state').to.equal("Illinois")
                expect(res.body[0]).to.have.property('address_zip').to.equal("37988-7281")
                expect(res.body[0]).to.have.property('phone').to.equal("275.160.5924 x78685")
                done()
            });
    });
});

/*{
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
}*/
describe('GET /patient/pdihevds', (done) => {
    it('Reads a correct record when supplied with an id. Should return Rasheed Haucks information based on the id supplied', (done) => {
        chai.request(server)
            .get('/patient/pdihevds')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array');
                expect(res.body[0]).to.have.property('id').to.equal("pdihevds")
                expect(res.body[0]).to.have.property('first_name').to.equal("Rasheed")
                expect(res.body[0]).to.have.property('middle_name').to.equal("Kaitlin")
                expect(res.body[0]).to.have.property('last_name').to.equal("Hauck")
                expect(res.body[0]).to.have.property('email').to.equal("Wilfred.Bahringer14@hotmail.com")
                expect(res.body[0]).to.have.property('dob').to.equal("1964-08-17")
                expect(res.body[0]).to.have.property('gender').to.equal("male")
                expect(res.body[0]).to.have.property('status').to.equal("active")
                expect(res.body[0]).to.have.property('terms_accepted').to.equal(1)
                expect(res.body[0]).to.have.property('terms_accepted_at').to.equal("2018-01-25T12:54:28.437Z")
                expect(res.body[0]).to.have.property('address_street').to.equal("6970 Schiller Key")
                expect(res.body[0]).to.have.property('address_city').to.equal("Lake Romaine")
                expect(res.body[0]).to.have.property('address_state').to.equal("Kentucky")
                expect(res.body[0]).to.have.property('address_zip').to.equal("04803-5823")
                expect(res.body[0]).to.have.property('phone').to.equal("(873) 641-8319 x277")
                done()
            });
    });
});

describe('POST /addPatient', (done) => {
    it('Creates a new patient record', (done) => {
        chai.request(server)
            .post('/addPatient')
            .set('Content-Type', 'application/json')
            .send({"id": "ejd12345"})
            .send({"first_name": "Evan"})
            .send({"middle_name": "Jordan"})
            .send({"last_name": "Dweck"})
            .send({"email": "dweck@wisc.edu"})
            .send({"dob": "1006-02-28"})
            .send({"gender": "male"})
            .send({"status": "active"})
            .send({"terms_accepted": "1"})
            .send({"terms_accepted_at": "2018-01-25T12:54:28.437Z"})
            .send({"address_street": "19 Cooper Road"})
            .send({"address_city": "Scarsdale"})
            .send({"address_state": "New York"})
            .send({"address_zip": "10583"})
            .send({"phone": "(917) 288 0902"})
            .end((err, res) => {
                res.should.have.status(201)
                done()
            });
    });
});

// update evan record with a valid email and birthdate
describe('PATCH /patient/ejd12345', (done) => {
    it('modifies a patient record by ID, changing the email, dob (age calculated by the server)', (done) => {
        chai.request(server)
            .patch('/patient/ejd12345')
            .set('Content-Type', 'application/json')
            .send({"email": "evanjordandweck@gmail.com"})
            .send({"dob": "1990-02-12"})
            .end((err, res) => {
                res.should.have.status(200)
                done()
            });
    });
});

// update the evan record with an INVALID dob
describe('PATCH /patient/ejd12345', (done) => {
    it('modifies a patient record by ID, trying to change the dob to an invalid date "watermelon7"', (done) => {
        chai.request(server)
            .patch('/patient/ejd12345')
            .set('Content-Type', 'application/json')
            .send({"dob": "apple"})
            .end((err, res) => {
                res.should.have.status(400)
                done()
            });
    });
});

// update the evan record with another INVALID dob
describe('PATCH /patient/ejd12345', (done) => {
    it('modifies a patient record by ID, trying to change the dob to an invalid date "9120-0912-12"', (done) => {
        chai.request(server)
            .patch('/patient/ejd12345')
            .set('Content-Type', 'application/json')
            .send({"dob": "9120-0912-12"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// delete evan record
describe('DELETE /patient/ejd12345', (done) => {
    it('Deletes a patient record by ID', (done) => {
        chai.request(server)
            .delete('/patient/ejd12345')
            .end((err, res) => {
                res.should.have.status(202);
                done()
            });
    });
});

// ensure no patients are less than 8 years old
describe('GET /allPatients', (done) => {
    it('Checks to ensure every patient is at least 8 years old', (done) => {
        chai.request(server)
            .get('/allPatients')
            .end((err, res) => {
                res.should.have.status(200);
                const people = res.body;
                let i = 0;
                for (i = 0; i < people.length; i++) {
                    const birthDate = new Date(people[i].dob)
                    const today = new Date()
                    let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
                    expect(age).to.be.at.least(8)
                }
                done();
            });
    });
});
