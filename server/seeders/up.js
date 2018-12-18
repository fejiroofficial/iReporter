import bcrypt from 'bcrypt-nodejs';
import db from '../db';

/* eslint no-template-curly-in-string: "off" */
/* eslint linebreak-style: "off" */

const salt = bcrypt.genSaltSync(10);
const users = [
  {
    id: 1,
    firstname: 'Fejiro',
    lastname: 'Gospel',
    othernames: 'Precious',
    username: 'fejiroofficial',
    profileImage: 'www.image.com',
    email: 'houseofjiro@gmail.com',
    telephone: '08138776199',
    registered: new Date().toISOString(),
    isAdmin: false,
    password: bcrypt.hashSync('123456', salt),
  },
  {
    id: 2,
    firstname: 'Admin',
    lastname: 'Admin',
    othernames: '08138776188',
    username: 'admin101',
    profileImage: 'www.image.com',
    email: 'admin123@gmail.com',
    telephone: '08138776188',
    registered: new Date().toISOString(),
    isAdmin: true,
    password: bcrypt.hashSync('123456', salt),
  },
];

const incidents = [
  {
    id: 1,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'red-flag',
    latitude: '6.4828617',
    longitude: '3.1896830',
    location: '6.4828617, 3.1896830',
    defaultStatus: 'draft',
    Images: 'www.image.com',
    comment: 'Thugs are vandalizing crude oil pipes',
  },
  {
    id: 2,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'intervention',
    latitude: '6.4828617',
    longitude: '3.1896830',
    location: '6.4828617, 3.1896830',
    defaultStatus: 'draft',
    Images: 'www.image.com',
    comment: 'There is a broken bridge betweem Ota and Abeokuta',
  },
  {
    id: 3,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'red-flag',
    latitude: '6.4828617',
    longitude: '3.1896830',
    location: '6.4828617, 3.1896830',
    defaultStatus: 'draft',
    Images: 'www.image.com',
    comment: 'There is a broken bridge betweem Ota and Badagry',
  },
];


const up = () => {
  db.tx((t) => {
    const queries = users
      .map(user => t.none('INSERT INTO users(firstname, lastname, othernames, email, telephone, username, profile_image, password, isAdmin) VAlUES( ${firstname}, ${lastname}, ${othernames}, ${email}, ${telephone}, ${username}, ${profileImage}, ${password}, ${isAdmin})', user));
    return t.batch(queries);
  })
    .then(() => {
      console.log('Users seeded successfully');
      db.tx((t) => {
        const queries = incidents
          .map(incident => t.none('INSERT INTO incidents(createdBy, comment, type, location, status) VALUES( ${createdBy}, ${comment}, ${type}, ${location}, ${defaultStatus})', incident));
        return t.batch(queries);
      })
        .then(() => {
          console.log('Incidents seeded successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

up();
