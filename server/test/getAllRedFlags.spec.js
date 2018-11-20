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
})