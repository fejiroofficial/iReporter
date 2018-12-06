import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';

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
          expect(res.body.message).to.equal('Email is required')
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
          expect(res.body.message).to.equal('Password is required')
          done();
        })
    })
    it('if email and password are not provided', (done) => {
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
            password: '',
          };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email and Password are required')
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
    it('should not register user if telephone is not provided', (done) => {
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
          expect(res.body.message).to.equal('Your telephone number is required');
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
          expect(res.body.message).to.equal('username is required');
          done();
        });
    });
    it('telephone number should not contain an alphabet', (done) => {
      const user = {
        id: 1,
        firstname: 'Fejiro',
        lastname: 'Gospel',
        othernames: 'Precious',
        username: 'fejiroofficial',
        profileImage: 'www.image.com',
        email: 'houseofjiro@gmail.com',
        telephone: 'yy8138776199',
        isAdmin: 'false',
        password: '123456',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false')
          expect(res.body.message).to.equal('telephone number should not contain an alphabet');
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
          email: 'houseofjiro1@gmail.com',
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
      it('it should not register a user if telephone already exist', (done) => {
        const user = {
          id: 1,
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial1',
          profileImage: 'www.image.com',
          email: 'houseofjiro1@gmail.com',
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
            expect(res.body.message).to.equal('user with this telephone already exists');
            done();
          });
      });
      it('it should successfully register a user', (done) => {
        const user = {
          id: 1,
          firstname: 'Fejiro',
          lastname: 'Gospel',
          othernames: 'Precious',
          username: 'fejiroofficial1',
          profileImage: 'www.image.com',
          email: 'houseofjiro1@gmail.com',
          telephone: '08138776120',
          isAdmin: 'false',
          password: '123456',
        };
        request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.success).to.equal('true')
            expect(res.body.message).to.equal('Account created successfully');
            done();
          });
      });

  })
})
