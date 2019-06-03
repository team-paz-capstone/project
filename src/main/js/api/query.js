import axios from 'axios';

export function getOfficeByUserCount() {
  return axios.get('/api/query/office_by_user_count');
}

export function getUserByAwardCount() {
  return axios.get('/api/query/user_by_award_count');
}
export default {
  getOfficeByUserCount,
  getUserByAwardCount
};
