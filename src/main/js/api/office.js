import axios from 'axios';

export function getAllOffices() {
  return axios.get('/api/office/all');
}

export function getOffice(id) {
  return axios.get('/api/office/' + id);
}

export function createOffice(id, data) {
  return axios.post('/api/office/create', data);
}

export function updateOffice(id, data) {
  return axios.post('/api/office/update', data);
}

export async function deleteOffice(id) {
  return axios.get('/api/office/delete/' + id);
}

export default {
  getAllOffices,
  getOffice,
  createOffice,
  updateOffice,
  deleteOffice
};
