import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);

describe('/PATCH for updating user profile image', () => {
  describe('Updating user image', () => {
    it('should throw an error if url is not provided', (done) => {
        const requestBody = {
          profileImage: '',
        };
        chai.request(app)
          .patch('/api/v1/users/1')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Please provide a link to image');
            done();
          });
      });
  
      it('should throw an error if url link is invalid', (done) => {
        const requestBody = {
          profileImage: 'tdgdgdg.ghhghgh',
        };
        chai.request(app)
          .patch('/api/v1/users/1')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('invalid image url link');
            done();
          });
      });
  
      it('should throw an error if user does not exist', (done) => {
        const requestBody = {
          profileImage: 'www.updateimage.com',
        };
        chai.request(app)
          .patch('/api/v1/users/100')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('User does not exist in the database');
            done();
          });
      });

      it('should throw an error if user is not the owner of record', (done) => {
        const requestBody = {
          profileImage: 'www.updateimage.com',
        };
        chai.request(app)
          .patch('/api/v1/users/1')
          .set('Authorization', `${jwt.sign({ id: 2 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('sorry, cannot modify an account that is not yours!');
            done();
          });
      });

      it('update should be successful', (done) => {
        const requestBody = {
          profileImage: 'www.updateimage.com',
        };
        chai.request(app)
          .patch('/api/v1/users/1')
          .set('Authorization', `${jwt.sign({ id: 1 }, 'fejiroofficial', { expiresIn: '24hrs' })}`)
          .send(requestBody)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('successful! your profile image has been updated');
            expect(res.body.token).to.exist;
            done();
          });
      });
  })
})
