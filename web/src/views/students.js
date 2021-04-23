import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/students';

export default {
  async getStudents() {
    return await axios.get(API_URL, {});
  },

  async createStudent(ra, name, cpf, email) {
    const response = await axios.post(API_URL, {
      ra, name, cpf, email
    });
    return response.data;
  },

  async getStudent(ra) {
    const response = await axios.get(`${API_URL}/${ra}`);
    return response.data;
  },

  async updateStudent(ra, name, email, id) {
    const response = await axios.put(`${API_URL}/${id}`, { name, email });
    return response.data;
  },

  async deleteStudent(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
