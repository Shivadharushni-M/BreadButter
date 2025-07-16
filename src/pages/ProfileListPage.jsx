import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Chip, Typography } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import { fetchMockJson } from '../utils/mockFetcher';

const MOCK_FILES = [
  'instagram_mock.json',
  'linkedin_mock.json',
  'portfolio_mock.json',
  'resume_mock.json',
];

function ProfileListPage() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    Promise.all(MOCK_FILES.map(f => fetchMockJson(f))).then(setProfiles);
  }, []);

  const allTags = Array.from(new Set(profiles.flatMap(p => [...(p.skills || []), ...(p.hashtags || []), ...(p.ai_tags || [])])));

  const filtered = profiles.filter(profile => {
    const matchesSearch =
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      (profile.skills && profile.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())));
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag =>
        (profile.skills || []).includes(tag) ||
        (profile.hashtags || []).includes(tag) ||
        (profile.ai_tags || []).includes(tag)
      );
    return matchesSearch && matchesTags;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, serif', color: '#d90429', mb: 3, fontWeight: 700 }}>
        All Creator Profiles
      </Typography>
      <TextField
        label="Search by name or skill"
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
      />
      <Box sx={{ mb: 3 }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1, cursor: 'pointer', background: selectedTags.includes(tag) ? '#d90429' : '#e0e7ff', color: selectedTags.includes(tag) ? '#fff' : '#d90429' }}
          />
        ))}
      </Box>
      <Grid container spacing={3}>
        {filtered.map((profile, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <ProfileCard profile={profile} onView={() => window.alert('Implement detailed view navigation!')} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProfileListPage;