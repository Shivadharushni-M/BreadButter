import React, { useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  Button 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { useReactToPrint } from 'react-to-print';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProfile, fetchProfileById, loading } = useProfileContext();
  const cardRef = useRef();
  const handlePrint = useReactToPrint({ content: () => cardRef.current });

  useEffect(() => {
    fetchProfileById(id);
  }, [id]);

  if (loading || !currentProfile) {
    return <Typography>Loading...</Typography>; // Replace with skeleton loader if desired
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, background: '#e0ffff !important', boxShadow: 'none', animation: 'fadeInUp 1.2s cubic-bezier(.4,0,.2,1)' }} ref={cardRef}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {currentProfile.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {currentProfile.email}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Skills</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {currentProfile.skills.map((skill, index) => (
                <Grid item key={index}>
                  <Chip 
                    label={skill} 
                    color="primary" 
                    variant="outlined" 
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {currentProfile.portfolioLinks && currentProfile.portfolioLinks.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6">Portfolio Links</Typography>
              <Grid container spacing={1}>
                {currentProfile.portfolioLinks.map((link, idx) => (
                  <Grid item key={idx}>
                    <Button href={link} target="_blank" variant="outlined">
                      {link.includes('linkedin') ? 'LinkedIn' : link.includes('instagram') ? 'Instagram' : 'Link'}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {currentProfile.workSamples && currentProfile.workSamples.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6">Work Samples</Typography>
              <Grid container spacing={1}>
                {currentProfile.workSamples.map((sample, idx) => (
                  <Grid item key={idx}>
                    <Button href={sample} target="_blank" variant="outlined">
                      {sample.includes('drive') ? 'Google Drive' : 'Sample'}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {currentProfile.resumeUrl && (
            <Grid item xs={12}>
              <Typography variant="h6">Resume</Typography>
              <Button
                variant="contained"
                color="primary"
                href={`http://localhost:5000/${currentProfile.resumeUrl}`}
                target="_blank"
              >
                View Resume
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/profiles')}
            >
              Back to Profiles
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrint}
              sx={{ ml: 2 }}
            >
              Download as PDF
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <style>{`
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: none; }
}
`}</style>
    </Container>
  );
}

export default ProfilePage;