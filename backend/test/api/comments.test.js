const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token,
    user_id = "648da51b910e6c1f58c7799a",
    news_id = "648da545910e6c1f58c779a2",
    added_comment_id;

describe("COMMENTS TESTS", () => {
    before('Take a token', (done) => {
        chai.request(server)
            .post('/signin')
            .send({ email: "Test User Email", password: "Test User Password" })
            .end((err, res) => {
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

    it("GET /api/comments/author/:author_id", (done) => {
       chai.request(server)
           .get(`/api/comments/users/${user_id}`)
           .set('x-access-token', token)
           .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.a('number');
                done();
           });
    });

    it("GET /api/comments/news/:news_id", (done) => {
        chai.request(server)
            .get(`/api/comments/news/${user_id}`)
            .set('x-access-token', token)
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.a('number');
                done();
            })
    });

    it("POST /api/comments", (done) => {
        chai.request(server)
            .post('/api/comments')
            .set('x-access-token', token)
            .send({
                comment: 'Test Comment',
                user_id, news_id
            }).end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('data').a('object');
                added_comment_id = res.body.data._id;
                done();
            });
    });

    it("DELETE /api/comments/:comment_id", done => {
        chai.request(server)
            .delete(`/api/comments/${added_comment_id}`)
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