import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/DELETE red-flag', () => {
  it('should throw an error if record does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/100')
      .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('This record doesn\'t exist in the database');
        done();
      });
  });

  it('should return 401 if question does not belong to who wants to delete it', (done) => {
    chai
      .request(app)
      .delete('/api/v1/red-flags/3')
      .set('Authorization', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '4hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('You are unauthorized to delete an information that was not posted by you');
        done();
      });
  });

  it('should delete question if it exist and belongs to owner', (done) => {
    chai
      .request(app)
      .delete('/api/v1/red-flags/1')
      .set('Authorization', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.data[0].message).to.equal('You have successfully deleted this red-flag record');
        expect(res.body.data[0].removed.type).to.equal('red-flag');
        done();
      });
  });
})
