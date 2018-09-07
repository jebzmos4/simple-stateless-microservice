// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const should = require('should');
const chaiHttp = require('chai-http');
const server = require('../app/index');

chai.use(chaiHttp);
// chai.use(should);
const testImage = '?url=https://preview.ibb.co/moSBCz/Did_You_Know_Health_2.png';
// Our parent block
describe('Endpoint Tests', () => {
  /*
  * Test the /GET route
  */
  describe('/GET homepage', () => {
    it('it should GET the default endpoint', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('/POST Authentication', () => {
    it('it should not authenticate user without username and password', (done) => {
      chai.request(server)
        .post('/login')
        .send('')
        .end((err, res) => {
          res.status.should.be.equal(401);
          should(res.body).have.property('message', 'Please provide the username and password as a body param');
          done();
        });
    });

    it('it should not accept invalid parameters', (done) => {
      const credentials = {
        name: 'jebzmos4',
        key: '123456'
      };
      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((err, res) => {
          res.status.should.be.equal(400);
          should(res.body).have.property('message', 'Invalid params passed! only *username* and *password* is allowed');
          done();
        });
    });

    it('it should successfully log user in successfully', (done) => {
      const credentials = {
        username: 'jebzmos4',
        password: '123456'
      };
      chai.request(server)
        .post('/login')
        .send(credentials)
        .end((err, res) => {
          res.status.should.be.equal(200);
          should(res.body).have.property('message', 'User successfully authenticated');
          done();
        });
    });
  });

  describe('/POST thumbnail', () => {
    it('it should generate thumbnail', (done) => {
      chai.request(server)
        .post(`/image${testImage}`)
        .end((err, res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });
});
