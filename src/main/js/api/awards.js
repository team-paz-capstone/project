import axios from 'axios';

const BASE_URL = '/api/award/';
const GRANTER = BASE_URL + 'granter/';
const RECIPIENT = BASE_URL + 'recipient/';
const ALL = BASE_URL + 'all';
const CREATE = BASE_URL + 'create';
const DELETE = BASE_URL + 'delete/';

export async function getAllAwards() {
  return axios.get(ALL);
}

export async function getAward(id) {
  return axios.get(BASE_URL + id);
}

export async function getAwardByGranter(id) {
  return axios.get(GRANTER + id);
}

export async function getAwardByRecipient(id) {
  return axios.get(RECIPIENT + id);
}

export async function createAward(data) {
  return axios.post(CREATE, data);
}

export async function deleteAward(id) {
  return axios.post(DELETE + id);
}

export default {
  getAllAwards,
  getAward,
  getAwardByGranter,
  getAwardByRecipient,
  createAward,
  deleteAward
};
