import axios from 'axios';

const BASE_URL = '/api/account-recovery/';
const REQUEST = BASE_URL + 'request';
const CHANGE_PASSWORD = BASE_URL + 'change-password';

export async function requestAccountRecovery(data) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const d = {
    email: data
  };
  return axios.post(REQUEST, d, { headers: headers });
}

export async function changePassword(data) {
  return axios.post(CHANGE_PASSWORD, data);
}

export default {
  requestAccountRecovery,
  changePassword
};
