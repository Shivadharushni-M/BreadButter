import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useProfileContext } from '../context/ProfileContext';
import { WithContext as ReactTagInput } from 'react-tag-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePreview from './ProfilePreview';
import { fetchMockJson } from '../utils/mockFetcher';

const MOCK_LINKS = [
  { label: 'Instagram', value: 'instagram.com/riya_shoots', file: 'instagram_mock.json' },
  { label: 'LinkedIn', value: 'linkedin.com/in/riya', file: 'linkedin_mock.json' },
  { label: 'Portfolio', value: 'riyakapoor.com', file: 'portfolio_mock.json' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  skills: Yup.string().required('Skills are required'),
  links: Yup.string()
    .test('has-linkedin-or-instagram', 'At least one LinkedIn or Instagram link is required', value => {
      if (!value) return false;
      const linksArr = value.split(',').map(l => l.trim().toLowerCase());
      return linksArr.some(link => link.includes('linkedin.com') || link.includes('instagram.com'));
    })
    .required('At least one LinkedIn or Instagram link is required'),
  resume: Yup.mixed().required('Resume file is required'),
});

function ProfileForm() {
  const [selectedMock, setSelectedMock] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMockSelect = async (e) => {
    setSelectedMock(e.target.value);
    // Do not set profile here; only set in handleSubmit if form is valid
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Final check: block submission if any required field is missing
    if (!values.name || !values.email || !values.skills || !values.links || !values.resume) {
      toast.error('All fields are required: Name, Email, Skills, LinkedIn/Instagram link, and Resume.');
      setSubmitting(false);
      return;
    }
    // Only set profile if all fields are present
    setProfile({
      name: values.name,
      email: values.email,
      skills: values.skills,
      links: values.links,
      resume: values.resume,
    });
    toast.success('Profile Created!');
    resetForm();
    setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={{ name: '', email: '', skills: '', links: '', resume: null }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue, isSubmitting, isValid, dirty }) => (
          <Form>
            <Grid container spacing={2} component={Paper} elevation={3} sx={{ background: '#e0ffff !important', p: 4, borderRadius: 4, boxShadow: 'none', animation: 'fadeInUp 1.2s cubic-bezier(.4,0,.2,1)' }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <ReactTagInput
                  tags={values.skills ? values.skills.split(',').map(s => ({ id: s, text: s })) : []}
                  handleDelete={i => {
                    const newTags = values.skills ? values.skills.split(',') : [];
                    newTags.splice(i, 1);
                    setFieldValue('skills', newTags.join(','));
                  }}
                  handleAddition={tag => {
                    const newTags = values.skills ? values.skills.split(',') : [];
                    newTags.push(tag.text);
                    setFieldValue('skills', newTags.join(','));
                  }}
                  placeholder="Add skills and press enter"
                  labelField="text"
                  inputFieldPosition="bottom"
                  autocomplete
                />
                {touched.skills && errors.skills && (
                  <Typography color="error">{errors.skills}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="links"
                  label="Portfolio/Links (comma separated, must include LinkedIn or Instagram)"
                  value={values.links}
                  onChange={handleChange}
                  fullWidth
                  error={touched.links && Boolean(errors.links)}
                  helperText={touched.links && errors.links}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  name="resume"
                  type="file"
                  onChange={e => setFieldValue('resume', e.currentTarget.files[0])}
                  accept=".pdf,.doc,.docx"
                />
                {touched.resume && errors.resume && (
                  <Typography color="error">{errors.resume}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  disabled={loading || isSubmitting || !isValid || !dirty}
                  fullWidth
                >
                  {loading ? 'Creating...' : 'Create Profile'}
                </Button>
              </Grid>
              <ToastContainer />
            </Grid>
          </Form>
        )}
      </Formik>
      {loading && <Typography>Loading preview...</Typography>}
      {profile && profile.name && profile.email && profile.skills && profile.links && profile.resume && (
        <ProfilePreview profile={profile} />
      )}
    </Box>
  );
}

export default ProfileForm;