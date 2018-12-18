import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/PATCH an incident status', () => {
  describe('Updating red-flag status', () => {
    it('should throw an error if status is not provided', (done) => {
        const requestBody = {
          status: '',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Incident status cannot be empty');
            done();
          });
      });

      it('should throw an error if param is not a number', (done) => {
        const requestBody = {
          status: 'rejected',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/qqer/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal(`This record doesn't exist in the database`);
            done();
          });
      });

      it('should throw an error if user is unauthorized', (done) => {
        const requestBody = {
          status: 'rejected',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/status')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('user unauthorized to update status of a red-flag or intervention record');
            done();
          });
      });

      it('should throw an error if status is a wrong status', (done) => {
        const requestBody = {
          status: 'rejecteddddddddd',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('you can change the status of a record to either under-investigation, rejected or resolved.');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          status: 'resolved',
        };;
        chai.request(app)
          .patch('/api/v1/red-flags/1/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].message).to.equal('Status updated successfully');
            expect(res.body.data[0].updated.id).to.equal(1);
            expect(res.body.data[0].updated.status).to.equal('resolved');
            done();
          });
      });
  })

  describe('Updating intervention status', () => {
    it('should throw an error if status is not provided', (done) => {
        const requestBody = {
          status: '',
        };
        chai.request(app)
          .patch('/api/v1/interventions/1/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Incident status cannot be empty');
            done();
          });
      });

      it('should throw an error if param is not a number', (done) => {
        const requestBody = {
          status: 'rejected',
        };
        chai.request(app)
          .patch('/api/v1/interventions/qqer/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal(`This record doesn't exist in the database`);
            done();
          });
      });

      it('should throw an error if user is unauthorized', (done) => {
        const requestBody = {
          status: 'rejected',
        };
        chai.request(app)
          .patch('/api/v1/interventions/1/status')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('user unauthorized to update status of a red-flag or intervention record');
            done();
          });
      });

      it('should throw an error if status is a wrong status', (done) => {
        const requestBody = {
          status: 'rejecteddddddddd',
        };
        chai.request(app)
          .patch('/api/v1/interventions/1/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('you can change the status of a record to either under-investigation, rejected or resolved.');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          status: 'resolved',
        };;
        chai.request(app)
          .patch('/api/v1/interventions/2/status')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].message).to.equal('Status updated successfully');
            expect(res.body.data[0].updated.id).to.equal(2);
            expect(res.body.data[0].updated.status).to.equal('resolved');
            done();
          });
      });
  })
})    