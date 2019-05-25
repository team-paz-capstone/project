import axios from 'axios';

export async function getOfficeByUserCount() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/query/office_by_user_count')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getUserByAwardCount() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/query/user_by_award_count')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
