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
})