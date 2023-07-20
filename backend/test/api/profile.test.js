const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const { LocalStorage } = require('node-localstorage');

chai.use(chaiHttp);
let token, user_id = "648da51b910e6c1f58c7799a";
let new_pass = Math.random() + "";
localStorage = new LocalStorage('./scratch');

describe("PROFILE TESTS", () => {
    before('Take a token', (done) => {
        chai.request(server)
            .post('/signin')
            .send({ email: "Test User Email", password: "Test User Password" })
            .end((err, res) => {
               if(err){

               }

               res.should.have.status(200);
               res.body.should.have.property('token');
               res.body.should.have.property('message');
               res.body.should.have.property('code').equal(200);
               token = res.body.token;
               done();
            });
    });

    it("GET /api/profile/:user_id", done => {
       chai.request(server)
           .get(`/api/profile/${user_id}`)
           .set('x-access-token', token)
           .end((err, res) => {
               if(err){
                   throw err;
               }

               res.should.have.status(200);
               res.body.should.have.property('name');
               res.body.should.have.property('surname');
               res.body.should.have.property('email');
               res.body.should.have.property('last_login');
               res.body.should.have.property('created_at');
               res.body.should.have.property('role');
               done();
           })
    });

    it("PUT /api/profile/:user_id/change-password", done => {
       chai.request(server)
           .put(`/api/profile/${user_id}/change-password`)
           .set('x-access-token', token)
           .send({
               old_pass: localStorage.getItem('old_password'),
               new_pass: new_pass,
               confirm_pass: new_pass
           }).end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('data');
                res.body.should.have.property('data').have.property('_id');
                res.body.should.have.property('data').have.property('name');
                res.body.should.have.property('data').have.property('surname');
                localStorage.setItem('old_password', new_pass);
                done();
           });
    });

    it("PUT /api/profile/:user_id/change-account-information", done => {
        chai.request(server)
            .put(`/api/profile/${user_id}/change-account-information`)
            .set('x-access-token', token)
            .send({
                name: "Test User Name Updated",
                surname: "Test User Surname Updated",
                email: "Test User Email Updated"
            }).end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('data');
                res.body.should.have.property('data').have.property('_id');
                res.body.should.have.property('data').have.property('name');
                res.body.should.have.property('data').have.property('surname');
                done();
            });
    });

    it("DELETE /api/profile/:user_id", (done) => {
         chai.request(server)
             .delete(`/api/profile/${user_id}`)
             .set('x-access-token', token)
             .end((err, res) => {
                 if(err){
                     throw err;
                 }

                 res.should.have.status(200);
                 res.body.should.have.property('message');
                 res.body.should.have.property('code').equal(200);
                 done();
             });
    });
});
