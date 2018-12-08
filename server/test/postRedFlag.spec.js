import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/POST a red-flag', () => {
  it('should throw an error if incident type is not provided', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: '',
      latitude: '6.4828617',
      longitude: '3.1896830',
      imageUrl: 'www.image.com',
      comment: 'Thugs are vandalizing crude oil pipes',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
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

  it('should throw an error if latitude is not provided', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      longitude: '3.1896830',
      imageUrl: 'www.image.com',
      comment: 'createdBy should be a number',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
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

  it('should throw an error if longitude is not provided', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      latitude: '6.4828617',
      imageUrl: 'www.image.com',
      comment: 'createdBy should be a number',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
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

  it('should throw an error if latitude is not a number', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      latitude: '6.4oh617',
      longitude: '3.1896830',
      imageUrl: 'www.image.com',
      comment: 'createdBy should be a number',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('latitude co-ordinate should be a number');
        done();
      });
  });

  it('should throw an error if longitude is not a number', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      latitude: '6.434617',
      longitude: '3.18gg830',
      imageUrl: 'www.image.com',
      comment: 'createdBy should be a number',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('longitude co-ordinate should be a number');
        done();
      });
  });

  it('should throw an error if comment is not provided', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      latitude: '6.434617',
      longitude: '3.18gg830',
      imageUrl: 'www.image.com',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
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
      latitude: '6.434617',
      longitude: '3.1855830',
      imageUrl: 'www.image.com',
      comment: 'Thugs are vandalizing crude oil pipes',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
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
      latitude: '6.434617',
      longitude: '3.18gg830',
      imageUrl: 'www.image.com',
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
        expect(res.body.message).to.equal('User authorization token is required');
        done();
      });
  });

  it('create resource successfully', (done) => {
    const requestBody = {
      createdOn: new Date().toISOString(),
      createdBy: 1,
      type: 'red-flag',
      latitude: '6.434617',
      longitude: '3.1844830',
      imageUrl: 'www.image.com',
      comment: 'Thugs are vandalizing crude oil pipes',
    };
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal('true');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.data[0].id).to.equal(4);
        expect(res.body.data[0].message).to.equal('You have successfully created a new red-flag record');
        done();
      });
  });
})