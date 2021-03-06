import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/PATCH a red-flags comment', () => {
  describe('Updating comment', () => {
    it('should throw an error if comment is not provided', (done) => {
        const requestBody = {
          comment: '',
        };
        chai.request(app)
          .patch('/api/v1/red-flags/1/comment')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide a brief comment for this incident record');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          comment: 'This is a new comment',
        };;
        chai.request(app)
          .patch('/api/v1/red-flags/1/comment')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].message).to.equal('You have successfully updated the comment of this red-flag record');
            expect(res.body.data[0].updated.id).to.equal(1);
            expect(res.body.data[0].updated.comment).to.equal(requestBody.comment);
            expect(res.body.data[0].updated.status).to.equal('draft');
            done();
          });
      });
  })
})  

describe('/PATCH an intervention comment', () => {
  describe('Updating comment', () => {
    it('should throw an error if comment is not provided', (done) => {
        const requestBody = {
          comment: '',
        };
        chai.request(app)
          .patch('/api/v1/interventions/2/comment')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide a brief comment for this incident record');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          comment: 'This is a new comment',
        };;
        chai.request(app)
          .patch('/api/v1/interventions/2/comment')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.data[0].message).to.equal('You have successfully updated the comment of this intervention record');
            expect(res.body.data[0].updated.id).to.equal(2);
            expect(res.body.data[0].updated.comment).to.equal(requestBody.comment);
            expect(res.body.data[0].updated.status).to.equal('draft');
            done();
          });
      });
  })
})
