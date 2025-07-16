import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProfileListPage from './pages/ProfileListPage';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/Header';
import ProfilePreview from './components/ProfilePreview';
import { fetchMockJson } from './utils/mockFetcher';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MockProfilePage() {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let file = '';
    if (name.toLowerCase().includes('instagram')) file = 'instagram_mock.json';
    else if (name.toLowerCase().includes('linkedin')) file = 'linkedin_mock.json';
    else if (name.toLowerCase().includes('portfolio')) file = 'portfolio_mock.json';
    else if (name.toLowerCase().includes('riya') || name.toLowerCase().includes('kapoor')) file = 'instagram_mock.json';
    else file = 'resume_mock.json';
    fetchMockJson(file).then(data => {
      // Format the name from the URL param (capitalize each word)
      const formattedName = name
        .split(/[-_\s]/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      // Always use the two required work sample images
      const workSamples = [
        'https://isardasorensen.wordpress.com/wp-content/uploads/2017/02/tp-pretty-pastel-sunset-nyc-2-16-17.jpg',
        'https://images.squarespace-cdn.com/content/v1/569e766e69492e9dd5373ef6/1578917036147-ZRZNULZBHVQ8HBK07TLD/london-night-tour-02.jpg?format=1000w'
      ];
      setProfile({
        ...data,
        name: formattedName,
        workSamples,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [name]);
  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading profile...</div>;
  if (!profile) return <div style={{textAlign:'center',marginTop:40}}>Profile not found.</div>;
  return <ProfilePreview profile={profile} readOnly={true} />;
}

function App() {
  return (
    <ProfileProvider>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiles" element={<ProfileListPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/mock/:name" element={<MockProfilePage />} />
        </Routes>
      </Layout>
    </ProfileProvider>
  );
}

export default App;