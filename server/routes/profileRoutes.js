const express = require('express');
const router = express.Router();
const {
  createProfile,
  submitLinks,
  login,
  getProfiles,
  getProfileById,
  getMockProfile
} = require('../controllers/profileController');

router.post('/login', login);
router.post('/', createProfile);
router.post('/submit-links', submitLinks);
router.get('/', getProfiles);
router.get('/:id', getProfileById);

// Add endpoints for mocked profiles
router.get('/mock/instagram', (req, res) => getMockProfile('instagram_mock.json', res));
router.get('/mock/resume', (req, res) => getMockProfile('resume_mock.json', res));
router.get('/mock/ai', (req, res) => getMockProfile('ai_mock.json', res));
router.get('/mock/portfolio', (req, res) => getMockProfile('portfolio_mock.json', res));
router.get('/mock/linkedin', (req, res) => getMockProfile('linkedin_mock.json', res));

module.exports = router;