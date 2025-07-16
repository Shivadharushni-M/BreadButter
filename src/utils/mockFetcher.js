// Utility to fetch local mock JSON files from public/mock/
export async function fetchMockJson(file) {
  // Accepts: 'instagram_mock.json', 'resume_mock.json', 'ai_mock.json', etc.
  const response = await fetch(`/mock/${file}`);
  if (!response.ok) throw new Error('Mock fetch failed');
  return await response.json();
} 