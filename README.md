# BreadButter Fullstack Assignment

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
BreadButter/
  BreadButter/
    public/
      mock/
        instagram_mock.json
        linkedin_mock.json
        portfolio_mock.json
        resume_mock.json
        ai_mock.json
    src/
      components/
        ProfilePreview.jsx
      utils/
        mockFetcher.js
      App.jsx
```

## Mocked vs Real
- **All data is mocked.**
- No real backend or database is used.
- JSON files in `public/mock/` simulate API responses.
- AI-generated bio and hashtags are also mocked in `ai_mock.json`.

## Assumptions
- No data is saved or persisted.
- All profile data is extracted, parsed, and displayed in-memory.
- The form and preview are always available; you can generate as many profiles as you want.

## Bonus Features (Mocked)
- AI-generated creative bio and hashtags are fetched from `ai_mock.json`.
- You can extend `ai_mock.json` to mock more AI features.

## How to Add More Mocks
- Add new JSON files to `public/mock/` and fetch them using `fetchMockJson` in the code.

## Contact
For questions, contact the project maintainer.