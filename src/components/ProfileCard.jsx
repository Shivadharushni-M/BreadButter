import React from 'react';
import { Paper, Typography, Box, Chip, Avatar, Button, Grid } from '@mui/material';

function ProfileCard({ profile, onView }) {
  const {
    name,
    bio,
    profile_pic,
    skills = [],
    hashtags = [],
    ai_tags = [],
    categories = [],
  } = profile;

  return (
    <Paper elevation={3} className="card" sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', overflow: 'visible', background: 'transparent', boxShadow: 'none' }}>
      {categories && categories.length > 0 && (
        <div className="category-label" style={{ position: 'absolute', top: 24, left: 24, zIndex: 2 }}>{categories[0]}</div>
      )}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Avatar src={profile_pic} alt={name} sx={{ width: 80, height: 80, border: '3px solid #E12C2C', margin: '0 auto', boxShadow: '0 2px 8px #e3f0ff' }} imgProps={{ className: 'fade-in' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif', color: '#E12C2C', fontWeight: 700, mb: 1 }}>{name}</Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif', color: '#2b2d42', mb: 2 }}>{bio}</Typography>
          <Box sx={{ mb: 2 }}>
            {skills.map((skill, idx) => (
              <Chip key={idx} label={skill} color="primary" sx={{ mr: 1, mb: 1 }} />
            ))}
            {hashtags.map((tag, idx) => (
              <Chip key={idx} label={tag} sx={{ mr: 1, mb: 1, background: '#e0e7ff', color: '#E12C2C' }} />
            ))}
            {ai_tags.map((tag, idx) => (
              <Chip key={idx} label={tag} sx={{ mr: 1, mb: 1, background: '#f0fdfa', color: '#047857' }} />
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={onView} sx={{ mt: 1, fontWeight: 700, borderRadius: 2, px: 4, py: 1, fontSize: 16 }}>
            View Details
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileCard;