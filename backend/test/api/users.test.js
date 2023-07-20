const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, user_id = "648da51b910e6c1f58c7799a";

describe("USERS TESTS", () => {
   before("Take a token", (done) => {
       chai.request(server)
           .post('/signin')
           .send({
               email: "Test User Email",
               password: "Test User Password"
           }).end((err, res) => {
               if(err){
                   throw err;
               }

               res.should.have.status(200);
               res.body.should.have.property('token');
               res.body.should.have.property('message');
               res.body.should.have.property('code').equal(200);
               token = res.body.token;
               done();
           });
   });

   it("GET /api/users/:author_id", (done) => {
        chai.request(server)
            .get(`/api/users/${user_id}`)
            .set('x-access-token', token)
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.a('array');
                done();
            });
   });

    it('PUT /api/users/dont-be-writer/:user_id', (done) => {
        chai.request(server)
            .put(`/api/users/dont-be-writer/${user_id}`)
            .set('x-access-token', token)
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('user').have.property('_id');
                res.body.should.have.property('user').have.property('name');
                res.body.should.have.property('user').have.property('surname');
                res.body.should.have.property('user').have.property('email');
                res.body.should.have.property('user').have.property('created_at');
                res.body.should.have.property('user').have.property('status');
                res.body.should.have.property('user').have.property('role').equal(0);
                done();
            });
    });

    it('PUT /api/users/be-writer/:user_id', (done) => {
        chai.request(server)
            .put(`/api/users/be-writer/${user_id}`)
            .set('x-access-token', token)
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('user').have.property('_id');
                res.body.should.have.property('user').have.property('name');
                res.body.should.have.property('user').have.property('surname');
                res.body.should.have.property('user').have.property('email');
                res.body.should.have.property('user').have.property('created_at');
                res.body.should.have.property('user').have.property('status');
                res.body.should.have.property('user').have.property('role').equal(1);
                done();
            });
    });
});