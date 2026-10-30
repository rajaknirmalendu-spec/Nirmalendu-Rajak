import React, { useEffect, useState } from 'react';
import { Award, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { Language } from '../types/quiz';
import { UI_STRINGS } from '../data/translations';

interface SplashScreenModalProps {
  language: Language;
  onDismiss: () => void;
}

export const SplashScreenModal: React.FC<SplashScreenModalProps> = ({ language, onDismiss }) => {
  const [progress, setProgress] = useState(15);
  const t = UI_STRINGS[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 17;
      });
    }, 140);

    const timer = setTimeout(() => {
      onDismiss();
    }, 1350);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FAFAFA] px-6 py-10 text-[#1D242B]">
      <div className="w-full max-w-md flex items-center justify-between text-xs font-medium text-[#1D242B]/70">
        <span>100% OFFLINE ENGINE</span>
        <span>বাংলা · ENGLISH · हिन्दी</span>
      </div>

      <div className="flex flex-col items-center text-center max-w-md my-auto">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0077C0] text-white shadow-lg shadow-[#0077C0]/20">
          <BookOpen className="h-12 w-12" />
          <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#C7EEFF] text-[#0077C0] border-2 border-[#FAFAFA]">
            <Award className="h-5 w-5" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D242B]">
          QUIZ MASTER
        </h1>
        <p className="mt-2 text-sm sm:text-base font-semibold text-[#0077C0]">
          {t.tagline}
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[#1D242B]/75 max-w-xs leading-relaxed">
          Railway NTPC · Group D · ALP · SSC CGL · CHSL · MTS · GD · WBP Constable & SI
        </p>

        {/* Loading bar */}
        <div className="mt-8 w-64 sm:w-72">
          <div className="flex items-center justify-between text-xs font-medium text-[#1D242B]/80 mb-2">
            <span>Loading 800 Offline Questions...</span>
            <span className="font-mono-tabular font-bold text-[#0077C0]">{Math.min(100, progress)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#C7EEFF]">
            <div
              className="h-full rounded-full bg-[#0077C0] transition-all duration-150"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#1D242B]/75">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0077C0]" /> 8 Subjects
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0077C0]" /> 800 Questions
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0077C0]" /> TinyDB Ready
          </span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-3">
        <button
          onClick={onDismiss}
          className="w-full min-h-[48px] rounded-xl bg-[#0077C0] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#0077C0]/90 active:scale-[0.99] transition-all cursor-pointer"
        >
          Enter Quiz Master
        </button>
      </div>
    </div>
  );
};
