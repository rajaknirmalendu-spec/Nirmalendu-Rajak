import { UserOfflineStorage } from '../types/quiz';

const STORAGE_KEY = 'TINYDB_QUIZ_MASTER_V1';

export const DEFAULT_OFFLINE_STORAGE: UserOfflineStorage = {
  language: 'en',
  soundEnabled: true,
  bookmarkedIds: ['QM-MATH-001', 'QM-SCI-001', 'QM-HIST-001', 'QM-POL-001'],
  wrongQuestionIds: [],
  attemptedQuestionIds: [],
  correctQuestionIds: [],
  dailyQuizLastCompletedDate: null,
  dailyStreak: 0,
  testHistory: [],
  savedPracticeSession: null,
  savedMockSession: null,
};

export function loadOfflineStorage(): UserOfflineStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_OFFLINE_STORAGE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_OFFLINE_STORAGE,
      ...parsed,
    };
  } catch {
    return DEFAULT_OFFLINE_STORAGE;
  }
}

export function saveOfflineStorage(data: UserOfflineStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota errors
  }
}

export function formatSeconds(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
