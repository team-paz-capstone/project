import axios from 'axios';

export async function getAllOffices() {
  return new Promise((resolve, reject) => {
    axios.get('/api/office/all').then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

export async function getOffice(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/office/' + id).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

/* TODO: Needs to be tested */
export async function createOffice(id, data) {
  return new Promise((resolve, reject) => {
    axios.post('/api/office/create', data).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

/* TODO: Needs to be tested */
export async function updateOffice(id, data) {
  return new Promise((resolve, reject) => {
    axios.post('/api/office/update', data).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
}

/* TODO: Needs to be tested */
export async function deleteOffice(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/office/delete/' + id).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}
