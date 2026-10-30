import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Code2, Cpu, Database, Download, Layers, Smartphone, X } from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questionBank';

interface NoCodeBlueprintModalProps {
  onClose: () => void;
}

export const NoCodeBlueprintModal: React.FC<NoCodeBlueprintModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'architecture' | 'blocks' | 'tinydb' | 'apk'>('architecture');

  const handleDownloadQuestionJson = () => {
    const blob = new Blob([JSON.stringify(ALL_QUESTIONS, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_master_800_multilingual_questions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D242B]/65 p-4 backdrop-blur-xs">
      <div className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#C7EEFF] bg-[#FAFAFA] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0077C0] px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <Cpu className="h-5 w-5" />
            <div>
              <h2 className="text-base font-bold">
                QUIZ MASTER — Complete No-Code Architecture & MIT App Inventor Guide
              </h2>
              <p className="text-xs text-[#C7EEFF]">
                All 11 Expected Deliverables · Visual Designer · Blocks · TinyDB · 800-Question Asset Export
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C7EEFF] bg-white px-5 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'architecture', label: '1–4. Architecture & UI Screens' },
              { id: 'blocks', label: '5–6. Quiz & Mock Test Blocks' },
              { id: 'tinydb', label: '7–9. TinyDB & Multilingual Setup' },
              { id: 'apk', label: '10–11. Step-by-Step Build & APK' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as typeof activeSection)}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-[#0077C0] text-white'
                    : 'bg-[#FAFAFA] text-[#1D242B] hover:bg-[#C7EEFF]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadQuestionJson}
            className="min-h-[38px] inline-flex items-center gap-1.5 rounded-lg bg-[#1D242B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1D242B]/90 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Download 800 Questions JSON Asset
          </button>
        </div>

        {/* Scrollable Deliverable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-[#1D242B]">
          {activeSection === 'architecture' && (
            <div className="space-y-5">
              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  1. Complete Application Architecture (100% Offline Single-Screen Virtual Arrangement Pattern)
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#1D242B]/85">
                  In <strong>MIT App Inventor</strong> (and Kodular / Niotron), switching between multiple real screens resets memory and causes slow transitions. Therefore, QUIZ MASTER uses the industry-standard <strong>Virtual Screen Architecture</strong> inside <code>Screen1</code> using <code>VerticalArrangement</code> containers toggled via visibility booleans:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5 space-y-1">
                    <div className="font-bold text-[#0077C0]">Visual Designer Components</div>
                    <p>• <code>VA_Splash</code> (Visible on Initialize for 1200ms via <code>Clock_Splash</code>)</p>
                    <p>• <code>HA_TopHeader</code> (Height: 52px, BackgroundColor: <code>#FFFFFF</code>)</p>
                    <p>• <code>VSA_Home</code>, <code>VSA_Exams</code>, <code>VSA_Practice</code>, <code>VSA_Results</code>, <code>VSA_Profile</code></p>
                    <p>• <code>VA_QuizModal</code> & <code>VA_MockModal</code> (Full-screen overlay containers)</p>
                    <p>• <code>HA_BottomNav</code> (Height: 60px, pinned at bottom with 5 tab buttons)</p>
                  </div>
                  <div className="rounded-xl bg-[#FAFAFA] border border-[#C7EEFF] p-3.5 space-y-1">
                    <div className="font-bold text-[#0077C0]">Non-Visible Components</div>
                    <p>• <code>TinyDB1</code> (Namespace: <code>TINYDB_QUIZ_MASTER_V1</code>)</p>
                    <p>• <code>File1</code> (Reads offline <code>questions_800.json</code> from Media Assets)</p>
                    <p>• <code>Web1</code> (Used exclusively for <code>JsonTextDecodeWithDictionaries</code> offline)</p>
                    <p>• <code>Clock_MockTimer</code> (TimerInterval: 1000ms, TimerAlwaysFires: true)</p>
                    <p>• <code>Sound1</code> / <code>Player1</code> (Plays offline feedback chimes)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  2 & 3. Colour Palette & Fixed 5-Tab Bottom Navigation Bar
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-lg border border-[#C7EEFF] p-3 bg-[#FAFAFA]">
                    <div className="font-bold">Background</div>
                    <div className="font-mono-tabular text-[#0077C0]">#FAFAFA</div>
                  </div>
                  <div className="rounded-lg border border-[#C7EEFF] p-3 bg-[#C7EEFF]">
                    <div className="font-bold">Light Blue</div>
                    <div className="font-mono-tabular text-[#0077C0]">#C7EEFF</div>
                  </div>
                  <div className="rounded-lg border border-[#0077C0] p-3 bg-[#0077C0] text-white">
                    <div className="font-bold">Primary Blue</div>
                    <div className="font-mono-tabular">#0077C0</div>
                  </div>
                  <div className="rounded-lg border border-[#1D242B] p-3 bg-[#1D242B] text-white">
                    <div className="font-bold">Dark Text</div>
                    <div className="font-mono-tabular">#1D242B</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#1D242B]/80">
                  <strong>Bottom Navigation Procedure (<code>proc_SwitchTab(tabName)</code>):</strong> Loop over the 5 tab arrangements (<code>Tab_Home</code>, <code>Tab_Exams</code>, <code>Tab_Practice</code>, <code>Tab_Results</code>, <code>Tab_Profile</code>). Set the selected tab icon & label text color to <code>#0077C0</code> and corresponding virtual screen <code>Visible = true</code>; set all inactive tabs to <code>#1D242B</code> and <code>Visible = false</code>.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  4. Question Database Structure (Shared Question ID Across All 3 Languages)
                </h3>
                <p className="text-xs text-[#1D242B]/80">
                  Every question in the 800-question bank uses the exact same <code>id</code> across Bengali (<code>bn</code>), English (<code>en</code>), and Hindi (<code>hi</code>):
                </p>
                <pre className="overflow-x-auto rounded-xl bg-[#1D242B] p-4 text-xs text-[#C7EEFF] font-mono-tabular">
{`{
  "id": "QM-MATH-001",
  "examCategory": "railway_ntpc",
  "subject": "mathematics",
  "topicId": "math_pct",
  "difficulty": "Easy",
  "correctIndex": 1,
  "content": {
    "en": {
      "topicName": "Percentage & Profit-Loss",
      "question": "A shopkeeper buys an article for ₹400 and sells it at a profit of 15%...",
      "options": ["₹480", "₹460", "₹445", "₹495"],
      "explanation": "Selling Price (SP) = 400 × 115 / 100 = ₹460."
    },
    "bn": {
      "topicName": "শতকরা ও লাভ-ক্ষতি",
      "question": "একজন দোকানদার ₹৪০০ টাকায় একটি দ্রব্য ক্রয় করে ১৫% লাভে বিক্রয় করেন...",
      "options": ["₹৪৮০", "₹৪৬০", "₹৪৪৫", "₹৪৯৫"],
      "explanation": "বিক্রয়মূল্য = ৪০০ × ১১৫ / ১০০ = ₹৪৬০।"
    },
    "hi": {
      "topicName": "प्रतिशत और लाभ-हानि",
      "question": "एक दुकानदार ₹400 में एक वस्तु खरीदता है और उसे 15% के लाभ पर बेचता है...",
      "options": ["₹480", "₹460", "₹445", "₹495"],
      "explanation": "विक्रय मूल्य (SP) = 400 × 115 / 100 = ₹460।"
    }
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {activeSection === 'blocks' && (
            <div className="space-y-5">
              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  5. Practice Mode Quiz Logic (Visual Blocks Step-by-Step)
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#1D242B]/85">
                  <li>
                    <strong>Initialize Global Variables:</strong> <code>global_QuestionList</code> (create empty list), <code>global_CurrentIndex</code> (1), <code>global_UserAnswers</code> (create empty dictionary), <code>global_SelectedLanguage</code> (<code>"en"</code>).
                  </li>
                  <li>
                    <strong>Procedure <code>proc_LoadQuestion(index)</code>:</strong>
                    <br />• Fetch question dictionary at <code>select list item (global_QuestionList, index)</code>.
                    <br />• Extract localized dictionary using <code>get value at key path [ "content", global_SelectedLanguage ]</code>.
                    <br />• Set <code>Lbl_QuestionID.Text</code> to <code>get value for key "id"</code>.
                    <br />• Set <code>Lbl_QuestionText.Text</code> to <code>get value for key "question"</code>.
                    <br />• Populate <code>Btn_OptA</code>..<code>Btn_OptD</code> from the 4-element <code>"options"</code> list.
                  </li>
                  <li>
                    <strong>When Any Option Button Clicked (Practice Mode):</strong>
                    <br />• Compare clicked option index (0–3) with <code>get value for key "correctIndex"</code>.
                    <br />• If equal: set button background to Emerald Green, increment <code>TinyDB</code> correct counter, and remove Question ID from <code>WRONG_IDS</code> list if present.
                    <br />• If not equal: set clicked button background to Red, highlight the correct option button in Green, and add Question ID to <code>TinyDB</code> tag <code>WRONG_IDS</code>.
                    <br />• Set <code>VA_ExplanationBox.Visible = true</code> and display <code>get value for key "explanation"</code>.
                  </li>
                </ol>
              </div>

              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  6. Mock Test Logic (Countdown Timer & Negative Marking Blocks)
                </h3>
                <pre className="overflow-x-auto rounded-xl bg-[#1D242B] p-4 text-xs text-[#C7EEFF] font-mono-tabular">
{`WHEN Clock_MockTimer.Timer DO:
  SET global_RemainingSeconds TO (global_RemainingSeconds - 1)
  SET Lbl_Timer.Text TO call proc_FormatMMSS(global_RemainingSeconds)
  IF (global_RemainingSeconds <= 0) THEN:
    SET Clock_MockTimer.TimerEnabled TO false
    CALL proc_CalculateAndSubmitMockTest()

PROCEDURE proc_CalculateAndSubmitMockTest():
  INITIALIZE local_Correct = 0, local_Wrong = 0, local_Unattempted = 0
  FOR EACH qId IN global_ActiveQuestionIDs DO:
    IF (is key in dictionary? qId, global_UserAnswers) THEN:
      IF (get value(qId, global_UserAnswers) == get correctIndex(qId)) THEN:
        SET local_Correct = local_Correct + 1
      ELSE:
        SET local_Wrong = local_Wrong + 1
    ELSE:
      SET local_Unattempted = local_Unattempted + 1

  SET local_TotalScore = (local_Correct * global_PosMarks) - (local_Wrong * global_NegMarks)
  SET local_Accuracy = (local_Correct / (local_Correct + local_Wrong)) * 100
  CALL TinyDB1.StoreValue("TEST_HISTORY", appendRecordToHistory(...))`}
                </pre>
              </div>
            </div>
          )}

          {activeSection === 'tinydb' && (
            <div className="space-y-5">
              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  7, 8 & 9. Local Storage (TinyDB Tags), Multilingual Switching & Offline Persistence
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#C7EEFF] text-[#0077C0]">
                        <th className="py-2 pr-4">TinyDB Tag</th>
                        <th className="py-2 pr-4">Data Type</th>
                        <th className="py-2">Purpose in Offline Engine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C7EEFF]/50">
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">APP_LANGUAGE</td>
                        <td className="py-2 pr-4">String ("bn" | "en" | "hi")</td>
                        <td className="py-2">Persists selected language across app restarts</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">BOOKMARK_IDS</td>
                        <td className="py-2 pr-4">List of Question IDs</td>
                        <td className="py-2">Stores bookmarked questions (e.g. ["QM-MATH-001", ...])</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">WRONG_ANSWER_IDS</td>
                        <td className="py-2 pr-4">List of Question IDs</td>
                        <td className="py-2">Powers the "Wrong Answer Practice" & "Retry Incorrect" mode</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">ATTEMPTED_IDS</td>
                        <td className="py-2 pr-4">List of Question IDs</td>
                        <td className="py-2">Calculates subject-wise mastery progress across all 800 questions</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">SAVED_PRACTICE</td>
                        <td className="py-2 pr-4">Dictionary</td>
                        <td className="py-2">Allows resuming an unfinished practice session from Home Dashboard</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono-tabular font-bold">TEST_HISTORY</td>
                        <td className="py-2 pr-4">List of Dictionaries</td>
                        <td className="py-2">Stores all completed Practice & Mock Test scorecards offline</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'apk' && (
            <div className="space-y-5">
              <div className="rounded-xl bg-white border border-[#C7EEFF] p-5 space-y-3">
                <h3 className="text-base font-bold text-[#0077C0]">
                  10 & 11. Step-by-Step MIT App Inventor Development & Android APK Build Instructions
                </h3>
                <ol className="list-decimal pl-5 space-y-2.5 text-xs sm:text-sm text-[#1D242B]/85">
                  <li>
                    <strong>Download the 800-Question JSON Asset:</strong> Click the <em>"Download 800 Questions JSON Asset"</em> button above to save <code>quiz_master_800_multilingual_questions.json</code> to your computer.
                  </li>
                  <li>
                    <strong>Create Project in MIT App Inventor:</strong> Open <code>ai2.appinventor.mit.edu</code>, click <strong>Start New Project</strong>, and name it <code>QUIZ_MASTER</code>.
                  </li>
                  <li>
                    <strong>Configure Project Properties:</strong> Set <code>Theme</code> to <em>Device Default</em>, <code>PrimaryColor</code> to <code>#0077C0</code>, <code>PrimaryColorDark</code> to <code>#1D242B</code>, <code>AccentColor</code> to <code>#C7EEFF</code>, <code>AppName</code> to <code>QUIZ MASTER</code>, and upload the JSON file into the <strong>Media (Assets)</strong> panel.
                  </li>
                  <li>
                    <strong>Test Live via MIT AI2 Companion:</strong> Click <strong>Connect → AI Companion</strong>, scan the QR code on your Android phone, and test offline Airplane Mode switching between বাংলা, English, and हिन्दी.
                  </li>
                  <li>
                    <strong>Build & Export Standalone Android APK:</strong> Click <strong>Build → Android App (.apk)</strong> in the top menu bar. Once the progress bar reaches 100%, scan the barcode or download <code>QUIZ_MASTER.apk</code> directly to install on any Android device with zero internet dependency.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
