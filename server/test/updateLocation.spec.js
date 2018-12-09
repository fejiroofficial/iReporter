import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/PATCH an incident location', () => {
  describe('Updating red-flag location', () => {
    it('should throw an error if latitude is not provided', (done) => {
        const requestBody = {
          longitude: '3.1896830',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide the location for this incident');
            done();
          });
      });
  
      it('should throw an error if longitude is not provided', (done) => {
        const requestBody = {
          latitude: '6.4828617',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide the location for this incident');
            done();
          });
      });
  
      it('should throw an error if latitude is not a number', (done) => {
        const requestBody = {
          latitude: '6.4oh617',
          longitude: '3.1896830',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/location')
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
          latitude: '6.434617',
          longitude: '3.18gg830',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/location')
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

      it('should throw an error if record is not a red-flag', (done) => {
        const requestBody = {
          latitude: '6.434617',
          longitude: '3.1844830',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/2/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('This incident record is not a red-flag');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          latitude: '6.434617',
          longitude: '3.1844830',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].id).to.equal(1);
            expect(res.body.data[0].message).to.equal('You have successfully updated the location of this red-flag record');
            done();
          });
      });
  })

  describe('Updating intervention location', () => {
    it('should throw an error if latitude is not provided', (done) => {
        const requestBody = {
          longitude: '3.1896830',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide the location for this incident');
            done();
          });
      });
  
      it('should throw an error if longitude is not provided', (done) => {
        const requestBody = {
          latitude: '6.4828617',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide the location for this incident');
            done();
          });
      });
  
      it('should throw an error if latitude is not a number', (done) => {
        const requestBody = {
          latitude: '6.4oh617',
          longitude: '3.1896830',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/location')
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
          latitude: '6.434617',
          longitude: '3.18gg830',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/location')
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

      it('should throw an error if record is not an intervention', (done) => {
        const requestBody = {
          latitude: '6.434617',
          longitude: '3.1844830',
        };
        chai.request(app)
          .patch('/api/v1/interventions/3/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('This incident record is not an intervention');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          latitude: '6.434617',
          longitude: '3.1844830',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/location')
          .set('token', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].id).to.equal(2);
            expect(res.body.data[0].message).to.equal('You have successfully updated the location of this intervention record');
            done();
          });
      });
  })
})    