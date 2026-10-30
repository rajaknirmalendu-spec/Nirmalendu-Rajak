export type Language = 'en' | 'bn' | 'hi';

export type SubjectId =
  | 'mathematics'
  | 'reasoning'
  | 'science'
  | 'history'
  | 'geography'
  | 'polity'
  | 'current_affairs'
  | 'general_awareness';

export type ExamId =
  | 'railway_ntpc'
  | 'railway_group_d'
  | 'railway_alp'
  | 'ssc_chsl'
  | 'ssc_cgl'
  | 'ssc_mts'
  | 'ssc_gd'
  | 'wbp_constable'
  | 'wbp_si'
  | 'other_govt';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface LocalizedQuestionText {
  question: string;
  options: [string, string, string, string];
  explanation: string;
  topicName: string;
}

export interface Question {
  id: string;
  examCategory: ExamId;
  subject: SubjectId;
  topicId: string;
  difficulty: DifficultyLevel;
  correctIndex: number; // 0 to 3
  content: {
    en: LocalizedQuestionText;
    bn: LocalizedQuestionText;
    hi: LocalizedQuestionText;
  };
}

export interface ActivePracticeSession {
  id: string;
  title: { en: string; bn: string; hi: string };
  mode: 'practice' | 'daily' | 'random' | 'bookmarks' | 'wrong_answers' | 'exam_practice';
  subjectFilter?: SubjectId;
  topicFilter?: string;
  examFilter?: ExamId;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, number>; // questionId -> selected option index
  startedAt: number;
  elapsedSeconds: number;
}

export interface MockTestConfig {
  title: { en: string; bn: string; hi: string };
  examId?: ExamId;
  questionCount: number; // e.g., 20, 50, 100
  durationMinutes: number; // e.g., 20, 45, 90
  positiveMarks: number; // e.g., 1, 2
  negativeMarks: number; // e.g., 0.25, 0.33, 0.5, 0
  subjectFilter?: SubjectId | 'all';
}

export interface ActiveMockSession {
  id: string;
  config: MockTestConfig;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, number>;
  markedForReview: string[];
  visitedIds: string[];
  startedAt: number;
  remainingSeconds: number;
}

export interface TestResultRecord {
  id: string;
  type: 'practice' | 'mock' | 'daily';
  title: { en: string; bn: string; hi: string };
  examId?: ExamId;
  subjectId?: SubjectId;
  completedAt: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  positiveMarks: number;
  negativeMarks: number;
  totalScore: number;
  maxScore: number;
  accuracy: number;
  timeTakenSeconds: number;
  questionIds: string[];
  userAnswers: Record<string, number>;
}

export interface UserOfflineStorage {
  language: Language;
  soundEnabled: boolean;
  bookmarkedIds: string[];
  wrongQuestionIds: string[];
  attemptedQuestionIds: string[];
  correctQuestionIds: string[];
  dailyQuizLastCompletedDate: string | null;
  dailyStreak: number;
  testHistory: TestResultRecord[];
  savedPracticeSession: ActivePracticeSession | null;
  savedMockSession: ActiveMockSession | null;
}

export type BottomNavTab = 'home' | 'exams' | 'practice' | 'results' | 'profile';
