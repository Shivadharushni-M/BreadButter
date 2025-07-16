const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF and Word documents are allowed!');
    }
  }
});

// Remove all MongoDB, Mongoose, and Profile model imports and logic
// Remove all caching logic
// Add fs to read local JSON files
// Remove duplicate require('path')
// Only keep one: const path = require('path');

// Helper to load mock JSON
function loadMockJson(filename) {
  const filePath = path.join(__dirname, '../../public/mock', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Simulate parsing logic for links
function parseLink(url) {
  if (url.includes('linkedin.com')) {
    return loadMockJson('linkedin_mock.json');
  }
  if (url.includes('instagram.com')) {
    return loadMockJson('instagram_mock.json');
  }
  // Default fallback
  return { name: 'Unknown', bio: '', skills: [], portfolioLinks: [url], workSamples: [] };
}

// Simulate resume parsing
async function parseResume(buffer) {
  // Always return resume_mock.json
  return loadMockJson('resume_mock.json');
}

// API endpoint to handle link submission
exports.submitLinks = async (req, res) => {
  try {
    const { links } = req.body;
    if (!links || !Array.isArray(links)) {
      return res.status(400).json({ message: 'Links are required and must be an array.' });
    }
    // Parse each link using mocked data
    const parsedResults = links.map(parseLink);
    // Merge results (simple merge for demo)
    let merged = { name: '', bio: '', skills: [], portfolioLinks: [], workSamples: [] };
    parsedResults.forEach(result => {
      if (result.name && !merged.name) merged.name = result.name;
      if (result.bio && !merged.bio) merged.bio = result.bio;
      merged.skills = [...new Set([...merged.skills, ...(result.skills || [])])];
      merged.portfolioLinks = [...new Set([...merged.portfolioLinks, ...(result.portfolioLinks || [])])];
      merged.workSamples = [...new Set([...merged.workSamples, ...(result.workSamples || [])])];
    });
    res.json(merged);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// API endpoint to handle resume upload
exports.createProfile = async (req, res) => {
  try {
    // Simulate parsing resume and return mocked data
    const parsedData = loadMockJson('resume_mock.json');
    res.status(201).json(parsedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    // Caching
    // The original code had profileCache and cacheTimestamp, but no actual database.
    // This function will now return an empty array or a placeholder.
    // For now, returning an empty array as there's no persistent data.
    res.json([]); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    // The original code had Profile model, which is removed.
    // This function will now return a placeholder or throw an error.
    // For now, returning a placeholder.
    res.json({ message: 'Profile not found' }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a controller to serve any mock profile JSON
exports.getMockProfile = (filename, res) => {
  try {
    const data = loadMockJson(filename);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: 'Mock profile not found' });
  }
};

// Simple authentication (mocked)
const USERS = [{ username: 'admin', password: 'password' }];
const JWT_SECRET = 'supersecret';

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.uploadMiddleware = upload.single('resume');