/**
 * An array list of all users
 * @constant
 *
 * @type {Array<Object>}
 * @exports users
 */
const users = [
  {
    id: 1,
    firstname: 'Fejiro',
    lastname: 'Gospel',
    othernames: 'Precious',
    username: 'fejiroofficial',
    email: 'houseofjiro@gmail.com',
    phoneNumber: '08138776199',
    registered: new Date().toISOString(),
    isAdmin: 'false',
    password: '123456',
  },
  {
    id: 2,
    firstname: 'Admin',
    lastname: 'Admin',
    othernames: '',
    username: 'admin101',
    email: 'admin123@gmail.com',
    phoneNumber: '',
    registered: new Date().toISOString(),
    isAdmin: 'true',
    password: '123456',
  },
];

export default users;
