// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/index');

chai.use(chaiHttp);
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
          res.should.have.status(200);
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
          res.should.have.status(401);
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
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // describe('/POST thumbnail', () => {
  //   it('it should generate thumbnail', (done) => {
  //     chai.request(server)
  //       .get('/image')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
