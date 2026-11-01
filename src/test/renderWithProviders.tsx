import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';

/**
 * Renders a component inside a brand-new Redux store, wired up exactly like the
 * real app (including localStorage persistence). A new store per test means
 * one test's saved listings or filters can never leak into the next.
 */
export function renderWithProviders(ui: ReactElement) {
  const store = createAppStore();
  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}
