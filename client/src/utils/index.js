import dateformat from 'dateformat';

export const formatDate = (date) => {
  const formattedDate = dateformat(date, 'dd/mm/yyyy');
  return formattedDate;
}


// export const uploadAvatar = (file, callback) => {
//   console.log('into uploadAvatar')
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', '/api/image');
//   const data = new FormData();
//   data.append('file', file);
//   xhr.send(data);
//   xhr.addEventListener('load', () => {
//     console.log('response', response)
//     const response = JSON.parse(xhr.responseText);
//     callback(response.data.link);
//   });
// }

export const uploadAvatar = (file, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.imgur.com/3/image');
  xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
  const data = new FormData();
  data.append('image', file);
  xhr.send(data);
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    callback(response.data.link);
  });
}
