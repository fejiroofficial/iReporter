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
