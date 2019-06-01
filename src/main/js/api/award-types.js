import axios from 'axios';

const BASE_URL = "/api/award-type/";
const ALL = BASE_URL + 'all';
const CREATE = BASE_URL + "create";
const DELETE = BASE_URL + "delete";

export async function getAllAwardTypes() {
  return axios.get(ALL);
}

export async function getAwardType(id) {
  return axios.get(BASE_URL + id);
}

export async function createAwardType(data) {
  return axios.post(CREATE, data);
}

export async function deleteAwardType(id) {
  return axios.get(DELETE + id);
}

export default {
  getAllAwardTypes,
  getAwardType,
  createAwardType,
  deleteAwardType,
}