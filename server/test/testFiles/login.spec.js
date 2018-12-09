import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../../app';

chai.use(chaiHTTP);

describe('User login', () => {
  it('if email is not provided', (done) => {
    const user = {
    email: "",
    password: "123456",
  }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is required')
        done();
      });
  });
  it('if password is not provided', (done) => {
    const user = {
      email: "oke3@gmail.com",
      password: "",
    }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password is required')
        done();
      })
  })
  it('if email and password are not provided', (done) => {
    const user = {
      email: "",
      password: "",
    }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email and Password are required')
        done();
      })
  })
  it('if email is invalid', (done) => {
    const user = {
      email: "wrongemail@.com",
      password: "123456",
    }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is not valid')
        done();
      })
  })
  it('if username is invalid', (done) => {
    const user = {
      email: "-wrongPassword",
      password: "123456",
    }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username is not valid')
        done();
      })
  })
  it('should not signin if email does not exist in db', (done) => {
    const user = {
      email: 'houseofjiro@gmail.com',
      password: '123456',
    }
    const invalidEmail = { ...user , email: 'emaildoesnotexist@gmail.com' };
    request(app)
      .post('/api/v1/auth/login')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You have entered an invalid email or password');
        done();
      });
  });
  it('should not signin if username does not exist in db', (done) => {
    const user = {
      email: 'houseofjiro@gmail.com',
      password: '123456',
    }
    const invalidEmail = { ...user , email: 'jiroofficial' };
    request(app)
      .post('/api/v1/auth/login')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You have entered an invalid username or password');
        done();
      });
  });
  it('should not signin user if password is incorrect', (done) => {
    const user = {
        email: 'houseofjiro@gmail.com',
        password: '123456',
      }
    const wrongPassword = { ...user, password: 'wrongpassword' };
    request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You have entered an invalid email or password');
        done();
      });
  });
  it('should not signin user if password is less than six characters', (done) => {
    const user = {
        email: 'houseofjiro@gmail.com',
        password: '123456',
      }
    const wrongPassword = { ...user, password: '123' };
    request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password must be minimum of 6 characters');
        done();
      });
  });
  it('should return a successful message after login with email', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'houseofjiro@gmail.com', password: '123456' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.body.message).to.equal('Login was successful');
        done();
      });
  });
  it('should return a successful message after login with username', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'fejiroofficial', password: '123456' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.body.message).to.equal('Login was successful');
        expect(res.body.token).to.exist;
        done();
      });
  });
})