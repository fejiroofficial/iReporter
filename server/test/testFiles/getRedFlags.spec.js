import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/GET all red-flags', () => {
  it('should get all red-flags', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('true');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.not.equal(0);
        expect(res.body.data[0]).to.be.an('object');
        done();
      });
  });
})

describe('/GET specific red-flag', () => {
  it('should throw an error if record does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/100')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('false');
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('This record doesn\'t exist in the database');
        done();
      });
  });
  it('should throw an error if record is not a red-flag', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/2')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('false');
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('This incident record is not a red-flag');
        done();
      });
  });
  it('should get red-flag', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/1')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('true');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.createdby).to.equal(1);
        done();
      });
  });
})

describe('/GET all interventions', () => {
  it('should get all interventions', (done) => {
    chai.request(app)
      .get('/api/v1/interventions/')
      .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('true');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.not.equal(0);
        expect(res.body.data[0]).to.be.an('object');
        done();
      });
  });
})
