/**
 * a list of all red-flags
 * @constant
 *
 * @type {Array<Object>}
 * @exports allOrders
 */
const incidents = [
  {
    id: 1,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'red-flag',
    location: '6.4828617, 3.1896830',
    status: 'draft',
    Images: ['www.image.com', 'www.image.com'],
    Videos: ['www.video.com', 'www.video.com'],
    comment: 'Thugs are vandalizing crude oil pipes',
  },
  {
    id: 2,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'intervention',
    location: '6.4828617, 3.1896830',
    status: 'draft',
    Images: ['www.image.com', 'www.image.com'],
    Videos: ['www.video.com', 'www.video.com'],
    comment: 'There is a broken bridge betweem Ota and Abeokut',
  },
];

export default incidents;
