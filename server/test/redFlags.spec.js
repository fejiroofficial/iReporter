import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import incidents from '../datastore/incident';

chai.use(chaiHttp);

describe('redflag controller status', () => {
  describe('/GET all red-flags', () => {  
    it('should get all red-flags', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/')
        .send(incidents)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('true');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  })

  describe('/GET a red-flag', () => {
    it('should throw an error if red flag does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('This red-flag record does not exist');
          done();
        });
    });

    it('should throw an error if param is a string', (done) => {
      const wrongParam = 'a'
      chai.request(app)
        .get(`/api/v1/red-flags/${wrongParam}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('hooops! params should be a number e.g 1');
          done();
        });
    });
    
    afterEach((done) => {
      incidents.length = 0;
      done(); 
    });
    it('should throw an error no red flag record is found', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/1')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('No red-flag record found');
          done();
        });
    })
  })

  describe('/POST a red-flag', () => {
    it('should throw an error if incident type is not provided', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: '',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'Thugs are vandalizing crude oil pipes',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('What is the type of this incident? please provide one');
          done();
        });
    });

    it('should throw an error if user id is an alphabet', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 'www',
        type: 'red-flag',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'createdBy should be a number',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('createdBy should be a number');
          done();
        });
    });

    it('should throw an error if image is not provided', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: 'red-flag',
        location: '6.4828617, 3.1896830',
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'createdBy should be a number',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please provide an image or video evidence for this report');
          done();
        });
    });

    it('should throw an error if location is not provided', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: 'red-flag',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'createdBy should be a number',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please provide the location for this red-flag incident');
          done();
        });
    });

    it('should throw an error if comment is not provided', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: 'red-flag',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You have to make a comment on this red-flag');
          done();
        });
    });

    it('should throw an error if incident type is not a red-flag', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: 'intervention',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'Thugs are vandalizing crude oil pipes',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('This is a red-flag incident, the type should be a \'redflag\'');
          done();
        });
    });

    it('should throw an error if user does not exist', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 100,
        type: 'red-flag',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'Thugs are vandalizing crude oil pipes',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('unauthorized user, please sign up');
          done();
        });
    });

    it('create resource successfully', (done) => {
      const requestBody = {
        createdOn: new Date().toISOString(),
        createdBy: 1,
        type: 'red-flag',
        location: '6.4828617, 3.1896830',
        Images: ['www.image.com', 'www.image.com'],
        Videos: ['www.video.com', 'www.video.com'],
        comment: 'Thugs are vandalizing crude oil pipes',
      };
      chai.request(app)
        .post('/api/v1/red-flags/')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.data[0].message).to.equal('Created red-flag record');
          done();
        });
    });
  })

  describe('/PATCH red-flag location', () => {  
    it('should throw an error if location is not provided', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/location')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('Please provide the location for this red-flag incident');
          done();
        });
    });

    it('throw error if param is not an integer', (done) => {
      const requestBody = {
        location: '6.4828617, 3.1896830',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/b/location')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('hooops! params should be a number e.g 1');
          done();
        });
    });

    it('throw error if red-flag does not exist', (done) => {
      const requestBody = {
        location: '6.4828617, 3.1896830',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/100/location')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('This red-flag record does not exist');
          done();
        });
    });

    it('return success if red-flag record is found', (done) => {
      const requestBody = {
        location: '6.4828617, 3.1896830',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/1/location')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.body.data[0].message).to.equal('Updated red-flag record’s location');
          done();
        });
    });
  })

  describe('/PATCH red-flag comment', () => {  
    it('should throw an error if comment is not provided', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('Please provide a brief comment for this red-flag incident');
          done();
        });
    });

    it('throw error if param is not an integer', (done) => {
      const requestBody = {
        comment: 'this is a brief comment',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/b/comment')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('hooops! params should be a number e.g 1');
          done();
        });
    });

    it('throw error if red-flag does not exist', (done) => {
      const requestBody = {
        comment: 'this is a brief comment',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/100/comment')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('false');
          expect(res.body.message).to.equal('This red-flag record does not exist');
          done();
        });
    });

    it('return success if red-flag record is found', (done) => {
      const requestBody = {
        comment: 'this is a brief comment',
      };
      chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .send(requestBody)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.body.data[0].message).to.equal('Updated red-flag record’s comment');
          done();
        });
    });
  })
})