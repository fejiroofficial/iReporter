import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('Wrong route error', () => {
  describe('Updating comment', () => {
    it('should throw an error if route does not exist', (done) => {
        const requestBody = {
          comment: '',
        };
        chai.request(app)
          .post('/api/v1/red-flags/1/comment')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('This route does not exist');
            done();
          });
      });
  })
})  

