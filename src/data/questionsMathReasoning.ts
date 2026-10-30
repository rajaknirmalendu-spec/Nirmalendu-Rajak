import { DifficultyLevel, ExamId, Question } from '../types/quiz';

const EXAM_CYCLE: ExamId[] = [
  'railway_ntpc',
  'railway_group_d',
  'railway_alp',
  'ssc_chsl',
  'ssc_cgl',
  'ssc_mts',
  'ssc_gd',
  'wbp_constable',
  'wbp_si',
  'other_govt',
];

const DIFF_CYCLE: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];

function toBengaliDigits(input: string | number): string {
  const map: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return String(input).replace(/[0-9]/g, (d) => map[d] || d);
}

export function generateMathQuestions(): Question[] {
  const questions: Question[] = [];

  // Topic 1: Percentage & Profit-Loss (20 Questions: 1 to 20)
  const pctCases = [
    { cp: 400, gainPct: 15 },
    { cp: 600, gainPct: 20 },
    { cp: 800, gainPct: 25 },
    { cp: 500, gainPct: 12 },
    { cp: 1200, gainPct: 15 },
    { cp: 750, gainPct: 20 },
    { cp: 900, gainPct: 10 },
    { cp: 1500, gainPct: 18 },
    { cp: 2000, gainPct: 14 },
    { cp: 1600, gainPct: 25 },
  ];

  pctCases.forEach((c, idx) => {
    const qNum = idx + 1;
    const sp = Math.round(c.cp * (1 + c.gainPct / 100));
    const opts = [sp, sp + 20, sp - 15, sp + 35];
    const correctIdx = qNum % 4;
    const rotated = [...opts];
    const temp = rotated[correctIdx];
    rotated[correctIdx] = sp;
    rotated[0] = temp;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[idx % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_pct',
      difficulty: DIFF_CYCLE[idx % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Percentage & Profit-Loss',
          question: `A shopkeeper buys an article for ₹${c.cp} and sells it at a profit of ${c.gainPct}%. What is the selling price of the article?`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `Selling Price (SP) = Cost Price × (100 + Profit%) / 100 = ${c.cp} × ${100 + c.gainPct} / 100 = ₹${sp}.`,
        },
        bn: {
          topicName: 'শতকরা ও লাভ-ক্ষতি',
          question: `একজন দোকানদার ₹${toBengaliDigits(c.cp)} টাকায় একটি দ্রব্য ক্রয় করে ${toBengaliDigits(c.gainPct)}% লাভে বিক্রয় করেন। দ্রব্যটির বিক্রয়মূল্য কত?`,
          options: rotated.map((v) => `₹${toBengaliDigits(v)}`) as [string, string, string, string],
          explanation: `বিক্রয়মূল্য = ক্রয়মূল্য × (১০০ + লাভ%) / ১০০ = ${toBengaliDigits(c.cp)} × ${toBengaliDigits(100 + c.gainPct)} / ১০০ = ₹${toBengaliDigits(sp)}।`,
        },
        hi: {
          topicName: 'प्रतिशत और लाभ-हानि',
          question: `एक दुकानदार ₹${c.cp} में एक वस्तु खरीदता है और उसे ${c.gainPct}% के लाभ पर बेचता है। वस्तु का विक्रय मूल्य क्या है?`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `विक्रय मूल्य (SP) = क्रय मूल्य × (100 + लाभ%) / 100 = ${c.cp} × ${100 + c.gainPct} / 100 = ₹${sp}।`,
        },
      },
    });
  });

  // Questions 11 to 20: Successive Discount & Percentage Change
  const discCases = [
    { mp: 1000, d1: 20, d2: 10 },
    { mp: 2000, d1: 10, d2: 10 },
    { mp: 1500, d1: 20, d2: 5 },
    { mp: 800, d1: 25, d2: 10 },
    { mp: 1200, d1: 15, d2: 10 },
    { mp: 2500, d1: 20, d2: 20 },
    { mp: 3000, d1: 10, d2: 5 },
    { mp: 4000, d1: 25, d2: 20 },
    { mp: 500, d1: 10, d2: 20 },
    { mp: 1800, d1: 20, d2: 15 },
  ];

  discCases.forEach((c, idx) => {
    const qNum = 11 + idx;
    const sp = Math.round(c.mp * (1 - c.d1 / 100) * (1 - c.d2 / 100));
    const baseOpts = [sp, sp + 25, sp - 20, sp + 50];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = sp;
    rotated[0] = t;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_pct',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Percentage & Profit-Loss',
          question: `An item marked at ₹${c.mp} is sold after two successive discounts of ${c.d1}% and ${c.d2}%. Find the final selling price.`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `After first discount of ${c.d1}%, price = ₹${c.mp * (1 - c.d1 / 100)}. After second discount of ${c.d2}%, final SP = ₹${sp}.`,
        },
        bn: {
          topicName: 'শতকরা ও লাভ-ক্ষতি',
          question: `₹${toBengaliDigits(c.mp)} ধার্যমূল্যের একটি বস্তুর ওপর পরপর ${toBengaliDigits(c.d1)}% এবং ${toBengaliDigits(c.d2)}% ছাড় দেওয়া হলে চূড়ান্ত বিক্রয়মূল্য কত হবে?`,
          options: rotated.map((v) => `₹${toBengaliDigits(v)}`) as [string, string, string, string],
          explanation: `প্রথম ছাড়ের পর মূল্য = ₹${toBengaliDigits(c.mp * (1 - c.d1 / 100))}। দ্বিতীয় ${toBengaliDigits(c.d2)}% ছাড়ের পর চূড়ান্ত বিক্রয়মূল্য = ₹${toBengaliDigits(sp)}।`,
        },
        hi: {
          topicName: 'प्रतिशत और लाभ-हानि',
          question: `₹${c.mp} अंकित मूल्य वाली एक वस्तु को ${c.d1}% और ${c.d2}% की दो क्रमिक छूट के बाद बेचा जाता है। अंतिम विक्रय मूल्य ज्ञात कीजिए।`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `पहली छूट के बाद मूल्य = ₹${c.mp * (1 - c.d1 / 100)}। दूसरी ${c.d2}% छूट के बाद अंतिम विक्रय मूल्य = ₹${sp}।`,
        },
      },
    });
  });

  // Topic 2: Ratio, Average & Ages (Questions 21 to 40)
  const ratioCases = [
    { a: 3, b: 5, sum: 240 },
    { a: 4, b: 7, sum: 330 },
    { a: 2, b: 3, sum: 150 },
    { a: 5, b: 8, sum: 390 },
    { a: 7, b: 9, sum: 480 },
    { a: 3, b: 4, sum: 210 },
    { a: 5, b: 6, sum: 440 },
    { a: 2, b: 7, sum: 360 },
    { a: 4, b: 9, sum: 520 },
    { a: 7, b: 11, sum: 540 },
    { a: 3, b: 8, sum: 550 },
    { a: 5, b: 7, sum: 600 },
    { a: 6, b: 11, sum: 340 },
    { a: 8, b: 9, sum: 510 },
    { a: 4, b: 5, sum: 450 },
    { a: 9, b: 11, sum: 800 },
    { a: 3, b: 7, sum: 700 },
    { a: 5, b: 9, sum: 420 },
    { a: 2, b: 5, sum: 490 },
    { a: 7, b: 8, sum: 750 },
  ];

  ratioCases.forEach((c, idx) => {
    const qNum = 21 + idx;
    const unit = c.sum / (c.a + c.b);
    const larger = Math.round(Math.max(c.a, c.b) * unit);
    const baseOpts = [larger, larger - unit, larger + unit, Math.round(Math.min(c.a, c.b) * unit)];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = larger;
    rotated[0] = t;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_ratio',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Ratio, Average & Ages',
          question: `Two numbers are in the ratio ${c.a}:${c.b} and their sum is ${c.sum}. What is the greater number?`,
          options: rotated.map((v) => `${v}`) as [string, string, string, string],
          explanation: `Sum of ratio parts = ${c.a} + ${c.b} = ${c.a + c.b}. Value of 1 part = ${c.sum} / ${c.a + c.b} = ${unit}. Greater number = ${c.b} × ${unit} = ${larger}.`,
        },
        bn: {
          topicName: 'অনুপাত, গড় ও বয়স',
          question: `দুটি সংখ্যার অনুপাত ${toBengaliDigits(c.a)}:${toBengaliDigits(c.b)} এবং তাদের সমষ্টি ${toBengaliDigits(c.sum)} হলে বৃহত্তর সংখ্যাটি কত?`,
          options: rotated.map((v) => `${toBengaliDigits(v)}`) as [string, string, string, string],
          explanation: `অনুপাতের পদদ্বয়ের যোগফল = ${toBengaliDigits(c.a + c.b)}। ১ এককের মান = ${toBengaliDigits(c.sum)} ÷ ${toBengaliDigits(c.a + c.b)} = ${toBengaliDigits(unit)}। বৃহত্তর সংখ্যাটি = ${toBengaliDigits(c.b)} × ${toBengaliDigits(unit)} = ${toBengaliDigits(larger)}।`,
        },
        hi: {
          topicName: 'अनुपात, औसत और आयु',
          question: `दो संख्याएं ${c.a}:${c.b} के अनुपात में हैं और उनका योग ${c.sum} है। बड़ी संख्या क्या है?`,
          options: rotated.map((v) => `${v}`) as [string, string, string, string],
          explanation: `अनुपात का योग = ${c.a} + ${c.b} = ${c.a + c.b}। 1 इकाई का मान = ${c.sum} / ${c.a + c.b} = ${unit}। बड़ी संख्या = ${c.b} × ${unit} = ${larger}।`,
        },
      },
    });
  });

  // Topic 3: Time, Work & Speed (Questions 41 to 60)
  const workCases = [
    { a: 10, b: 15, ans: 6 },
    { a: 12, b: 24, ans: 8 },
    { a: 15, b: 30, ans: 10 },
    { a: 20, b: 30, ans: 12 },
    { a: 6, b: 12, ans: 4 },
    { a: 18, b: 36, ans: 12 },
    { a: 24, b: 48, ans: 16 },
    { a: 30, b: 60, ans: 20 },
    { a: 14, b: 35, ans: 10 },
    { a: 21, b: 28, ans: 12 },
    { a: 16, b: 48, ans: 12 },
    { a: 36, b: 72, ans: 24 },
    { a: 40, b: 60, ans: 24 },
    { a: 12, b: 60, ans: 10 },
    { a: 20, b: 80, ans: 16 },
    { a: 28, b: 21, ans: 12 },
    { a: 45, b: 90, ans: 30 },
    { a: 15, b: 60, ans: 12 },
    { a: 24, b: 72, ans: 18 },
    { a: 35, b: 14, ans: 10 },
  ];

  workCases.forEach((c, idx) => {
    const qNum = 41 + idx;
    const baseOpts = [c.ans, c.ans + 2, c.ans + 4, Math.max(2, c.ans - 2)];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = c.ans;
    rotated[0] = t;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_work',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Time, Work & Speed',
          question: `A can complete a piece of work in ${c.a} days and B can complete the same work in ${c.b} days. Working together, in how many days will they finish the work?`,
          options: rotated.map((v) => `${v} days`) as [string, string, string, string],
          explanation: `Combined time = (A × B) / (A + B) = (${c.a} × ${c.b}) / (${c.a} + ${c.b}) = ${c.a * c.b} / ${c.a + c.b} = ${c.ans} days.`,
        },
        bn: {
          topicName: 'সময়, কার্য ও গতিবেগ',
          question: `A একটি কাজ ${toBengaliDigits(c.a)} দিনে এবং B ওই একই কাজ ${toBengaliDigits(c.b)} দিনে সম্পন্ন করতে পারে। তারা একত্রে কাজটি কত দিনে শেষ করবে?`,
          options: rotated.map((v) => `${toBengaliDigits(v)} দিন`) as [string, string, string, string],
          explanation: `একত্রে সময় = (A × B) / (A + B) = (${toBengaliDigits(c.a)} × ${toBengaliDigits(c.b)}) / (${toBengaliDigits(c.a + c.b)}) = ${toBengaliDigits(c.ans)} দিন।`,
        },
        hi: {
          topicName: 'समय, कार्य और चाल',
          question: `A किसी कार्य को ${c.a} दिनों में और B उसी कार्य को ${c.b} दिनों में पूरा कर सकता है। दोनों मिलकर उस कार्य को कितने दिनों में पूरा करेंगे?`,
          options: rotated.map((v) => `${v} दिन`) as [string, string, string, string],
          explanation: `कुल समय = (A × B) / (A + B) = (${c.a} × ${c.b}) / (${c.a + c.b}) = ${c.ans} दिन।`,
        },
      },
    });
  });

  // Topic 4: Simple & Compound Interest (Questions 61 to 80)
  const siCases = [
    { p: 2000, r: 8, t: 3 },
    { p: 3500, r: 6, t: 4 },
    { p: 5000, r: 9, t: 2 },
    { p: 4000, r: 7, t: 5 },
    { p: 6000, r: 5, t: 3 },
    { p: 2500, r: 12, t: 4 },
    { p: 8000, r: 6, t: 3 },
    { p: 1500, r: 10, t: 4 },
    { p: 4500, r: 8, t: 2 },
    { p: 7000, r: 5, t: 4 },
    { p: 9000, r: 7, t: 2 },
    { p: 3000, r: 11, t: 3 },
    { p: 6500, r: 6, t: 2 },
    { p: 7500, r: 8, t: 3 },
    { p: 1200, r: 15, t: 4 },
    { p: 5500, r: 10, t: 3 },
    { p: 8500, r: 4, t: 5 },
    { p: 2400, r: 9, t: 5 },
    { p: 3600, r: 5, t: 6 },
    { p: 4800, r: 12, t: 2 },
  ];

  siCases.forEach((c, idx) => {
    const qNum = 61 + idx;
    const si = (c.p * c.r * c.t) / 100;
    const baseOpts = [si, si + 60, si - 40, si + 120];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const temp = rotated[correctIdx];
    rotated[correctIdx] = si;
    rotated[0] = temp;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_interest',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Simple & Compound Interest',
          question: `Find the Simple Interest on a principal of ₹${c.p} at ${c.r}% per annum for ${c.t} years.`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `Simple Interest (SI) = (P × R × T) / 100 = (${c.p} × ${c.r} × ${c.t}) / 100 = ₹${si}.`,
        },
        bn: {
          topicName: 'সরল ও চক্রবৃদ্ধি সুদ',
          question: `বার্ষিক ${toBengaliDigits(c.r)}% সরল সুদের হারে ₹${toBengaliDigits(c.p)} টাকার ${toBengaliDigits(c.t)} বছরের সরল সুদ কত হবে?`,
          options: rotated.map((v) => `₹${toBengaliDigits(v)}`) as [string, string, string, string],
          explanation: `সরল সুদ (SI) = (আসল × হার × সময়) / ১০০ = (${toBengaliDigits(c.p)} × ${toBengaliDigits(c.r)} × ${toBengaliDigits(c.t)}) / ১০০ = ₹${toBengaliDigits(si)}।`,
        },
        hi: {
          topicName: 'साधारण और चक्रवृद्धि ब्याज',
          question: `₹${c.p} के मूलधन पर ${c.r}% वार्षिक दर से ${c.t} वर्षों का साधारण ब्याज ज्ञात कीजिए।`,
          options: rotated.map((v) => `₹${v}`) as [string, string, string, string],
          explanation: `साधारण ब्याज (SI) = (मूलधन × दर × समय) / 100 = (${c.p} × ${c.r} × ${c.t}) / 100 = ₹${si}।`,
        },
      },
    });
  });

  // Topic 5: Number System & Mensuration (Questions 81 to 100)
  const mensCases = [
    { l: 12, b: 8 },
    { l: 15, b: 10 },
    { l: 18, b: 12 },
    { l: 20, b: 14 },
    { l: 25, b: 16 },
    { l: 16, b: 9 },
    { l: 22, b: 15 },
    { l: 30, b: 18 },
    { l: 24, b: 11 },
    { l: 14, b: 9 },
    { l: 28, b: 15 },
    { l: 19, b: 12 },
    { l: 17, b: 13 },
    { l: 21, b: 14 },
    { l: 32, b: 20 },
    { l: 26, b: 15 },
    { l: 35, b: 12 },
    { l: 27, b: 16 },
    { l: 23, b: 11 },
    { l: 40, b: 25 },
  ];

  mensCases.forEach((c, idx) => {
    const qNum = 81 + idx;
    const area = c.l * c.b;
    const perim = 2 * (c.l + c.b);
    const askArea = idx % 2 === 0;
    const ans = askArea ? area : perim;
    const unitEn = askArea ? 'sq. cm' : 'cm';
    const unitBn = askArea ? 'বর্গ সেমি' : 'সেমি';
    const unitHi = askArea ? 'वर्ग सेमी' : 'सेमी';
    const baseOpts = [ans, ans + 12, ans - 8, ans + 24];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const temp = rotated[correctIdx];
    rotated[correctIdx] = ans;
    rotated[0] = temp;

    questions.push({
      id: `QM-MATH-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'mathematics',
      topicId: 'math_mensuration',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Number System & Mensuration',
          question: askArea
            ? `The length and breadth of a rectangle are ${c.l} cm and ${c.b} cm respectively. Find its area.`
            : `The length and breadth of a rectangular field are ${c.l} cm and ${c.b} cm respectively. Find its perimeter.`,
          options: rotated.map((v) => `${v} ${unitEn}`) as [string, string, string, string],
          explanation: askArea
            ? `Area of rectangle = Length × Breadth = ${c.l} × ${c.b} = ${area} sq. cm.`
            : `Perimeter of rectangle = 2 × (Length + Breadth) = 2 × (${c.l} + ${c.b}) = ${perim} cm.`,
        },
        bn: {
          topicName: 'সংখ্যাতত্ত্ব ও পরিমিতি',
          question: askArea
            ? `একটি আয়তক্ষেত্রের দৈর্ঘ্য ${toBengaliDigits(c.l)} সেমি এবং প্রস্থ ${toBengaliDigits(c.b)} সেমি হলে তার ক্ষেত্রফল কত?`
            : `একটি আয়তক্ষেত্রের দৈর্ঘ্য ${toBengaliDigits(c.l)} সেমি এবং প্রস্থ ${toBengaliDigits(c.b)} সেমি হলে তার পরিসীমা কত?`,
          options: rotated.map((v) => `${toBengaliDigits(v)} ${unitBn}`) as [string, string, string, string],
          explanation: askArea
            ? `আয়তক্ষেত্রের ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ = ${toBengaliDigits(c.l)} × ${toBengaliDigits(c.b)} = ${toBengaliDigits(area)} বর্গ সেমি।`
            : `আয়তক্ষেত্রের পরিসীমা = ২ × (দৈর্ঘ্য + প্রস্থ) = ২ × (${toBengaliDigits(c.l)} + ${toBengaliDigits(c.b)}) = ${toBengaliDigits(perim)} সেমি।`,
        },
        hi: {
          topicName: 'संख्या पद्धति और क्षेत्रमिति',
          question: askArea
            ? `एक आयत की लंबाई और चौड़ाई क्रमशः ${c.l} सेमी और ${c.b} सेमी है। इसका क्षेत्रफल ज्ञात कीजिए।`
            : `एक आयत की लंबाई और चौड़ाई क्रमशः ${c.l} सेमी और ${c.b} सेमी है। इसका परिमाप ज्ञात कीजिए।`,
          options: rotated.map((v) => `${v} ${unitHi}`) as [string, string, string, string],
          explanation: askArea
            ? `आयत का क्षेत्रफल = लंबाई × चौड़ाई = ${c.l} × ${c.b} = ${area} वर्ग सेमी।`
            : `आयत का परिमाप = 2 × (लंबाई + चौड़ाई) = 2 × (${c.l} + ${c.b}) = ${perim} सेमी।`,
        },
      },
    });
  });

  return questions;
}

export function generateReasoningQuestions(): Question[] {
  const questions: Question[] = [];

  // Topic 1: Number & Letter Series (Questions 1 to 25)
  const seriesBank = [
    { seq: '3, 7, 15, 31, 63, ?', ans: '127', d: ['125', '129', '131'], ruleEn: 'Each term is doubled and 1 is added (×2 + 1). 63 × 2 + 1 = 127.', ruleBn: 'প্রতিটি পদকে ২ দিয়ে গুণ করে ১ যোগ করা হয়েছে (×২ + ১)। ৬৩ × ২ + ১ = ১২৭।', ruleHi: 'प्रत्येक पद को 2 से गुणा करके 1 जोड़ा गया है (×2 + 1)। 63 × 2 + 1 = 127।' },
    { seq: '4, 9, 16, 25, 36, ?', ans: '49', d: ['45', '48', '64'], ruleEn: 'Consecutive squares: 2², 3², 4², 5², 6², so 7² = 49.', ruleBn: 'ক্রমিক সংখ্যার বর্গ: ২², ৩², ৪², ৫², ৬², তাই ৭² = ৪৯।', ruleHi: 'क्रमागत संख्याओं का वर्ग: 2², 3², 4², 5², 6², अतः 7² = 49।' },
    { seq: '2, 6, 12, 20, 30, ?', ans: '42', d: ['40', '44', '38'], ruleEn: 'Differences increase by 2: +4, +6, +8, +10, +12. So 30 + 12 = 42.', ruleBn: 'পার্থক্য ২ করে বৃদ্ধি পাচ্ছে: +৪, +৬, +৮, +১০, +১২। তাই ৩০ + ১২ = ৪২।', ruleHi: 'अंतर 2 से बढ़ रहा है: +4, +6, +8, +10, +12। अतः 30 + 12 = 42।' },
    { seq: '5, 11, 23, 47, 95, ?', ans: '191', d: ['189', '190', '193'], ruleEn: 'Pattern is ×2 + 1: 95 × 2 + 1 = 191.', ruleBn: 'নিয়মটি হলো ×২ + ১: ৯৫ × ২ + ১ = ১৯১।', ruleHi: 'नियम ×2 + 1 है: 95 × 2 + 1 = 191।' },
    { seq: '1, 8, 27, 64, 125, ?', ans: '216', d: ['196', '225', '256'], ruleEn: 'Cubes of natural numbers: 1³, 2³, 3³, 4³, 5³, 6³ = 216.', ruleBn: 'স্বাভাবিক সংখ্যার ঘন: ১³, ২³, ৩³, ৪³, ৫³, ৬³ = ২১৬।', ruleHi: 'प्राकृतिक संख्याओं का घन: 1³, 2³, 3³, 4³, 5³, 6³ = 216।' },
    { seq: '10, 14, 23, 39, 64, ?', ans: '100', d: ['98', '102', '96'], ruleEn: 'Adding squares: +2², +3², +4², +5², +6² (36). 64 + 36 = 100.', ruleBn: 'বর্গ যোগ করা হয়েছে: +২², +৩², +৪², +৫², +৬² (৩৬)। ৬৪ + ৩৬ = ১০০।', ruleHi: 'वर्ग जोड़ा गया है: +2², +3², +4², +5², +6² (36)। 64 + 36 = 100।' },
    { seq: '7, 14, 28, 56, 112, ?', ans: '224', d: ['212', '220', '228'], ruleEn: 'Each number is multiplied by 2: 112 × 2 = 224.', ruleBn: 'প্রতিটি সংখ্যাকে ২ দিয়ে গুণ করা হয়েছে: ১১২ × ২ = ২২৪।', ruleHi: 'प्रत्येक संख्या को 2 से गुणा किया गया है: 112 × 2 = 224।' },
    { seq: '12, 17, 24, 33, 44, ?', ans: '57', d: ['55', '56', '59'], ruleEn: 'Odd differences: +5, +7, +9, +11, +13. 44 + 13 = 57.', ruleBn: 'বিজোড় সংখ্যা যোগ: +৫, +৭, +৯, +১১, +১৩। ৪৪ + ১৩ = ৫৭।', ruleHi: 'विषम अंतर: +5, +7, +9, +11, +13। 44 + 13 = 57।' },
    { seq: '100, 95, 85, 70, 50, ?', ans: '25', d: ['20', '30', '15'], ruleEn: 'Subtracting multiples of 5: -5, -10, -15, -20, -25. 50 - 25 = 25.', ruleBn: '৫ এর গুণিতক বিয়োগ: -৫, -১০, -১৫, -২০, -২৫। ৫০ - ২৫ = ২৫।', ruleHi: '5 के गुणज घटाए गए हैं: -5, -10, -15, -20, -25। 50 - 25 = 25।' },
    { seq: '6, 11, 21, 36, 56, ?', ans: '81', d: ['76', '86', '91'], ruleEn: 'Differences: +5, +10, +15, +20, +25. 56 + 25 = 81.', ruleBn: 'পার্থক্য: +৫, +১০, +১৫, +২০, +২৫। ৫৬ + ২৫ = ৮১।', ruleHi: 'अंतर: +5, +10, +15, +20, +25। 56 + 25 = 81।' },
    { seq: '2, 3, 5, 7, 11, 13, ?', ans: '17', d: ['15', '19', '21'], ruleEn: 'Consecutive prime numbers: after 13 comes 17.', ruleBn: 'ক্রমিক মৌলিক সংখ্যা: ১৩-এর পরের মৌলিক সংখ্যা ১৭।', ruleHi: 'क्रमागत अभाज्य संख्याएँ: 13 के बाद 17 आता है।' },
    { seq: '3, 8, 15, 24, 35, ?', ans: '48', d: ['46', '50', '49'], ruleEn: 'n² - 1 series: 2²-1, 3²-1, 4²-1, 5²-1, 6²-1, 7²-1 = 48.', ruleBn: 'n² - ১ ক্রম: ৭² - ১ = ৪৮।', ruleHi: 'n² - 1 श्रृंखला: 7² - 1 = 48।' },
    { seq: '11, 13, 17, 25, 41, ?', ans: '73', d: ['69', '71', '75'], ruleEn: 'Differences double each step: +2, +4, +8, +16, +32. 41 + 32 = 73.', ruleBn: 'পার্থক্য দ্বিগুণ হচ্ছে: +২, +৪, +৮, +১৬, +৩২। ৪১ + ৩২ = ৭৩।', ruleHi: 'अंतर दोगुना हो रहा है: +2, +4, +8, +16, +32। 41 + 32 = 73।' },
    { seq: '8, 15, 28, 53, 102, ?', ans: '199', d: ['197', '201', '204'], ruleEn: '×2 - 1, ×2 - 2, ×2 - 3, ×2 - 4, ×2 - 5: 102 × 2 - 5 = 199.', ruleBn: '১০২ × ২ - ৫ = ১৯৯।', ruleHi: '102 × 2 - 5 = 199।' },
    { seq: '15, 19, 27, 39, 55, ?', ans: '75', d: ['71', '73', '77'], ruleEn: 'Differences are multiples of 4: +4, +8, +12, +16, +20. 55 + 20 = 75.', ruleBn: 'পার্থক্য ৪-এর গুণিতক: +৪, +৮, +১২, +১৬, +২০। ৫৫ + ২০ = ৭৫।', ruleHi: 'अंतर 4 के गुणज हैं: +4, +8, +12, +16, +20। 55 + 20 = 75।' },
    { seq: '1, 4, 10, 22, 46, ?', ans: '94', d: ['90', '92', '96'], ruleEn: '×2 + 2 pattern: 46 × 2 + 2 = 94.', ruleBn: '×২ + ২ নিয়ম: ৪৬ × ২ + ২ = ৯৪।', ruleHi: '×2 + 2 नियम: 46 × 2 + 2 = 94।' },
    { seq: '9, 18, 36, 72, 144, ?', ans: '288', d: ['276', '284', '296'], ruleEn: 'Geometric progression ×2: 144 × 2 = 288.', ruleBn: 'গুণোত্তর প্রগতি ×২: ১৪৪ × ২ = ২৮৮।', ruleHi: 'गुणोत्तर श्रेणी ×2: 144 × 2 = 288।' },
    { seq: '21, 25, 34, 50, 75, ?', ans: '111', d: ['105', '109', '115'], ruleEn: 'Adding consecutive squares: +2², +3², +4², +5², +6² (36). 75 + 36 = 111.', ruleBn: 'ক্রমিক বর্গ যোগ: ৭৫ + ৩৬ = ১১১।', ruleHi: 'क्रमागत वर्ग जोड़ना: 75 + 36 = 111।' },
    { seq: '50, 48, 44, 38, 30, ?', ans: '20', d: ['18', '22', '24'], ruleEn: 'Subtracting -2, -4, -6, -8, -10: 30 - 10 = 20.', ruleBn: 'ক্রমান্বয়ে -২, -৪, -৬, -৮, -১০ বিয়োগ: ৩০ - ১০ = ২০।', ruleHi: '-2, -4, -6, -8, -10 घटाने पर: 30 - 10 = 20।' },
    { seq: 'B, E, H, K, N, ?', ans: 'Q', d: ['P', 'R', 'O'], ruleEn: 'Alphabet positions increase by +3: B(2), E(5), H(8), K(11), N(14), Q(17).', ruleBn: 'বর্ণমালার অবস্থান +৩ করে বাড়ছে: N(১৪) + ৩ = Q(১৭)।', ruleHi: 'वर्णमाला का स्थान +3 बढ़ रहा है: N(14) + 3 = Q(17)।' },
  ];

  seriesBank.forEach((item, idx) => {
    const qNum = idx + 1;
    const opts = [item.ans, ...item.d];
    const correctIdx = qNum % 4;
    const rotated = [...opts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = item.ans;
    rotated[0] = t;

    questions.push({
      id: `QM-REAS-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'reasoning',
      topicId: 'reas_series',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Number & Letter Series',
          question: `Find the missing term in the series: ${item.seq}`,
          options: rotated as [string, string, string, string],
          explanation: item.ruleEn,
        },
        bn: {
          topicName: 'সংখ্যা ও বর্ণ ক্রম',
          question: `প্রদত্ত ক্রমটির লুপ্ত পদটি নির্ণয় করুন: ${item.seq}`,
          options: rotated as [string, string, string, string],
          explanation: item.ruleBn,
        },
        hi: {
          topicName: 'संख्या और अक्षर श्रृंखला',
          question: `दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए: ${item.seq}`,
          options: rotated as [string, string, string, string],
          explanation: item.ruleHi,
        },
      },
    });
  });

  // Topic 2: Coding-Decoding & Analogy (Questions 21 to 45)
  const codingBank = [
    { word: 'TRAIN', code: 'USBJO', target: 'PLANE', ans: 'QMBOF', d: ['QMBNE', 'OMBOF', 'QMCPE'], expEn: 'Each letter moves +1 forward in the alphabet.', expBn: 'প্রতিটি বর্ণ ইংরেজি বর্ণমালায় +১ ঘর এগিয়েছে।', expHi: 'प्रत्येक अक्षर वर्णमाला में +1 स्थान आगे बढ़ता है।' },
    { word: 'CAT', code: '24', target: 'DOG', ans: '26', d: ['24', '28', '30'], expEn: 'Sum of alphabetical positions: D(4) + O(15) + G(7) = 26.', expBn: 'বর্ণমালার ক্রমিক মানের যোগফল: D(4) + O(15) + G(7) = 26।', expHi: 'वर्णमाला के स्थानीय मानों का योग: D(4) + O(15) + G(7) = 26।' },
    { word: 'MANGO', code: 'OGNAM', target: 'APPLE', ans: 'ELPPA', d: ['ELPAP', 'LEPPA', 'EPLPA'], expEn: 'The letters of the word are written in reverse order.', expBn: 'শব্দটির অক্ষরগুলো বিপরীত ক্রমে সাজানো হয়েছে।', expHi: 'शब्द के अक्षरों को विपरीत क्रम में लिखा गया है।' },
    { word: 'PEN', code: '35', target: 'INK', ans: '34', d: ['32', '36', '30'], expEn: 'Sum of positions: I(9) + N(14) + K(11) = 34.', expBn: 'ক্রমিক মানের সমষ্টি: I(9) + N(14) + K(11) = 34।', expHi: 'स्थानीय मानों का योग: I(9) + N(14) + K(11) = 34।' },
    { word: 'WATER', code: 'YCVGT', target: 'FIRE', ans: 'HKTG', d: ['HJTG', 'GKTF', 'HLTG'], expEn: 'Each letter is shifted +2 positions forward.', expBn: 'প্রতিটি অক্ষর বর্ণমালায় +২ ঘর এগিয়েছে।', expHi: 'प्रत्येक अक्षर +2 स्थान आगे बढ़ा है।' },
    { word: 'BOOK', code: '43', target: 'PAGE', ans: '29', d: ['27', '31', '33'], expEn: 'P(16) + A(1) + G(7) + E(5) = 29.', expBn: 'P(16) + A(1) + G(7) + E(5) = 29।', expHi: 'P(16) + A(1) + G(7) + E(5) = 29।' },
    { word: 'TIGER', code: 'SDFHQ', target: 'HORSE', ans: 'GNQRD', d: ['GNQRE', 'IMQRD', 'FNQRD'], expEn: 'Each letter is shifted -1 backward in the alphabet.', expBn: 'প্রতিটি অক্ষর বর্ণমালায় ১ ঘর পিছিয়েছে (-১)।', expHi: 'प्रत्येक अक्षर वर्णमाला में 1 स्थान पीछे (-1) गया है।' },
    { word: 'INDIA', code: '37', target: 'DELHI', ans: '38', d: ['36', '40', '42'], expEn: 'D(4)+E(5)+L(12)+H(8)+I(9) = 38.', expBn: 'D(4)+E(5)+L(12)+H(8)+I(9) = 38।', expHi: 'D(4)+E(5)+L(12)+H(8)+I(9) = 38।' },
    { word: 'CLOCK', code: 'KCOLC', target: 'WATCH', ans: 'HCTAW', d: ['HTCAW', 'HCATW', 'HCTWA'], expEn: 'Reversed spelling of WATCH is HCTAW.', expBn: 'WATCH শব্দটিকে উল্টো করে লিখলে HCTAW হয়।', expHi: 'WATCH को उल्टे क्रम में लिखने पर HCTAW बनता है।' },
    { word: 'SUN', code: '54', target: 'MOON', ans: '57', d: ['55', '59', '53'], expEn: 'M(13)+O(15)+O(15)+N(14) = 57.', expBn: 'M(13)+O(15)+O(15)+N(14) = 57।', expHi: 'M(13)+O(15)+O(15)+N(14) = 57।' },
    { word: 'GOLD', code: 'IQNF', target: 'IRON', ans: 'KTQP', d: ['KTRP', 'JTQP', 'KTQO'], expEn: '+2 forward shift for each letter: I->K, R->T, O->Q, N->P.', expBn: 'প্রতিটি বর্ণ +২ ঘর এগিয়ে KTQP হয়েছে।', expHi: 'प्रत्येक अक्षर +2 आगे बढ़कर KTQP बनता है।' },
    { word: 'STAR', code: 'RATS', target: 'WARD', ans: 'DRAW', d: ['DARW', 'DRWA', 'WADR'], expEn: 'Letters are reversed from right to left.', expBn: 'বর্ণগুলো ডানদিক থেকে বামদিকে সাজানো হয়েছে।', expHi: 'अक्षरों को दाएं से बाएं उलट दिया गया है।' },
    { word: 'BAT', code: '46', target: 'MAN', ans: '56', d: ['28', '54', '58'], expEn: 'Sum of positions × 2: M(13)+A(1)+N(14) = 28; 28 × 2 = 56.', expBn: 'অবস্থানের যোগফল × ২: (১৩+১+১৪) × ২ = ৫৬।', expHi: 'स्थानों का योग × 2: (13+1+14) × 2 = 56।' },
    { word: 'DESK', code: '39', target: 'LAMP', ans: '42', d: ['40', '44', '38'], expEn: 'L(12)+A(1)+M(13)+P(16) = 42.', expBn: 'L(12)+A(1)+M(13)+P(16) = 42।', expHi: 'L(12)+A(1)+M(13)+P(16) = 42।' },
    { word: 'ROAD', code: 'URDG', target: 'LANE', ans: 'ODQH', d: ['ODQG', 'OCQH', 'PEQH'], expEn: 'Each letter shifts +3 forward: L->O, A->D, N->Q, E->H.', expBn: 'প্রতিটি বর্ণ +৩ ঘর এগিয়ে ODQH হয়েছে।', expHi: 'प्रत्येक अक्षर +3 स्थान आगे बढ़कर ODQH बनता है।' },
    { word: 'FISH', code: 'EHRG', target: 'BIRD', ans: 'AHQC', d: ['AHQD', 'BHQC', 'AGQC'], expEn: 'Each letter shifts -1 backward: B->A, I->H, R->Q, D->C.', expBn: 'প্রতিটি বর্ণ ১ ঘর পিছিয়ে AHQC হয়েছে।', expHi: 'प्रत्येक अक्षर 1 स्थान पीछे जाकर AHQC बनता है।' },
    { word: 'KING', code: '41', target: 'LION', ans: '50', d: ['48', '52', '46'], expEn: 'L(12)+I(9)+O(15)+N(14) = 50.', expBn: 'L(12)+I(9)+O(15)+N(14) = 50।', expHi: 'L(12)+I(9)+O(15)+N(14) = 50।' },
    { word: 'RIVER', code: 'REVIR', target: 'OCEAN', ans: 'NAECO', d: ['NEACO', 'NACEO', 'NAEOC'], expEn: 'Letters written in reverse order.', expBn: 'অক্ষরগুলো বিপরীত ক্রমে লেখা হয়েছে।', expHi: 'अक्षरों को विपरीत क्रम में लिखा गया है।' },
    { word: 'MIND', code: 'NJOE', target: 'SOUL', ans: 'TPVM', d: ['TPVL', 'TOVM', 'UPVM'], expEn: 'Each letter shifts +1 forward.', expBn: 'প্রতিটি অক্ষর +১ ঘর এগিয়েছে।', expHi: 'प्रत्येक अक्षर +1 स्थान आगे बढ़ा है।' },
    { word: 'TREE', code: '49', target: 'LEAF', ans: '24', d: ['22', '26', '28'], expEn: 'L(12)+E(5)+A(1)+F(6) = 24.', expBn: 'L(12)+E(5)+A(1)+F(6) = 24।', expHi: 'L(12)+E(5)+A(1)+F(6) = 24।' },
  ];

  codingBank.forEach((item, idx) => {
    const qNum = 21 + idx;
    const opts = [item.ans, ...item.d];
    const correctIdx = qNum % 4;
    const rotated = [...opts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = item.ans;
    rotated[0] = t;

    questions.push({
      id: `QM-REAS-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'reasoning',
      topicId: 'reas_coding',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Coding-Decoding & Analogy',
          question: `In a certain code language, '${item.word}' is written as '${item.code}'. How will '${item.target}' be written in that code?`,
          options: rotated as [string, string, string, string],
          explanation: item.expEn,
        },
        bn: {
          topicName: 'কোডিং-ডিকোডিং ও সাদৃশ্য',
          question: `একটি নির্দিষ্ট কোড ভাষায় '${item.word}'-কে '${item.code}' লেখা হলে, ওই কোড ভাষায় '${item.target}'-কে কী লেখা হবে?`,
          options: rotated as [string, string, string, string],
          explanation: item.expBn,
        },
        hi: {
          topicName: 'कोडिंग-डिकोडिंग और सादृश्यता',
          question: `एक निश्चित कूट भाषा में '${item.word}' को '${item.code}' लिखा जाता है, तो उसी भाषा में '${item.target}' को कैसे लिखा जाएगा?`,
          options: rotated as [string, string, string, string],
          explanation: item.expHi,
        },
      },
    });
  });

  // Topic 3: Blood Relations & Direction Sense (Questions 41 to 60)
  const dirCases = [
    { n: 3, e: 4, ans: 5 },
    { n: 6, e: 8, ans: 10 },
    { n: 5, e: 12, ans: 13 },
    { n: 8, e: 15, ans: 17 },
    { n: 9, e: 12, ans: 15 },
    { n: 12, e: 16, ans: 20 },
    { n: 7, e: 24, ans: 25 },
    { n: 15, e: 20, ans: 25 },
    { n: 10, e: 24, ans: 26 },
    { n: 16, e: 30, ans: 34 },
    { n: 18, e: 24, ans: 30 },
    { n: 20, e: 21, ans: 29 },
    { n: 4, e: 3, ans: 5 },
    { n: 12, e: 5, ans: 13 },
    { n: 15, e: 8, ans: 17 },
    { n: 24, e: 7, ans: 25 },
    { n: 24, e: 10, ans: 26 },
    { n: 21, e: 28, ans: 35 },
    { n: 9, e: 40, ans: 41 },
    { n: 27, e: 36, ans: 45 },
  ];

  dirCases.forEach((c, idx) => {
    const qNum = 41 + idx;
    const baseOpts = [c.ans, c.ans + 2, c.ans - 1, c.n + c.e];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = c.ans;
    rotated[0] = t;

    questions.push({
      id: `QM-REAS-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'reasoning',
      topicId: 'reas_relations',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Blood Relations & Direction',
          question: `A person walks ${c.n} km North and then turns right and walks ${c.e} km East. What is the shortest straight-line distance from the starting point?`,
          options: rotated.map((v) => `${v} km`) as [string, string, string, string],
          explanation: `By Pythagoras theorem, shortest distance = √(${c.n}² + ${c.e}²) = √(${c.n * c.n} + ${c.e * c.e}) = √${c.n * c.n + c.e * c.e} = ${c.ans} km.`,
        },
        bn: {
          topicName: 'রক্তের সম্পর্ক ও দিকনির্ণয়',
          question: `এক ব্যক্তি উত্তর দিকে ${toBengaliDigits(c.n)} কিমি হাঁটার পর ডানদিকে ঘুরে পূর্ব দিকে ${toBengaliDigits(c.e)} কিমি হাঁটলেন। শুরুর স্থান থেকে তাঁর ন্যূনতম সরলরৈখিক দূরত্ব কত?`,
          options: rotated.map((v) => `${toBengaliDigits(v)} কিমি`) as [string, string, string, string],
          explanation: `পিথাগোরাসের উপপাদ্য অনুযায়ী দূরত্ব = √(${toBengaliDigits(c.n)}² + ${toBengaliDigits(c.e)}²) = ${toBengaliDigits(c.ans)} কিমি।`,
        },
        hi: {
          topicName: 'रक्त संबंध और दिशा ज्ञान',
          question: `एक व्यक्ति उत्तर की ओर ${c.n} किमी चलता है और फिर दाएं मुड़कर पूर्व की ओर ${c.e} किमी चलता है। प्रारंभिक बिंदु से उसकी न्यूनतम सीधी दूरी क्या है?`,
          options: rotated.map((v) => `${v} किमी`) as [string, string, string, string],
          explanation: `पाइथागोरस प्रमेय द्वारा न्यूनतम दूरी = √(${c.n}² + ${c.e}²) = ${c.ans} किमी।`,
        },
      },
    });
  });

  // Topic 4: Order & Ranking (Questions 61 to 80)
  const rankCases = [
    { top: 12, bottom: 19 },
    { top: 15, bottom: 26 },
    { top: 8, bottom: 23 },
    { top: 18, bottom: 18 },
    { top: 14, bottom: 27 },
    { top: 21, bottom: 30 },
    { top: 10, bottom: 35 },
    { top: 16, bottom: 25 },
    { top: 22, bottom: 19 },
    { top: 11, bottom: 29 },
    { top: 17, bottom: 24 },
    { top: 13, bottom: 28 },
    { top: 25, bottom: 26 },
    { top: 9, bottom: 32 },
    { top: 19, bottom: 22 },
    { top: 24, bottom: 17 },
    { top: 20, bottom: 31 },
    { top: 7, bottom: 44 },
    { top: 28, bottom: 13 },
    { top: 30, bottom: 21 },
  ];

  rankCases.forEach((c, idx) => {
    const qNum = 61 + idx;
    const total = c.top + c.bottom - 1;
    const baseOpts = [total, total + 1, total - 1, total + 2];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = total;
    rotated[0] = t;

    questions.push({
      id: `QM-REAS-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'reasoning',
      topicId: 'reas_syllogism',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Syllogism & Ranking',
          question: `In a row of students, Rahul ranks ${c.top}th from the top and ${c.bottom}th from the bottom. How many total students are in the row?`,
          options: rotated.map((v) => `${v}`) as [string, string, string, string],
          explanation: `Total students = (Rank from Top + Rank from Bottom) - 1 = (${c.top} + ${c.bottom}) - 1 = ${total}.`,
        },
        bn: {
          topicName: 'সিলোজিজম ও ক্রম নির্ণয়',
          question: `ছাত্রদের একটি সারিতে রাহুলের স্থান উপর থেকে ${toBengaliDigits(c.top)}-তম এবং নিচ থেকে ${toBengaliDigits(c.bottom)}-তম হলে সারিতে মোট কতজন ছাত্র আছে?`,
          options: rotated.map((v) => `${toBengaliDigits(v)} জন`) as [string, string, string, string],
          explanation: `মোট ছাত্রসংখ্যা = (উপর থেকে স্থান + নিচ থেকে স্থান) - ১ = (${toBengaliDigits(c.top)} + ${toBengaliDigits(c.bottom)}) - ১ = ${toBengaliDigits(total)} জন।`,
        },
        hi: {
          topicName: 'न्याय निगमन और क्रम व्यवस्था',
          question: `छात्रों की एक पंक्ति में राहुल का स्थान ऊपर से ${c.top}वाँ और नीचे से ${c.bottom}वाँ है। पंक्ति में कुल कितने छात्र हैं?`,
          options: rotated.map((v) => `${v}`) as [string, string, string, string],
          explanation: `कुल छात्र = (ऊपर से स्थान + नीचे से स्थान) - 1 = (${c.top} + ${c.bottom}) - 1 = ${total}।`,
        },
      },
    });
  });

  // Topic 5: Clock, Calendar & Logic (Questions 81 to 100)
  const clockCases = [
    { h: 3, m: 0, ans: 90 },
    { h: 4, m: 0, ans: 120 },
    { h: 2, m: 20, ans: 50 },
    { h: 3, m: 30, ans: 75 },
    { h: 4, m: 20, ans: 10 },
    { h: 5, m: 0, ans: 150 },
    { h: 6, m: 0, ans: 180 },
    { h: 1, m: 0, ans: 30 },
    { h: 2, m: 0, ans: 60 },
    { h: 5, m: 20, ans: 40 },
    { h: 6, m: 30, ans: 15 },
    { h: 8, m: 20, ans: 130 },
    { h: 9, m: 0, ans: 90 },
    { h: 10, m: 0, ans: 60 },
    { h: 7, m: 20, ans: 100 },
    { h: 8, m: 0, ans: 120 },
    { h: 4, m: 40, ans: 100 },
    { h: 3, m: 40, ans: 130 },
    { h: 2, m: 40, ans: 160 },
    { h: 11, m: 0, ans: 30 },
  ];

  clockCases.forEach((c, idx) => {
    const qNum = 81 + idx;
    const timeStr = `${c.h}:${String(c.m).padStart(2, '0')}`;
    const baseOpts = [c.ans, c.ans + 15, Math.max(5, c.ans - 10), c.ans + 25];
    const correctIdx = qNum % 4;
    const rotated = [...baseOpts];
    const t = rotated[correctIdx];
    rotated[correctIdx] = c.ans;
    rotated[0] = t;

    questions.push({
      id: `QM-REAS-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[qNum % EXAM_CYCLE.length],
      subject: 'reasoning',
      topicId: 'reas_calendar',
      difficulty: DIFF_CYCLE[qNum % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: 'Clock, Calendar & Logic',
          question: `What is the acute/reflex angle between the hour hand and the minute hand of a clock at ${timeStr}?`,
          options: rotated.map((v) => `${v}°`) as [string, string, string, string],
          explanation: `Angle formula = |30H - 5.5M| = |30(${c.h}) - 5.5(${c.m})| = ${c.ans}°.`,
        },
        bn: {
          topicName: 'ঘড়ি, ক্যালেন্ডার ও লজিক',
          question: `ঘড়িতে যখন ${toBengaliDigits(timeStr)} বাজে, তখন ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যে কোণের মান কত ডিগ্রি?`,
          options: rotated.map((v) => `${toBengaliDigits(v)}°`) as [string, string, string, string],
          explanation: `কোণ নির্ণয়ের সূত্র = |৩০H - ৫.৫M| = |৩০(${toBengaliDigits(c.h)}) - ৫.৫(${toBengaliDigits(c.m)})| = ${toBengaliDigits(c.ans)}°।`,
        },
        hi: {
          topicName: 'घड़ी, कैलेंडर और तार्किक पहेली',
          question: `घड़ी में ${timeStr} बजे घंटे की सुई और मिनट की सुई के बीच का कोण कितना होगा?`,
          options: rotated.map((v) => `${v}°`) as [string, string, string, string],
          explanation: `कोण सूत्र = |30H - 5.5M| = |30(${c.h}) - 5.5(${c.m})| = ${c.ans}°।`,
        },
      },
    });
  });

  return questions;
}
