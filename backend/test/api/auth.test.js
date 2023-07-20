const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
chai.use(chaiHttp);

describe("AUTH TESTS",  () => {
    it("POST /signup", (done) => {
        chai.request(server)
            .post('/signup')
            .send({
                name: "Test User Name",
                surname: "Test User Surname",
                email: `Test User Email ${Math.random()}`,
                password: "Test User Password",
                confirm: "Test User Password",
            })
            .end((err, res) => {
                if(err){
                    throw err;
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                done();
            });
    });

    it("POST /signin", (done) => {
         chai.request(server)
             .post('/signin')
             .send({
                 email: "Test User Email",
                 password: "Test User Password"
             }).end((err, res) => {
                 if(err) {
                     throw err;
                 }

                 res.should.have.status(200);
                 res.body.should.have.property('message');
                 res.body.should.have.property('code').equal(200);
                 done();
             });
    });
});