import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';
import jwt from 'jsonwebtoken';

chai.use(chaiHTTP);


describe('Sign Up', () => {
  describe('User signup', () => {
    it('if email is not provided', (done) => {
        const user = {
            id: 1,
            firstname: 'Fejiro',
            lastname: 'Gospel',
            othernames: 'Precious',
            username: 'fejiroofficial',
            profileImage: 'www.image.com',
            email: '',
            telephone: '08138776199',
            isAdmin: 'false',
            password: '123456',
          };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email field must not be empty')
          done();
        });
    });
    it('if password is not provided', (done) => {
        const user = {
            id: 1,
            firstname: 'Fejiro',
            lastname: 'Gospel',
            othernames: 'Precious',
            username: 'fejiroofficial',
            profileImage: 'www.image.com',
            email: 'houseofjiro@gmail.com',
            telephone: '08138776199',
            isAdmin: 'false',
            password: '',
          };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('password field must not be empty')
          done();
        })
    })
    it('should not register user if email already exist in db', (done) => {
      const user = {
        id: 1,
        firstname: 'Fejiro',
        lastname: 'Gospel',
        othernames: 'Precious',
        username: 'fejiroofficial',
        profileImage: 'www.image.com',
        email: 'houseofjiro@gmail.com',
        telephone: '08138776199',
        isAdmin: 'false',
        password: '123456',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.equal('false')
          expect(res.body.message).to.equal('user with this email already exists');
          done();
        });
    });
    it('should not register user if username is not provided', (done) => {
        const user = {
            id: 1,
            firstname: 'Fejiro',
            lastname: 'Gospel',
            othernames: 'Precious',
            username: '',
            profileImage: 'www.image.com',
            email: 'houseofjiro@gmail.com',
            telephone: '08138776199',
            isAdmin: 'false',
            password: '123456',
          };
      request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false')
          expect(res.body.message).to.equal('username field must not be empty');
          done();
        });
    });
    it('should not register if telephone is not provided', (done) => {
      const user = {
          id: 1,
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial',
          profileImage: 'www.image.com',
          email: 'houseofjiro@gmail.com',
          telephone: '',
          isAdmin: 'false',
          password: '123456',
        };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false')
        expect(res.body.message).to.equal('telephone field must not be empty');
        done();
      });
  });
    it('it should not register a user if username already exist', (done) => {
        const user = {
          id: 1,
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial',
          profileImage: 'www.image.com',
          email: 'houseofjiro45@gmail.com',
          telephone: '08138776199',
          isAdmin: 'false',
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('This username has been taken by someone else');
            done();
          });
      });
      it('it should not register a user if email already exist', (done) => {
        const user = {
          id: 1,
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial1',
          profileImage: 'www.image.com',
          email: 'houseofjiro@gmail.com',
          telephone: '08138776199',
          isAdmin: 'false',
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('user with this email already exists');
            done();
          });
      });
      it('it should not register a user if first name contains number', (done) => {
        const user = {
          firstname: 'Fejiro22',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial2',
          telephone: '08138776122',
          email: 'houseofjiro1@gmail.com',
          isAdmin: false,
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('Names should not contain numbers and special characters');
            done();
          });
      });
      it('it should not register a user if last name contains number', (done) => {
        const user = {
          firstname: 'Fejiro',
          lastname: 'Gospel32',
          othernames: 'Precious',
          username: 'fejiroofficial2',
          telephone: '08138776122',
          email: 'houseofjiro1@gmail.com',
          isAdmin: false,
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('Names should not contain numbers and special characters');
            done();
          });
      });
      it('it should not register a user if other names contains number', (done) => {
        const user = {
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious55',
          username: 'fejiroofficial2',
          telephone: '08138776122',
          email: 'houseofjiro1@gmail.com',
          isAdmin: false,
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('Names should not contain numbers and special characters');
            done();
          });
      });
      it('it should not register a telephone contains alphabets and special characters', (done) => {
        const user = {
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial2',
          telephone: '081387r$122',
          email: 'houseofjiro1@gmail.com',
          isAdmin: false,
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false')
            expect(res.body.message).to.equal('telephone number should not contain alphabets and special characters');
            done();
          });
      });
      it('it should successfully register a user', (done) => {
        const user = {
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial2',
          telephone: '08138776122',
          email: 'houseofjiro1@gmail.com',
          isAdmin: false,
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.success).to.equal('true')
            expect(res.body.message).to.equal('Account created successfully');
            expect(res.body.data[0].token).to.exist;
            expect(res.body.data[0].user.firstname).to.equal(user.firstname);
            expect(res.body.data[0].user.lastname).to.equal(user.lastname);
            expect(res.body.data[0].user.username).to.equal(user.username);
            expect(res.body.data[0].user.othernames).to.equal(user.othernames);
            expect(res.body.data[0].user.email).to.equal(user.email);
            done();
          });
      });

  })
})
