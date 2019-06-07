import axios from 'axios';

const BASE_URL = '/api/user/';
const ALL = BASE_URL + 'all';
const CREATE = BASE_URL + 'create';
const UPDATE = BASE_URL + 'update';
const DELETE = BASE_URL + 'delete';
const LOGIN = BASE_URL + 'login';

/**
 * @return { Object } - Axios Response:
 *  Data - List of User Objects
 * */
export async function getAllUsers() {
  return axios.get(ALL);
}

/**
 * @return { Object } - Axios Response:
 *  Data - User Object
 * */
export async function getUser(id) {
  return axios.get(BASE_URL + id);
}

/**
 * @param data {Object}:
 *  - firstName
 *  - lastName
 *  - email
 *  - password
 *  - isAdmin
 *
 * @return { Object } - Axios Response:
 * */
export async function createUser(data) {
  return axios.post(CREATE, data);
}

export async function updateUser(data) {
  return axios.post(UPDATE, data);
}

export async function deleteUser(id) {
  return axios.get(DELETE + id);
}

export async function logInUser(data) {
  return axios.post(LOGIN, data);
}

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logInUser
};
