import axios from 'axios';

const BASE_URL = "/api/user/";
const ALL = BASE_URL + 'all';
const CREATE = BASE_URL + "create";
const UPDATE = BASE_URL + "update";
const DELETE = BASE_URL + "delete";

export async function getAllUsers() {
  return axios.get(ALL);
}

export async function getUser(id) {
  return axios.get(BASE_URL + id);
}

export async function createUser(id, data) {
  return axios.post(CREATE, data);
}

export async function updateUser(id, data) {
  return axios.post(UPDATE, data);
}

export async function deleteUser(id) {
  return axios.get(DELETE + id);
}

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}