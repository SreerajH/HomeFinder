const STORAGE_KEY = 'homefinder:saved';

/**
 * Reads saved ids from localStorage. Wrapped in try/catch because storage can be
 * blocked (private mode, browser settings) or hold something that isn't valid JSON.
 */
export function loadSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function saveSavedIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or blocked: saving still works for this visit, it just won't survive a reload
  }
}
