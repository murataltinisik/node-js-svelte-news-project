const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, newsId;

describe("NEWS TESTS", () => {
    before("Take a token", (done) => {
        chai.request(server)
            .post('/signin')
            .send({ email: "Test User Email", password: "Test User Password" })
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property("token");
                res.body.should.have.property("message");
                res.body.should.have.property("code").equal(200);
                token = res.body.token;
                done();
            });
    });

    it("GET /api/news", (done) => {
        chai.request(server)
            .get("/api/news")
            .set('x-access-token', token)
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.a("array");
                done();
            });
    });

    it("POST /api/news", (done) => {
        chai.request(server)
            .post('/api/news')
            .set('x-access-token', token)
            .send({
                title: "News Title Test",
                content: "News Content Test",
                image: "News Image Test",
                tag: "News Tag Test",
                author_id: "648da51b910e6c1f58c7799a" // This is a id in users collections.
            }).end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('data').have.property("_id");
                res.body.should.have.property('data').have.property("title");
                res.body.should.have.property('data').have.property("content");
                res.body.should.have.property('data').have.property("image");
                res.body.should.have.property('data').have.property("tag");
                res.body.should.have.property('data').have.property("author_id");
                newsId = res.body.data._id;
                done();
            });
    });

    it("GET /api/news/:news_id", (done) => {
       chai.request(server)
           .get(`/api/news/${newsId}`)
           .set('x-access-token', token)
           .end((err, res) => {
               if(err){
                   throw err
               }
               res.should.have.status(200);
               res.body.should.have.a("object");
               res.body.should.have.property('news');
               res.body.should.have.property('comments');
               res.body.should.have.property('news').a('object');
               res.body.should.have.property('comments').a('array');
               res.body.should.have.property('news').have.property('_id');
               res.body.should.have.property('news').have.property('author');
               res.body.should.have.property('news').have.property('_id').a('object');
               res.body.should.have.property('news').have.property('author').a('object');
               res.body.should.have.property('news').have.property('_id').have.property('_id');
               res.body.should.have.property('news').have.property('_id').have.property('title');
               res.body.should.have.property('news').have.property('_id').have.property('content');
               res.body.should.have.property('news').have.property('_id').have.property('image');
               res.body.should.have.property('news').have.property('_id').have.property('tag');
               res.body.should.have.property('news').have.property('_id').have.property('created_at');
               res.body.should.have.property('news').have.property('author').have.property('name');
               res.body.should.have.property('news').have.property('author').have.property('surname');
               res.body.should.have.property('news').have.property('author').have.property('email');
               done();
           });
    });

    it("PUT /api/news/:news_id", (done) => {
        chai.request(server)
            .put(`/api/news/${newsId}`)
            .set('x-access-token', token)
            .send({
                title: "Test News Title UPDATED",
                content: "Test News Content UPDATED",
                image: "Test News Image UPDATED",
                tag: "Test News Tag UPDATED",
            })
            .end((err, res) => {
                if(err){
                    throw err;
                }

                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('code').equal(200);
                res.body.should.have.property('data').have.property("_id");
                res.body.should.have.property('data').have.property("title");
                res.body.should.have.property('data').have.property("content");
                res.body.should.have.property('data').have.property("image");
                res.body.should.have.property('data').have.property("tag");
                res.body.should.have.property('data').have.property("author_id");
                done();
            });
    });

    it("DELETE /api/news/:news_id", (done) => {
       chai.request(server)
           .delete(`/api/news/${newsId}`)
           .set('x-access-token', token)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('code').equal(200);
               done();
           });
    });
});