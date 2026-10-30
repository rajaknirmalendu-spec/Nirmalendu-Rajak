import { ExamId, Question, SubjectId } from '../types/quiz';
import { generateMathQuestions, generateReasoningQuestions } from './questionsMathReasoning';
import { generateHistoryQuestions, generateScienceQuestions } from './questionsScienceHistory';
import { generateGeographyQuestions, generatePolityQuestions } from './questionsGeoPolity';
import { generateCurrentAffairsQuestions, generateGeneralAwarenessQuestions } from './questionsCaGk';

export const ALL_QUESTIONS: Question[] = [
  ...generateMathQuestions(),
  ...generateReasoningQuestions(),
  ...generateScienceQuestions(),
  ...generateHistoryQuestions(),
  ...generateGeographyQuestions(),
  ...generatePolityQuestions(),
  ...generateCurrentAffairsQuestions(),
  ...generateGeneralAwarenessQuestions(),
];

export const QUESTION_MAP: Map<string, Question> = new Map(
  ALL_QUESTIONS.map((q) => [q.id, q])
);

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP.get(id);
}

export function getQuestionsBySubject(subject: SubjectId, topicId?: string): Question[] {
  return ALL_QUESTIONS.filter(
    (q) => q.subject === subject && (!topicId || topicId === 'all' || q.topicId === topicId)
  );
}

export function getQuestionsByExam(examId: ExamId): Question[] {
  return ALL_QUESTIONS.filter((q) => q.examCategory === examId);
}

export function shuffleArray<T>(items: T[], seed?: number): T[] {
  const copy = [...items];
  let currentSeed = seed ?? Date.now();
  const nextRand = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor((seed !== undefined ? nextRand() : Math.random()) * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export function getDailyQuizQuestions(dateStr: string): Question[] {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) % 1000000007;
  }
  const shuffled = shuffleArray(ALL_QUESTIONS, hash);
  return shuffled.slice(0, 20);
}

export function selectMockTestQuestions(count: number, examId?: ExamId, subjectFilter?: SubjectId | 'all'): Question[] {
  let pool = ALL_QUESTIONS;
  if (subjectFilter && subjectFilter !== 'all') {
    pool = ALL_QUESTIONS.filter((q) => q.subject === subjectFilter);
  } else if (examId) {
    // Prioritize questions tagged with this exam, then fill balanced across syllabus subjects
    const examTagged = ALL_QUESTIONS.filter((q) => q.examCategory === examId);
    const others = ALL_QUESTIONS.filter((q) => q.examCategory !== examId);
    pool = [...shuffleArray(examTagged), ...shuffleArray(others)];
    return pool.slice(0, Math.min(count, ALL_QUESTIONS.length));
  }
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}
