import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  LayoutGrid,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react';
import {
  ActiveMockSession,
  ActivePracticeSession,
  Language,
} from '../types/quiz';
import { EXAMS_METADATA, SUBJECTS_METADATA, UI_STRINGS } from '../data/translations';
import { getQuestionById } from '../data/questionBank';
import { formatSeconds } from '../utils/storage';
import { playFeedbackTone } from '../utils/sound';

interface QuizPlayerModalProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  soundEnabled: boolean;
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  practiceSession: ActivePracticeSession | null;
  mockSession: ActiveMockSession | null;
  onUpdatePractice: (session: ActivePracticeSession) => void;
  onFinishPractice: (session: ActivePracticeSession) => void;
  onPausePractice: () => void;
  onUpdateMock: (session: ActiveMockSession) => void;
  onSubmitMock: (session: ActiveMockSession) => void;
}

export const QuizPlayerModal: React.FC<QuizPlayerModalProps> = ({
  language,
  onChangeLanguage,
  soundEnabled,
  bookmarkedIds,
  onToggleBookmark,
  practiceSession,
  mockSession,
  onUpdatePractice,
  onFinishPractice,
  onPausePractice,
  onUpdateMock,
  onSubmitMock,
}) => {
  const isMock = Boolean(mockSession);
  const t = UI_STRINGS[language];
  const [showPalette, setShowPalette] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Timer effect for Practice (elapsed count up) & Mock (countdown with auto-submit)
  useEffect(() => {
    if (!practiceSession && !mockSession) return;
    const timer = setInterval(() => {
      if (practiceSession) {
        onUpdatePractice({
          ...practiceSession,
          elapsedSeconds: practiceSession.elapsedSeconds + 1,
        });
      } else if (mockSession) {
        if (mockSession.remainingSeconds <= 1) {
          clearInterval(timer);
          playFeedbackTone('finish', soundEnabled);
          onSubmitMock({
            ...mockSession,
            remainingSeconds: 0,
          });
        } else {
          onUpdateMock({
            ...mockSession,
            remainingSeconds: mockSession.remainingSeconds - 1,
          });
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [practiceSession, mockSession, soundEnabled]);

  const activeQuestionIds = isMock
    ? mockSession!.questionIds
    : practiceSession!.questionIds;
  const currentIndex = isMock
    ? mockSession!.currentIndex
    : practiceSession!.currentIndex;
  const currentQuestionId = activeQuestionIds[currentIndex];
  const question = getQuestionById(currentQuestionId);

  if (!question) return null;

  const localized = question.content[language];
  const isBookmarked = bookmarkedIds.includes(question.id);
  const answersMap = isMock ? mockSession!.answers : practiceSession!.answers;
  const selectedOption = answersMap[question.id];
  const hasAnswered = selectedOption !== undefined;

  const subjectObj = SUBJECTS_METADATA.find((s) => s.id === question.subject);
  const examObj = EXAMS_METADATA.find((e) => e.id === question.examCategory);

  const handleSelectOption = (optIndex: number) => {
    if (isMock && mockSession) {
      playFeedbackTone('click', soundEnabled);
      const nextVisited = mockSession.visitedIds.includes(question.id)
        ? mockSession.visitedIds
        : [...mockSession.visitedIds, question.id];
      onUpdateMock({
        ...mockSession,
        answers: {
          ...mockSession.answers,
          [question.id]: optIndex,
        },
        visitedIds: nextVisited,
      });
    } else if (practiceSession) {
      // In practice mode, lock answer once selected and give immediate feedback
      if (hasAnswered) return;
      const isCorrect = optIndex === question.correctIndex;
      playFeedbackTone(isCorrect ? 'correct' : 'wrong', soundEnabled);
      onUpdatePractice({
        ...practiceSession,
        answers: {
          ...practiceSession.answers,
          [question.id]: optIndex,
        },
      });
    }
  };

  const handleClearMockResponse = () => {
    if (!mockSession) return;
    const copy = { ...mockSession.answers };
    delete copy[question.id];
    onUpdateMock({
      ...mockSession,
      answers: copy,
    });
  };

  const handleToggleMarkReview = () => {
    if (!mockSession) return;
    const exists = mockSession.markedForReview.includes(question.id);
    const nextMarked = exists
      ? mockSession.markedForReview.filter((id) => id !== question.id)
      : [...mockSession.markedForReview, question.id];
    onUpdateMock({
      ...mockSession,
      markedForReview: nextMarked,
    });
  };

  const goToIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(activeQuestionIds.length - 1, idx));
    const targetQId = activeQuestionIds[clamped];
    if (isMock && mockSession) {
      const nextVisited = mockSession.visitedIds.includes(targetQId)
        ? mockSession.visitedIds
        : [...mockSession.visitedIds, targetQId];
      onUpdateMock({
        ...mockSession,
        currentIndex: clamped,
        visitedIds: nextVisited,
      });
    } else if (practiceSession) {
      onUpdatePractice({
        ...practiceSession,
        currentIndex: clamped,
      });
    }
  };

  const isMarkedForReview = isMock
    ? mockSession!.markedForReview.includes(question.id)
    : false;

  const totalAnsweredCount = Object.keys(answersMap).length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAFAFA] text-[#1D242B]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#C7EEFF] bg-white px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {!isMock && (
            <button
              onClick={onPausePractice}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
              title="Save & Return Home"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-sm sm:text-base font-bold text-[#1D242B]">
              {isMock
                ? mockSession!.config.title[language]
                : practiceSession!.title[language]}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#1D242B]/70">
              <span className="font-mono-tabular font-semibold text-[#0077C0]">
                {t.questionLabel} {currentIndex + 1} {t.ofLabel} {activeQuestionIds.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {isMock
                  ? `+${mockSession!.config.positiveMarks} / -${mockSession!.config.negativeMarks}`
                  : 'Practice Mode'}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right Controls: Language Switcher, Timer & Palette Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Instant Language Switcher */}
          <div className="hidden sm:flex items-center rounded-lg bg-[#C7EEFF]/50 p-0.5 border border-[#C7EEFF]">
            {(['bn', 'en', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onChangeLanguage(lang)}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  language === lang
                    ? 'bg-[#0077C0] text-white'
                    : 'text-[#1D242B] hover:text-[#0077C0]'
                }`}
              >
                {lang === 'bn' ? 'বাংলা' : lang === 'en' ? 'EN' : 'हिन्दी'}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold font-mono-tabular ${
              isMock && mockSession!.remainingSeconds < 300
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-[#C7EEFF]/60 text-[#0077C0]'
            }`}
          >
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              {isMock
                ? formatSeconds(mockSession!.remainingSeconds)
                : formatSeconds(practiceSession!.elapsedSeconds)}
            </span>
          </div>

          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              showPalette
                ? 'bg-[#0077C0] text-white border-[#0077C0]'
                : 'bg-white text-[#1D242B] border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
            }`}
            title={t.questionPalette}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left/Main Column: Question & Options */}
          <div className={`${showPalette ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-5`}>
            {/* Mobile Language Switcher Bar */}
            <div className="flex sm:hidden items-center justify-between rounded-xl bg-white border border-[#C7EEFF] px-3 py-2">
              <span className="text-xs font-semibold text-[#1D242B]/70">
                ID: {question.id}
              </span>
              <div className="flex items-center gap-1">
                {(['bn', 'en', 'hi'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onChangeLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer ${
                      language === lang
                        ? 'bg-[#0077C0] text-white'
                        : 'text-[#1D242B] bg-[#FAFAFA]'
                    }`}
                  >
                    {lang === 'bn' ? 'বাংলা' : lang === 'en' ? 'EN' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-2xl bg-white border border-[#C7EEFF] p-5 sm:p-6 shadow-xs">
              {/* Unboxed Metadata Row + Bookmark button */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#C7EEFF]/60">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#1D242B]/75">
                  <span className="font-mono-tabular font-bold text-[#0077C0]">
                    {question.id}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{examObj?.code || 'Competitive Exam'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{subjectObj?.name[language]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{localized.topicName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{question.difficulty}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(question.id)}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-[#0077C0] text-white'
                      : 'bg-[#FAFAFA] text-[#1D242B] border border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? t.bookmarkedBtn : t.bookmarkBtn}</span>
                </button>
              </div>

              {/* Question Stem */}
              <div className="mt-4">
                <p className="text-base sm:text-lg font-bold leading-relaxed text-[#1D242B]">
                  {currentIndex + 1}. {localized.question}
                </p>
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="mt-5 space-y-3">
                {localized.options.map((optText, idx) => {
                  const optionLetter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === question.correctIndex;

                  let cardStyle =
                    'bg-[#FAFAFA] border-[#C7EEFF] text-[#1D242B] hover:border-[#0077C0] hover:bg-[#C7EEFF]/25';
                  let badgeStyle = 'bg-[#C7EEFF] text-[#1D242B]';
                  let statusIcon = null;

                  if (isMock) {
                    if (isSelected) {
                      cardStyle = 'bg-[#C7EEFF]/60 border-[#0077C0] text-[#1D242B] ring-1 ring-[#0077C0]';
                      badgeStyle = 'bg-[#0077C0] text-white';
                    }
                  } else if (hasAnswered) {
                    if (isCorrectOption) {
                      cardStyle = 'bg-emerald-50 border-emerald-500 text-[#1D242B]';
                      badgeStyle = 'bg-emerald-600 text-white';
                      statusIcon = (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0">
                          <CheckCircle2 className="h-4 w-4" />
                          {t.correctBadge}
                        </span>
                      );
                    } else if (isSelected && !isCorrectOption) {
                      cardStyle = 'bg-red-50 border-red-500 text-[#1D242B]';
                      badgeStyle = 'bg-red-600 text-white';
                      statusIcon = (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 shrink-0">
                          <XCircle className="h-4 w-4" />
                          {t.wrongBadge}
                        </span>
                      );
                    } else {
                      cardStyle = 'bg-[#FAFAFA] border-[#C7EEFF]/60 text-[#1D242B]/70 opacity-80';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full min-h-[54px] flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${badgeStyle}`}
                        >
                          {optionLetter}
                        </span>
                        <span className="text-sm sm:text-base font-semibold leading-snug">
                          {optText}
                        </span>
                      </div>
                      {statusIcon}
                    </button>
                  );
                })}
              </div>

              {/* Mock Mode Secondary Controls: Mark for Review & Clear Response */}
              {isMock && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#C7EEFF]/60">
                  <button
                    type="button"
                    onClick={handleToggleMarkReview}
                    className={`min-h-[42px] inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      isMarkedForReview
                        ? 'bg-[#0077C0] text-white'
                        : 'bg-[#FAFAFA] text-[#1D242B] border border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    {isMarkedForReview ? t.markedForReview : t.markForReview}
                  </button>

                  {hasAnswered && (
                    <button
                      type="button"
                      onClick={handleClearMockResponse}
                      className="min-h-[42px] inline-flex items-center gap-1.5 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-3.5 py-2 text-xs font-bold text-[#1D242B] hover:bg-[#C7EEFF]/40 cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.clearResponse}
                    </button>
                  )}
                </div>
              )}

              {/* Practice Mode Explanation Box after Answering */}
              {!isMock && hasAnswered && (
                <div className="mt-5 rounded-xl bg-[#C7EEFF]/45 border border-[#0077C0]/30 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0077C0] mb-1.5">
                    {selectedOption === question.correctIndex ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span>{t.explanationTitle}</span>
                  </div>
                  <p className="text-sm text-[#1D242B] leading-relaxed">
                    {localized.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right/Collapsible Question Navigator Palette */}
          {showPalette && (
            <div className="lg:col-span-4 rounded-2xl bg-white border border-[#C7EEFF] p-5 shadow-xs h-fit">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#1D242B]">
                  {t.questionPalette} ({totalAnsweredCount}/{activeQuestionIds.length})
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#1D242B]/75 mb-4 pb-3 border-b border-[#C7EEFF]/60">
                <span>Answered: {totalAnsweredCount}</span>
                <span aria-hidden="true">·</span>
                <span>Remaining: {activeQuestionIds.length - totalAnsweredCount}</span>
                {isMock && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Review: {mockSession!.markedForReview.length}</span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {activeQuestionIds.map((qId, idx) => {
                  const ans = answersMap[qId];
                  const isCurr = idx === currentIndex;
                  const isMarked = isMock && mockSession!.markedForReview.includes(qId);
                  const qObj = getQuestionById(qId);

                  let btnClass = 'bg-[#FAFAFA] text-[#1D242B] border border-[#C7EEFF]';
                  if (isMock) {
                    if (isMarked) {
                      btnClass = 'bg-[#1D242B] text-white border-[#1D242B]';
                    } else if (ans !== undefined) {
                      btnClass = 'bg-[#0077C0] text-white border-[#0077C0]';
                    }
                  } else {
                    if (ans !== undefined && qObj) {
                      btnClass =
                        ans === qObj.correctIndex
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-red-600 text-white border-red-600';
                    }
                  }

                  if (isCurr) {
                    btnClass += ' ring-2 ring-[#0077C0] ring-offset-1';
                  }

                  return (
                    <button
                      key={qId}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      className={`h-10 rounded-lg text-xs font-mono-tabular font-bold transition-all cursor-pointer ${btnClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="border-t border-[#C7EEFF] bg-white px-4 py-3">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => goToIndex(currentIndex - 1)}
            className="min-h-[46px] inline-flex items-center gap-1.5 rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#1D242B] disabled:opacity-40 hover:bg-[#C7EEFF]/40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.prevBtn}
          </button>

          <div className="flex items-center gap-2.5">
            {currentIndex < activeQuestionIds.length - 1 && (
              <button
                type="button"
                onClick={() => goToIndex(currentIndex + 1)}
                className="min-h-[46px] inline-flex items-center gap-1.5 rounded-xl bg-[#0077C0] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#0077C0]/90 cursor-pointer"
              >
                {t.nextBtn}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (isMock) {
                  setShowSubmitConfirm(true);
                } else if (practiceSession) {
                  playFeedbackTone('finish', soundEnabled);
                  onFinishPractice(practiceSession);
                }
              }}
              className={`min-h-[46px] inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold cursor-pointer ${
                currentIndex === activeQuestionIds.length - 1
                  ? 'bg-[#0077C0] text-white'
                  : 'bg-[#1D242B] text-white hover:bg-[#1D242B]/90'
              }`}
            >
              <Send className="h-4 w-4" />
              {isMock ? t.submitMockBtn : t.submitQuizBtn}
            </button>
          </div>
        </div>
      </footer>

      {/* Mock Test Submit Confirmation Modal */}
      {isMock && showSubmitConfirm && mockSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D242B]/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#C7EEFF] p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#1D242B]">
              Submit Mock Examination?
            </h3>
            <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-4 space-y-2 text-xs font-medium text-[#1D242B]">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-mono-tabular font-bold">{activeQuestionIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-mono-tabular font-bold text-[#0077C0]">{totalAnsweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Unattempted:</span>
                <span className="font-mono-tabular font-bold">
                  {activeQuestionIds.length - totalAnsweredCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Marked for Review:</span>
                <span className="font-mono-tabular font-bold">
                  {mockSession.markedForReview.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Time:</span>
                <span className="font-mono-tabular font-bold">
                  {formatSeconds(mockSession.remainingSeconds)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 min-h-[44px] rounded-xl border border-[#C7EEFF] bg-[#FAFAFA] text-xs font-bold text-[#1D242B] cursor-pointer"
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  playFeedbackTone('finish', soundEnabled);
                  onSubmitMock(mockSession);
                }}
                className="flex-1 min-h-[44px] rounded-xl bg-[#0077C0] text-xs font-bold text-white cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
