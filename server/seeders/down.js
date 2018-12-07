import db from '../db';

const down = () => {
  db.none('DELETE FROM users; DELETE FROM incidents;')
    .then(() => {
      console.log('Undo seeds for users and incidents test table was successful');
    })
    .catch((err) => {
      console.log(err);
    });
};

down();
