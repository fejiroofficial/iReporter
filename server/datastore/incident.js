/* eslint linebreak-style: "off" */

/**
 * a list of all red-flags and incidents
 * @constant
 *
 * @type {Array<Object>}
 * @exports incidents
 */
const incidents = [
  {
    id: 1,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'red-flag',
    location: '6.4828617, 3.1896830',
    status: 'draft',
    images: ['www.image.com', 'www.image.com'],
    videos: ['www.video.com', 'www.video.com'],
    comment: 'Thugs are vandalizing crude oil pipes',
  },
  {
    id: 2,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'intervention',
    location: '6.4828617, 3.1896830',
    status: 'draft',
    images: ['www.image.com', 'www.image.com'],
    videos: ['www.video.com', 'www.video.com'],
    comment: 'There is a broken bridge betweem Ota and Abeokuta',
  },
  {
    id: 3,
    createdOn: new Date().toISOString(),
    createdBy: 1,
    type: 'red-flag',
    location: '6.4828617, 3.1896830',
    status: 'draft',
    images: ['www.image.com', 'www.image.com'],
    videos: ['www.video.com', 'www.video.com'],
    comment: 'There is a broken bridge betweem Ota and Badagry',
  },
];

export default incidents;
