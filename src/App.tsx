/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Atom,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Download,
  FileQuestion,
  Flame,
  Globe,
  History,
  Home,
  Landmark,
  Newspaper,
  Play,
  RefreshCw,
  RotateCcw,
  Scale,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
  Upload,
  User,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import {
  ActiveMockSession,
  ActivePracticeSession,
  BottomNavTab,
  ExamId,
  Language,
  MockTestConfig,
  SubjectId,
  TestResultRecord,
  UserOfflineStorage,
} from './types/quiz';
import { EXAMS_METADATA, SUBJECTS_METADATA, UI_STRINGS } from './data/translations';
import {
  ALL_QUESTIONS,
  getDailyQuizQuestions,
  getQuestionById,
  getQuestionsByExam,
  getQuestionsBySubject,
  selectMockTestQuestions,
  shuffleArray,
} from './data/questionBank';
import {
  DEFAULT_OFFLINE_STORAGE,
  formatSeconds,
  loadOfflineStorage,
  saveOfflineStorage,
} from './utils/storage';
import { playFeedbackTone } from './utils/sound';
import { SplashScreenModal } from './components/SplashScreenModal';
import { MockConfigModal } from './components/MockConfigModal';
import { QuizPlayerModal } from './components/QuizPlayerModal';
import { NoCodeBlueprintModal } from './components/NoCodeBlueprintModal';

export default function App() {
  const [storage, setStorage] = useState<UserOfflineStorage>(() => loadOfflineStorage());
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [mockConfigExamId, setMockConfigExamId] = useState<ExamId | undefined>(undefined);
  const [showMockConfig, setShowMockConfig] = useState<boolean>(false);
  const [showBlueprintModal, setShowBlueprintModal] = useState<boolean>(false);

  // Active Quiz or Mock Session in modal player
  const [activePractice, setActivePractice] = useState<ActivePracticeSession | null>(null);
  const [activeMock, setActiveMock] = useState<ActiveMockSession | null>(null);

  // Practice screen filters
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId>('mathematics');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Results screen selected test record for inspection
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const language = storage.language;
  const t = UI_STRINGS[language];

  // Persist storage on every update
  useEffect(() => {
    saveOfflineStorage(storage);
  }, [storage]);

  const todayDateStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isDailyCompletedToday = storage.dailyQuizLastCompletedDate === todayDateStr;

  const setLanguage = (lang: Language) => {
    playFeedbackTone('click', storage.soundEnabled);
    setStorage((prev) => ({ ...prev, language: lang }));
  };

  const toggleSound = () => {
    setStorage((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleBookmark = (questionId: string) => {
    playFeedbackTone('click', storage.soundEnabled);
    setStorage((prev) => {
      const exists = prev.bookmarkedIds.includes(questionId);
      const next = exists
        ? prev.bookmarkedIds.filter((id) => id !== questionId)
        : [questionId, ...prev.bookmarkedIds];
      return { ...prev, bookmarkedIds: next };
    });
  };

  // Start Practice Set (20 questions or custom list)
  const startPracticeSession = (params: {
    title: { en: string; bn: string; hi: string };
    mode: ActivePracticeSession['mode'];
    questionIds: string[];
    subjectFilter?: SubjectId;
    topicFilter?: string;
    examFilter?: ExamId;
  }) => {
    if (params.questionIds.length === 0) return;
    playFeedbackTone('click', storage.soundEnabled);
    const newSession: ActivePracticeSession = {
      id: `PRAC-${Date.now()}`,
      title: params.title,
      mode: params.mode,
      subjectFilter: params.subjectFilter,
      topicFilter: params.topicFilter,
      examFilter: params.examFilter,
      questionIds: params.questionIds,
      currentIndex: 0,
      answers: {},
      startedAt: Date.now(),
      elapsedSeconds: 0,
    };
    setActivePractice(newSession);
    setStorage((prev) => ({ ...prev, savedPracticeSession: newSession }));
  };

  const handleLaunchDailyQuiz = () => {
    const dailyQs = getDailyQuizQuestions(todayDateStr);
    startPracticeSession({
      title: {
        en: `Daily Quiz (${todayDateStr})`,
        bn: `ডেইলি কুইজ (${todayDateStr})`,
        hi: `डेली क्विज़ (${todayDateStr})`,
      },
      mode: 'daily',
      questionIds: dailyQs.map((q) => q.id),
    });
  };

  const handleLaunchSubjectPractice = (subjectId: SubjectId, topicId: string = 'all') => {
    const subMeta = SUBJECTS_METADATA.find((s) => s.id === subjectId)!;
    const pool = getQuestionsBySubject(subjectId, topicId);
    const selected = shuffleArray(pool).slice(0, 20);
    const topicMeta = subMeta.topics.find((tp) => tp.id === topicId);

    startPracticeSession({
      title: {
        en: topicMeta ? `${subMeta.name.en}: ${topicMeta.name.en}` : `${subMeta.name.en} Practice (20 Q)`,
        bn: topicMeta ? `${subMeta.name.bn}: ${topicMeta.name.bn}` : `${subMeta.name.bn} অনুশীলন (২০ প্রশ্ন)`,
        hi: topicMeta ? `${subMeta.name.hi}: ${topicMeta.name.hi}` : `${subMeta.name.hi} अभ्यास (20 प्रश्न)`,
      },
      mode: 'practice',
      subjectFilter: subjectId,
      topicFilter: topicId,
      questionIds: selected.map((q) => q.id),
    });
  };

  const handleLaunchExamPractice = (examId: ExamId) => {
    const examMeta = EXAMS_METADATA.find((e) => e.id === examId)!;
    const pool = getQuestionsByExam(examId);
    const selected = shuffleArray(pool.length >= 20 ? pool : ALL_QUESTIONS).slice(0, 20);
    startPracticeSession({
      title: {
        en: `${examMeta.name.en} Practice Set (20 Q)`,
        bn: `${examMeta.name.bn} প্র্যাকটিস সেট (২০ প্রশ্ন)`,
        hi: `${examMeta.name.hi} अभ्यास सेट (20 प्रश्न)`,
      },
      mode: 'exam_practice',
      examFilter: examId,
      questionIds: selected.map((q) => q.id),
    });
  };

  const handleLaunchRandomMode = () => {
    const selected = shuffleArray(ALL_QUESTIONS).slice(0, 20);
    startPracticeSession({
      title: {
        en: 'Random 20-Question Challenge',
        bn: 'র‍্যান্ডম ২০-প্রশ্নের অনুশীলন',
        hi: 'रैंडम 20-प्रश्न अभ्यास',
      },
      mode: 'random',
      questionIds: selected.map((q) => q.id),
    });
  };

  const handleLaunchBookmarkPractice = () => {
    if (storage.bookmarkedIds.length === 0) return;
    startPracticeSession({
      title: {
        en: `Bookmarked Questions (${storage.bookmarkedIds.length} Q)`,
        bn: `বুকমার্ক করা প্রশ্ন (${storage.bookmarkedIds.length} প্রশ্ন)`,
        hi: `बुकमार्क किए गए प्रश्न (${storage.bookmarkedIds.length} प्रश्न)`,
      },
      mode: 'bookmarks',
      questionIds: storage.bookmarkedIds.slice(0, 20),
    });
  };

  const handleLaunchWrongPractice = (customIds?: string[]) => {
    const targetIds = customIds && customIds.length > 0 ? customIds : storage.wrongQuestionIds;
    if (targetIds.length === 0) return;
    startPracticeSession({
      title: {
        en: `Retry Incorrect Questions (${targetIds.length} Q)`,
        bn: `ভুল প্রশ্নের পুনরায় অনুশীলন (${targetIds.length} প্রশ্ন)`,
        hi: `गलत प्रश्नों का पुनः अभ्यास (${targetIds.length} प्रश्न)`,
      },
      mode: 'wrong_answers',
      questionIds: targetIds.slice(0, 25),
    });
  };

  // Finish Practice Session & Record Result
  const handleFinishPractice = (session: ActivePracticeSession) => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const newAttempted = new Set(storage.attemptedQuestionIds);
    const newCorrect = new Set(storage.correctQuestionIds);
    const newWrong = new Set(storage.wrongQuestionIds);

    session.questionIds.forEach((qId) => {
      const q = getQuestionById(qId);
      const ans = session.answers[qId];
      if (!q || ans === undefined) {
        unattempted++;
      } else {
        newAttempted.add(qId);
        if (ans === q.correctIndex) {
          correct++;
          newCorrect.add(qId);
          newWrong.delete(qId);
        } else {
          wrong++;
          newWrong.add(qId);
        }
      }
    });

    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    const record: TestResultRecord = {
      id: `RES-${Date.now()}`,
      type: session.mode === 'daily' ? 'daily' : 'practice',
      title: session.title,
      examId: session.examFilter,
      subjectId: session.subjectFilter,
      completedAt: Date.now(),
      totalQuestions: session.questionIds.length,
      attempted,
      correct,
      wrong,
      unattempted,
      positiveMarks: 1,
      negativeMarks: 0,
      totalScore: correct,
      maxScore: session.questionIds.length,
      accuracy,
      timeTakenSeconds: session.elapsedSeconds,
      questionIds: session.questionIds,
      userAnswers: session.answers,
    };

    setStorage((prev) => ({
      ...prev,
      attemptedQuestionIds: Array.from(newAttempted),
      correctQuestionIds: Array.from(newCorrect),
      wrongQuestionIds: Array.from(newWrong),
      dailyQuizLastCompletedDate:
        session.mode === 'daily' ? todayDateStr : prev.dailyQuizLastCompletedDate,
      dailyStreak:
        session.mode === 'daily' && prev.dailyQuizLastCompletedDate !== todayDateStr
          ? prev.dailyStreak + 1
          : prev.dailyStreak,
      testHistory: [record, ...prev.testHistory],
      savedPracticeSession: null,
    }));

    setActivePractice(null);
    setSelectedResultId(record.id);
    setActiveTab('results');
  };

  // Start Mock Examination
  const handleStartMockExam = (config: MockTestConfig) => {
    const questions = selectMockTestQuestions(
      config.questionCount,
      config.examId,
      config.subjectFilter
    );
    const qIds = questions.map((q) => q.id);
    const mockSession: ActiveMockSession = {
      id: `MOCK-${Date.now()}`,
      config,
      questionIds: qIds,
      currentIndex: 0,
      answers: {},
      markedForReview: [],
      visitedIds: qIds.length > 0 ? [qIds[0]] : [],
      startedAt: Date.now(),
      remainingSeconds: config.durationMinutes * 60,
    };
    setShowMockConfig(false);
    setActiveMock(mockSession);
    setStorage((prev) => ({ ...prev, savedMockSession: mockSession }));
  };

  // Submit Mock Examination
  const handleSubmitMockExam = (session: ActiveMockSession) => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const newAttempted = new Set(storage.attemptedQuestionIds);
    const newCorrect = new Set(storage.correctQuestionIds);
    const newWrong = new Set(storage.wrongQuestionIds);

    session.questionIds.forEach((qId) => {
      const q = getQuestionById(qId);
      const ans = session.answers[qId];
      if (!q || ans === undefined) {
        unattempted++;
      } else {
        newAttempted.add(qId);
        if (ans === q.correctIndex) {
          correct++;
          newCorrect.add(qId);
          newWrong.delete(qId);
        } else {
          wrong++;
          newWrong.add(qId);
        }
      }
    });

    const attempted = correct + wrong;
    const rawScore =
      correct * session.config.positiveMarks - wrong * session.config.negativeMarks;
    const totalScore = Number(rawScore.toFixed(2));
    const maxScore = session.questionIds.length * session.config.positiveMarks;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const timeTakenSeconds = Math.max(
      1,
      session.config.durationMinutes * 60 - session.remainingSeconds
    );

    const record: TestResultRecord = {
      id: `RES-${Date.now()}`,
      type: 'mock',
      title: session.config.title,
      examId: session.config.examId,
      completedAt: Date.now(),
      totalQuestions: session.questionIds.length,
      attempted,
      correct,
      wrong,
      unattempted,
      positiveMarks: session.config.positiveMarks,
      negativeMarks: session.config.negativeMarks,
      totalScore,
      maxScore,
      accuracy,
      timeTakenSeconds,
      questionIds: session.questionIds,
      userAnswers: session.answers,
    };

    setStorage((prev) => ({
      ...prev,
      attemptedQuestionIds: Array.from(newAttempted),
      correctQuestionIds: Array.from(newCorrect),
      wrongQuestionIds: Array.from(newWrong),
      testHistory: [record, ...prev.testHistory],
      savedMockSession: null,
    }));

    setActiveMock(null);
    setSelectedResultId(record.id);
    setActiveTab('results');
  };

  // Offline Backup & Restore handlers
  const handleExportBackup = () => {
    const blob = new Blob([JSON.stringify(storage, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_master_backup_${todayDateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result));
        if (parsed && typeof parsed === 'object') {
          setStorage({
            ...DEFAULT_OFFLINE_STORAGE,
            ...parsed,
          });
        }
      } catch {
        // Invalid file
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    setStorage({
      ...DEFAULT_OFFLINE_STORAGE,
      language: storage.language,
    });
    setSelectedResultId(null);
    setShowResetConfirm(false);
  };

  // Overall stats
  const overallAccuracy = useMemo(() => {
    if (storage.attemptedQuestionIds.length === 0) return 0;
    return Math.round(
      (storage.correctQuestionIds.length / storage.attemptedQuestionIds.length) * 100
    );
  }, [storage.attemptedQuestionIds, storage.correctQuestionIds]);

  const activeResultRecord = useMemo(() => {
    if (selectedResultId) {
      const found = storage.testHistory.find((r) => r.id === selectedResultId);
      if (found) return found;
    }
    return storage.testHistory[0] || null;
  }, [selectedResultId, storage.testHistory]);

  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="h-5 w-5" />;
      case 'BrainCircuit':
        return <BrainCircuit className="h-5 w-5" />;
      case 'Atom':
        return <Atom className="h-5 w-5" />;
      case 'Landmark':
        return <Landmark className="h-5 w-5" />;
      case 'Globe':
        return <Globe className="h-5 w-5" />;
      case 'Scale':
        return <Scale className="h-5 w-5" />;
      case 'Newspaper':
        return <Newspaper className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D242B] pb-24">
      {/* Splash Screen Modal */}
      {showSplash && (
        <SplashScreenModal
          language={language}
          onDismiss={() => setShowSplash(false)}
        />
      )}

      {/* Mock Test Configuration Modal */}
      {showMockConfig && (
        <MockConfigModal
          language={language}
          initialExamId={mockConfigExamId}
          onClose={() => setShowMockConfig(false)}
          onStartMock={handleStartMockExam}
        />
      )}

      {/* MIT App Inventor & No-Code Architecture Blueprint Modal */}
      {showBlueprintModal && (
        <NoCodeBlueprintModal onClose={() => setShowBlueprintModal(false)} />
      )}

      {/* Active Quiz or Mock Test Player */}
      {(activePractice || activeMock) && (
        <QuizPlayerModal
          language={language}
          onChangeLanguage={setLanguage}
          soundEnabled={storage.soundEnabled}
          bookmarkedIds={storage.bookmarkedIds}
          onToggleBookmark={toggleBookmark}
          practiceSession={activePractice}
          mockSession={activeMock}
          onUpdatePractice={(updated) => {
            setActivePractice(updated);
            setStorage((prev) => ({ ...prev, savedPracticeSession: updated }));
          }}
          onFinishPractice={handleFinishPractice}
          onPausePractice={() => setActivePractice(null)}
          onUpdateMock={(updated) => {
            setActiveMock(updated);
            setStorage((prev) => ({ ...prev, savedMockSession: updated }));
          }}
          onSubmitMock={handleSubmitMockExam}
        />
      )}

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-30 border-b border-[#C7EEFF] bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="text-lg font-extrabold tracking-tight text-[#0077C0] whitespace-nowrap shrink-0 cursor-pointer"
          >
            QUIZ MASTER
          </button>

          {/* Zone 2: Clean single-line language selector tabs */}
          <nav className="flex items-center gap-1 rounded-lg bg-[#FAFAFA] p-1 border border-[#C7EEFF]">
            {(
              [
                { code: 'bn', label: 'বাংলা' },
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी' },
              ] as Array<{ code: Language; label: string }>
            ).map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === item.code
                    ? 'bg-[#0077C0] text-white'
                    : 'text-[#1D242B] hover:text-[#0077C0]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMockConfigExamId(undefined);
                setShowMockConfig(true);
              }}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#0077C0] rounded-xl hover:bg-[#0077C0]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.mockTestBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Viewport Container */}
      <main className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
        {/* ================= TAB 1: HOME DASHBOARD ================= */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Welcome & Quick Stats Banner */}
            <section className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#0077C0] tracking-wide">
                    {t.tagline}
                  </p>
                  <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1D242B]">
                    {t.welcomeTitle}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-[#1D242B]/75">
                    {t.welcomeSub}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowBlueprintModal(true)}
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-4 py-2.5 text-xs font-bold text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
                  >
                    <Cpu className="h-4 w-4 text-[#0077C0]" />
                    {t.noCodeGuideBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSplash(true)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-3.5 py-2.5 text-xs font-bold text-[#0077C0] hover:bg-[#C7EEFF]/40 cursor-pointer"
                  >
                    {t.splashBtn}
                  </button>
                </div>
              </div>

              {/* 4 Key Offline Metrics */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#C7EEFF]/60">
                <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                  <div className="text-xs font-medium text-[#1D242B]/70">
                    {t.totalAttempted}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#0077C0]">
                    {storage.attemptedQuestionIds.length} <span className="text-xs font-normal text-[#1D242B]/60">/ 800</span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                  <div className="text-xs font-medium text-[#1D242B]/70">
                    {t.overallAccuracy}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#1D242B]">
                    {overallAccuracy}%
                  </div>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                  <div className="text-xs font-medium text-[#1D242B]/70">
                    {t.testsCompleted}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#1D242B]">
                    {storage.testHistory.length}
                  </div>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                  <div className="text-xs font-medium text-[#1D242B]/70">
                    {t.bookmarkedCount}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#0077C0]">
                    {storage.bookmarkedIds.length}
                  </div>
                </div>
              </div>
            </section>

            {/* Primary Action Grid: Daily Quiz, Continue Practice & Full Mock Test */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Daily Quiz */}
              <div className="flex flex-col justify-between rounded-2xl bg-white border border-[#C7EEFF] p-5 shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0077C0]">
                    <span className="inline-flex items-center gap-1.5">
                      <Flame className="h-4 w-4" />
                      {t.dailyQuiz}
                    </span>
                    <span className="font-mono-tabular">
                      Streak: {storage.dailyStreak}d
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-[#1D242B]">
                    20 Daily Target Questions
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/75 leading-relaxed">
                    {t.dailyQuizDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchDailyQuiz}
                  className="mt-5 w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[#0077C0] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {isDailyCompletedToday ? `${t.completedToday} • Practice Again` : t.startDailyQuiz}
                </button>
              </div>

              {/* Card 2: Continue Practice / Resume Previous Practice */}
              <div className="flex flex-col justify-between rounded-2xl bg-white border border-[#C7EEFF] p-5 shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0077C0]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {t.continuePractice}
                    </span>
                    {storage.savedPracticeSession && (
                      <span className="font-mono-tabular">
                        {Object.keys(storage.savedPracticeSession.answers).length}/
                        {storage.savedPracticeSession.questionIds.length} Q
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-[#1D242B]">
                    {storage.savedPracticeSession
                      ? storage.savedPracticeSession.title[language]
                      : 'Instant 20-Q Practice Set'}
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/75 leading-relaxed">
                    {storage.savedPracticeSession
                      ? `Paused at Question ${storage.savedPracticeSession.currentIndex + 1} · Elapsed ${formatSeconds(
                          storage.savedPracticeSession.elapsedSeconds
                        )}`
                      : t.noSavedPractice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (storage.savedPracticeSession) {
                      setActivePractice(storage.savedPracticeSession);
                    } else {
                      handleLaunchRandomMode();
                    }
                  }}
                  className="mt-5 w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[#1D242B] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1D242B]/90 cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {storage.savedPracticeSession ? t.resumeNow : t.startQuickPractice}
                </button>
              </div>

              {/* Card 3: Quick Access to Mock Tests */}
              <div className="flex flex-col justify-between rounded-2xl bg-[#C7EEFF]/45 border border-[#0077C0]/30 p-5 shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0077C0]">
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      EXAM SIMULATION
                    </span>
                    <span className="font-mono-tabular">+1 / -0.25</span>
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-[#1D242B]">
                    {t.mockTestBannerTitle}
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/80 leading-relaxed">
                    {t.mockTestBannerDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (storage.savedMockSession) {
                      setActiveMock(storage.savedMockSession);
                    } else {
                      setMockConfigExamId('railway_ntpc');
                      setShowMockConfig(true);
                    }
                  }}
                  className="mt-5 w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[#0077C0] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {storage.savedMockSession ? 'Resume Active Mock Test' : t.launchMockTest}
                </button>
              </div>
            </section>

            {/* Exam Category Shortcuts */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-extrabold text-[#1D242B]">
                  {t.examShortcuts}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('exams')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0077C0] hover:underline cursor-pointer"
                >
                  {t.viewAllExams}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {EXAMS_METADATA.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col justify-between rounded-2xl bg-white border border-[#C7EEFF] p-4 hover:border-[#0077C0] transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#0077C0]">
                        {exam.code}
                      </div>
                      <h3 className="mt-1 text-sm font-bold text-[#1D242B] line-clamp-1">
                        {exam.name[language]}
                      </h3>
                      <p className="mt-1 text-xs text-[#1D242B]/70 font-mono-tabular">
                        {exam.defaultQuestions} Q · {exam.defaultDurationMins}m · +{exam.positiveMarks}/-{exam.negativeMarks}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-[#C7EEFF]/60">
                      <button
                        type="button"
                        onClick={() => handleLaunchExamPractice(exam.id)}
                        className="flex-1 min-h-[36px] rounded-lg bg-[#FAFAFA] border border-[#C7EEFF] px-2 py-1 text-[11px] font-bold text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
                      >
                        Practice
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMockConfigExamId(exam.id);
                          setShowMockConfig(true);
                        }}
                        className="flex-1 min-h-[36px] rounded-lg bg-[#0077C0] px-2 py-1 text-[11px] font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                      >
                        Mock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Subject-wise Progress & Recent Test Results Split */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Subject-wise Mastery */}
              <div className="lg:col-span-7 rounded-2xl bg-white border border-[#C7EEFF] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-[#1D242B]">
                    {t.subjectProgress}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('practice')}
                    className="text-xs font-bold text-[#0077C0] hover:underline cursor-pointer"
                  >
                    Open Practice Hub
                  </button>
                </div>

                <div className="space-y-3">
                  {SUBJECTS_METADATA.map((sub) => {
                    const subQuestions = getQuestionsBySubject(sub.id);
                    const attemptedInSub = subQuestions.filter((q) =>
                      storage.attemptedQuestionIds.includes(q.id)
                    ).length;
                    const correctInSub = subQuestions.filter((q) =>
                      storage.correctQuestionIds.includes(q.id)
                    ).length;
                    const pct = Math.round((attemptedInSub / subQuestions.length) * 100);

                    return (
                      <div
                        key={sub.id}
                        className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF]/80 p-3.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-[#1D242B]">
                            {sub.name[language]}
                          </span>
                          <span className="font-mono-tabular text-[#1D242B]/75">
                            {attemptedInSub}/100 Attempted · {correctInSub} Correct
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#C7EEFF]">
                          <div
                            className="h-full rounded-full bg-[#0077C0] transition-all"
                            style={{ width: `${Math.max(4, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Test Results */}
              <div className="lg:col-span-5 rounded-2xl bg-white border border-[#C7EEFF] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-[#1D242B]">
                    {t.recentResults}
                  </h2>
                  {storage.testHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('results')}
                      className="text-xs font-bold text-[#0077C0] hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  )}
                </div>

                {storage.testHistory.length === 0 ? (
                  <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-6 text-center space-y-3">
                    <BarChart3 className="mx-auto h-8 w-8 text-[#0077C0]" />
                    <p className="text-xs text-[#1D242B]/75 leading-relaxed">
                      {t.noRecentResults}
                    </p>
                    <button
                      type="button"
                      onClick={handleLaunchDailyQuiz}
                      className="min-h-[42px] rounded-xl bg-[#0077C0] px-4 py-2 text-xs font-bold text-white cursor-pointer"
                    >
                      {t.startDailyQuiz}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {storage.testHistory.slice(0, 5).map((res) => (
                      <button
                        key={res.id}
                        type="button"
                        onClick={() => {
                          setSelectedResultId(res.id);
                          setActiveTab('results');
                        }}
                        className="w-full text-left rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5 hover:border-[#0077C0] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#1D242B] truncate">
                            {res.title[language]}
                          </span>
                          <span className="font-mono-tabular text-xs font-extrabold text-[#0077C0] shrink-0">
                            {res.totalScore} / {res.maxScore}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#1D242B]/70 font-mono-tabular">
                          <span>Correct: {res.correct}</span>
                          <span aria-hidden="true">·</span>
                          <span>Wrong: {res.wrong}</span>
                          <span aria-hidden="true">·</span>
                          <span>Accuracy: {res.accuracy}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB 2: EXAMS SCREEN ================= */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1D242B]">
                Competitive Examinations Arena
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#1D242B]/75">
                Railway Recruitment Board (NTPC, Group D, ALP) · Staff Selection Commission (CHSL, CGL, MTS, GD) · West Bengal Police (Constable, SI) & State Government Exams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAMS_METADATA.map((exam) => {
                const examQuestions = getQuestionsByExam(exam.id);
                return (
                  <div
                    key={exam.id}
                    className="flex flex-col justify-between rounded-2xl bg-white border border-[#C7EEFF] p-5 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#0077C0] font-bold">
                        <span>{exam.code}</span>
                        <span className="font-mono-tabular">
                          {examQuestions.length} Direct Questions + 800 Full Bank
                        </span>
                      </div>
                      <h2 className="mt-1.5 text-lg font-extrabold text-[#1D242B]">
                        {exam.name[language]}
                      </h2>
                      <p className="mt-1 text-xs text-[#1D242B]/75">
                        {exam.conductingBody[language]}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#1D242B]/80 font-mono-tabular bg-[#FAFAFA] border border-[#C7EEFF] rounded-xl p-3">
                        <span>Questions: {exam.defaultQuestions}</span>
                        <span aria-hidden="true">·</span>
                        <span>Time: {exam.defaultDurationMins} Mins</span>
                        <span aria-hidden="true">·</span>
                        <span>Correct: +{exam.positiveMarks}</span>
                        <span aria-hidden="true">·</span>
                        <span>Wrong: -{exam.negativeMarks}</span>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleLaunchExamPractice(exam.id)}
                        className="min-h-[46px] flex items-center justify-center gap-1.5 rounded-xl border border-[#0077C0] bg-[#FAFAFA] px-4 py-2.5 text-xs font-bold text-[#0077C0] hover:bg-[#C7EEFF]/40 cursor-pointer"
                      >
                        <ClipboardList className="h-4 w-4" />
                        {t.practiceSetBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMockConfigExamId(exam.id);
                          setShowMockConfig(true);
                        }}
                        className="min-h-[46px] flex items-center justify-center gap-1.5 rounded-xl bg-[#0077C0] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        {t.mockTestBtn} ({exam.defaultQuestions} Q)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRACTICE SCREEN ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Special Practice Modes Strip: Random, Bookmarks, Wrong Answers */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0077C0]">
                    <Shuffle className="h-4 w-4" />
                    <span>800 QUESTION SHUFFLE</span>
                  </div>
                  <h2 className="mt-1.5 text-base font-extrabold text-[#1D242B]">
                    {t.randomMode}
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/75">
                    {t.randomModeDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchRandomMode}
                  className="mt-4 w-full min-h-[44px] rounded-xl bg-[#0077C0] text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                >
                  Start 20 Random Questions
                </button>
              </div>

              <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0077C0]">
                    <span className="inline-flex items-center gap-1.5">
                      <BookMarked className="h-4 w-4" />
                      SAVED REVISION
                    </span>
                    <span className="font-mono-tabular">{storage.bookmarkedIds.length} Saved</span>
                  </div>
                  <h2 className="mt-1.5 text-base font-extrabold text-[#1D242B]">
                    {t.bookmarkMode}
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/75">
                    {t.bookmarkModeDesc}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={storage.bookmarkedIds.length === 0}
                  onClick={handleLaunchBookmarkPractice}
                  className="mt-4 w-full min-h-[44px] rounded-xl bg-[#1D242B] text-xs font-bold text-white disabled:opacity-40 cursor-pointer"
                >
                  Practice Bookmarks ({storage.bookmarkedIds.length})
                </button>
              </div>

              <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0077C0]">
                    <span className="inline-flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4" />
                      ACCURACY BOOSTER
                    </span>
                    <span className="font-mono-tabular">{storage.wrongQuestionIds.length} Items</span>
                  </div>
                  <h2 className="mt-1.5 text-base font-extrabold text-[#1D242B]">
                    {t.wrongMode}
                  </h2>
                  <p className="mt-1 text-xs text-[#1D242B]/75">
                    {t.wrongModeDesc}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={storage.wrongQuestionIds.length === 0}
                  onClick={() => handleLaunchWrongPractice()}
                  className="mt-4 w-full min-h-[44px] rounded-xl bg-[#0077C0] text-xs font-bold text-white disabled:opacity-40 cursor-pointer"
                >
                  Practice Wrong Answers ({storage.wrongQuestionIds.length})
                </button>
              </div>
            </section>

            {/* Subject-wise & Topic-wise Practice Cards */}
            <section className="space-y-4">
              <h2 className="text-lg font-extrabold text-[#1D242B]">
                Subject-wise & Topic-wise Practice (100 Questions per Subject)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBJECTS_METADATA.map((sub) => {
                  const isExpanded = selectedSubjectFilter === sub.id;
                  return (
                    <div
                      key={sub.id}
                      className={`rounded-2xl bg-white border p-5 transition-colors ${
                        isExpanded ? 'border-[#0077C0]' : 'border-[#C7EEFF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C7EEFF]/60 text-[#0077C0]">
                            {renderSubjectIcon(sub.iconName)}
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-[#1D242B]">
                              {sub.name[language]}
                            </h3>
                            <p className="text-xs text-[#1D242B]/70">
                              100 {t.questionsCount} · 5 Topics
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLaunchSubjectPractice(sub.id, 'all')}
                          className="min-h-[40px] shrink-0 rounded-xl bg-[#0077C0] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                        >
                          {t.practiceSetBtn}
                        </button>
                      </div>

                      {/* Topic Breakdown List */}
                      <div className="mt-4 pt-3 border-t border-[#C7EEFF]/60 space-y-2">
                        <div className="text-xs font-bold text-[#1D242B]/75">
                          Topic-wise Sets (20 Questions Each):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sub.topics.map((tp) => (
                            <button
                              key={tp.id}
                              type="button"
                              onClick={() => {
                                setSelectedSubjectFilter(sub.id);
                                setSelectedTopicFilter(tp.id);
                                handleLaunchSubjectPractice(sub.id, tp.id);
                              }}
                              className="min-h-[40px] flex items-center justify-between gap-2 rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] px-3 py-2 text-left text-xs font-semibold text-[#1D242B] hover:border-[#0077C0] hover:bg-[#C7EEFF]/30 transition-colors cursor-pointer"
                            >
                              <span className="truncate">{tp.name[language]}</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0077C0]" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ================= TAB 4: RESULTS & ANALYTICS SCREEN ================= */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {!activeResultRecord ? (
              <div className="rounded-2xl bg-white border border-[#C7EEFF] p-8 text-center space-y-4">
                <BarChart3 className="mx-auto h-12 w-12 text-[#0077C0]" />
                <h2 className="text-xl font-extrabold text-[#1D242B]">
                  {t.scoreSummary}
                </h2>
                <p className="text-xs sm:text-sm text-[#1D242B]/75 max-w-md mx-auto">
                  {t.noRecentResults}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleLaunchDailyQuiz}
                    className="min-h-[46px] rounded-xl bg-[#0077C0] px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
                  >
                    {t.startDailyQuiz}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMockConfig(true)}
                    className="min-h-[46px] rounded-xl border border-[#0077C0] bg-white px-5 py-2.5 text-xs font-bold text-[#0077C0] cursor-pointer"
                  >
                    {t.launchMockTest}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Detailed Scorecard & Question Review */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C7EEFF]/60 pb-4">
                      <div>
                        <div className="text-xs font-bold text-[#0077C0]">
                          {activeResultRecord.type.toUpperCase()} RESULT
                        </div>
                        <h1 className="text-lg sm:text-xl font-extrabold text-[#1D242B]">
                          {activeResultRecord.title[language]}
                        </h1>
                        <p className="text-xs text-[#1D242B]/70 font-mono-tabular">
                          Completed: {new Date(activeResultRecord.completedAt).toLocaleString()}
                        </p>
                      </div>

                      {activeResultRecord.wrong > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const wrongInThisTest = activeResultRecord.questionIds.filter((qId) => {
                              const q = getQuestionById(qId);
                              const ans = activeResultRecord.userAnswers[qId];
                              return q && ans !== undefined && ans !== q.correctIndex;
                            });
                            handleLaunchWrongPractice(wrongInThisTest);
                          }}
                          className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-[#0077C0] px-4 py-2 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {t.retryWrongBtn} ({activeResultRecord.wrong})
                        </button>
                      )}
                    </div>

                    {/* 6 Metric Boxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl bg-[#C7EEFF]/45 border border-[#0077C0]/30 p-3.5">
                        <div className="text-xs font-medium text-[#1D242B]/80">
                          {t.totalScore}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-[#0077C0]">
                          {activeResultRecord.totalScore} / {activeResultRecord.maxScore}
                        </div>
                      </div>
                      <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                        <div className="text-xs font-medium text-[#1D242B]/80">
                          {t.accuracyPct}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-[#1D242B]">
                          {activeResultRecord.accuracy}%
                        </div>
                      </div>
                      <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                        <div className="text-xs font-medium text-[#1D242B]/80">
                          {t.timeTaken}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-[#1D242B]">
                          {formatSeconds(activeResultRecord.timeTakenSeconds)}
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5">
                        <div className="text-xs font-medium text-emerald-900">
                          {t.correctAnswers}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-emerald-700">
                          {activeResultRecord.correct}
                        </div>
                      </div>
                      <div className="rounded-xl bg-red-50/70 border border-red-200 p-3.5">
                        <div className="text-xs font-medium text-red-900">
                          {t.wrongAnswers}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-red-700">
                          {activeResultRecord.wrong}
                        </div>
                      </div>
                      <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5">
                        <div className="text-xs font-medium text-[#1D242B]/80">
                          {t.unattemptedQuestions}
                        </div>
                        <div className="mt-1 text-xl font-extrabold font-mono-tabular text-[#1D242B]">
                          {activeResultRecord.unattempted}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question-by-Question Review & Explanations */}
                  <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6 space-y-4">
                    <h2 className="text-base font-extrabold text-[#1D242B]">
                      {t.reviewQuestions}
                    </h2>

                    <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
                      {activeResultRecord.questionIds.map((qId, idx) => {
                        const q = getQuestionById(qId);
                        if (!q) return null;
                        const loc = q.content[language];
                        const userAns = activeResultRecord.userAnswers[qId];
                        const isCorrect = userAns === q.correctIndex;
                        const isSkipped = userAns === undefined;

                        return (
                          <div
                            key={qId}
                            className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-4 space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-mono-tabular font-bold text-[#0077C0]">
                                Q{idx + 1} · {q.id}
                              </span>
                              {isSkipped ? (
                                <span className="font-bold text-[#1D242B]/60">
                                  {t.unattemptedBadge}
                                </span>
                              ) : isCorrect ? (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {t.correctBadge}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-bold text-red-700">
                                  <XCircle className="h-3.5 w-3.5" />
                                  {t.wrongBadge}
                                </span>
                              )}
                            </div>

                            <p className="text-sm font-bold text-[#1D242B]">
                              {loc.question}
                            </p>

                            <div className="text-xs space-y-1">
                              {userAns !== undefined && userAns !== q.correctIndex && (
                                <div className="text-red-700 font-semibold">
                                  Your Answer: {loc.options[userAns]}
                                </div>
                              )}
                              <div className="text-emerald-700 font-bold">
                                Correct Answer: {loc.options[q.correctIndex]}
                              </div>
                            </div>

                            <div className="rounded-lg bg-[#C7EEFF]/40 p-2.5 text-xs text-[#1D242B]/90">
                              <span className="font-bold text-[#0077C0]">Explanation: </span>
                              {loc.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Previous Test History */}
                <div className="lg:col-span-4 rounded-2xl bg-white border border-[#C7EEFF] p-5 h-fit space-y-4">
                  <h2 className="text-base font-extrabold text-[#1D242B]">
                    {t.testHistoryTitle} ({storage.testHistory.length})
                  </h2>
                  <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                    {storage.testHistory.map((item) => {
                      const isSel = item.id === activeResultRecord.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedResultId(item.id)}
                          className={`w-full text-left rounded-xl border p-3.5 transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#C7EEFF]/50 border-[#0077C0]'
                              : 'bg-[#FAFAFA] border-[#C7EEFF] hover:border-[#0077C0]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#1D242B] truncate">
                              {item.title[language]}
                            </span>
                            <span className="font-mono-tabular text-xs font-extrabold text-[#0077C0]">
                              {item.totalScore}/{item.maxScore}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-[#1D242B]/70 font-mono-tabular">
                            <span>{item.accuracy}% Acc</span>
                            <span aria-hidden="true">·</span>
                            <span>{formatSeconds(item.timeTakenSeconds)}</span>
                            <span aria-hidden="true">·</span>
                            <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: PROFILE & SETTINGS SCREEN ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Settings, Language, Sound, Backup & Reset */}
              <div className="lg:col-span-6 space-y-5">
                <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-[#C7EEFF]/60">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0077C0] text-white">
                      <User className="h-7 w-7" />
                    </div>
                    <div>
                      <h1 className="text-lg font-extrabold text-[#1D242B]">
                        Competitive Exam Aspirant
                      </h1>
                      <p className="text-xs text-[#0077C0] font-semibold">
                        {t.offlineReady}
                      </p>
                    </div>
                  </div>

                  {/* Language Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#1D242B] mb-2">
                      {t.languageSetting}
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(
                        [
                          { code: 'bn', title: 'বাংলা', sub: 'Bengali' },
                          { code: 'en', title: 'English', sub: 'English' },
                          { code: 'hi', title: 'हिन्दी', sub: 'Hindi' },
                        ] as Array<{ code: Language; title: string; sub: string }>
                      ).map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => setLanguage(l.code)}
                          className={`min-h-[52px] rounded-xl border p-2.5 text-center transition-colors cursor-pointer ${
                            language === l.code
                              ? 'bg-[#0077C0] text-white border-[#0077C0]'
                              : 'bg-[#FAFAFA] text-[#1D242B] border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                          }`}
                        >
                          <div className="text-sm font-bold">{l.title}</div>
                          <div className="text-[10px] opacity-80">{l.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div className="flex items-center justify-between rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-4">
                    <div className="flex items-center gap-3">
                      {storage.soundEnabled ? (
                        <Volume2 className="h-5 w-5 text-[#0077C0]" />
                      ) : (
                        <VolumeX className="h-5 w-5 text-[#1D242B]/60" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-[#1D242B]">
                          {t.soundSetting}
                        </div>
                        <div className="text-xs text-[#1D242B]/70">
                          Offline Web Audio chimes on quiz answers
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleSound}
                      className={`min-h-[38px] rounded-lg px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        storage.soundEnabled
                          ? 'bg-[#0077C0] text-white'
                          : 'bg-[#C7EEFF] text-[#1D242B]'
                      }`}
                    >
                      {storage.soundEnabled ? 'ENABLED' : 'MUTED'}
                    </button>
                  </div>

                  {/* Offline Data Backup & Restore */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-bold text-[#1D242B]">
                      Offline Data Backup & Restore
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleExportBackup}
                        className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-4 py-2.5 text-xs font-bold text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
                      >
                        <Download className="h-4 w-4 text-[#0077C0]" />
                        {t.backupData}
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-4 py-2.5 text-xs font-bold text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 text-[#0077C0]" />
                        {t.restoreData}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* MIT App Inventor Blueprint & Splash Preview */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setShowBlueprintModal(true)}
                      className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077C0] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
                    >
                      <Cpu className="h-4 w-4" />
                      {t.noCodeGuideBtn}
                    </button>

                    {!showResetConfirm ? (
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(true)}
                        className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        {t.resetProgress}
                      </button>
                    ) : (
                      <div className="rounded-xl border border-red-300 bg-red-50 p-4 space-y-3">
                        <p className="text-xs font-semibold text-red-800">
                          {t.resetConfirm}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowResetConfirm(false)}
                            className="flex-1 min-h-[38px] rounded-lg bg-white border border-red-200 text-xs font-bold text-[#1D242B] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleResetProgress}
                            className="flex-1 min-h-[38px] rounded-lg bg-red-600 text-xs font-bold text-white cursor-pointer"
                          >
                            Confirm Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Bookmarked Questions & Wrong Answer Collection */}
              <div className="lg:col-span-6 space-y-5">
                {/* Bookmarked Questions Collection */}
                <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-[#1D242B]">
                      {t.bookmarkMode} ({storage.bookmarkedIds.length})
                    </h2>
                    {storage.bookmarkedIds.length > 0 && (
                      <button
                        type="button"
                        onClick={handleLaunchBookmarkPractice}
                        className="min-h-[36px] rounded-lg bg-[#0077C0] px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                      >
                        Practice All
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {storage.bookmarkedIds.map((qId) => {
                      const q = getQuestionById(qId);
                      if (!q) return null;
                      const loc = q.content[language];
                      return (
                        <div
                          key={qId}
                          className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[#0077C0] font-bold">
                            <span className="font-mono-tabular">{q.id}</span>
                            <button
                              type="button"
                              onClick={() => toggleBookmark(q.id)}
                              className="text-[#1D242B]/60 hover:text-red-600 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="font-semibold text-[#1D242B]">{loc.question}</p>
                          <p className="text-emerald-700 font-bold">
                            Ans: {loc.options[q.correctIndex]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Wrong Answer Collection */}
                <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-[#1D242B]">
                      {t.wrongMode} ({storage.wrongQuestionIds.length})
                    </h2>
                    {storage.wrongQuestionIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleLaunchWrongPractice()}
                        className="min-h-[36px] rounded-lg bg-[#0077C0] px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                      >
                        Retry All
                      </button>
                    )}
                  </div>

                  {storage.wrongQuestionIds.length === 0 ? (
                    <p className="text-xs text-[#1D242B]/70">
                      No wrong answers recorded yet. Any question you miss in Practice or Mock Tests will automatically appear here for targeted revision.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {storage.wrongQuestionIds.map((qId) => {
                        const q = getQuestionById(qId);
                        if (!q) return null;
                        const loc = q.content[language];
                        return (
                          <div
                            key={qId}
                            className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3 text-xs space-y-1"
                          >
                            <div className="font-mono-tabular font-bold text-[#0077C0]">
                              {q.id} · {loc.topicName}
                            </div>
                            <p className="font-semibold text-[#1D242B]">{loc.question}</p>
                            <p className="text-emerald-700 font-bold">
                              Correct Answer: {loc.options[q.correctIndex]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed 5-Tab Bottom Navigation Bar (#0077C0 Active, #1D242B Inactive) */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#C7EEFF] bg-white/95 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-5 items-center h-16 px-2">
          {(
            [
              { id: 'home', label: t.navHome, Icon: Home },
              { id: 'exams', label: t.navExams, Icon: BookOpen },
              { id: 'practice', label: t.navPractice, Icon: ClipboardList },
              { id: 'results', label: t.navResults, Icon: BarChart3 },
              { id: 'profile', label: t.navProfile, Icon: User },
            ] as Array<{
              id: BottomNavTab;
              label: string;
              Icon: React.ComponentType<{ className?: string }>;
            }>
          ).map(({ id, label, Icon }) => {
            const isSelected = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  playFeedbackTone('click', storage.soundEnabled);
                  setActiveTab(id);
                }}
                className={`flex flex-col items-center justify-center min-h-[48px] transition-colors cursor-pointer ${
                  isSelected ? 'text-[#0077C0]' : 'text-[#1D242B] hover:text-[#0077C0]/80'
                }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="mt-1 text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
