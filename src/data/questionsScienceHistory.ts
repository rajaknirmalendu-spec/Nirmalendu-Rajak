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

interface MultilingualFactRow {
  topicId: string;
  topicEn: string;
  topicBn: string;
  topicHi: string;
  qEn: string;
  qBn: string;
  qHi: string;
  ansEn: string;
  ansBn: string;
  ansHi: string;
  dEn: [string, string, string];
  dBn: [string, string, string];
  dHi: [string, string, string];
  expEn: string;
  expBn: string;
  expHi: string;
}

export function generateScienceQuestions(): Question[] {
  const rows: MultilingualFactRow[] = [];

  // 1. Physics SI Units & Instruments (20 items)
  const physicsUnits = [
    { itemEn: 'Electric Current', itemBn: 'তড়িৎ প্রবাহমাত্রা', itemHi: 'विद्युत धारा', ansEn: 'Ampere', ansBn: 'অ্যাম্পিয়ার', ansHi: 'एम्पियर' },
    { itemEn: 'Force', itemBn: 'বল (Force)', itemHi: 'बल (Force)', ansEn: 'Newton', ansBn: 'নিউটন', ansHi: 'न्यूटन' },
    { itemEn: 'Work and Energy', itemBn: 'কার্য ও শক্তি', itemHi: 'कार्य और ऊर्जा', ansEn: 'Joule', ansBn: 'জুল', ansHi: 'जूल' },
    { itemEn: 'Power', itemBn: 'ক্ষমতা (Power)', itemHi: 'शक्ति (Power)', ansEn: 'Watt', ansBn: 'ওয়াট', ansHi: 'वाट' },
    { itemEn: 'Electrical Resistance', itemBn: 'তড়িৎ রোধ', itemHi: 'विद्युत प्रतिरोध', ansEn: 'Ohm', ansBn: 'ওহম', ansHi: 'ओम' },
    { itemEn: 'Frequency', itemBn: 'কম্পাঙ্ক (Frequency)', itemHi: 'आवृत्ति (Frequency)', ansEn: 'Hertz', ansBn: 'হার্ৎজ', ansHi: 'हर्ट्ज़' },
    { itemEn: 'Pressure', itemBn: 'চাপ (Pressure)', itemHi: 'दाब (Pressure)', ansEn: 'Pascal', ansBn: 'পাস্কাল', ansHi: 'पास्कल' },
    { itemEn: 'Electric Charge', itemBn: 'তড়িৎ আধান', itemHi: 'विद्युत आवेश', ansEn: 'Coulomb', ansBn: 'কুলম্ব', ansHi: 'कूलॉम' },
    { itemEn: 'Potential Difference', itemBn: 'বিভব প্রভেদ', itemHi: 'विभवांतर', ansEn: 'Volt', ansBn: 'ভোল্ট', ansHi: 'वोल्ट' },
    { itemEn: 'Luminous Intensity', itemBn: 'দীপন প্রাবল্য', itemHi: 'ज्योति तीव्रता', ansEn: 'Candela', ansBn: 'ক্যান্ডেলা', ansHi: 'कैंडेला' },
    { itemEn: 'Thermodynamic Temperature', itemBn: 'পরম উষ্ণতা', itemHi: 'ऊष्मागतिक ताप', ansEn: 'Kelvin', ansBn: 'কেলভিন', ansHi: 'केल्विन' },
    { itemEn: 'Power of a Lens', itemBn: 'লেন্সের ক্ষমতা', itemHi: 'लेंस की क्षमता', ansEn: 'Dioptre', ansBn: 'ডায়োপ্টার', ansHi: 'डायोप्टर' },
    { itemEn: 'Magnetic Flux', itemBn: 'চৌম্বক ফ্লাক্স', itemHi: 'चुंबकीय फ्लक्स', ansEn: 'Weber', ansBn: 'ওয়েবার', ansHi: 'वेबर' },
    { itemEn: 'Capacitance', itemBn: 'ধারকত্ব (Capacitance)', itemHi: 'विद्युत धारिता', ansEn: 'Farad', ansBn: 'ফ্যারাড', ansHi: 'फैराड' },
    { itemEn: 'Inductance', itemBn: 'আবেশাঙ্ক (Inductance)', itemHi: 'प्रेरकत्व (Inductance)', ansEn: 'Henry', ansBn: 'হেনরি', ansHi: 'हेनरी' },
    { itemEn: 'Sound Intensity Level', itemBn: 'শব্দের তীব্রতা স্তর', itemHi: 'ध्वनि की तीव्रता', ansEn: 'Decibel', ansBn: 'ডেসিবেল', ansHi: 'डेसीबल' },
    { itemEn: 'Wavelength of Light', itemBn: 'আলোর তরঙ্গদৈর্ঘ্য', itemHi: 'प्रकाश की तरंगदैर्ध्य', ansEn: 'Angstrom', ansBn: 'অ্যাংস্ট্রম', ansHi: 'एंगस्ट्रॉम' },
    { itemEn: 'Astronomical Distance', itemBn: 'মহাজাগতিক দূরত্ব', itemHi: 'खगोलीय दूरी', ansEn: 'Light Year', ansBn: 'আলোকবর্ষ', ansHi: 'प्रकाश वर्ष' },
    { itemEn: 'Atmospheric Pressure', itemBn: 'বায়ুমণ্ডলীয় চাপ', itemHi: 'वायुमंडलीय दाब', ansEn: 'Bar', ansBn: 'বার (Bar)', ansHi: 'बार (Bar)' },
    { itemEn: 'Amount of Substance', itemBn: 'পদার্থের পরিমাণ', itemHi: 'पदार्थ की मात्रा', ansEn: 'Mole', ansBn: 'মোল (Mole)', ansHi: 'मोल (Mole)' },
  ];

  physicsUnits.forEach((u, idx) => {
    const d1 = physicsUnits[(idx + 1) % physicsUnits.length];
    const d2 = physicsUnits[(idx + 2) % physicsUnits.length];
    const d3 = physicsUnits[(idx + 3) % physicsUnits.length];
    rows.push({
      topicId: 'sci_physics',
      topicEn: 'Physics & Mechanics',
      topicBn: 'পদার্থবিদ্যা ও বলবিজ্ঞান',
      topicHi: 'भौतिक विज्ञान और यांत्रिकी',
      qEn: `What is the standard SI / measurement unit of ${u.itemEn}?`,
      qBn: `${u.itemBn}-এর একক কোনটি?`,
      qHi: `${u.itemHi} का मानक मात्रक (इकाई) क्या है?`,
      ansEn: u.ansEn,
      ansBn: u.ansBn,
      ansHi: u.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `The standard unit used to measure ${u.itemEn} is ${u.ansEn}.`,
      expBn: `${u.itemBn} পরিমাপের আদর্শ একক হলো ${u.ansBn}।`,
      expHi: `${u.itemHi} को मापने की मानक इकाई ${u.ansHi} है।`,
    });
  });

  // 2. Chemistry Elements, Symbols & Compounds (20 items)
  const chemItems = [
    { qEn: 'What is the chemical name of Baking Soda?', qBn: 'বেকিং সোডার রাসায়নিক নাম কী?', qHi: 'बेकिंग सोडा का रासायनिक नाम क्या है?', ansEn: 'Sodium Bicarbonate', ansBn: 'সোডিয়াম বাইকার্বনেট', ansHi: 'सोडियम बाइकार्बोनेट' },
    { qEn: 'What is the chemical name of Washing Soda?', qBn: 'কাপড় কাচার সোডার রাসায়নিক নাম কী?', qHi: 'धावन सोडा का रासायनिक नाम क्या है?', ansEn: 'Sodium Carbonate', ansBn: 'সোডিয়াম কার্বনেট', ansHi: 'सोडियम कार्बोनेट' },
    { qEn: 'Which gas is commonly known as Laughing Gas?', qBn: 'কোন গ্যাসটি লাফিং গ্যাস (Laughing Gas) নামে পরিচিত?', qHi: 'किस गैस को हास्य गैस (Laughing Gas) कहा जाता है?', ansEn: 'Nitrous Oxide (N2O)', ansBn: 'নাইট্রাস অক্সাইড (N2O)', ansHi: 'नाइट्रस ऑक्साइड (N2O)' },
    { qEn: 'What is solid Carbon Dioxide commonly called?', qBn: 'কঠিন কার্বন ডাই-অক্সাইডকে কী বলা হয়?', qHi: 'ठोस कार्बन डाइऑक्साइड को क्या कहा जाता है?', ansEn: 'Dry Ice', ansBn: 'শুষ্ক বরফ (Dry Ice)', ansHi: 'शुष्क बर्फ (Dry Ice)' },
    { qEn: 'Which metal remains liquid at room temperature?', qBn: 'কোন ধাতু ঘরের তাপমাত্রায় তরল অবস্থায় থাকে?', qHi: 'कौन सी धातु कमरे के तापमान पर द्रव अवस्था में रहती है?', ansEn: 'Mercury (Hg)', ansBn: 'পারদ (Mercury)', ansHi: 'पारा (Mercury)' },
    { qEn: 'Which non-metal remains liquid at room temperature?', qBn: 'কোন অধাতু ঘরের তাপমাত্রায় তরল অবস্থায় থাকে?', qHi: 'कौन सी अधातु कमरे के तापमान पर द्रव अवस्था में रहती है?', ansEn: 'Bromine (Br)', ansBn: 'ব্রোমিন (Bromine)', ansHi: 'ब्रोमीन (Bromine)' },
    { qEn: 'What is the main constituent of Biogas and Natural Gas?', qBn: 'বায়োগ্যাস ও প্রাকৃতিক গ্যাসের প্রধান উপাদান কোনটি?', qHi: 'बायोगैस और प्राकृतिक गैस का मुख्य घटक क्या है?', ansEn: 'Methane (CH4)', ansBn: 'মিথেন (CH4)', ansHi: 'मीथेन (CH4)' },
    { qEn: 'Brass is an alloy of which two metals?', qBn: 'পিতল (Brass) কোন দুটি ধাতুর সংকর?', qHi: 'पीतल (Brass) किन दो धातुओं की मिश्रधातु है?', ansEn: 'Copper and Zinc', ansBn: 'তামা ও দস্তা', ansHi: 'तांबा और जस्ता' },
    { qEn: 'Bronze is an alloy of which two metals?', qBn: 'ব্রোঞ্জ (Bronze) কোন দুটি ধাতুর সংকর?', qHi: 'कांस्य (Bronze) किन दो धातुओं की मिश्रधातु है?', ansEn: 'Copper and Tin', ansBn: 'তামা ও টিন', ansHi: 'तांबा और टिन' },
    { qEn: 'Which acid is present in Vinegar?', qBn: 'ভিনিগারে কোন অ্যাসিড থাকে?', qHi: 'सिरके (Vinegar) में कौन सा अम्ल पाया जाता है?', ansEn: 'Acetic Acid', ansBn: 'অ্যাসিটিক অ্যাসিড', ansHi: 'एसिटिक अम्ल' },
    { qEn: 'Which acid is found in Lemon and Citrus fruits?', qBn: 'লেবু ও টক জাতীয় ফলে কোন অ্যাসিড থাকে?', qHi: 'नींबू और खट्टे फलों में कौन सा अम्ल पाया जाता है?', ansEn: 'Citric Acid', ansBn: 'সাইট্রিক অ্যাসিড', ansHi: 'साइट्रिक अम्ल' },
    { qEn: 'Which acid is secreted in the human stomach for digestion?', qBn: 'মানুষের পাকস্থলীতে পরিপাকের জন্য কোন অ্যাসিড নিঃসৃত হয়?', qHi: 'मानव आमाशय में पाचन के लिए कौन सा अम्ल स्रावित होता है?', ansEn: 'Hydrochloric Acid (HCl)', ansBn: 'হাইড্রোক্লোরিক অ্যাসিড (HCl)', ansHi: 'हाइड्रोक्लोरिक अम्ल (HCl)' },
    { qEn: 'What is the chemical formula of Plaster of Paris?', qBn: 'প্লাস্টার অফ প্যারিসের রাসায়নিক সংকেত কোনটি?', qHi: 'प्लास्टर ऑफ पेरिस का रासायनिक सूत्र क्या है?', ansEn: 'CaSO4 · ½H2O', ansBn: 'CaSO4 · ½H2O', ansHi: 'CaSO4 · ½H2O' },
    { qEn: 'Which gas is used in fire extinguishers?', qBn: 'অগ্নিনির্বাপক যন্ত্রে কোন গ্যাস ব্যবহৃত হয়?', qHi: 'अग्निशामक यंत्रों में किस गैस का उपयोग किया जाता है?', ansEn: 'Carbon Dioxide (CO2)', ansBn: 'কার্বন ডাই-অক্সাইড (CO2)', ansHi: 'कार्बन डाइऑक्साइड (CO2)' },
    { qEn: 'What is the lightest element in the Periodic Table?', qBn: 'পর্যায় সারণির সবচেয়ে হালকা মৌল কোনটি?', qHi: 'आवर्त सारणी का सबसे हल्का तत्व कौन सा है?', ansEn: 'Hydrogen', ansBn: 'হাইড্রোজেন', ansHi: 'हाइड्रोजन' },
    { qEn: 'Which metal is kept immersed in Kerosene oil?', qBn: 'কোন ধাতুকে কেরোসিন তেলের নিচে ডুবিয়ে রাখা হয়?', qHi: 'किस धातु को मिट्टी के तेल (केरोसिन) में डुबोकर रखा जाता है?', ansEn: 'Sodium (Na)', ansBn: 'সোডিয়াম (Na)', ansHi: 'सोडियम (Na)' },
    { qEn: 'What is the pH value of pure water at 25°C?', qBn: '২৫°C উষ্ণতায় বিশুদ্ধ জলের pH মান কত?', qHi: '25°C पर शुद्ध जल का pH मान क्या होता है?', ansEn: '7.0 (Neutral)', ansBn: '৭.০ (প্রশম)', ansHi: '7.0 (उदासीन)' },
    { qEn: 'Which noble gas is most abundant in Earth’s atmosphere?', qBn: 'বায়ুমণ্ডলে কোন নিষ্ক্রিয় গ্যাস সবচেয়ে বেশি পরিমাণে থাকে?', qHi: 'पृथ्वी के वायुमंडल में सर्वाधिक मात्रा में पाई जाने वाली अक्रिय गैस कौन सी है?', ansEn: 'Argon (Ar)', ansBn: 'আর্গন (Ar)', ansHi: 'आर्गन (Ar)' },
    { qEn: 'Bauxite is the principal ore of which metal?', qBn: 'বক্সাইট কোন ধাতুর প্রধান আকরিক?', qHi: 'बॉक्साइट किस धातु का मुख्य अयस्क है?', ansEn: 'Aluminium', ansBn: 'অ্যালুমিনিয়াম', ansHi: 'एल्युमिनियम' },
    { qEn: 'Hematite and Magnetite are ores of which metal?', qBn: 'হেমাটাইট ও ম্যাগনেটাইট কোন ধাতুর আকরিক?', qHi: 'हेमेटाइट और मैग्नेटाइट किस धातु के अयस्क हैं?', ansEn: 'Iron (Fe)', ansBn: 'লোহা (Iron)', ansHi: 'लोहा (Iron)' },
  ];

  chemItems.forEach((c, idx) => {
    const d1 = chemItems[(idx + 1) % chemItems.length];
    const d2 = chemItems[(idx + 2) % chemItems.length];
    const d3 = chemItems[(idx + 3) % chemItems.length];
    rows.push({
      topicId: 'sci_chemistry',
      topicEn: 'Chemistry & Elements',
      topicBn: 'রসায়ন ও মৌলসমূহ',
      topicHi: 'रसायन विज्ञान और तत्व',
      qEn: c.qEn,
      qBn: c.qBn,
      qHi: c.qHi,
      ansEn: c.ansEn,
      ansBn: c.ansBn,
      ansHi: c.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${c.ansEn}. Frequently asked in Railway and SSC Science sections.`,
      expBn: `সঠিক উত্তর: ${c.ansBn}। রেলওয়ে ও এসএসসি পরীক্ষার অত্যন্ত গুরুত্বপূর্ণ প্রশ্ন।`,
      expHi: `सही उत्तर: ${c.ansHi}। रेलवे और एसएससी परीक्षाओं में बार-बार पूछा जाने वाला प्रश्न।`,
    });
  });

  // 3. Human Biology & Botany (20 items)
  const bioItems = [
    { qEn: 'Which organelle is known as the Powerhouse of the Cell?', qBn: 'কোষের শক্তিসরবরাহ কেন্দ্র (Powerhouse) কাকে বলা হয়?', qHi: 'कोशिका का पावरहाउस (ऊर्जा गृह) किसे कहा जाता है?', ansEn: 'Mitochondria', ansBn: 'মাইটোকন্ড্রিয়া', ansHi: 'माइटोकॉन्ड्रिया' },
    { qEn: 'Which organelle is known as the Suicide Bag of the cell?', qBn: 'কোষের আত্মঘাতী থলি (Suicide Bag) কাকে বলা হয়?', qHi: 'कोशिका की आत्मघाती थैली किसे कहा जाता है?', ansEn: 'Lysosome', ansBn: 'লাইসোজোম', ansHi: 'लाइसोसोम' },
    { qEn: 'What is the largest gland in the human body?', qBn: 'মানবদেহের বৃহত্তম গ্রন্থি কোনটি?', qHi: 'मानव शरीर की सबसे बड़ी ग्रंथि कौन सी है?', ansEn: 'Liver', ansBn: 'যকৃৎ (Liver)', ansHi: 'यकृत (Liver)' },
    { qEn: 'Which blood group is called the Universal Donor?', qBn: 'কোন রক্তের গ্রুপকে সর্বজনীন দাতা (Universal Donor) বলা হয়?', qHi: 'किस रक्त समूह को सर्वदाता (Universal Donor) कहा जाता है?', ansEn: 'O Negative (O-)', ansBn: 'O পজিটিভ / O নেগেটিভ (O-)', ansHi: 'O नेगेटिव (O-)' },
    { qEn: 'Which blood group is called the Universal Recipient?', qBn: 'কোন রক্তের গ্রুপকে সর্বজনীন গ্রহীতা বলা হয়?', qHi: 'किस रक्त समूह को सर्वग्राही (Universal Recipient) कहा जाता है?', ansEn: 'AB Positive (AB+)', ansBn: 'AB পজিটিভ (AB+)', ansHi: 'AB पॉजिटिव (AB+)' },
    { qEn: 'What is the longest and strongest bone in the human body?', qBn: 'মানবদেহের দীর্ঘতম ও সবচেয়ে শক্তিশালী অস্থি কোনটি?', qHi: 'मानव शरीर की सबसे लंबी और मजबूत हड्डी कौन सी है?', ansEn: 'Femur (Thigh bone)', ansBn: 'ফিমার (ঊরুর অস্থি)', ansHi: 'फीमर (जांघ की हड्डी)' },
    { qEn: 'What is the smallest bone in the human body?', qBn: 'মানবদেহের ক্ষুদ্রতম অস্থি কোনটি?', qHi: 'मानव शरीर की सबसे छोटी हड्डी कौन सी है?', ansEn: 'Stapes (Ear)', ansBn: 'স্টেপিস (কানের অস্থি)', ansHi: 'स्टेपीज (कान की हड्डी)' },
    { qEn: 'Which pigment gives red color to human blood?', qBn: 'কোন রঞ্জক পদার্থের জন্য মানুষের রক্ত লাল হয়?', qHi: 'किस वर्णक के कारण मानव रक्त का रंग लाल होता है?', ansEn: 'Haemoglobin', ansBn: 'হিমোগ্লোবিন', ansHi: 'हीमोग्लोबिन' },
    { qEn: 'Which tissue transports water from roots to leaves in plants?', qBn: 'উদ্ভিদে মূল থেকে পাতায় জল পরিবহন করে কোন কলা?', qHi: 'पौधों में जड़ों से पत्तियों तक जल का परिवहन कौन सा ऊतक करता है?', ansEn: 'Xylem', ansBn: 'জাইলেম (Xylem)', ansHi: 'जाइलम (Xylem)' },
    { qEn: 'Which tissue transports prepared food in plants?', qBn: 'উদ্ভিদের পাতায় তৈরি খাদ্য পরিবহন করে কোন কলা?', qHi: 'पौधों में तैयार भोजन का परिवहन कौन सा ऊतक करता है?', ansEn: 'Phloem', ansBn: 'ফ্লোয়েম (Phloem)', ansHi: 'फ्लोएम (Phloem)' },
    { qEn: 'How many chambers are present in the human heart?', qBn: 'মানুষের হৃৎপিণ্ডে কয়টি প্রকোষ্ঠ থাকে?', qHi: 'मानव हृदय में कितने कक्ष (Chambers) होते हैं?', ansEn: '4 Chambers', ansBn: '৪টি প্রকোষ্ঠ', ansHi: '4 कक्ष' },
    { qEn: 'What is the functional filtering unit of the human Kidney?', qBn: 'মানুষের বৃক্কের (Kidney) গঠনগত ও কার্যগত একক কী?', qHi: 'मानव वृक्क (किडनी) की कार्यात्मक इकाई क्या है?', ansEn: 'Nephron', ansBn: 'নেফ্রন (Nephron)', ansHi: 'नेफ्रॉन (Nephron)' },
    { qEn: 'What is the structural and functional unit of the Nervous System?', qBn: 'স্নায়ুতন্ত্রের গঠনগত ও কার্যগত একক কোনটি?', qHi: 'तंत्रिका तंत्र की संरचनात्मक और कार्यात्मक इकाई क्या है?', ansEn: 'Neuron', ansBn: 'নিউরন (Neuron)', ansHi: 'न्यूरॉन (Neuron)' },
    { qEn: 'Which gland is known as the Master Gland of the human body?', qBn: 'মানবদেহের প্রভু গ্রন্থি (Master Gland) কোনটি?', qHi: 'मानव शरीर की मास्टर ग्रंथि किसे कहा जाता है?', ansEn: 'Pituitary Gland', ansBn: 'পিটুইটারি গ্রন্থি', ansHi: 'पीयूष ग्रंथि (Pituitary)' },
    { qEn: 'Insulin hormone is secreted by which organ?', qBn: 'ইনসুলিন হরমোন কোন অঙ্গ থেকে নিঃসৃত হয়?', qHi: 'इंसुलिन हार्मोन किस अंग से स्रावित होता है?', ansEn: 'Pancreas (Beta cells)', ansBn: 'অগ্ন্যাশয় (বিটা কোষ)', ansHi: 'अग्न्याशय (बीटा कोशिकाएं)' },
    { qEn: 'How many pairs of chromosomes are present in a normal human cell?', qBn: 'মানুষের দেহকোষে কত জোড়া ক্রোমোজোম থাকে?', qHi: 'सामान्य मानव कोशिका में गुणसूत्रों के कितने जोड़े होते हैं?', ansEn: '23 Pairs (46)', ansBn: '২৩ জোড়া (৪৬টি)', ansHi: '23 जोड़े (46)' },
    { qEn: 'Where are Red Blood Cells (RBC) produced in adults?', qBn: 'পূর্ণবয়স্ক মানুষের দেহে লোহিত রক্তকণিকা কোথায় উৎপন্ন হয়?', qHi: 'वयस्क मानव में लाल रक्त कणिकाओं (RBC) का निर्माण कहाँ होता है?', ansEn: 'Red Bone Marrow', ansBn: 'লাল অস্থিমজ্জায়', ansHi: 'अस्थि मज्जा (Bone Marrow)' },
    { qEn: 'What is the average lifespan of human Red Blood Cells?', qBn: 'মানুষের লোহিত রক্তকণিকার গড় আয়ু কত দিন?', qHi: 'मानव लाल रक्त कणिकाओं (RBC) का औसत जीवनकाल कितना होता है?', ansEn: '120 Days', ansBn: '১২০ দিন', ansHi: '120 दिन' },
    { qEn: 'Which part of the brain controls posture and balance of the body?', qBn: 'মস্তিষ্কের কোন অংশ দেহের ভারসাম্য রক্ষা করে?', qHi: 'मस्तिष्क का कौन सा भाग शरीर का संतुलन बनाए रखता है?', ansEn: 'Cerebellum', ansBn: 'লঘুমস্তিষ্ক (Cerebellum)', ansHi: 'अनुमस्तिष्क (Cerebellum)' },
    { qEn: 'Which gas do plants absorb during Photosynthesis?', qBn: 'সালোকসংশ্লেষ প্রক্রিয়ায় উদ্ভিদ কোন গ্যাস গ্রহণ করে?', qHi: 'प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस ग्रहण करते हैं?', ansEn: 'Carbon Dioxide', ansBn: 'কার্বন ডাই-অক্সাইড', ansHi: 'कार्बन डाइऑक्साइड' },
  ];

  bioItems.forEach((b, idx) => {
    const d1 = bioItems[(idx + 1) % bioItems.length];
    const d2 = bioItems[(idx + 2) % bioItems.length];
    const d3 = bioItems[(idx + 3) % bioItems.length];
    rows.push({
      topicId: 'sci_biology',
      topicEn: 'Human Biology & Botany',
      topicBn: 'মানবদেহ ও উদ্ভিদবিদ্যা',
      topicHi: 'मानव जीव विज्ञान और वनस्पति',
      qEn: b.qEn,
      qBn: b.qBn,
      qHi: b.qHi,
      ansEn: b.ansEn,
      ansBn: b.ansBn,
      ansHi: b.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `${b.ansEn} is the verified biological answer for this function.`,
      expBn: `সঠিক উত্তর: ${b.ansBn}। জীববিদ্যার একটি মৌলিক ও গুরুত্বপূর্ণ তথ্য।`,
      expHi: `सही उत्तर: ${b.ansHi}। जीव विज्ञान का एक अत्यंत महत्वपूर्ण तथ्य।`,
    });
  });

  // 4. Vitamins, Diseases & Nutrition (20 items)
  const vitItems = [
    { qEn: 'Deficiency of Vitamin A causes which disease?', qBn: 'ভিটামিন A-এর অভাবে কোন রোগ হয়?', qHi: 'विटामिन A की कमी से कौन सा रोग होता है?', ansEn: 'Night Blindness', ansBn: 'রাতকানা (Night Blindness)', ansHi: 'रतौंधी (Night Blindness)' },
    { qEn: 'Deficiency of Vitamin B1 (Thiamine) causes which disease?', qBn: 'ভিটামিন B1 (থায়ামিন)-এর অভাবে কোন রোগ হয়?', qHi: 'विटामिन B1 (थायमिन) की कमी से कौन सा रोग होता है?', ansEn: 'Beriberi', ansBn: 'বেরিবেরি (Beriberi)', ansHi: 'बेरी-बेरी (Beriberi)' },
    { qEn: 'Deficiency of Vitamin C (Ascorbic Acid) causes which disease?', qBn: 'ভিটামিন C-এর অভাবে কোন রোগ হয়?', qHi: 'विटामिन C की कमी से कौन सा रोग होता है?', ansEn: 'Scurvy', ansBn: 'স্কার্ভি (Scurvy)', ansHi: 'स्कर्वी (Scurvy)' },
    { qEn: 'Deficiency of Vitamin D causes which bone disorder in children?', qBn: 'ভিটামিন D-এর অভাবে শিশুদের কোন রোগ হয়?', qHi: 'विटामिन D की कमी से बच्चों में कौन सा रोग होता है?', ansEn: 'Rickets', ansBn: 'রিকেট (Rickets)', ansHi: 'रिकेट्स (सूखा रोग)' },
    { qEn: 'Which Vitamin is essential for normal clotting of blood?', qBn: 'রক্ত তঞ্চনে (জমাট বাঁধতে) কোন ভিটামিন সাহায্য করে?', qHi: 'रक्त का थक्का जमने में कौन सा विटामिन सहायक है?', ansEn: 'Vitamin K', ansBn: 'ভিটামিন K', ansHi: 'विटामिन K' },
    { qEn: 'What is the chemical name of Vitamin C?', qBn: 'ভিটামিন C-এর রাসায়নিক নাম কী?', qHi: 'विटामिन C का रासायनिक नाम क्या है?', ansEn: 'Ascorbic Acid', ansBn: 'অ্যাসকরবিক অ্যাসিড', ansHi: 'एस्कॉर्बिक अम्ल' },
    { qEn: 'What is the chemical name of Vitamin A?', qBn: 'ভিটামিন A-এর রাসায়নিক নাম কী?', qHi: 'विटामिन A का रासायनिक नाम क्या है?', ansEn: 'Retinol', ansBn: 'রেটিনল (Retinol)', ansHi: 'रेटिनॉल (Retinol)' },
    { qEn: 'What is the chemical name of Vitamin D?', qBn: 'ভিটামিন D-এর রাসায়নিক নাম কী?', qHi: 'विटामिन D का रासायनिक नाम क्या है?', ansEn: 'Calciferol', ansBn: 'ক্যালসিফেরল', ansHi: 'कैल्सीफेरॉल' },
    { qEn: 'Which Vitamin contains Cobalt metal in its structure?', qBn: 'কোন ভিটামিনে কোবাল্ট (Cobalt) ধাতু থাকে?', qHi: 'किस विटामिन में कोबाल्ट (Cobalt) पाया जाता है?', ansEn: 'Vitamin B12 (Cyanocobalamin)', ansBn: 'ভিটামিন B12', ansHi: 'विटामिन B12' },
    { qEn: 'Goitre (enlargement of thyroid gland) is caused by deficiency of?', qBn: 'গলগণ্ড (Goitre) রোগ কোন খনিজের অভাবে হয়?', qHi: 'घेंघा (Goitre) रोग किस तत्व की कमी से होता है?', ansEn: 'Iodine', ansBn: 'আয়োডিন (Iodine)', ansHi: 'आयोडीन (Iodine)' },
    { qEn: 'Anaemia is primarily caused by the deficiency of which mineral?', qBn: 'রক্তাল্পতা (Anaemia) মূলত কোন খনিজের অভাবে ঘটে?', qHi: 'एनीमिया (रक्ताल्पता) मुख्य रूप से किस खनिज की कमी से होता है?', ansEn: 'Iron (Fe)', ansBn: 'লোহা (Iron)', ansHi: 'लोहा (Iron)' },
    { qEn: 'Which Vitamins are Water-Soluble?', qBn: 'কোন ভিটামিনগুলি জলে দ্রবণীয়?', qHi: 'कौन से विटामिन जल में घुलनशील होते हैं?', ansEn: 'Vitamin B Complex and C', ansBn: 'ভিটামিন B ও C', ansHi: 'विटामिन B और C' },
    { qEn: 'Malaria is transmitted by the bite of which mosquito?', qBn: 'ম্যালেরিয়া রোগ কোন মশার কামড়ে ছড়ায়?', qHi: 'मलेरिया रोग किस मच्छर के काटने से फैलता है?', ansEn: 'Female Anopheles', ansBn: 'স্ত্রী অ্যানোফিলিস মশা', ansHi: 'मादा एनोफिलीज मच्छर' },
    { qEn: 'Dengue fever is transmitted by which mosquito vector?', qBn: 'ডেঙ্গু জ্বর কোন মশার মাধ্যমে ছড়ায়?', qHi: 'डेंगू बुखार किस मच्छर के काटने से फैलता है?', ansEn: 'Aedes aegypti', ansBn: 'এডিস ইজিপ্টাই মশা', ansHi: 'एडीज एजिप्टी मच्छर' },
    { qEn: 'Tuberculosis (TB) is caused by which pathogen?', qBn: 'যক্ষ্মা (TB) রোগের জীবাণু কোন ধরনের?', qHi: 'क्षय रोग (TB) किस सूक्ष्मजीव के कारण होता है?', ansEn: 'Bacteria (Mycobacterium)', ansBn: 'ব্যাকটেরিয়া (মাইকোব্যাকটেরিয়াম)', ansHi: 'जीवाणु (माइकोबैक्टीरियम)' },
    { qEn: 'BCG vaccine provides immunity against which disease?', qBn: 'বিসিজি (BCG) টিকা কোন রোগ প্রতিরোধে দেওয়া হয়?', qHi: 'बीसीजी (BCG) का टीका किस रोग से बचाव के लिए लगाया जाता है?', ansEn: 'Tuberculosis (TB)', ansBn: 'যক্ষ্মা (Tuberculosis)', ansHi: 'तपेदिक / क्षय रोग (TB)' },
    { qEn: 'ELISA test is commonly used to detect which viral infection?', qBn: 'ELISA পরীক্ষা কোন রোগ নির্ণয়ে ব্যবহৃত হয়?', qHi: 'एलिसा (ELISA) परीक्षण किस रोग की पहचान के लिए किया जाता है?', ansEn: 'HIV / AIDS', ansBn: 'এইচআইভি / এইডস (HIV/AIDS)', ansHi: 'एचआईवी / एड्स (HIV/AIDS)' },
    { qEn: 'Widal Test is used for diagnosing which bacterial fever?', qBn: 'উইডাল টেস্ট (Widal Test) কোন রোগ নির্ণয়ে করা হয়?', qHi: 'विडाल टेस्ट (Widal Test) किस रोग की जांच के लिए किया जाता है?', ansEn: 'Typhoid', ansBn: 'টাইফয়েড জ্বর', ansHi: 'टाइफाइड बुखार' },
    { qEn: 'Kwashiorkor and Marasmus in children are caused by deficiency of?', qBn: 'শিশুদের কোয়াশিওরকর ও ম্যারাসমাস রোগ কিসের অভাবে হয়?', qHi: 'बच्चों में क्वाशिओरकोर और मरास्मस रोग किसकी कमी से होता है?', ansEn: 'Protein', ansBn: 'প্রোটিনের অভাবে', ansHi: 'प्रोटीन की कमी से' },
    { qEn: 'Which Vitamin is synthesized in human skin in the presence of sunlight?', qBn: 'সূর্যালোকের উপস্থিতিতে মানব ত্বকে কোন ভিটামিন তৈরি হয়?', qHi: 'सूर्य के प्रकाश की उपस्थिति में मानव त्वचा में कौन सा विटामिन बनता है?', ansEn: 'Vitamin D', ansBn: 'ভিটামিন D', ansHi: 'विटामिन D' },
  ];

  vitItems.forEach((v, idx) => {
    const d1 = vitItems[(idx + 1) % vitItems.length];
    const d2 = vitItems[(idx + 2) % vitItems.length];
    const d3 = vitItems[(idx + 3) % vitItems.length];
    rows.push({
      topicId: 'sci_vitamins',
      topicEn: 'Vitamins, Diseases & Nutrition',
      topicBn: 'ভিটামিন, রোগ ও পুষ্টি',
      topicHi: 'विटामिन, रोग और पोषण',
      qEn: v.qEn,
      qBn: v.qBn,
      qHi: v.qHi,
      ansEn: v.ansEn,
      ansBn: v.ansBn,
      ansHi: v.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${v.ansEn}.`,
      expBn: `সঠিক উত্তর: ${v.ansBn}।`,
      expHi: `सही उत्तर: ${v.ansHi}।`,
    });
  });

  // 5. Scientific Instruments & Discoveries (20 items)
  const instItems = [
    { qEn: 'Which instrument is used to measure Atmospheric Pressure?', qBn: 'বায়ুমণ্ডলীয় চাপ মাপার যন্ত্রের নাম কী?', qHi: 'वायुमंडलीय दाब मापने के लिए किस यंत्र का उपयोग किया जाता है?', ansEn: 'Barometer', ansBn: 'ব্যারোমিটার', ansHi: 'बैरोमीटर' },
    { qEn: 'Which instrument measures Relative Humidity in air?', qBn: 'বাতাসের আপেক্ষিক আর্দ্রতা মাপার যন্ত্র কোনটি?', qHi: 'वायु की आपेक्षिक आर्द्रता किस यंत्र से मापी जाती है?', ansEn: 'Hygrometer', ansBn: 'হাইগ্রোমিটার', ansHi: 'हाइग्रोमीटर' },
    { qEn: 'Which instrument is used to measure the purity/density of Milk?', qBn: 'দুধের বিশুদ্ধতা বা ঘনত্ব মাপার যন্ত্র কোনটি?', qHi: 'दूध की शुद्धता मापने के लिए किस यंत्र का प्रयोग किया जाता है?', ansEn: 'Lactometer', ansBn: 'ল্যাকটোমিটার', ansHi: 'लैक्टोमीटर' },
    { qEn: 'Which instrument records the intensity of Earthquake waves?', qBn: 'ভূমিকম্পের তীব্রতা মাপার যন্ত্রের নাম কী?', qHi: 'भूकंप की तीव्रता रिकॉर्ड करने वाला यंत्र कौन सा है?', ansEn: 'Seismograph', ansBn: 'সিসমোগ্রাফ', ansHi: 'सीस्मोग्राफ' },
    { qEn: 'Which instrument is used to measure Blood Pressure?', qBn: 'রক্তচাপ (Blood Pressure) মাপার যন্ত্রের নাম কী?', qHi: 'रक्तचाप (Blood Pressure) मापने के यंत्र को क्या कहते हैं?', ansEn: 'Sphygmomanometer', ansBn: 'স্ফিগমোম্যানোমিটার', ansHi: 'स्फिग्मोमैनोमीटर' },
    { qEn: 'Which instrument measures the depth of the Ocean?', qBn: 'সমুদ্রের গভীরতা মাপার যন্ত্র কোনটি?', qHi: 'समुद्र की गहराई मापने के लिए किस यंत्र का उपयोग होता है?', ansEn: 'Fathometer', ansBn: 'ফ্যাদোমিটার', ansHi: 'फैदोमीटर' },
    { qEn: 'Which instrument measures the altitude of aircraft?', qBn: 'বিমানের উচ্চতা মাপার যন্ত্র কোনটি?', qHi: 'उड़ते हुए विमान की ऊंचाई मापने के लिए किस यंत्र का प्रयोग होता है?', ansEn: 'Altimeter', ansBn: 'অল্টিমিটার', ansHi: 'अल्टीमीटर' },
    { qEn: 'Which instrument measures Wind Speed?', qBn: 'বাতাসের গতিবেগ মাপার যন্ত্র কোনটি?', qHi: 'पवन का वेग मापने वाला यंत्र कौन सा है?', ansEn: 'Anemometer', ansBn: 'অ্যানিমোমিটার', ansHi: 'एनीमोमीटर' },
    { qEn: 'Who discovered Penicillin (the first antibiotic)?', qBn: 'পেনিসিলিন কে আবিষ্কার করেন?', qHi: 'पेनिसिलिन की खोज किसने की थी?', ansEn: 'Alexander Fleming', ansBn: 'আলেকজান্ডার ফ্লেমিং', ansHi: 'अलेक्जेंडर फ्लेमिंग' },
    { qEn: 'Who discovered the Smallpox Vaccine?', qBn: 'গুটিবসন্তের টিকা (Vaccine) কে আবিষ্কার করেন?', qHi: 'चेचक के टीके की खोज किसने की थी?', ansEn: 'Edward Jenner', ansBn: 'এডওয়ার্ড জেনার', ansHi: 'एडवर्ड जेनर' },
    { qEn: 'Who discovered X-Rays in 1895?', qBn: 'এক্স-রে (X-Ray) কে আবিষ্কার করেন?', qHi: 'एक्स-रे (X-Ray) की खोज किसने की थी?', ansEn: 'Wilhelm Roentgen', ansBn: 'উইলহেলম রন্টজেন', ansHi: 'विल्हेम रोंटजेन' },
    { qEn: 'Who discovered Blood Groups (ABO system)?', qBn: 'মানুষের রক্তের গ্রুপ (ABO) কে আবিষ্কার করেন?', qHi: 'रक्त समूह (Blood Group) की खोज किसने की थी?', ansEn: 'Karl Landsteiner', ansBn: 'কার্ল ল্যান্ডস্টেইনার', ansHi: 'कार्ल लैंडस्टीनर' },
    { qEn: 'Who discovered the circulation of blood in the human body?', qBn: 'মানবদেহে রক্ত সংবহন প্রক্রিয়া কে আবিষ্কার করেন?', qHi: 'मानव शरीर में रक्त परिसंचरण की खोज किसने की थी?', ansEn: 'William Harvey', ansBn: 'উইলিয়াম হার্ভে', ansHi: 'विलियम हार्वे' },
    { qEn: 'Who discovered the Electron?', qBn: 'ইলেকট্রন কে আবিষ্কার করেন?', qHi: 'इलेक्ट्रॉन की खोज किसने की थी?', ansEn: 'J.J. Thomson', ansBn: 'জে. জে. থমসন', ansHi: 'जे. जे. थॉमसन' },
    { qEn: 'Who discovered the Neutron in 1932?', qBn: 'নিউট্রন কে আবিষ্কার করেন?', qHi: 'न्यूट्रॉन की खोज किसने की थी?', ansEn: 'James Chadwick', ansBn: 'জেমস শ্যাডউইক', ansHi: 'जेम्स चैडविक' },
    { qEn: 'Who discovered the Raman Effect in Physics?', qBn: 'রমন এফেক্ট কে আবিষ্কার করেন?', qHi: 'रमन प्रभाव (Raman Effect) की खोज किसने की थी?', ansEn: 'Sir C.V. Raman', ansBn: 'স্যার সি. ভি. রমন', ansHi: 'सर सी. वी. रमन' },
    { qEn: 'Which mirror is used by dentists and in vehicle headlights?', qBn: 'দাঁতের ডাক্তার ও গাড়ির হেডলাইটে কোন দর্পণ ব্যবহৃত হয়?', qHi: 'दंत चिकित्सकों और वाहनों की हेडलाइट में किस दर्पण का उपयोग होता है?', ansEn: 'Concave Mirror', ansBn: 'অবতল দর্পণ', ansHi: 'अवतल दर्पण' },
    { qEn: 'Which mirror is used as a Rear-View mirror in vehicles?', qBn: 'গাড়ির ভিউ-ফাইন্ডার বা রিয়ার-ভিউতে কোন দর্পণ ব্যবহৃত হয়?', qHi: 'वाहनों में पीछे का दृश्य देखने के लिए किस दर्पण का प्रयोग होता है?', ansEn: 'Convex Mirror', ansBn: 'উত্তল দর্পণ', ansHi: 'उत्तल दर्पण' },
    { qEn: 'Optical fibers work on which phenomenon of light?', qBn: 'অপটিক্যাল ফাইবার আলোর কোন ধর্মের ওপর ভিত্তি করে কাজ করে?', qHi: 'ऑप्टिकल फाइबर प्रकाश के किस सिद्धांत पर कार्य करता है?', ansEn: 'Total Internal Reflection', ansBn: 'অভ্যন্তরীণ পূর্ণ প্রতিফলন', ansHi: 'पूर्ण आंतरिक परावर्तन' },
    { qEn: 'Which device converts Alternating Current (AC) into Direct Current (DC)?', qBn: 'কোন যন্ত্র পরিবর্তী প্রবাহকে (AC) সমপ্রবাহে (DC) রূপান্তরিত করে?', qHi: 'कौन सा उपकरण प्रत्यावर्ती धारा (AC) को दिष्ट धारा (DC) में बदलता है?', ansEn: 'Rectifier', ansBn: 'রেকটিফায়ার (Rectifier)', ansHi: 'दिष्टकारी (Rectifier)' },
  ];

  instItems.forEach((inst, idx) => {
    const d1 = instItems[(idx + 1) % instItems.length];
    const d2 = instItems[(idx + 2) % instItems.length];
    const d3 = instItems[(idx + 3) % instItems.length];
    rows.push({
      topicId: 'sci_inventions',
      topicEn: 'Scientific Instruments & Units',
      topicBn: 'বৈজ্ঞানিক যন্ত্র ও একক',
      topicHi: 'वैज्ञानिक उपकरण और मात्रक',
      qEn: inst.qEn,
      qBn: inst.qBn,
      qHi: inst.qHi,
      ansEn: inst.ansEn,
      ansBn: inst.ansBn,
      ansHi: inst.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${inst.ansEn}.`,
      expBn: `সঠিক উত্তর: ${inst.ansBn}।`,
      expHi: `सही उत्तर: ${inst.ansHi}।`,
    });
  });

  return rows.map((r, index) => {
    const qNum = index + 1;
    const correctIdx = qNum % 4;
    const enOpts = [r.ansEn, ...r.dEn];
    const bnOpts = [r.ansBn, ...r.dBn];
    const hiOpts = [r.ansHi, ...r.dHi];

    const swap = (arr: string[]) => {
      const copy = [...arr];
      const temp = copy[correctIdx];
      copy[correctIdx] = copy[0];
      copy[0] = temp;
      return copy as [string, string, string, string];
    };

    return {
      id: `QM-SCI-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[index % EXAM_CYCLE.length],
      subject: 'science',
      topicId: r.topicId,
      difficulty: DIFF_CYCLE[index % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: r.topicEn,
          question: r.qEn,
          options: swap(enOpts),
          explanation: r.expEn,
        },
        bn: {
          topicName: r.topicBn,
          question: r.qBn,
          options: swap(bnOpts),
          explanation: r.expBn,
        },
        hi: {
          topicName: r.topicHi,
          question: r.qHi,
          options: swap(hiOpts),
          explanation: r.expHi,
        },
      },
    };
  });
}

export function generateHistoryQuestions(): Question[] {
  const rows: MultilingualFactRow[] = [];

  // 1. Ancient India: Indus Valley, Vedic & Maurya (20 items)
  const ancientItems = [
    { qEn: 'Who excavated the Harappa site of Indus Valley Civilization in 1921?', qBn: '১৯২১ সালে হরপ্পা প্রত্নক্ষেত্রটি কে আবিষ্কার করেন?', qHi: '1921 में सिंधु घाटी सभ्यता के हड़प्पा स्थल की खुदाई किसने की थी?', ansEn: 'Daya Ram Sahni', ansBn: 'দয়ারাম সাহানি', ansHi: 'दयाराम साहनी' },
    { qEn: 'Who discovered Mohenjo-daro in 1922?', qBn: '১৯২২ সালে মহেঞ্জোদারো কে আবিষ্কার করেন?', qHi: '1922 में मोहनजोदड़ो की खोज किसने की थी?', ansEn: 'Rakhaldas Bandyopadhyay', ansBn: 'রাখালদাস বন্দ্যোপাধ্যায়', ansHi: 'राखालदास बनर्जी' },
    { qEn: 'Which Indus Valley site had an ancient artificial brick dockyard (port)?', qBn: 'সিন্ধু সভ্যতার কোন কেন্দ্রে প্রাচীন বন্দর বা ডকইয়ার্ড পাওয়া গেছে?', qHi: 'सिंधु घाटी के किस स्थल पर प्राचीन गोदीवाड़ा (बंदरगाह) मिला है?', ansEn: 'Lothal (Gujarat)', ansBn: 'লোথাল (গুজরাট)', ansHi: 'लोथल (गुजरात)' },
    { qEn: 'Where was the Great Bath of the Indus Valley Civilization found?', qBn: 'সিন্ধু সভ্যতার বিখ্যাত স্নানাগার (Great Bath) কোথায় পাওয়া গেছে?', qHi: 'सिंधु सभ्यता का विशाल स्नानागार कहाँ पाया गया था?', ansEn: 'Mohenjo-daro', ansBn: 'মহেঞ্জোদারো', ansHi: 'मोहनजोदड़ो' },
    { qEn: 'Which is the oldest Veda among the four Vedas?', qBn: 'চারটি বেদের মধ্যে প্রাচীনতম বেদ কোনটি?', qHi: 'चारों वेदों में सबसे प्राचीन वेद कौन सा है?', ansEn: 'Rigveda', ansBn: 'ঋগ্বেদ', ansHi: 'ऋग्वेद' },
    { qEn: 'From which Upanishad is the national motto "Satyameva Jayate" taken?', qBn: 'ভারতের জাতীয় নীতিবাক্য "সত্যমেব জয়তে" কোন উপনিষদ থেকে নেওয়া হয়েছে?', qHi: '"सत्यमेव जयते" किस उपनिषद से लिया गया है?', ansEn: 'Mundaka Upanishad', ansBn: 'মুণ্ডক উপনিষদ', ansHi: 'मुण्डक उपनिषद' },
    { qEn: 'Where did Gautam Buddha deliver his first sermon (Dharmachakra Pravartana)?', qBn: 'গৌতম বুদ্ধ তাঁর প্রথম ধর্মোপদেশ কোথায় প্রদান করেছিলেন?', qHi: 'गौतम बुद्ध ने अपना पहला उपदेश कहाँ दिया था?', ansEn: 'Sarnath', ansBn: 'সারনাথ', ansHi: 'सारनाथ' },
    { qEn: 'Who was the 24th and last Tirthankara of Jainism?', qBn: 'জৈন ধর্মের ২৪তম তথা শেষ তীর্থঙ্কর কে ছিলেন?', qHi: 'जैन धर्म के 24वें और अंतिम तीर्थंकर कौन थे?', ansEn: 'Vardhamana Mahavira', ansBn: 'বর্ধমান মহাবীর', ansHi: 'वर्धमान महावीर' },
    { qEn: 'Who founded the Maurya Empire in 322 BCE?', qBn: 'মৌর্য সাম্রাজ্যের প্রতিষ্ঠাতা কে ছিলেন?', qHi: 'मौर्य साम्राज्य की स्थापना किसने की थी?', ansEn: 'Chandragupta Maurya', ansBn: 'চন্দ্রগুপ্ত মৌর্য', ansHi: 'चंद्रगुप्त मौर्य' },
    { qEn: 'Who wrote the famous treatise "Arthashastra"?', qBn: 'বিখ্যাত গ্রন্থ "অর্থশাস্ত্র" কার রচনা?', qHi: 'प्रसिद्ध ग्रंथ "अर्थशास्त्र" के लेखक कौन थे?', ansEn: 'Kautilya (Chanakya)', ansBn: 'কৌটিল্য (চাণক্য)', ansHi: 'कौटिल्य (चाणक्य)' },
    { qEn: 'Who was the Greek ambassador sent by Seleucus to Chandragupta Maurya’s court?', qBn: 'চন্দ্রগুপ্ত মৌর্যের রাজসভায় আগত গ্রিক দূত কে ছিলেন?', qHi: 'चंद्रगुप्त मौर्य के दरबार में आने वाला यूनानी राजदूत कौन था?', ansEn: 'Megasthenes (Indica)', ansBn: 'মেগাস্থিনিস (ইন্ডিকা)', ansHi: 'मेगस्थनीज (इंडिका)' },
    { qEn: 'In which year did Emperor Ashoka fight the Kalinga War?', qBn: 'সম্রাট অশোক কত খ্রিস্টপূর্বাব্দে কলিঙ্গ যুদ্ধ করেছিলেন?', qHi: 'सम्राट अशोक ने कलिंग का युद्ध किस वर्ष लड़ा था?', ansEn: '261 BCE', ansBn: '২৬১ খ্রিস্টপূর্বাব্দ', ansHi: '261 ईसा पूर्व' },
    { qEn: 'Who deciphered the Brahmi script of Ashokan inscriptions in 1837?', qBn: '১৮৩৭ সালে অশোকের শিলালিপির ব্রাহ্মী লিপি কে পাঠোদ্ধার করেন?', qHi: '1837 में अशोक के शिलालेखों की ब्राह्मी लिपि को सर्वप्रथम किसने पढ़ा?', ansEn: 'James Prinsep', ansBn: 'জেমস প্রিন্সেপ', ansHi: 'जेम्स प्रिंसेप' },
    { qEn: 'Where was the Fourth Buddhist Council held under Kanishka?', qBn: 'কণিষ্কের আমলে চতুর্থ বৌদ্ধ সংগীতি কোথায় অনুষ্ঠিত হয়েছিল?', qHi: 'कनिष्क के शासनकाल में चौथी बौद्ध संगीति कहाँ आयोजित हुई थी?', ansEn: 'Kundalvana (Kashmir)', ansBn: 'কুণ্ডলবন (কাশ্মীর)', ansHi: 'कुंडलवन (कश्मीर)' },
    { qEn: 'Who started the Saka Era in 78 CE?', qBn: '৭৮ খ্রিস্টাব্দে শকাব্দ কে প্রচলন করেন?', qHi: '78 ईस्वी में शक संवत की शुरुआत किसने की थी?', ansEn: 'Kanishka', ansBn: 'কণিষ্ক', ansHi: 'कनिष्क' },
    { qEn: 'Which Indus site is located in Rajasthan and known for ploughed fields?', qBn: 'রাজস্থানে অবস্থিত কোন সিন্ধু কেন্দ্রে কর্ষিত জমির নিদর্শন পাওয়া গেছে?', qHi: 'राजस्थान में स्थित किस सिंधु स्थल से जुते हुए खेत के साक्ष्य मिले हैं?', ansEn: 'Kalibangan', ansBn: 'কালিবঙ্গান', ansHi: 'कालीबंगा' },
    { qEn: 'What was the ancient capital of the Magadha Empire initially?', qBn: 'মগধ সাম্রাজ্যের প্রাচীনতম রাজধানী কী ছিল?', qHi: 'मगध साम्राज्य की प्रारंभिक राजधानी क्या थी?', ansEn: 'Rajagriha (Girivraja)', ansBn: 'রাজগৃহ (গিরিব্রজ)', ansHi: 'राजगृह (गिरिव्रज)' },
    { qEn: 'Who was the court physician of King Kanishka who wrote Charaka Samhita?', qBn: 'চরক সংহিতার রচয়িতা চরক কার রাজবৈদ্য ছিলেন?', qHi: 'चरक संहिता के रचयिता चरक किसके राजवैद्य थे?', ansEn: 'Kanishka', ansBn: 'সম্রাট কণিষ্ক', ansHi: 'सम्राट कनिष्क' },
    { qEn: 'Battle of Hydaspes (326 BCE) was fought between Alexander and whom?', qBn: 'হিদাসপিসের যুদ্ধ (৩২৬ খ্রি.পূ.) আলেকজান্ডার ও কার মধ্যে হয়েছিল?', qHi: 'हाइडेस्पीज (झेलम) का युद्ध सिकंदर और किसके बीच हुआ था?', ansEn: 'King Porus', ansBn: 'রাজা পুরু (Porus)', ansHi: 'राजा पोरस' },
    { qEn: 'Who was the last ruler of the Maurya dynasty?', qBn: 'মৌর্য বংশের শেষ সম্রাট কে ছিলেন?', qHi: 'मौर्य वंश का अंतिम शासक कौन था?', ansEn: 'Brihadratha', ansBn: 'বৃহদ্রথ', ansHi: 'बृहद्रथ' },
  ];

  ancientItems.forEach((a, idx) => {
    const d1 = ancientItems[(idx + 1) % ancientItems.length];
    const d2 = ancientItems[(idx + 2) % ancientItems.length];
    const d3 = ancientItems[(idx + 3) % ancientItems.length];
    rows.push({
      topicId: 'hist_ancient',
      topicEn: 'Indus Valley, Vedic & Maurya',
      topicBn: 'সিন্ধু সভ্যতা, বৈদিক ও মৌর্য যুগ',
      topicHi: 'सिंधु घाटी, वैदिक और मौर्य काल',
      qEn: a.qEn,
      qBn: a.qBn,
      qHi: a.qHi,
      ansEn: a.ansEn,
      ansBn: a.ansBn,
      ansHi: a.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${a.ansEn}.`,
      expBn: `সঠিক উত্তর: ${a.ansBn}।`,
      expHi: `सही उत्तर: ${a.ansHi}।`,
    });
  });

  // 2. Gupta Empire & Ancient Rulers (20 items)
  const guptaItems = [
    { qEn: 'Which Gupta ruler is known as the "Napoleon of India"?', qBn: 'কোন গুপ্ত সম্রাটকে "ভারতের নেপোলিয়ন" বলা হয়?', qHi: 'किस गुप्त शासक को "भारत का नेपोलियन" कहा जाता है?', ansEn: 'Samudragupta', ansBn: 'সমুদ্রগুপ্ত', ansHi: 'समुद्रगुप्त' },
    { qEn: 'Who composed the Prayag Prashasti (Allahabad Pillar Inscription)?', qBn: 'এলাহাবাদ প্রশস্তি কে রচনা করেছিলেন?', qHi: 'प्रयाग प्रशस्ति (इलाहाबाद स्तंभ लेख) की रचना किसने की थी?', ansEn: 'Harishena', ansBn: 'হরিষেণ', ansHi: 'हरिषेण' },
    { qEn: 'Which Gupta ruler assumed the title "Vikramaditya"?', qBn: 'কোন গুপ্ত সম্রাট "বিক্রমাদিত্য" উপাধি গ্রহণ করেছিলেন?', qHi: 'किस गुप्त शासक ने "विक्रमादित्य" की उपाधि धारण की थी?', ansEn: 'Chandragupta II', ansBn: 'দ্বিতীয় চন্দ্রগুপ্ত', ansHi: 'चंद्रगुप्त द्वितीय' },
    { qEn: 'Chinese pilgrim Fa-Hien visited India during the reign of which ruler?', qBn: 'চৈনিক পরিব্রাজক ফা-হিয়েন কার রাজত্বকালে ভারতে আসেন?', qHi: 'चीनी यात्री फाह्यान किसके शासनकाल में भारत आया था?', ansEn: 'Chandragupta II', ansBn: 'দ্বিতীয় চন্দ্রগুপ্ত', ansHi: 'चंद्रगुप्त द्वितीय' },
    { qEn: 'Who founded the Nalanda Mahavihara (University)?', qBn: 'নালন্দা বিশ্ববিদ্যালয় কে প্রতিষ্ঠা করেন?', qHi: 'नालंदा विश्वविद्यालय की स्थापना किसने की थी?', ansEn: 'Kumaragupta I', ansBn: 'প্রথম কুমারগুপ্ত', ansHi: 'कुमारगुप्त प्रथम' },
    { qEn: 'Who wrote the Sanskrit play "Abhijnanashakuntalam" and poem "Meghadutam"?', qBn: '"অভিজ্ঞানশকুন্তলম" ও "মেঘদূতম" কার রচনা?', qHi: '"अभिज्ञानशाकुंतलम्" और "मेघदूतम्" के रचयिता कौन हैं?', ansEn: 'Kalidasa', ansBn: 'মহাকবি কালিদাস', ansHi: 'महाकवि कालिदास' },
    { qEn: 'Chinese traveler Hiuen Tsang (Xuanzang) visited India during whose reign?', qBn: 'হিউয়েন সাং কার রাজত্বকালে ভারতে এসেছিলেন?', qHi: 'ह्वेनसांग किसके शासनकाल में भारत आया था?', ansEn: 'Harshavardhana', ansBn: 'হর্ষবর্ধন', ansHi: 'हर्षवर्धन' },
    { qEn: 'Who wrote "Harshacharita" and "Kadambari"?', qBn: '"হর্ষচরিত" ও "কাদম্বরী" গ্রন্থের রচয়িতা কে?', qHi: '"हर्षचरित" और "कादंबरी" के लेखक कौन थे?', ansEn: 'Banabhatta', ansBn: 'বাণভট্ট', ansHi: 'बाणभट्ट' },
    { qEn: 'Who defeated Harshavardhana on the banks of the Narmada river?', qBn: 'নর্মদা নদীর তীরে হর্ষবর্ধনকে কে পরাজিত করেছিলেন?', qHi: 'नर्मदा नदी के तट पर हर्षवर्धन को किसने पराजित किया था?', ansEn: 'Pulakeshin II', ansBn: 'দ্বিতীয় পুলকেশী', ansHi: 'पुलकेशिन द्वितीय' },
    { qEn: 'Who founded the Pala Dynasty in Bengal in 750 CE?', qBn: 'বাংলায় পাল বংশের প্রতিষ্ঠাতা কে ছিলেন?', qHi: 'बंगाल में पाल वंश का संस्थापक कौन था?', ansEn: 'Gopala', ansBn: 'গোপাল', ansHi: 'गोपाल' },
    { qEn: 'Who founded the Vikramshila University?', qBn: 'বিক্রমশীলা মহাবিহার কে প্রতিষ্ঠা করেছিলেন?', qHi: 'विक्रमशिला विश्वविद्यालय की स्थापना किसने की थी?', ansEn: 'Dharmapala', ansBn: 'ধর্মপাল', ansHi: 'धर्मपाल' },
    { qEn: 'Who wrote "Geet Govinda" in the court of Lakshmana Sena?', qBn: 'লক্ষ্মণ সেনের সভাকবি হিসেবে "গীতগোবিন্দ" কে রচনা করেন?', qHi: 'लक्ष्मण सेन के दरबार में "गीत गोविंद" की रचना किसने की थी?', ansEn: 'Jayadeva', ansBn: 'কবি জয়দেব', ansHi: 'जयदेव' },
    { qEn: 'Who built the famous Brihadeeswarar Temple at Thanjavur?', qBn: 'তাঞ্জাভুরের বিখ্যাত বৃহদীশ্বর মন্দির কে নির্মাণ করেন?', qHi: 'तंजावुर का प्रसिद्ध बृहदेश्वर मंदिर किसने बनवाया था?', ansEn: 'Rajaraja Chola I', ansBn: 'প্রথম রাজরাজ চোল', ansHi: 'राजराज चोल प्रथम' },
    { qEn: 'Which ruler took the title "Gangaikonda Chola"?', qBn: 'কোন চোল রাজা "গঙ্গাইকোণ্ড চোল" উপাধি নিয়েছিলেন?', qHi: 'किस चोल शासक ने "गंगईकोंड चोल" की उपाधि धारण की थी?', ansEn: 'Rajendra Chola I', ansBn: 'প্রথম রাজেন্দ্র চোল', ansHi: 'राजेंद्र चोल प्रथम' },
    { qEn: 'Who wrote the famous mathematical work "Aryabhatiya"?', qBn: 'বিখ্যাত গণিত ও জ্যোতির্বিজ্ঞান গ্রন্থ "আর্যভট্টীয়" কার লেখা?', qHi: 'प्रसिद्ध गणितीय ग्रंथ "आर्यभटीय" किसने लिखा था?', ansEn: 'Aryabhata', ansBn: 'আর্যভট্ট', ansHi: 'आर्यभट्ट' },
    { qEn: 'Who wrote "Panchatantra"?', qBn: '"পঞ্চতন্ত্র" গ্রন্থের রচয়িতা কে?', qHi: '"पंचतंत्र" के लेखक कौन हैं?', ansEn: 'Vishnu Sharma', ansBn: 'বিষ্ণু শর্মা', ansHi: 'विष्णु शर्मा' },
    { qEn: 'Who authored the play "Mrichchhakatika" (The Little Clay Cart)?', qBn: '"মৃচ্ছকটিক" নাটকের রচয়িতা কে?', qHi: '"मृच्छकटिकम्" नाटक के रचयिता कौन हैं?', ansEn: 'Shudraka', ansBn: 'শূদ্রক', ansHi: 'शूद्रक' },
    { qEn: 'Who wrote the historical chronicle of Kashmir "Rajatarangini"?', qBn: 'কাশ্মীরের ইতিহাস গ্রন্থ "রাজতরঙ্গিণী" কার লেখা?', qHi: 'कश्मीर के इतिहास पर आधारित ग्रंथ "राजतरंगिणी" किसने लिखा?', ansEn: 'Kalhana', ansBn: 'কলহন', ansHi: 'कल्हण' },
    { qEn: 'The famous rock-cut Kailasa Temple at Ellora was built by which dynasty?', qBn: 'ইলোরাতে পাথর কেটে কৈলাস মন্দির কোন বংশের রাজারা তৈরি করেন?', qHi: 'एलोरा का प्रसिद्ध कैलाश मंदिर किस वंश के शासकों ने बनवाया था?', ansEn: 'Rashtrakutas (Krishna I)', ansBn: 'রাষ্ট্রকূট বংশ (প্রথম কৃষ্ণ)', ansHi: 'राष्ट्रकूट वंश (कृष्ण प्रथम)' },
    { qEn: 'Who was the greatest ruler of the Satavahana dynasty?', qBn: 'সাতবাহন বংশের শ্রেষ্ঠ রাজা কে ছিলেন?', qHi: 'सातवाहन वंश का सबसे महान शासक कौन था?', ansEn: 'Gautamiputra Satakarni', ansBn: 'গৌতমীপুত্র সাতকর্ণী', ansHi: 'गौतमीपुत्र सातकर्णी' },
  ];

  guptaItems.forEach((g, idx) => {
    const d1 = guptaItems[(idx + 1) % guptaItems.length];
    const d2 = guptaItems[(idx + 2) % guptaItems.length];
    const d3 = guptaItems[(idx + 3) % guptaItems.length];
    rows.push({
      topicId: 'hist_gupta',
      topicEn: 'Gupta Empire & Ancient Rulers',
      topicBn: 'গুপ্ত সাম্রাজ্য ও প্রাচীন শাসক',
      topicHi: 'गुप्त साम्राज्य और प्राचीन शासक',
      qEn: g.qEn,
      qBn: g.qBn,
      qHi: g.qHi,
      ansEn: g.ansEn,
      ansBn: g.ansBn,
      ansHi: g.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${g.ansEn}.`,
      expBn: `সঠিক উত্তর: ${g.ansBn}।`,
      expHi: `सही उत्तर: ${g.ansHi}।`,
    });
  });

  // 3. Delhi Sultanate & Mughal Era (20 items)
  const medievalItems = [
    { qEn: 'Who founded the Slave (Mamluk) Dynasty in 1206 CE?', qBn: '১২০৬ খ্রিস্টাব্দে দিল্লিতে দাস বংশের প্রতিষ্ঠা কে করেন?', qHi: '1206 ईस्वी में गुलाम वंश की स्थापना किसने की थी?', ansEn: 'Qutb-ud-din Aibak', ansBn: 'কুতুবউদ্দিন আইবক', ansHi: 'कुतुबुद्दीन ऐबक' },
    { qEn: 'Who completed the construction of Qutub Minar in Delhi?', qBn: 'দিল্লির কুতুব মিনারের নির্মাণকাজ কে সম্পূর্ণ করেন?', qHi: 'दिल्ली में कुतुब मीनार का निर्माण कार्य किसने पूरा करवाया?', ansEn: 'Iltutmish', ansBn: 'ইলতুৎমিস', ansHi: 'इल्तुतमिश' },
    { qEn: 'Who was the first and only female Muslim ruler of Delhi Sultanate?', qBn: 'দিল্লি সুলতানির প্রথম ও একমাত্র মহিলা সুলতান কে ছিলেন?', qHi: 'दिल्ली सल्तनत की पहली और एकमात्र महिला शासिका कौन थी?', ansEn: 'Razia Sultana', ansBn: 'সুলতানা রাজিয়া', ansHi: 'रजिया सुल्तान' },
    { qEn: 'Which Sultan introduced the market control policy and Dagh & Chehra system?', qBn: 'বাজার দর নিয়ন্ত্রণ নীতি এবং দাগ ও হুলিয়া প্রথা কে প্রবর্তন করেন?', qHi: 'बाजार नियंत्रण नीति तथा दाग और हुलिया प्रथा किसने शुरू की थी?', ansEn: 'Alauddin Khilji', ansBn: 'আলাউদ্দিন খলজি', ansHi: 'अलाउद्दीन खिलजी' },
    { qEn: 'Moroccan traveler Ibn Battuta visited India during the reign of?', qBn: 'মরক্কোর পর্যটক ইবন বতুতা কার রাজত্বকালে ভারতে আসেন?', qHi: 'मोरक्को का यात्री इब्न बतूता किसके शासनकाल में भारत आया था?', ansEn: 'Muhammad bin Tughlaq', ansBn: 'মহম্মদ বিন তুঘলক', ansHi: 'मुहम्मद बिन तुगलक' },
    { qEn: 'Who founded the city of Agra in 1504 CE?', qBn: '১৫০৪ খ্রিস্টাব্দে আগ্রা শহরের প্রতিষ্ঠা কে করেন?', qHi: '1504 ईस्वी में आगरा शहर की स्थापना किसने की थी?', ansEn: 'Sikandar Lodi', ansBn: 'সিকান্দার লোদি', ansHi: 'सिकंदर लोदी' },
    { qEn: 'Who founded the Vijayanagara Empire in 1336 CE?', qBn: '১৩৩৬ খ্রিস্টাব্দে বিজয়নগর সাম্রাজ্য কারা প্রতিষ্ঠা করেন?', qHi: '1336 ईस्वी में विजयनगर साम्राज्य की स्थापना किसने की थी?', ansEn: 'Harihara and Bukka', ansBn: 'হরিহর ও বুক্ক', ansHi: 'हरिहर और बुक्का' },
    { qEn: 'Who was the greatest ruler of Vijayanagara who wrote "Amuktamalyada"?', qBn: 'বিজয়নগর সাম্রাজ্যের শ্রেষ্ঠ রাজা কে ছিলেন যিনি "আমুক্তমাল্যদা" রচনা করেন?', qHi: 'विजयनगर के महानतम शासक कौन थे जिन्होंने "आमुक्तमाल्यद" लिखी?', ansEn: 'Krishnadevaraya', ansBn: 'কৃষ্ণদেব রায়', ansHi: 'कृष्णदेव राय' },
    { qEn: 'In which year was the First Battle of Panipat fought between Babur and Ibrahim Lodi?', qBn: 'বাবর ও ইব্রাহিম লোদির মধ্যে পানিপথের প্রথম যুদ্ধ কবে হয়েছিল?', qHi: 'बाबर और इब्राहिम लोदी के बीच पानीपत का प्रथम युद्ध कब हुआ था?', ansEn: '1526 CE', ansBn: '১৫২৬ খ্রিস্টাব্দ', ansHi: '1526 ईस्वी' },
    { qEn: 'Who built the Grand Trunk Road and introduced the Rupiya coin?', qBn: 'গ্র্যান্ড ট্রাঙ্ক রোড নির্মাণ ও রুপিয়া মুদ্রার প্রচলন কে করেন?', qHi: 'ग्रैंड ट्रंक रोड का निर्माण और रुपया मुद्रा का प्रचलन किसने किया?', ansEn: 'Sher Shah Suri', ansBn: 'শের শাহ সুরি', ansHi: 'शेरशाह सूरी' },
    { qEn: 'In which year was the Battle of Haldighati fought between Akbar and Maharana Pratap?', qBn: 'আকবর ও মহারানা প্রতাপের মধ্যে হলদিঘাটের যুদ্ধ কবে হয়েছিল?', qHi: 'अकबर और महाराणा प्रताप के बीच हल्दीघाटी का युद्ध कब लड़ा गया था?', ansEn: '1576 CE', ansBn: '১৫৭৬ খ্রিস্টাব্দ', ansHi: '1576 ईस्वी' },
    { qEn: 'Who wrote "Akbarnama" and "Ain-i-Akbari"?', qBn: '"আকবরনামা" ও "আইন-ই-আকবরি" কার রচনা?', qHi: '"अकबरनामा" और "आईन-ए-अकबरी" के लेखक कौन थे?', ansEn: 'Abul Fazl', ansBn: 'আবুল ফজল', ansHi: 'अबुल फजल' },
    { qEn: 'Which Mughal emperor promulgated the syncretic faith "Din-i-Ilahi"?', qBn: '"দীন-ই-ইলাহি" কে প্রবর্তন করেছিলেন?', qHi: '"दीन-ए-इलाही" धर्म की शुरुआत किस मुगल सम्राट ने की थी?', ansEn: 'Emperor Akbar', ansBn: 'সম্রাট আকবর', ansHi: 'सम्राट अकबर' },
    { qEn: 'English envoy Sir Thomas Roe visited the court of which Mughal Emperor?', qBn: 'ইংরেজ দূত স্যার টমাস রো কোন মুঘল সম্রাটের দরবারে এসেছিলেন?', qHi: 'अंग्रेज राजदूत सर थॉमस रो किस मुगल सम्राट के दरबार में आया था?', ansEn: 'Jahangir', ansBn: 'জাহাঙ্গীর', ansHi: 'जहाँगीर' },
    { qEn: 'Which Mughal Emperor built the Taj Mahal and Red Fort in Delhi?', qBn: 'আগ্রার তাজমহল ও দিল্লির লালকেল্লা কোন মুঘল সম্রাট নির্মাণ করেন?', qHi: 'ताजमहल और दिल्ली के लाल किले का निर्माण किस मुगल सम्राट ने करवाया?', ansEn: 'Shah Jahan', ansBn: 'শাহজাহান', ansHi: 'शाहजहाँ' },
    { qEn: 'Where was Chhatrapati Shivaji Maharaj crowned as Chhatrapati in 1674?', qBn: '১৬৭৪ সালে ছত্রপতি শিবাজির রাজ্যাভিষেক কোন দুর্গে হয়েছিল?', qHi: '1674 में छत्रपति शिवाजी महाराज का राज्याभिषेक किस किले में हुआ था?', ansEn: 'Raigad Fort', ansBn: 'রায়গড় দুর্গ', ansHi: 'रायगढ़ किला' },
    { qEn: 'Who founded the Khalsa Panth in 1699?', qBn: '১৬৯৯ সালে খালসা পন্থ কে প্রতিষ্ঠা করেন?', qHi: '1699 में खालसा पंथ की स्थापना किस सिख गुरु ने की थी?', ansEn: 'Guru Gobind Singh', ansBn: 'গুরু গোবিন্দ সিং', ansHi: 'गुरु गोबिंद सिंह' },
    { qEn: 'Who wrote "Humayun-nama"?', qBn: '"হুমায়ুননামা" কে রচনা করেছিলেন?', qHi: '"हुमायूँनामा" की रचना किसने की थी?', ansEn: 'Gulbadan Begum', ansBn: 'গুলবদন বেগম', ansHi: 'गुलबदन बेगम' },
    { qEn: 'Which Mughal Emperor was known as "Zinda Pir"?', qBn: 'কোন মুঘল সম্রাট "জিন্দা পীর" নামে পরিচিত ছিলেন?', qHi: 'किस मुगल सम्राट को "जिंदा पीर" कहा जाता था?', ansEn: 'Aurangzeb', ansBn: 'ঔরঙ্গজেব', ansHi: 'औरंगजेब' },
    { qEn: 'In which year was the Battle of Plassey fought?', qBn: 'পলাশীর যুদ্ধ কত খ্রিস্টাব্দে সংঘটিত হয়েছিল?', qHi: 'प्लासी का युद्ध किस वर्ष लड़ा गया था?', ansEn: '23 June 1757', ansBn: '২৩ জুন ১৭৫৭', ansHi: '23 जून 1757' },
  ];

  medievalItems.forEach((m, idx) => {
    const d1 = medievalItems[(idx + 1) % medievalItems.length];
    const d2 = medievalItems[(idx + 2) % medievalItems.length];
    const d3 = medievalItems[(idx + 3) % medievalItems.length];
    rows.push({
      topicId: 'hist_medieval',
      topicEn: 'Delhi Sultanate & Mughal Era',
      topicBn: 'দিল্লি সুলতানি ও মুঘল যুগ',
      topicHi: 'दिल्ली सल्तनत और मुगल काल',
      qEn: m.qEn,
      qBn: m.qBn,
      qHi: m.qHi,
      ansEn: m.ansEn,
      ansBn: m.ansBn,
      ansHi: m.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${m.ansEn}.`,
      expBn: `সঠিক উত্তর: ${m.ansBn}।`,
      expHi: `सही उत्तर: ${m.ansHi}।`,
    });
  });

  // 4. Revolt of 1857 & Social Reforms (20 items)
  const modernItems = [
    { qEn: 'Who founded the Brahmo Samaj in 1828 in Calcutta?', qBn: '১৮২৮ সালে কলকাতায় ব্রাহ্মসমাজ কে প্রতিষ্ঠা করেন?', qHi: '1828 में कलकत्ता में ब्रह्म समाज की स्थापना किसने की थी?', ansEn: 'Raja Ram Mohan Roy', ansBn: 'রাজা রামমোহন রায়', ansHi: 'राजा राममोहन राय' },
    { qEn: 'Which Governor-General abolished Sati in 1829?', qBn: '১৮২৯ সালে কোন গভর্নর জেনারেল সতীদাহ প্রথা নিষিদ্ধ করেন?', qHi: '1829 में सती प्रथा का अंत किस गवर्नर-जनरल ने किया था?', ansEn: 'Lord William Bentinck', ansBn: 'লর্ড উইলিয়াম বেন্টিঙ্ক', ansHi: 'लॉर्ड विलियम बेंटिंक' },
    { qEn: 'Who championed the Hindu Widows’ Remarriage Act of 1856?', qBn: '১৮৫৬ সালের হিন্দু বিধবা বিবাহ আইন পাসে প্রধান ভূমিকা কার ছিল?', qHi: '1856 के हिंदू विधवा पुनर्विवाह अधिनियम में मुख्य योगदान किसका था?', ansEn: 'Ishwar Chandra Vidyasagar', ansBn: 'ঈশ্বরচন্দ্র বিদ্যাসাগর', ansHi: 'ईश्वर चंद्र विद्यासागर' },
    { qEn: 'Who founded the Arya Samaj in 1875 and gave the call "Go Back to the Vedas"?', qBn: '১৮৭৫ সালে আর্য সমাজ কে প্রতিষ্ঠা করেন?', qHi: '1875 में आर्य समाज की स्थापना किसने की थी?', ansEn: 'Swami Dayananda Saraswati', ansBn: 'স্বামী দয়ানন্দ সরস্বতী', ansHi: 'स्वामी दयानंद सरस्वती' },
    { qEn: 'Who founded the Ramakrishna Mission at Belur in 1897?', qBn: '১৮৯৭ সালে রামকৃষ্ণ মিশন কে প্রতিষ্ঠা করেন?', qHi: '1897 में रामकृष्ण मिशन की स्थापना किसने की थी?', ansEn: 'Swami Vivekananda', ansBn: 'স্বামী বিবেকানন্দ', ansHi: 'स्वामी विवेकानंद' },
    { qEn: 'Who founded the Satyashodhak Samaj in Maharashtra in 1873?', qBn: '১৮৭৩ সালে মহারাষ্ট্রে সত্যশোধক সমাজ কে প্রতিষ্ঠা করেন?', qHi: '1873 में सत्यशोधक समाज की स्थापना किसने की थी?', ansEn: 'Jyotirao Phule', ansBn: 'জ্যোতিরাও ফুলে', ansHi: 'ज्योतिराव फुले' },
    { qEn: 'Who was the martyr of Barrackpore who sparked the Revolt of 1857?', qBn: 'ব্যারাকপুরে ১৮৫৭ সালের মহাবিদ্রোহের প্রথম শহীদ কে ছিলেন?', qHi: 'बैरकपुर में 1857 के विद्रोह के प्रथम शहीद कौन थे?', ansEn: 'Mangal Pandey', ansBn: 'মঙ্গল পান্ডে', ansHi: 'मंगल पांडे' },
    { qEn: 'Who led the Revolt of 1857 in Jhansi?', qBn: 'ঝাঁসিতে ১৮৫৭ সালের মহাবিদ্রোহের নেতৃত্ব কে দিয়েছিলেন?', qHi: 'झाँसी में 1857 के विद्रोह का नेतृत्व किसने किया था?', ansEn: 'Rani Lakshmibai', ansBn: 'রানি লক্ষ্মীবাঈ', ansHi: 'रानी लक्ष्मीबाई' },
    { qEn: 'Who led the Revolt of 1857 in Kanpur?', qBn: 'কানপুরে ১৮৫৭ সালের মহাবিদ্রোহের নেতা কে ছিলেন?', qHi: 'कानपुर में 1857 के विद्रोह का नेतृत्व किसने किया था?', ansEn: 'Nana Sahib & Tantia Tope', ansBn: 'নানা সাহেব ও তাঁতিয়া টোপি', ansHi: 'नाना साहेब और तात्या टोपे' },
    { qEn: 'Who led the Revolt of 1857 at Arrah (Bihar)?', qBn: 'বিহারের জগদীশপুরে ১৮৫৭ মহাবিদ্রোহের নেতৃত্ব কে দেন?', qHi: 'बिहार (जगदीशपुर) में 1857 के विद्रोह का नेतृत्व किसने किया था?', ansEn: 'Kunwar Singh', ansBn: 'কুনওয়ার সিং', ansHi: 'वीर कुंवर सिंह' },
    { qEn: 'Who was the first Viceroy of India after the Act of 1858?', qBn: '১৮৫৮ সালের আইনের পর ভারতের প্রথম ভাইসরয় কে হন?', qHi: '1858 के अधिनियम के बाद भारत का प्रथम वायसराय कौन बना?', ansEn: 'Lord Canning', ansBn: 'লর্ড ক্যানিং', ansHi: 'लॉर्ड कैनिंग' },
    { qEn: 'Who introduced the Permanent Settlement in Bengal in 1793?', qBn: '১৭৯৩ সালে বাংলায় চিরস্থায়ী বন্দোবস্ত কে প্রবর্তন করেন?', qHi: '1793 में बंगाल में स्थायी बंदोबस्त किसने लागू किया था?', ansEn: 'Lord Cornwallis', ansBn: 'লর্ড কর্নওয়ালিস', ansHi: 'लॉर्ड कॉर्नवालिस' },
    { qEn: 'Who introduced the Doctrine of Lapse and started Indian Railways in 1853?', qBn: 'স্বত্ববিলোপ নীতি ও ভারতে প্রথম রেলপথ (১৮৫৩) কে চালু করেন?', qHi: 'हड़प नीति (Doctrine of Lapse) और भारत में पहली रेल किसने शुरू की?', ansEn: 'Lord Dalhousie', ansBn: 'লর্ড ডালহৌসি', ansHi: 'लॉर्ड डलहौजी' },
    { qEn: 'Who led the Santhal Rebellion of 1855–56?', qBn: '১৮৫৫-৫৬ সালের সাঁওতাল বিদ্রোহের প্রধান নেতা কারা ছিলেন?', qHi: '1855-56 के संथाल विद्रोह के प्रमुख नेता कौन थे?', ansEn: 'Sidhu and Kanhu Murmu', ansBn: 'সিধু ও কানহু মুর্মু', ansHi: 'सिदो और कान्हू मुर्मू' },
    { qEn: 'Who wrote the play "Nil Darpan" depicting the plight of Indigo farmers?', qBn: 'নীলচাষীদের দুর্দশা নিয়ে "নীলদর্পণ" নাটক কে রচনা করেন?', qHi: 'नील किसानों की दुर्दशा पर "नील दर्पण" नाटक किसने लिखा था?', ansEn: 'Dinabandhu Mitra', ansBn: 'দীনবন্ধু মিত্র', ansHi: 'दीनबंधु मित्र' },
    { qEn: 'Who founded the Asiatic Society in Calcutta in 1784?', qBn: '১৭৮৪ সালে কলকাতায় এশিয়াটিক সোসাইটি কে প্রতিষ্ঠা করেন?', qHi: '1784 में कलकत्ता में एशियाटिक सोसाइटी की स्थापना किसने की थी?', ansEn: 'Sir William Jones', ansBn: 'স্যার উইলিয়াম জোন্স', ansHi: 'सर विलियम जोन्स' },
    { qEn: 'Which was the first newspaper published in India in 1780?', qBn: '১৭৮০ সালে প্রকাশিত ভারতের প্রথম সংবাদপত্র কোনটি?', qHi: '1780 में भारत में प्रकाशित पहला समाचार पत्र कौन सा था?', ansEn: 'Bengal Gazette (James Augustus Hicky)', ansBn: 'বেঙ্গল গেজেট (হিকি)', ansHi: 'बंगाल गजट (जेम्स ऑगस्टस हिक्की)' },
    { qEn: 'Who started the Young Bengal Movement at Hindu College?', qBn: 'হিন্দু কলেজে ইয়ং বেঙ্গল আন্দোলনের প্রবর্তক কে ছিলেন?', qHi: 'यंग बंगाल आंदोलन के प्रवर्तक कौन थे?', ansEn: 'Henry Louis Vivian Derozio', ansBn: 'হেনরি লুই ভিভিয়ান ডিরোজিও', ansHi: 'हेनरी लुई विवियन डेरोजियो' },
    { qEn: 'Who repealed the Vernacular Press Act in 1882 and is called Father of Local Self-Govt?', qBn: 'স্থানীয় স্বায়ত্তশাসনের জনক কাকে বলা হয় যিনি ভার্নাকুলার প্রেস অ্যাক্ট রদ করেন?', qHi: 'स्थानीय स्वशासन का जनक किसे कहा जाता है?', ansEn: 'Lord Ripon', ansBn: 'লর্ড রিপন', ansHi: 'लॉर्ड रिपन' },
    { qEn: 'Who founded the Aligarh Muslim Anglo-Oriental College in 1875?', qBn: 'আলিগড় আন্দোলনের প্রবর্তক কে ছিলেন?', qHi: 'अलीगढ़ मुस्लिम एंग्लो-ओरिएंटल कॉलेज की स्थापना किसने की थी?', ansEn: 'Sir Syed Ahmed Khan', ansBn: 'স্যার সৈয়দ আহমেদ খান', ansHi: 'सर सैयद अहमद खान' },
  ];

  modernItems.forEach((mod, idx) => {
    const d1 = modernItems[(idx + 1) % modernItems.length];
    const d2 = modernItems[(idx + 2) % modernItems.length];
    const d3 = modernItems[(idx + 3) % modernItems.length];
    rows.push({
      topicId: 'hist_modern',
      topicEn: 'Revolt of 1857 & Social Reforms',
      topicBn: '১৮৫৭ মহাবিদ্রোহ ও সমাজ সংস্কার',
      topicHi: '1857 का विद्रोह और समाज सुधार',
      qEn: mod.qEn,
      qBn: mod.qBn,
      qHi: mod.qHi,
      ansEn: mod.ansEn,
      ansBn: mod.ansBn,
      ansHi: mod.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${mod.ansEn}.`,
      expBn: `সঠিক উত্তর: ${mod.ansBn}।`,
      expHi: `सही उत्तर: ${mod.ansHi}।`,
    });
  });

  // 5. Indian National Movement (20 items)
  const freedomItems = [
    { qEn: 'Who presided over the first session of the Indian National Congress in Bombay (1885)?', qBn: '১৮৮৫ সালে ভারতীয় জাতীয় কংগ্রেসের প্রথম অধিবেশনের সভাপতি কে ছিলেন?', qHi: '1885 में भारतीय राष्ट्रीय कांग्रेस के प्रथम अधिवेशन के अध्यक्ष कौन थे?', ansEn: 'Womesh Chunder Bonnerjee', ansBn: 'উমেশচন্দ্র বন্দ্যোপাধ্যায়', ansHi: 'व्योमेश चंद्र बनर्जी' },
    { qEn: 'In which year did Lord Curzon partition Bengal?', qBn: 'লর্ড কার্জন কত খ্রিস্টাব্দে বঙ্গভঙ্গ ঘোষণা করেন?', qHi: 'लॉर्ड कर्जन ने बंगाल का विभाजन किस वर्ष किया था?', ansEn: '1905', ansBn: '১৯০৫ সালে', ansHi: '1905 में' },
    { qEn: 'Who gave the famous slogan "Swaraj is my birthright and I shall have it"?', qBn: '"স্বরাজ আমার জন্মগত অধিকার"—এই বিখ্যাত উক্তিটি কার?', qHi: '"स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा" किसका नारा था?', ansEn: 'Bal Gangadhar Tilak', ansBn: 'বাল গঙ্গাধর তিলক', ansHi: 'बाल गंगाधर तिलक' },
    { qEn: 'In which year did Mahatma Gandhi launch the Champaran Satyagraha in Bihar?', qBn: 'মহাত্মা গান্ধী বিহারের চম্পারণ সত্যাগ্রহ কত সালে শুরু করেন?', qHi: 'महात्मा गांधी ने बिहार में चंपारण सत्याग्रह किस वर्ष शुरू किया था?', ansEn: '1917', ansBn: '১৯১৭ সালে', ansHi: '1917 में' },
    { qEn: 'On which date did the Jallianwala Bagh Massacre take place in Amritsar?', qBn: 'অমৃতসরের জালিয়ানওয়ালাবাগ হত্যাকাণ্ড কবে ঘটেছিল?', qHi: 'अमृतसर में जलियाँवाला बाग हत्याकांड किस तिथि को हुआ था?', ansEn: '13 April 1919', ansBn: '১৩ এপ্রিল ১৯১৯', ansHi: '13 अप्रैल 1919' },
    { qEn: 'Who renounced his British Knighthood in protest against the Jallianwala Bagh Massacre?', qBn: 'জালিয়ানওয়ালাবাগ হত্যাকাণ্ডের প্রতিবাদে কে নাইটহুড উপাধি ত্যাগ করেন?', qHi: 'जलियाँवाला बाग हत्याकांड के विरोध में किसने नाइटहुड की उपाधि त्याग दी थी?', ansEn: 'Rabindranath Tagore', ansBn: 'রবীন্দ্রনাথ ঠাকুর', ansHi: 'रवींद्रनाथ टैगोर' },
    { qEn: 'Who founded the Swaraj Party in 1923?', qBn: '১৯২৩ সালে স্বরাজ্য দল কারা প্রতিষ্ঠা করেন?', qHi: '1923 में स्वराज पार्टी की स्थापना किसने की थी?', ansEn: 'Chittaranjan Das & Motilal Nehru', ansBn: 'চিত্তরঞ্জন দাশ ও মতিলাল নেহরু', ansHi: 'चित्तरंजन दास और मोतीलाल नेहरू' },
    { qEn: 'At which Congress session (1929) was the resolution of "Purna Swaraj" passed?', qBn: '১৯২৯ সালের কোন কংগ্রেস অধিবেশনে "পূর্ণ স্বরাজ" দাবি গৃহীত হয়?', qHi: '1929 के किस कांग्रेस अधिवेशन में "पूर्ण स्वराज" का प्रस्ताव पारित हुआ?', ansEn: 'Lahore Session (Jawaharlal Nehru)', ansBn: 'লাহোর অধিবেশন (জওহরলাল নেহরু)', ansHi: 'लाहौर अधिवेशन (जवाहरलाल नेहरू)' },
    { qEn: 'From where did Mahatma Gandhi start the historic Dandi March on 12 March 1930?', qBn: '১৯৩০ সালের ১২ মার্চ মহাত্মা গান্ধী কোথা থেকে ডান্ডি অভিযান শুরু করেন?', qHi: '12 मार्च 1930 को महात्मा गांधी ने दांडी मार्च कहाँ से शुरू किया था?', ansEn: 'Sabarmati Ashram', ansBn: 'সবরমতী আশ্রম', ansHi: 'साबरमती आश्रम' },
    { qEn: 'Who led the Chittagong Armoury Raid on 18 April 1930?', qBn: '১৯৩০ সালে চট্টগ্রাম অস্ত্রাগার লুণ্ঠনের নায়ক কে ছিলেন?', qHi: '1930 में चटगाँव शस्त्रागार छापे का नेतृत्व किसने किया था?', ansEn: 'Masterda Surya Sen', ansBn: 'মাস্টারদা সূর্য সেন', ansHi: 'मास्टरदा सूर्य सेन' },
    { qEn: 'Who founded the Forward Bloc in 1939 after resigning from Congress presidency?', qBn: '১৯৩৯ সালে ফরোয়ার্ড ব্লক দল কে প্রতিষ্ঠা করেন?', qHi: '1939 में फॉरवर्ड ब्लॉक की स्थापना किसने की थी?', ansEn: 'Subhas Chandra Bose', ansBn: 'নেতাজি সুভাষচন্দ্র বসু', ansHi: 'सुभाष चंद्र बोस' },
    { qEn: 'In which year was the Quit India Movement (Bharat Chhoro Andolan) launched?', qBn: 'ভারত ছাড়ো আন্দোলন কত সালে শুরু হয়েছিল?', qHi: 'भारत छोड़ो आंदोलन किस वर्ष शुरू हुआ था?', ansEn: 'August 1942', ansBn: 'আগস্ট ১৯৪২', ansHi: 'अगस्त 1942' },
    { qEn: 'Who was known as the "Frontier Gandhi" (Simanta Gandhi)?', qBn: '"সীমান্ত গান্ধী" নামে কে পরিচিত ছিলেন?', qHi: '"सीमांत गांधी" के नाम से किसे जाना जाता था?', ansEn: 'Khan Abdul Ghaffar Khan', ansBn: 'খান আবদুল গফফর খান', ansHi: 'खान अब्दुल गफ्फार खान' },
    { qEn: 'Who was the first Indian woman President of the Indian National Congress (Kanpur 1925)?', qBn: 'জাতীয় কংগ্রেসের প্রথম ভারতীয় মহিলা সভাপতি কে ছিলেন?', qHi: 'भारतीय राष्ट्रीय कांग्रेस की प्रथम भारतीय महिला अध्यक्ष कौन थीं?', ansEn: 'Sarojini Naidu', ansBn: 'সরোজিনী নাইডু', ansHi: 'सरोजिनी नायडू' },
    { qEn: 'Who founded the Ghadar Party in San Francisco in 1913?', qBn: '১৯১৩ সালে সান ফ্রান্সিসকোতে গদর পার্টি কে প্রতিষ্ঠা করেন?', qHi: '1913 में सैन फ्रांसिस्को में गदर पार्टी की स्थापना किसने की थी?', ansEn: 'Lala Hardayal & Sohan Singh Bhakna', ansBn: 'লালা হরদয়াল ও সোহন সিং ভাকনা', ansHi: 'लाला हरदयाल और सोहन सिंह भाकना' },
    { qEn: 'Who wrote the book "Poverty and Un-British Rule in India"?', qBn: '"Poverty and Un-British Rule in India" গ্রন্থটি কার লেখা?', qHi: '"पॉवर्टी एंड अन-ब्रिटिश रूल इन इंडिया" पुस्तक किसने लिखी थी?', ansEn: 'Dadabhai Naoroji', ansBn: 'দাদাভাই নওরোজি', ansHi: 'दादाभाई नौरोजी' },
    { qEn: 'Who gave the slogan "Give me blood, and I shall give you freedom"?', qBn: '"তোমরা আমাকে রক্ত দাও, আমি তোমাদের স্বাধীনতা দেব"—কার উক্তি?', qHi: '"तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा"—यह नारा किसने दिया था?', ansEn: 'Netaji Subhas Chandra Bose', ansBn: 'নেতাজি সুভাষচন্দ্র বসু', ansHi: 'नेताजी सुभाष चंद्र बोस' },
    { qEn: 'The Poona Pact (1932) was signed between Mahatma Gandhi and whom?', qBn: '১৯৩২ সালের পুনা চুক্তি মহাত্মা গান্ধী ও কার মধ্যে স্বাক্ষরিত হয়?', qHi: '1932 का पूना समझौता महात्मा गांधी और किसके बीच हुआ था?', ansEn: 'Dr. B.R. Ambedkar', ansBn: 'ডঃ বি. আর. আম্বেদকর', ansHi: 'डॉ. बी. आर. अंबेडकर' },
    { qEn: 'Who was the first Governor-General of independent India (Indian)?', qBn: 'স্বাধীন ভারতের প্রথম ভারতীয় গভর্নর জেনারেল কে ছিলেন?', qHi: 'स्वतंत्र भारत के प्रथम भारतीय गवर्नर-जनरल कौन थे?', ansEn: 'C. Rajagopalachari', ansBn: 'চক্রবর্তী রাজাগোপালাচারী', ansHi: 'सी. राजगोपालाचारी' },
    { qEn: 'Which revolutionary threw a non-lethal bomb in the Central Legislative Assembly in 1929?', qBn: '১৯২৯ সালে কেন্দ্রীয় আইনসভায় কারা বোমা নিক্ষেপ করেছিলেন?', qHi: '1929 में केंद्रीय विधानसभा में किसने बम फेंका था?', ansEn: 'Bhagat Singh & Batukeshwar Dutt', ansBn: 'ভগৎ সিং ও বটুকেশ্বর দত্ত', ansHi: 'भगत सिंह और बटुकेश्वर दत्त' },
  ];

  freedomItems.forEach((f, idx) => {
    const d1 = freedomItems[(idx + 1) % freedomItems.length];
    const d2 = freedomItems[(idx + 2) % freedomItems.length];
    const d3 = freedomItems[(idx + 3) % freedomItems.length];
    rows.push({
      topicId: 'hist_freedom',
      topicEn: 'Indian National Movement',
      topicBn: 'ভারতের জাতীয় স্বাধীনতা আন্দোলন',
      topicHi: 'भारतीय राष्ट्रीय आंदोलन',
      qEn: f.qEn,
      qBn: f.qBn,
      qHi: f.qHi,
      ansEn: f.ansEn,
      ansBn: f.ansBn,
      ansHi: f.ansHi,
      dEn: [d1.ansEn, d2.ansEn, d3.ansEn],
      dBn: [d1.ansBn, d2.ansBn, d3.ansBn],
      dHi: [d1.ansHi, d2.ansHi, d3.ansHi],
      expEn: `Correct Answer: ${f.ansEn}.`,
      expBn: `সঠিক উত্তর: ${f.ansBn}।`,
      expHi: `सही उत्तर: ${f.ansHi}।`,
    });
  });

  return rows.map((r, index) => {
    const qNum = index + 1;
    const correctIdx = qNum % 4;
    const enOpts = [r.ansEn, ...r.dEn];
    const bnOpts = [r.ansBn, ...r.dBn];
    const hiOpts = [r.ansHi, ...r.dHi];

    const swap = (arr: string[]) => {
      const copy = [...arr];
      const temp = copy[correctIdx];
      copy[correctIdx] = copy[0];
      copy[0] = temp;
      return copy as [string, string, string, string];
    };

    return {
      id: `QM-HIST-${String(qNum).padStart(3, '0')}`,
      examCategory: EXAM_CYCLE[index % EXAM_CYCLE.length],
      subject: 'history',
      topicId: r.topicId,
      difficulty: DIFF_CYCLE[index % 3],
      correctIndex: correctIdx,
      content: {
        en: {
          topicName: r.topicEn,
          question: r.qEn,
          options: swap(enOpts),
          explanation: r.expEn,
        },
        bn: {
          topicName: r.topicBn,
          question: r.qBn,
          options: swap(bnOpts),
          explanation: r.expBn,
        },
        hi: {
          topicName: r.topicHi,
          question: r.qHi,
          options: swap(hiOpts),
          explanation: r.expHi,
        },
      },
    };
  });
}
