import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/profiles', profileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfiles([...profiles, response.data]);
      setCurrentProfile(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating profile');
      setLoading(false);
      throw err;
    }
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/profiles');
      setProfiles(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profiles');
      setLoading(false);
    }
  };

  const fetchProfileById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/profiles/${id}`);
      setCurrentProfile(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
      setLoading(false);
      throw err;
    }
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      currentProfile,
      loading,
      error,
      createProfile,
      fetchProfiles,
      fetchProfileById,
      setCurrentProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};