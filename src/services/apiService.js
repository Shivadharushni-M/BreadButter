import axios from 'axios';

const API_BASE_URL = '/api';

let token = null;
export const setToken = (newToken) => { token = newToken; };

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/profiles/login`, { username, password });
  setToken(response.data.token);
  return response.data;
};

export const submitLinks = async (links) => {
  const response = await axios.post(`${API_BASE_URL}/profiles/submit-links`, { links }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profiles`, profileData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfileById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};