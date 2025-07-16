import React, { useState } from 'react';
import { Container, Box, Typography, Paper, TextField, Button, CircularProgress, Tooltip, IconButton, InputAdornment, MenuItem, Grid } from '@mui/material';
import ProfilePreview from '../components/ProfilePreview';
import { fetchMockJson } from '../utils/mockFetcher';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const MOCK_OPTIONS = [
  { label: 'Instagram (riya_shoots)', value: 'instagram_mock.json' },
  { label: 'LinkedIn (riya_kapoor)', value: 'linkedin_mock.json' },
  { label: 'Portfolio (riyakapoor.com)', value: 'portfolio_mock.json' },
  { label: 'Resume (PDF)', value: 'resume_mock.json' },
];

function HomePage() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [mockSelect, setMockSelect] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleClear = () => {
    setName('');
    setUrl('');
    setFile(null);
    setMockSelect('');
    setProfile(null);
    setError('');
  };

  const validateUrl = (value) => {
    if (!value) return true;
    try {
      new URL(value.startsWith('http') ? value : 'https://' + value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Always allow generating a new profile, even if one is already shown
    // (no need to clear profile first)
    // If mock profile is selected, skip validations
    if (mockSelect) {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(res => setTimeout(res, 1200));
        // Fetch only the selected mock
        const data = await fetchMockJson(mockSelect);
        // Always include the two provided work sample images
        data.workSamples = [
          'https://isardasorensen.wordpress.com/wp-content/uploads/2017/02/tp-pretty-pastel-sunset-nyc-2-16-17.jpg',
          'https://images.squarespace-cdn.com/content/v1/569e766e69492e9dd5373ef6/1578917036147-ZRZNULZBHVQ8HBK07TLD/london-night-tour-02.jpg?format=1000w'
        ];
        setProfile(data); // Always overwrite
      } catch (err) {
        setError('Failed to load mock profile.');
      } finally {
        setLoading(false);
      }
      return;
    }
    // Require BOTH a valid link and a resume file
    if (!url || !file) {
      setError('Both a valid link (Instagram, LinkedIn, or Portfolio) and a resume (PDF) are required.');
      return;
    }
    // Validate link type
    const validLink =
      url.includes('instagram.com') ||
      url.includes('linkedin.com') ||
      url.includes('riyakapoor.com') ||
      url.includes('portfolio');
    if (!validLink) {
      setError('Link must be Instagram, LinkedIn, or Portfolio.');
      return;
    }
    if (!validateUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(res => setTimeout(res, 1200));
      // Determine which mocks to load
      let sources = [];
      if (url.includes('instagram.com')) sources.push('instagram_mock.json');
      if (url.includes('linkedin.com')) sources.push('linkedin_mock.json');
      if (url.includes('riyakapoor.com')) sources.push('portfolio_mock.json');
      if (file) sources.push('resume_mock.json');
      if (sources.length === 0) sources.push('resume_mock.json'); // fallback
      // Remove duplicates
      sources = [...new Set(sources)];
      // Fetch and merge
      const dataArr = await Promise.all(sources.map(f => fetchMockJson(f)));
      // Merge logic: resume takes precedence for name, bio, skills; social for pic, hashtags, workSamples
      let merged = {};
      dataArr.forEach(data => {
        merged = {
          ...merged,
          ...data,
          name: data.name || merged.name,
          bio: data.bio || merged.bio,
          skills: data.skills || merged.skills,
          portfolioLinks: data.portfolioLinks || merged.portfolioLinks,
          workSamples: data.workSamples || merged.workSamples,
          profile_pic: data.profile_pic || merged.profile_pic,
          hashtags: data.hashtags || merged.hashtags,
          ai_tags: data.ai_tags || merged.ai_tags,
          creative_bio: data.creative_bio || merged.creative_bio,
          categories: data.categories || merged.categories,
          voice_intro: data.voice_intro || merged.voice_intro,
          voice_transcript: data.voice_transcript || merged.voice_transcript,
        };
      });
      // If user entered a name, override
      if (name) {
        merged.name = name;
        // Replace name in creative_bio if present
        if (merged.creative_bio) {
          merged.creative_bio = merged.creative_bio.replace(/Hi! I['’`]?m [^,]+/, `Hi! I'm ${name}`);
        }
      }
      // Only include the two provided work sample images
      merged.workSamples = [
        'https://isardasorensen.wordpress.com/wp-content/uploads/2017/02/tp-pretty-pastel-sunset-nyc-2-16-17.jpg',
        'https://images.squarespace-cdn.com/content/v1/569e766e69492e9dd5373ef6/1578917036147-ZRZNULZBHVQ8HBK07TLD/london-night-tour-02.jpg?format=1000w'
      ];
      setProfile(merged); // Always overwrite
    } catch (err) {
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'transparent', py: { xs: 4, md: 8 }, px: { xs: 1, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', mb: 6, p: { xs: 3, md: 6 }, background: '#fff', borderRadius: 6, boxShadow: '0 12px 48px 0 rgba(39,70,144,0.10)', border: '2px solid #a7c7e7' }}>
        <Typography variant="h4" align="center" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, color: '#274690', mb: 2 }}>
          🚀 Quickly build your profile with just a link or a resume!
        </Typography>
        <Typography align="center" sx={{ color: '#2b2d42', mb: 3, fontSize: 18 }}>
          Enter your details below. <b>Data will be extracted automatically</b> from your link or resume. <br />
          <span style={{ color: '#E12C2C' }}>No real uploads—just instant, beautiful previews!</span>
        </Typography>
        <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="If left blank, name will be fetched from your resume or link.">
                        <IconButton tabIndex={-1}>
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Instagram / LinkedIn / Portfolio Link"
                value={url}
                onChange={e => setUrl(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Paste your public profile link. Supported: Instagram, LinkedIn, Portfolio.">
                        <IconButton tabIndex={-1}>
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
                error={!!error && error.includes('URL')}
                helperText={error && error.includes('URL') ? error : ''}
              />
              <Box sx={{ mb: 2 }}>
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  id="resume-upload"
                  onChange={e => setFile(e.target.files[0])}
                />
                <label htmlFor="resume-upload">
                  <Button variant="outlined" component="span" sx={{ mr: 2, fontWeight: 700, color: '#274690', borderColor: '#274690' }}>
                    {file ? file.name : 'Upload Resume (PDF)'}
                  </Button>
                </label>
                <Tooltip title="For demo, you can also select a mock JSON below.">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: '#E12C2C', verticalAlign: 'middle' }} />
                </Tooltip>
              </Box>
              <TextField
                select
                label="Or select a mock profile (for testing)"
                value={mockSelect}
                onChange={e => setMockSelect(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">None</MenuItem>
                {MOCK_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, px: 4, py: 1, fontSize: 18 }} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Profile'}
                </Button>
                <Button type="button" variant="outlined" color="secondary" sx={{ fontWeight: 700, px: 3, py: 1, fontSize: 16 }} onClick={handleClear}>
                  Clear
                </Button>
              </Box>
            </form>
            <Typography align="center" sx={{ color: '#888', fontSize: 15 }}>
              <b>Tip:</b> Try <span style={{ color: '#E12C2C' }}>Instagram</span> or <span style={{ color: '#E12C2C' }}>Resume</span> for the most complete preview!
            </Typography>
      </Box>
      {profile && (
        <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', mb: 6 }}>
          <ProfilePreview profile={profile} />
        </Box>
      )}
    </Box>
  );
}

export default HomePage;