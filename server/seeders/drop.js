import db from '../db';

const drop = () => {
  db.none('DROP TABLE incidents; DROP TABLE users;')
    .then(() => {
      console.log('incidents and users tables were dropped successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

drop();
