const request = require('supertest');
const app = require('../index');

//unit testing: testing basic functionality

describe('GET /', function() {
  it('landing page working!', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('login page working!', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
  it('login!', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
  app.close();
});

//integration testing: testing if units work together (ex. web page can call database)

//system testing: testing if integrated units work together to deliver major functions (ex. can fetch items from database and add to cart?)

//acceptance testing: does system do what it was intended to do (user can log in and puchase item?)

