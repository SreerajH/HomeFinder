import '@testing-library/jest-dom/vitest';

// Saved listings are persisted to localStorage, so wipe it between tests
afterEach(() => {
  localStorage.clear();
});
