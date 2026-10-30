import React, { useState } from 'react';
import { Clock, FileQuestion, Play, ShieldAlert, SlidersHorizontal, X } from 'lucide-react';
import { ExamId, Language, MockTestConfig, SubjectId } from '../types/quiz';
import { EXAMS_METADATA, SUBJECTS_METADATA, UI_STRINGS } from '../data/translations';

interface MockConfigModalProps {
  language: Language;
  initialExamId?: ExamId;
  onClose: () => void;
  onStartMock: (config: MockTestConfig) => void;
}

export const MockConfigModal: React.FC<MockConfigModalProps> = ({
  language,
  initialExamId,
  onClose,
  onStartMock,
}) => {
  const t = UI_STRINGS[language];
  const presetExam = EXAMS_METADATA.find((e) => e.id === initialExamId) || EXAMS_METADATA[0];

  const [selectedExamId, setSelectedExamId] = useState<ExamId>(presetExam.id);
  const [questionCount, setQuestionCount] = useState<number>(presetExam.defaultQuestions);
  const [durationMinutes, setDurationMinutes] = useState<number>(presetExam.defaultDurationMins);
  const [markingPreset, setMarkingPreset] = useState<string>(
    `${presetExam.positiveMarks}/${presetExam.negativeMarks}`
  );
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');

  const handleExamChange = (examId: ExamId) => {
    setSelectedExamId(examId);
    const found = EXAMS_METADATA.find((e) => e.id === examId);
    if (found) {
      setQuestionCount(found.defaultQuestions);
      setDurationMinutes(found.defaultDurationMins);
      setMarkingPreset(`${found.positiveMarks}/${found.negativeMarks}`);
    }
  };

  const handleStart = () => {
    const [posStr, negStr] = markingPreset.split('/');
    const positiveMarks = parseFloat(posStr) || 1;
    const negativeMarks = parseFloat(negStr) || 0;
    const examObj = EXAMS_METADATA.find((e) => e.id === selectedExamId) || EXAMS_METADATA[0];

    onStartMock({
      title: {
        en: `${examObj.name.en} Mock Test (${questionCount} Q)`,
        bn: `${examObj.name.bn} মক টেস্ট (${questionCount} প্রশ্ন)`,
        hi: `${examObj.name.hi} मॉक टेस्ट (${questionCount} प्रश्न)`,
      },
      examId: selectedExamId,
      questionCount,
      durationMinutes,
      positiveMarks,
      negativeMarks,
      subjectFilter,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D242B]/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#FAFAFA] border border-[#C7EEFF] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between bg-[#0077C0] px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-5 w-5" />
            <h2 className="text-base font-bold">{t.configureMockTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Exam Category Selector */}
          <div>
            <label className="block text-xs font-bold text-[#1D242B] mb-1.5">
              Target Examination Pattern
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => handleExamChange(e.target.value as ExamId)}
              className="w-full min-h-[44px] rounded-xl border border-[#C7EEFF] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D242B] focus:border-[#0077C0] focus:outline-none"
            >
              {EXAMS_METADATA.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name[language]} ({exam.defaultQuestions} Q • {exam.defaultDurationMins} Min)
                </option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-xs font-bold text-[#1D242B] mb-1.5">
              Syllabus Scope
            </label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value as SubjectId | 'all')}
              className="w-full min-h-[44px] rounded-xl border border-[#C7EEFF] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1D242B] focus:border-[#0077C0] focus:outline-none"
            >
              <option value="all">Full Combined Syllabus (All 8 Subjects)</option>
              {SUBJECTS_METADATA.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name[language]} Only
                </option>
              ))}
            </select>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-xs font-bold text-[#1D242B] mb-1.5">
              {t.numQuestions}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[20, 50, 75, 85, 100].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`min-h-[44px] rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    questionCount === cnt
                      ? 'bg-[#0077C0] text-white'
                      : 'bg-white text-[#1D242B] border border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                  }`}
                >
                  {cnt} Q
                </button>
              ))}
            </div>
          </div>

          {/* Countdown Timer Duration */}
          <div>
            <label className="block text-xs font-bold text-[#1D242B] mb-1.5">
              {t.durationMins}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDurationMinutes(mins)}
                  className={`min-h-[44px] rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    durationMinutes === mins
                      ? 'bg-[#0077C0] text-white'
                      : 'bg-white text-[#1D242B] border border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                  }`}
                >
                  {mins} Min
                </button>
              ))}
            </div>
          </div>

          {/* Negative Marking Scheme */}
          <div>
            <label className="block text-xs font-bold text-[#1D242B] mb-1.5">
              {t.markingScheme} (Correct / Wrong)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: '1/0.25', label: '+1.00 / -0.25 (Standard)' },
                { key: '1/0.33', label: '+1.00 / -0.33 (Railway RRB)' },
                { key: '2/0.5', label: '+2.00 / -0.50 (SSC CGL/CHSL)' },
                { key: '1/0', label: '+1.00 / 0.00 (No Negative)' },
              ].map((scheme) => (
                <button
                  key={scheme.key}
                  type="button"
                  onClick={() => setMarkingPreset(scheme.key)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                    markingPreset === scheme.key
                      ? 'bg-[#0077C0] text-white'
                      : 'bg-white text-[#1D242B] border border-[#C7EEFF] hover:bg-[#C7EEFF]/40'
                  }`}
                >
                  {scheme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Callout */}
          <div className="rounded-xl bg-[#C7EEFF]/50 p-3.5 text-xs text-[#1D242B] space-y-1">
            <div className="font-bold text-[#0077C0] flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Auto-Submit Countdown Timer Enabled
            </div>
            <p className="text-[#1D242B]/80">
              {questionCount} Questions · {durationMinutes} Minutes · +{markingPreset.split('/')[0]} for Correct · -{markingPreset.split('/')[1]} Negative Marking · Unattempted: 0
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#0077C0] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#0077C0]/90 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-current" />
            {t.startExamNow}
          </button>
        </div>
      </div>
    </div>
  );
};
