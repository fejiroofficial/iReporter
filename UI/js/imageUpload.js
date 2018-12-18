const fileUpload = document.getElementById('files');

fileUpload.addEventListener('change', (event) => {
  localStorage.removeItem('imageUrl');
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'vgbqn9oe');
  axios({
    url: 'https://api.cloudinary.com/v1_1/fejiroofficial/image/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  })
    .then((response) => {
      localStorage.setItem('imageUrl', response.data.secure_url);
    })
    .catch((err) => {
      console.log(err);
    })
});