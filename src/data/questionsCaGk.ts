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

interface FactItem {
  qEn: string;
  qBn: string;
  qHi: string;
  ansEn: string;
  ansBn: string;
  ansHi: string;
}

function buildQuestionsFromTopicList(
  prefix: string,
  subject: 'current_affairs' | 'general_awareness',
  topics: Array<{
    topicId: string;
    topicEn: string;
    topicBn: string;
    topicHi: string;
    items: FactItem[];
  }>
): Question[] {
  const result: Question[] = [];
  let counter = 1;

  topics.forEach((group) => {
    group.items.forEach((item, idx) => {
      const qNum = counter++;
      const d1 = group.items[(idx + 1) % group.items.length];
      const d2 = group.items[(idx + 2) % group.items.length];
      const d3 = group.items[(idx + 3) % group.items.length];
      const correctIdx = qNum % 4;

      const swap = (arr: string[]) => {
        const copy = [...arr];
        const temp = copy[correctIdx];
        copy[correctIdx] = copy[0];
        copy[0] = temp;
        return copy as [string, string, string, string];
      };

      result.push({
        id: `${prefix}-${String(qNum).padStart(3, '0')}`,
        examCategory: EXAM_CYCLE[(qNum - 1) % EXAM_CYCLE.length],
        subject,
        topicId: group.topicId,
        difficulty: DIFF_CYCLE[(qNum - 1) % 3],
        correctIndex: correctIdx,
        content: {
          en: {
            topicName: group.topicEn,
            question: item.qEn,
            options: swap([item.ansEn, d1.ansEn, d2.ansEn, d3.ansEn]),
            explanation: `Correct Answer: ${item.ansEn}.`,
          },
          bn: {
            topicName: group.topicBn,
            question: item.qBn,
            options: swap([item.ansBn, d1.ansBn, d2.ansBn, d3.ansBn]),
            explanation: `সঠিক উত্তর: ${item.ansBn}।`,
          },
          hi: {
            topicName: group.topicHi,
            question: item.qHi,
            options: swap([item.ansHi, d1.ansHi, d2.ansHi, d3.ansHi]),
            explanation: `सही उत्तर: ${item.ansHi}।`,
          },
        },
      });
    });
  });

  return result;
}

export function generateCurrentAffairsQuestions(): Question[] {
  return buildQuestionsFromTopicList('QM-CA', 'current_affairs', [
    {
      topicId: 'ca_space',
      topicEn: 'ISRO Missions & Science Tech',
      topicBn: 'ইসরো অভিযান ও বিজ্ঞান-প্রযুক্তি',
      topicHi: 'इसरो मिशन और विज्ञान प्रौद्योगिकी',
      items: [
        { qEn: 'What is the name of the landing point of Chandrayaan-3 near the Lunar South Pole?', qBn: 'চন্দ্রযান-৩ চাঁদের দক্ষিণ মেরুতে যেখানে অবতরণ করেছে তার নাম কী রাখা হয়েছে?', qHi: 'चंद्रयान-3 के चंद्रमा के दक्षिणी ध्रुव पर लैंडिंग बिंदु का नाम क्या रखा गया है?', ansEn: 'Shiv Shakti Point', ansBn: 'শিব শক্তি পয়েন্ট', ansHi: 'शिव शक्ति पॉइंट' },
        { qEn: 'On which date is National Space Day celebrated in India to mark Chandrayaan-3 landing?', qBn: 'চন্দ্রযান-৩ এর সাফল্যের স্মরণে ভারতে কোন দিনটি "জাতীয় মহাকাশ দিবস" হিসেবে পালিত হয়?', qHi: 'चंद्रयान-3 की सफलता के उपलक्ष्य में भारत में "राष्ट्रीय अंतरिक्ष दिवस" कब मनाया जाता है?', ansEn: '23 August', ansBn: '২৩ আগস্ট', ansHi: '23 अगस्त' },
        { qEn: 'What were the names of the Lander and Rover of Chandrayaan-3?', qBn: 'চন্দ্রযান-৩ অভিযানের ল্যান্ডার ও রোভারটির নাম কী ছিল?', qHi: 'चंद्रयान-3 मिशन के लैंडर और रोवर का नाम क्या था?', ansEn: 'Vikram (Lander) & Pragyan (Rover)', ansBn: 'বিক্রম (ল্যান্ডার) ও প্রজ্ঞান (রোভার)', ansHi: 'विक्रम (लैंडर) और प्रज्ञान (रोवर)' },
        { qEn: 'Which launch vehicle was used by ISRO to launch Chandrayaan-3?', qBn: 'ইসরো কোন রকেটের সাহায্যে চন্দ্রযান-৩ উৎক্ষেপণ করেছিল?', qHi: 'इसरो ने किस रॉकेट (प्रक्षेपण यान) से चंद्रयान-3 लॉन्च किया था?', ansEn: 'LVM3-M4 (Bahubali)', ansBn: 'LVM3-M4 রকেট', ansHi: 'LVM3-M4 रॉकेट' },
        { qEn: 'What is the name of India’s first dedicated Solar Mission launched by ISRO?', qBn: 'সূর্য গবেষণার জন্য ইসরোর প্রথম সৌর অভিযানের নাম কী?', qHi: 'सूर्य के अध्ययन के लिए इसरो के पहले सौर मिशन का नाम क्या है?', ansEn: 'Aditya-L1', ansBn: 'আদিত্য-এল১ (Aditya-L1)', ansHi: 'आदित्य-एल1 (Aditya-L1)' },
        { qEn: 'What is the name of ISRO’s upcoming human spaceflight mission?', qBn: 'ইসরোর মনুষ্যবাহী মহাকাশ অভিযানের নাম কী?', qHi: 'इसरो के मानवयुक्त अंतरिक्ष मिशन का नाम क्या है?', ansEn: 'Gaganyaan', ansBn: 'গগনযান (Gaganyaan)', ansHi: 'गगनयान (Gaganyaan)' },
        { qEn: 'What is the name of the female half-humanoid robot designed for Gaganyaan?', qBn: 'গগনযান অভিযানের জন্য তৈরি মহিলা হাফ-হিউম্যানয়েড রোবটটির নাম কী?', qHi: 'गगनयान मिशन के लिए विकसित महिला हाफ-ह्यूमनॉइड रोबोट का नाम क्या है?', ansEn: 'Vyommitra', ansBn: 'ব্যোমমিত্রা (Vyommitra)', ansHi: 'व्योममित्र (Vyommitra)' },
        { qEn: 'Where is the headquarters of the Indian Space Research Organisation (ISRO) located?', qBn: 'ইসরোর (ISRO) সদর দপ্তর কোথায় অবস্থিত?', qHi: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) का मुख्यालय कहाँ स्थित है?', ansEn: 'Bengaluru (Karnataka)', ansBn: 'বেঙ্গালুরু (কর্ণাটক)', ansHi: 'बेंगलुरु (कर्नाटक)' },
        { qEn: 'Where is Satish Dhawan Space Centre (ISRO’s primary spaceport) situated?', qBn: 'সতীশ ধাওয়ান মহাকাশ কেন্দ্র (শ্রীহরিকোটা) কোন রাজ্যে অবস্থিত?', qHi: 'सतीश धवन अंतरिक्ष केंद्र (श्रीहरिकोटा) किस राज्य में स्थित है?', ansEn: 'Sriharikota (Andhra Pradesh)', ansBn: 'শ্রীহরিকোটা (অন্ধ্রপ্রদেশ)', ansHi: 'श्रीहरिकोटा (आंध्र प्रदेश)' },
        { qEn: 'NISAR is a joint Earth-observation satellite mission between ISRO and which agency?', qBn: 'নিসার (NISAR) উপগ্রহ অভিযান ইসরো ও কোন মহাকাশ সংস্থার যৌথ প্রকল্প?', qHi: 'निसार (NISAR) उपग्रह मिशन इसरो और किस अंतरिक्ष एजेंसी की संयुक्त परियोजना है?', ansEn: 'NASA (USA)', ansBn: 'নাসা (NASA - USA)', ansHi: 'नासा (NASA - USA)' },
        { qEn: 'What is the name of ISRO’s first X-Ray Polarimeter Satellite launched in 2024?', qBn: 'কৃষ্ণগহ্বর ও বিকিরণ গবেষণায় ইসরোর প্রথম পোলারিমিটার উপগ্রহ কোনটি?', qHi: 'इसरो के पहले एक्स-रे पोलरिमीटर उपग्रह का नाम क्या है?', ansEn: 'XPoSat', ansBn: 'এক্সপোস্যাট (XPoSat)', ansHi: 'एक्सपोसैट (XPoSat)' },
        { qEn: 'Which is India’s first indigenous aircraft carrier commissioned at Kochi?', qBn: 'ভারতের প্রথম দেশীয় প্রযুক্তিতে নির্মিত বিমানবাহী রণতরী কোনটি?', qHi: 'भारत का पहला स्वदेशी विमानवाहक पोत कौन सा है?', ansEn: 'INS Vikrant', ansBn: 'আইএনএস বিক্রান্ত (INS Vikrant)', ansHi: 'आईएनएस विक्रांत (INS Vikrant)' },
        { qEn: 'Which supersonic cruise missile is jointly developed by India (DRDO) and Russia?', qBn: 'ভারত ও রাশিয়ার যৌথ উদ্যোগে তৈরি সুপারসনিক ক্রুজ মিসাইল কোনটি?', qHi: 'भारत और रूस द्वारा संयुक्त रूप से विकसित सुपरसोनिक क्रूज मिसाइल कौन सी है?', ansEn: 'BrahMos', ansBn: 'ব্রহ্মোস (BrahMos)', ansHi: 'ब्रह्मोस (BrahMos)' },
        { qEn: 'What is "Agni-V" successfully tested with MIRV technology under Mission Divyastra?', qBn: '"মিশন দিব্যাস্ত্র"-এর অধীনে পরীক্ষিত অগ্নি-৫ কী ধরনের ক্ষেপণাস্ত্র?', qHi: '"मिशन दिव्यास्त्र" के तहत परीक्षित अग्नि-5 किस प्रकार की मिसाइल है?', ansEn: 'Intercontinental Ballistic Missile (ICBM)', ansBn: 'আন্তঃমহাদেশীয় ব্যালিস্টিক ক্ষেপণাস্ত্র', ansHi: 'अंतरमहाद्वीपीय बैलिस्टिक मिसाइल' },
        { qEn: 'Which is India’s indigenous Light Combat Aircraft (LCA) manufactured by HAL?', qBn: 'হ্যাল (HAL) নির্মিত ভারতের দেশীয় হালকা যুদ্ধবিমানের নাম কী?', qHi: 'एचएएल (HAL) द्वारा निर्मित भारत का स्वदेशी हल्का लड़ाकू विमान कौन सा है?', ansEn: 'LCA Tejas', ansBn: 'তেজস (LCA Tejas)', ansHi: 'एलसीए तेजस (Tejas)' },
        { qEn: 'Where is ISRO setting up its second spaceport in Tamil Nadu?', qBn: 'তামিলনাড়ুর কোথায় ইসরো তার দ্বিতীয় উৎক্ষেপণ কেন্দ্র গড়ে তুলছে?', qHi: 'तमिलनाडु में किस स्थान पर इसरो अपना दूसरा स्पेसपोर्ट स्थापित कर रहा है?', ansEn: 'Kulasekarapattinam (Thoothukudi)', ansBn: 'কুলাশেখরপট্টিনম (তুতিকোরিন)', ansHi: 'कुलसेकरपट्टिनम (थूथुकुडी)' },
        { qEn: 'What is "Kavach" developed and deployed by Indian Railways?', qBn: 'ভারতীয় রেলের তৈরি "কবচ" (Kavach) প্রযুক্তিটি কী?', qHi: 'भारतीय रेलवे द्वारा विकसित "कवच" (Kavach) प्रणाली क्या है?', ansEn: 'Automatic Train Collision Avoidance System', ansBn: 'স্বয়ংক্রিয় ট্রেন সংঘর্ষ রোধ ব্যবস্থা', ansHi: 'स्वचालित ट्रेन टक्कर रोधी प्रणाली' },
        { qEn: 'Which is India’s deepest underground metro station located under the Hooghly River?', qBn: 'হুগলি নদীর নিচে নির্মিত ভারতের প্রথম আন্ডারওয়াটার মেট্রো কোন শহরে চালু হয়েছে?', qHi: 'हुगली नदी के नीचे भारत की पहली अंडरवॉटर मेट्रो किस शहर में शुरू हुई?', ansEn: 'Kolkata Metro (Howrah Maidan–Esplanade)', ansBn: 'কলকাতা মেট্রো (হাওড়া ময়দান-এসপ্ল্যানেড)', ansHi: 'कोलकाता मेट्रो (हावड़ा मैदान-एस्प्लेनेड)' },
        { qEn: 'What is the longest sea bridge in India connecting Mumbai with Navi Mumbai?', qBn: 'মুম্বই ও নভি মুম্বইয়ের মধ্যে সংযোগকারী ভারতের দীর্ঘতম সমুদ্র সেতু কোনটি?', qHi: 'मुंबई को नवी मुंबई से जोड़ने वाला भारत का सबसे लंबा समुद्री पुल कौन सा है?', ansEn: 'Atal Setu (MTHL - 21.8 km)', ansBn: 'অটল সেতু (MTHL - ২১.৮ কিমি)', ansHi: 'अटल सेतु (MTHL - 21.8 किमी)' },
        { qEn: 'Which is the highest railway arch bridge in the world built in Jammu & Kashmir?', qBn: 'জম্মু ও কাশ্মীরে কোন নদীর ওপর বিশ্বের উচ্চতম রেলওয়ে আর্চ ব্রিজ নির্মিত হয়েছে?', qHi: 'जम्मू और कश्मीर में किस नदी पर विश्व का सबसे ऊँचा रेलवे आर्च ब्रिज बना है?', ansEn: 'Chenab Rail Bridge (359 m)', ansBn: 'চন্দ্রভাগা (চেনাব) রেল ব্রিজ', ansHi: 'चेनाब रेल ब्रिज (359 मी)' },
      ],
    },
    {
      topicId: 'ca_sports',
      topicEn: 'Olympics, Cricket & Sports Trophies',
      topicBn: 'অলিম্পিক, ক্রিকেট ও ক্রীড়া ট্রফি',
      topicHi: 'ओलंपिक, क्रिकेट और खेल ट्रॉफियां',
      items: [
        { qEn: 'Which Indian shooter won two bronze medals at the Paris 2024 Olympics?', qBn: 'প্যারিস ২০২৪ অলিম্পিকে কোন ভারতীয় শুটার দুটি ব্রোঞ্জ পদক জিতে ইতিহাস গড়েন?', qHi: 'पेरिस 2024 ओलंपिक में दो कांस्य पदक जीतने वाली भारतीय निशानेबाज कौन हैं?', ansEn: 'Manu Bhaker', ansBn: 'মানু ভাকের', ansHi: 'मनु भाकर' },
        { qEn: 'Which medal did Neeraj Chopra win in Men’s Javelin Throw at the Paris 2024 Olympics?', qBn: 'প্যারিস ২০২৪ অলিম্পিকে জ্যাভলিন থ্রোতে নীরজ চোপড়া কোন পদক জয় করেন?', qHi: 'पेरिस 2024 ओलंपिक में भाला फेंक में नीरज चोपड़ा ने कौन सा पदक जीता?', ansEn: 'Silver Medal (89.45 m)', ansBn: 'রৌপ্য পদক (Silver)', ansHi: 'रजत पदक (Silver)' },
        { qEn: 'Who became the youngest World Chess Champion in history in December 2024?', qBn: '২০২৪ সালের ডিসেম্বরে বিশ্বের সর্বকনিষ্ঠ দাবা চ্যাম্পিয়ন কে হয়েছেন?', qHi: 'दिसंबर 2024 में इतिहास के सबसे युवा विश्व शतरंज चैंपियन कौन बने?', ansEn: 'D. Gukesh (India)', ansBn: 'ডি. গুকেশ (ভারত)', ansHi: 'डी. गुकेश (भारत)' },
        { qEn: 'Which country won the ICC Men’s T20 World Cup 2024 held in West Indies & USA?', qBn: '২০২৪ সালের আইসিসি পুরুষ টি-২০ বিশ্বকাপ কোন দেশ জয় করেছে?', qHi: 'आईसीसी पुरुष टी-20 विश्व कप 2024 का खिताब किस देश ने जीता?', ansEn: 'India (defeated South Africa)', ansBn: 'ভারত (দক্ষিণ আফ্রিকাকে হারিয়ে)', ansHi: 'भारत (दक्षिण अफ्रीका को हराकर)' },
        { qEn: 'Which team won the Indian Premier League (IPL) 2024 title?', qBn: '২০২৪ সালের আইপিএল (IPL) চ্যাম্পিয়ন হয়েছে কোন দল?', qHi: 'इंडियन प्रीमियर लीग (IPL) 2024 का खिताब किस टीम ने जीता?', ansEn: 'Kolkata Knight Riders (KKR)', ansBn: 'কলকাতা নাইট রাইডার্স (KKR)', ansHi: 'कोलकाता नाइट राइडर्स (KKR)' },
        { qEn: 'Which city will host the 2028 Summer Olympic Games?', qBn: '২০২৮ সালের গ্রীষ্মকালীন অলিম্পিক গেমস কোন শহরে অনুষ্ঠিত হবে?', qHi: '2028 के ग्रीष्मकालीन ओलंपिक खेलों की मेजबानी कौन सा शहर करेगा?', ansEn: 'Los Angeles (USA)', ansBn: 'লস অ্যাঞ্জেলেস (USA)', ansHi: 'लॉस एंजिल्स (USA)' },
        { qEn: 'Which city will host the 2032 Summer Olympic Games?', qBn: '২০৩২ সালের গ্রীষ্মকালীন অলিম্পিক গেমস কোথায় অনুষ্ঠিত হবে?', qHi: '2032 ग्रीष्मकालीन ओलंपिक खेल कहाँ आयोजित किए जाएंगे?', ansEn: 'Brisbane (Australia)', ansBn: 'ব্রিসবেন (অস্ট্রেলিয়া)', ansHi: 'ब्रिस्बेन (ऑस्ट्रेलिया)' },
        { qEn: 'Santosh Trophy and Durand Cup are associated with which sport?', qBn: 'সন্তোষ ট্রফি ও ডুরান্ড কাপ কোন খেলার সাথে যুক্ত?', qHi: 'संतोष ट्रॉफी और डूरंड कप किस खेल से संबंधित हैं?', ansEn: 'Football', ansBn: 'ফুটবল', ansHi: 'फुटबॉल' },
        { qEn: 'Ranji Trophy, Irani Cup, and Vijay Hazare Trophy are associated with which sport?', qBn: 'রঞ্জি ট্রফি, ইরানি কাপ ও বিজয় হাজারে ট্রফি কোন খেলার সাথে যুক্ত?', qHi: 'रणजी ट्रॉफी, ईरानी कप और विजय हजारे ट्रॉफी किस खेल से संबंधित हैं?', ansEn: 'Cricket', ansBn: 'ক্রিকেট', ansHi: 'क्रिकेट' },
        { qEn: 'Thomas Cup and Uber Cup are prestigious world team championships in which sport?', qBn: 'থমাস কাপ ও উবের কাপ কোন খেলার সাথে সম্পর্কিত?', qHi: 'थॉमस कप और उबर कप किस खेल से संबंधित हैं?', ansEn: 'Badminton', ansBn: 'ব্যাডমিন্টন', ansHi: 'बैडमिंटन' },
        { qEn: 'Davis Cup and Billie Jean King Cup are international team events in which sport?', qBn: 'ডেভিস কাপ কোন খেলার আন্তর্জাতিক প্রতিযোগিতা?', qHi: 'डेविस कप किस खेल की अंतरराष्ट्रीय प्रतियोगिता है?', ansEn: 'Lawn Tennis', ansBn: 'লন টেনিস', ansHi: 'लॉन टेनिस' },
        { qEn: 'Aga Khan Cup and Sultan Azlan Shah Cup are associated with which sport?', qBn: 'আগা খান কাপ ও সুলতান আজলান শাহ কাপ কোন খেলার সাথে যুক্ত?', qHi: 'आगा खान कप और सुल्तान अजलान शाह कप किस खेल से जुड़े हैं?', ansEn: 'Field Hockey', ansBn: 'হকি (Hockey)', ansHi: 'हॉकी (Hockey)' },
        { qEn: 'Who became the youngest Indian wrestler to win an Olympic medal at Paris 2024?', qBn: 'প্যারিস ২০২৪ অলিম্পিকে কুস্তিতে ব্রোঞ্জ জয়ী সর্বকনিষ্ঠ ভারতীয় খেলোয়াড় কে?', qHi: 'पेरिस 2024 ओलंपिक में कुश्ती में कांस्य जीतने वाले सबसे युवा भारतीय कौन बने?', ansEn: 'Aman Sehrawat (57 kg)', ansBn: 'আমন সেহরাওয়াত (৫৭ কেজি)', ansHi: 'अमन सेहरावत (57 किग्रा)' },
        { qEn: 'Avani Lekhara won two Gold medals across Tokyo & Paris Paralympics in which sport?', qBn: 'প্যারালিম্পিকে স্বর্ণপদক জয়ী অবনী লেখারা কোন খেলার সাথে যুক্ত?', qHi: 'पैरालंपिक स्वर्ण पदक विजेता अवनी लेखरा किस खेल से संबंधित हैं?', ansEn: 'Para Shooting', ansBn: 'প্যারা শুটিং', ansHi: 'पैरा निशानेबाजी' },
        { qEn: 'On which date is National Sports Day celebrated in India on Major Dhyan Chand’s birthday?', qBn: 'মেজর ধ্যানচাঁদের জন্মদিন উপলক্ষে ভারতে জাতীয় ক্রীড়া দিবস কবে পালিত হয়?', qHi: 'मेजर ध्यानचंद की जयंती पर भारत में राष्ट्रीय खेल दिवस कब मनाया जाता है?', ansEn: '29 August', ansBn: '২৯ আগস্ট', ansHi: '29 अगस्त' },
        { qEn: 'Which is the highest sporting honour of the Republic of India?', qBn: 'ভারতের সর্বোচ্চ ক্রীড়া সম্মান কোনটি?', qHi: 'भारत का सर्वोच्च खेल सम्मान कौन सा है?', ansEn: 'Major Dhyan Chand Khel Ratna Award', ansBn: 'মেজর ধ্যানচাঁদ খেলরত্ন পুরস্কার', ansHi: 'मेजर ध्यानचंद खेल रत्न पुरस्कार' },
        { qEn: 'Which Grand Slam tennis tournament is played on a Clay Court?', qBn: 'কোন গ্র্যান্ড স্ল্যাম টেনিস প্রতিযোগিতা লাল সুড়কির কোর্টে (Clay Court) খেলা হয়?', qHi: 'कौन सा ग्रैंड स्लैम टेनिस टूर्नामेंट मिट्टी के कोर्ट (Clay Court) पर खेला जाता है?', ansEn: 'French Open (Roland Garros)', ansBn: 'ফরাসি ওপেন (French Open)', ansHi: 'फ्रेंच ओपन (रोलां गैरो)' },
        { qEn: 'Which Grand Slam tennis tournament is played on a Grass Court?', qBn: 'কোন গ্র্যান্ড স্ল্যাম টেনিস প্রতিযোগিতা ঘাসের কোর্টে (Grass Court) খেলা হয়?', qHi: 'कौन सा ग्रैंड स्लैम टेनिस टूर्नामेंट घास के कोर्ट (Grass Court) पर खेला जाता है?', ansEn: 'Wimbledon', ansBn: 'উইম্বলডন (Wimbledon)', ansHi: 'विंबलडन (Wimbledon)' },
        { qEn: 'How many players are on the court per team in a standard Kabaddi match?', qBn: 'কাবাডি খেলায় প্রতিটি দলে কোর্টে কতজন খেলোয়াড় থাকেন?', qHi: 'कबड्डी के खेल में प्रत्येक टीम में कोर्ट पर कितने खिलाड़ी होते हैं?', ansEn: '7 Players', ansBn: '৭ জন খেলোয়াড়', ansHi: '7 खिलाड़ी' },
        { qEn: 'The term "Bishop", "Gambit", "Stalemate", and "Grandmaster" belong to which game?', qBn: '"বিশপ", "গ্যাম্বিট" ও "গ্র্যান্ডমাস্টার" শব্দগুলি কোন খেলার সাথে যুক্ত?', qHi: '"बिशप", "गैम्बिट" और "ग्रैंडमास्टर" शब्द किस खेल से संबंधित हैं?', ansEn: 'Chess', ansBn: 'দাবা (Chess)', ansHi: 'शतरंज (Chess)' },
      ],
    },
    {
      topicId: 'ca_schemes',
      topicEn: 'Government Schemes & Economy',
      topicBn: 'সরকারি প্রকল্প ও অর্থনীতি',
      topicHi: 'सरकारी योजनाएं और अर्थव्यवस्था',
      items: [
        { qEn: 'Which scheme provides ₹6,000 per year in three installments to eligible farmers?', qBn: 'কোন কেন্দ্রীয় প্রকল্পে কৃষকদের বছরে ৩টি কিস্তিতে ₹৬,০০০ টাকা সহায়তা দেওয়া হয়?', qHi: 'किस योजना के तहत किसानों को प्रतिवर्ष ₹6,000 तीन किस्तों में दिए जाते हैं?', ansEn: 'PM-KISAN Samman Nidhi', ansBn: 'পিএম-কিষাণ সম্মান নিধি', ansHi: 'पीएम-किसान सम्मान निधि' },
        { qEn: 'What is the health insurance cover per family per year under Ayushman Bharat (PM-JAY)?', qBn: 'আয়ুষ্মান ভারত (PM-JAY) প্রকল্পে পরিবার পিছু বার্ষিক কত টাকার স্বাস্থ্য বীমা মেলে?', qHi: 'आयुष्मान भारत (PM-JAY) के तहत प्रति परिवार प्रति वर्ष कितना स्वास्थ्य बीमा मिलता है?', ansEn: '₹5 Lakh', ansBn: '₹৫ লক্ষ টাকা', ansHi: '₹5 लाख' },
        { qEn: 'PM Surya Ghar: Muft Bijli Yojana provides up to how many units of free electricity monthly?', qBn: 'পিএম সূর্য ঘর: মুফত বিজলি যোজনায় মাসে কত ইউনিট পর্যন্ত বিনামূল্যে বিদ্যুৎ মেলে?', qHi: 'पीएम सूर्य घर: मुफ्त बिजली योजना में प्रतिमाह कितने यूनिट मुफ्त बिजली का प्रावधान है?', ansEn: '300 Units per month', ansBn: 'মাসে ৩০০ ইউনিট', ansHi: '300 यूनिट प्रति माह' },
        { qEn: 'PM Vishwakarma Yojana supports which section of society with collateral-free loans & toolkit?', qBn: 'পিএম বিশ্বকর্মা যোজনা কোন শ্রেণির মানুষের সহায়তার জন্য চালু হয়েছে?', qHi: 'पीएम विश्वकर्मा योजना समाज के किस वर्ग के उत्थान के लिए शुरू की गई है?', ansEn: 'Traditional Artisans & Craftspeople', ansBn: 'ঐতিহ্যবাহী কারিগর ও শিল্পী', ansHi: 'पारंपरिक कारीगर और शिल्पकार' },
        { qEn: 'Which West Bengal Government scheme received the UNESCO Public Service Award?', qBn: 'পশ্চিমবঙ্গ সরকারের কোন প্রকল্প রাষ্ট্রপুঞ্জের (UN) জনসেবা পুরস্কার লাভ করেছে?', qHi: 'पश्चिम बंगाल सरकार की किस योजना को संयुक्त राष्ट्र लोक सेवा पुरस्कार मिला?', ansEn: 'Kanyashree Prakalpa', ansBn: 'কন্যাশ্রী প্রকল্প', ansHi: 'कन्याश्री प्रकल्प' },
        { qEn: 'Which West Bengal scheme provides monthly financial assistance directly to women heads of families?', qBn: 'পশ্চিমবঙ্গের কোন প্রকল্পে পরিবারের মহিলাদের মাসিক আর্থিক সহায়তা দেওয়া হয়?', qHi: 'पश्चिम बंगाल की कौन सी योजना महिलाओं को मासिक वित्तीय सहायता प्रदान करती है?', ansEn: 'Lakshmir Bhandar', ansBn: 'লক্ষ্মীর ভাণ্ডার', ansHi: 'लक्ष्मीर भंडार' },
        { qEn: 'Which West Bengal scheme provides health coverage up to ₹5 lakh via a smart card?', qBn: 'পশ্চিমবঙ্গ সরকারের সর্বজনীন স্বাস্থ্য বীমা প্রকল্পটির নাম কী?', qHi: 'पश्चिम बंगाल सरकार की स्वास्थ्य बीमा योजना का नाम क्या है?', ansEn: 'Swasthya Sathi', ansBn: 'স্বাস্থ্য সাথী', ansHi: 'स्वास्थ्य साथी' },
        { qEn: 'In which year was the Reserve Bank of India (RBI) established on 1 April?', qBn: 'ভারতীয় রিজার্ভ ব্যাংক (RBI) কত সালের ১ এপ্রিল প্রতিষ্ঠিত হয়?', qHi: 'भारतीय रिजर्व बैंक (RBI) की स्थापना 1 अप्रैल को किस वर्ष हुई थी?', ansEn: '1935 (Nationalized in 1949)', ansBn: '১৯৩৫ সালে (জাতীয়করণ ১৯৪৯)', ansHi: '1935 में (राष्ट्रीयकरण 1949)' },
        { qEn: 'Where is the headquarters of the Reserve Bank of India (RBI) and SEBI located?', qBn: 'রিজার্ভ ব্যাংক (RBI) এবং সেবি (SEBI)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'भारतीय रिजर्व बैंक (RBI) और सेबी (SEBI) का मुख्यालय कहाँ स्थित है?', ansEn: 'Mumbai', ansBn: 'মুম্বই', ansHi: 'मुंबई' },
        { qEn: 'NABARD (established on 12 July 1982) was set up on the recommendation of which committee?', qBn: '১৯৮২ সালে নাবার্ড (NABARD) কোন কমিটির সুপারিশে গঠিত হয়েছিল?', qHi: 'नाबार्ड (NABARD - 1982) की स्थापना किस समिति की सिफारिश पर हुई थी?', ansEn: 'B. Sivaraman Committee', ansBn: 'বি. শিবরামন কমিটি', ansHi: 'बी. शिवरामन समिति' },
        { qEn: 'Who signs the ₹1 Currency Note in India?', qBn: 'ভারতের ১ টাকার নোটে কার স্বাক্ষর থাকে?', qHi: 'भारत में ₹1 के करेंसी नोट पर किसके हस्ताक्षर होते हैं?', ansEn: 'Finance Secretary of India', ansBn: 'ভারতের অর্থসচিব (Finance Secretary)', ansHi: 'वित्त सचिव (Finance Secretary)' },
        { qEn: 'When was Goods and Services Tax (GST) implemented across India?', qBn: 'সারা ভারতে জিএসটি (GST) কবে থেকে কার্যকর হয়?', qHi: 'पूरे भारत में वस्तु एवं सेवा कर (GST) कब से लागू हुआ?', ansEn: '1 July 2017', ansBn: '১ जुलाई ২০১৭', ansHi: '1 जुलाई 2017' },
        { qEn: 'Who is the ex-officio Chairman of the GST Council (Article 279A)?', qBn: 'জিএসটি কাউন্সিলের (ধারা ২৭৯এ) সভাপতি কে হন?', qHi: 'जीएसटी परिषद (अनुच्छेद 279A) का पदेन अध्यक्ष कौन होता है?', ansEn: 'Union Finance Minister', ansBn: 'কেন্দ্রীয় অর্থমন্ত্রী', ansHi: 'केंद्रीय वित्त मंत्री' },
        { qEn: 'PM Ujjwala Yojana (launched in 2016 from Ballia) provides what to BPL households?', qBn: 'প্রধানমন্ত্রী উজ্জ্বলা যোজনায় দরিদ্র পরিবারগুলিকে কী প্রদান করা হয়?', qHi: 'प्रधानमंत्री उज्ज्वला योजना के तहत गरीब परिवारों को क्या प्रदान किया जाता है?', ansEn: 'Free LPG Cooking Gas Connections', ansBn: 'বিনামূল্যে এলপিজি (LPG) গ্যাস সংযোগ', ansHi: 'मुफ्त एलपीजी (LPG) गैस कनेक्शन' },
        { qEn: 'Jal Jeevan Mission aims to provide safe piped drinking water (Har Ghar Jal) to every rural home.', qBn: '"হর ঘর জল" লক্ষ্যমাত্রা কোন কেন্দ্রীয় মিশনের অন্তর্গত?', qHi: 'प्रत्येक ग्रामीण घर में नल से जल पहुँचाना किस मिशन का लक्ष्य है?', ansEn: 'Jal Jeevan Mission', ansBn: 'জল জীবন মিশন', ansHi: 'जल जीवन मिशन' },
        { qEn: 'Sukanya Samriddhi Yojana is a small savings scheme launched under which campaign?', qBn: 'সুকন্যা সমৃদ্ধি যোজনা কোন অভিযানের অংশ হিসেবে চালু হয়েছিল?', qHi: 'सुकन्या समृद्धि योजना किस अभियान के अंतर्गत शुरू की गई थी?', ansEn: 'Beti Bachao, Beti Padhao', ansBn: 'বেটি বাঁচাও, বেটি পড়াও', ansHi: 'बेटी बचाओ, बेटी पढ़ाओ' },
        { qEn: 'What does UPI (developed by NPCI) stand for in digital banking?', qBn: 'ডিজিটাল লেনদেনে ব্যবহৃত UPI-এর সম্পূর্ণ নাম কী?', qHi: 'डिजिटल भुगतान में प्रयुक्त UPI का पूर्ण रूप क्या है?', ansEn: 'Unified Payments Interface', ansBn: 'ইউনিফায়েড পেমেন্টস ইন্টারফেস', ansHi: 'यूनिफाइड पेमेंट्स इंटरफेस' },
        { qEn: 'MGNREGA guarantees how many days of wage employment in a financial year to rural households?', qBn: 'মনরেগা (MGNREGA) আইনে গ্রামীণ পরিবারকে বছরে কত দিনের কাজের নিশ্চয়তা দেওয়া হয়?', qHi: 'मनरेगा (MGNREGA) के तहत ग्रामीण परिवारों को वर्ष में कितने दिनों के रोजगार की गारंटी है?', ansEn: '100 Days', ansBn: '১০০ দিন', ansHi: '100 दिन' },
        { qEn: 'In which Five-Year Plan was the "Garibi Hatao" slogan introduced?', qBn: 'কোন পঞ্চবার্ষিকী পরিকল্পনায় "গরিবী হঠাও" স্লোগানটি দেওয়া হয়েছিল?', qHi: '"गरीबी हटाओ" का नारा किस पंचवर्षीय योजना में दिया गया था?', ansEn: 'Fifth Five-Year Plan', ansBn: 'পঞ্চম পঞ্চবার্ষিকী পরিকল্পনা', ansHi: 'पाँचवीं पंचवर्षीय योजना' },
        { qEn: 'On whose Mahalanobis Model was the Second Five-Year Plan (1956–61) based?', qBn: 'দ্বিতীয় পঞ্চবার্ষিকী পরিকল্পনা (১৯৫৬-৬১) কার মডেলের ওপর ভিত্তি করে রচিত হয়?', qHi: 'द्वितीय पंचवर्षीय योजना (1956–61) किसके मॉडल पर आधारित थी?', ansEn: 'P.C. Mahalanobis', ansBn: 'প্রশান্তচন্দ্র মহলানবিশ', ansHi: 'पी. सी. महालनोबिस' },
      ],
    },
    {
      topicId: 'ca_summits',
      topicEn: 'International Summits & Defense',
      topicBn: 'আন্তর্জাতিক সম্মেলন ও প্রতিরক্ষা',
      topicHi: 'अंतर्राष्ट्रीय शिखर सम्मेलन और रक्षा',
      items: [
        { qEn: 'Which regional organization became a permanent member of the G20 at the New Delhi Summit?', qBn: 'নয়াদিল্লি জি-২০ (G20) সম্মেলনে কোন সংস্থা জি-২০ এর স্থায়ী সদস্যপদ লাভ করে?', qHi: 'नई दिल्ली जी-20 शिखर सम्मेलन में किस संगठन को स्थायी सदस्य बनाया गया?', ansEn: 'African Union (AU)', ansBn: 'আফ্রিকান ইউনিয়ন (AU)', ansHi: 'अफ्रीकी संघ (African Union)' },
        { qEn: 'What was the theme of India’s G20 Presidency?', qBn: 'ভারতের জি-২০ (G20) সভাপতিত্বের মূল থিম কী ছিল?', qHi: 'भारत की जी-20 अध्यक्षता का मुख्य विषय (Theme) क्या था?', ansEn: 'Vasudhaiva Kutumbakam (One Earth, One Family, One Future)', ansBn: 'বসুধৈব কুটুম্বকম', ansHi: 'वसुधैव कुटुम्बकम्' },
        { qEn: 'Which four countries form the QUAD (Quadrilateral Security Dialogue)?', qBn: 'কোয়াড (QUAD) গোষ্ঠীর চারটি সদস্য দেশ কোনগুলি?', qHi: 'क्वाड (QUAD) समूह में कौन से चार देश शामिल हैं?', ansEn: 'India, USA, Japan & Australia', ansBn: 'ভারত, আমেরিকা, জাপান ও অস্ট্রেলিয়া', ansHi: 'भारत, अमेरिका, जापान और ऑस्ट्रेलिया' },
        { qEn: 'Where is the headquarters of the New Development Bank (BRICS Bank) located?', qBn: 'ব্রিকস ব্যাংক বা নিউ ডেভেলপমেন্ট ব্যাংকের (NDB) সদর দপ্তর কোথায়?', qHi: 'न्यू डेवलपमेंट बैंक (BRICS बैंक) का मुख्यालय कहाँ स्थित है?', ansEn: 'Shanghai (China)', ansBn: 'সাংহাই (চিন)', ansHi: 'शंघाई (चीन)' },
        { qEn: 'Where is the permanent secretariat of SAARC located?', qBn: 'সার্ক (SAARC)-এর সদর দপ্তর কোথায় অবস্থিত?', qHi: 'दक्षेस (SAARC) का सचिवालय कहाँ स्थित है?', ansEn: 'Kathmandu (Nepal)', ansBn: 'কাঠমান্ডু (নেপাল)', ansHi: 'काठमांडू (नेपाल)' },
        { qEn: 'Where is the headquarters of BIMSTEC located?', qBn: 'বিমসটেক (BIMSTEC)-এর স্থায়ী সদর দপ্তর কোথায় অবস্থিত?', qHi: 'बिमस्टेक (BIMSTEC) का मुख्यालय कहाँ स्थित है?', ansEn: 'Dhaka (Bangladesh)', ansBn: 'ঢাকা (বাংলাদেশ)', ansHi: 'ढाका (बांग्लादेश)' },
        { qEn: 'Where is the headquarters of ASEAN located?', qBn: 'আসিয়ান (ASEAN)-এর সদর দপ্তর কোথায় অবস্থিত?', qHi: 'आसियान (ASEAN) का मुख्यालय कहाँ स्थित है?', ansEn: 'Jakarta (Indonesia)', ansBn: 'জাকার্তা (ইন্দোনেশিয়া)', ansHi: 'जकार्ता (इंडोनेशिया)' },
        { qEn: '"Surya Kiran" is a joint military exercise between India and which neighboring country?', qBn: '"সূর্য কিরণ" ভারত ও কোন প্রতিবেশী দেশের মধ্যে যৌথ সামরিক মহড়া?', qHi: '"सूर्य किरण" भारत और किस पड़ोसी देश के बीच संयुक्त सैन्य अभ्यास है?', ansEn: 'Nepal', ansBn: 'নেপাল', ansHi: 'नेपाल' },
        { qEn: '"Sampriti" is a joint military exercise between India and which country?', qBn: '"সম্প্রীতি" ভারত ও কোন দেশের মধ্যে যৌথ সামরিক মহড়া?', qHi: '"संप्रति" भारत और किस देश के बीच संयुक्त सैन्य अभ्यास है?', ansEn: 'Bangladesh', ansBn: 'বাংলাদেশ', ansHi: 'बांग्लादेश' },
        { qEn: '"Mitra Shakti" and "SLINEX" are joint defense exercises between India and?', qBn: '"মিত্র শক্তি" ও "স্লিনেক্স" ভারত ও কোন দেশের যৌথ মহড়া?', qHi: '"मित्र शक्ति" और "स्लीनेक्स" भारत और किस देश के बीच युद्धाभ्यास हैं?', ansEn: 'Sri Lanka', ansBn: 'শ্রীলঙ্কা', ansHi: 'श्रीलंका' },
        { qEn: '"Varuna", "Garuda", and "Shakti" are bilateral defense exercises between India and?', qBn: '"বরুণ", "গরুড়" ও "শক্তি" ভারত ও কোন দেশের যৌথ মহড়া?', qHi: '"वरुण", "गरुड़" और "शक्ति" भारत और किस देश के बीच सैन्य अभ्यास हैं?', ansEn: 'France', ansBn: 'ফ্রান্স', ansHi: 'फ्रांस' },
        { qEn: '"Yudh Abhyas" and "Vajra Prahar" are military exercises between India and?', qBn: '"যুদ্ধ অভ্যাস" ও "বজ্র প্রহার" ভারত ও কোন দেশের সামরিক মহড়া?', qHi: '"युद्ध अभ्यास" और "वज्र प्रहार" भारत और किस देश के बीच होते हैं?', ansEn: 'United States (USA)', ansBn: 'মার্কিন যুক্তরাষ্ট্র (USA)', ansHi: 'संयुक्त राज्य अमेरिका (USA)' },
        { qEn: '"Dharma Guardian" and "JIMEX" are defense exercises between India and?', qBn: '"ধর্ম গার্ডিয়ান" ও "জিমেক্স" ভারত ও কোন দেশের মধ্যে অনুষ্ঠিত হয়?', qHi: '"धर्म गार्जियन" और "जिमेक्स" भारत और किस देश के बीच सैन्य अभ्यास हैं?', ansEn: 'Japan', ansBn: 'জাপান', ansHi: 'जापान' },
        { qEn: '"Indra" is a tri-services joint military exercise between India and which country?', qBn: '"ইন্দ্র" (INDRA) ভারত ও কোন দেশের যৌথ সামরিক মহড়া?', qHi: '"इंद्र" (INDRA) भारत और किस देश के बीच संयुक्त सैन्य अभ्यास है?', ansEn: 'Russia', ansBn: 'রাশিয়া', ansHi: 'रूस' },
        { qEn: 'On which date is Indian Army Day celebrated every year?', qBn: 'প্রতি বছর কোন দিনটিতে "ভারতীয় সেনা দিবস" (Army Day) পালিত হয়?', qHi: 'प्रतिवर्ष "भारतीय थल सेना दिवस" (Army Day) कब मनाया जाता है?', ansEn: '15 January', ansBn: '১৫ জানুয়ারি', ansHi: '15 जनवरी' },
        { qEn: 'On which date is Indian Air Force Day celebrated every year?', qBn: 'প্রতি বছর "ভারতীয় বায়ুসেনা দিবস" (Air Force Day) কবে পালিত হয়?', qHi: 'प्रतिवर्ष "भारतीय वायु सेना दिवस" कब मनाया जाता है?', ansEn: '8 October', ansBn: '৮ অক্টোবর', ansHi: '8 अक्टूबर' },
        { qEn: 'On which date is Indian Navy Day celebrated every year?', qBn: 'প্রতি বছর "ভারতীয় নৌসেনা দিবস" (Navy Day) কবে পালিত হয়?', qHi: 'प्रतिवर्ष "भारतीय नौसेना दिवस" कब मनाया जाता है?', ansEn: '4 December', ansBn: '৪ ডিসেম্বর', ansHi: '4 दिसंबर' },
        { qEn: 'Who was India’s first Chief of Defence Staff (CDS)?', qBn: 'ভারতের প্রথম চিফ অফ ডিফেন্স স্টাফ (CDS) কে ছিলেন?', qHi: 'भारत के प्रथम चीफ ऑफ डिफेंस स्टाफ (CDS) कौन थे?', ansEn: 'General Bipin Rawat', ansBn: 'জেনারেল বিপিন রাওয়াত', ansHi: 'जनरल बिपिन रावत' },
        { qEn: 'Which is the highest wartime gallantry award in India?', qBn: 'যুদ্ধক্ষেত্রে সর্বোচ্চ সাহসিকতার জন্য ভারতের সর্বোচ্চ সামরিক সম্মান কোনটি?', qHi: 'युद्धकाल में दिया जाने वाला भारत का सर्वोच्च वीरता पुरस्कार कौन सा है?', ansEn: 'Param Vir Chakra', ansBn: 'পরমবীর চক্র', ansHi: 'परमवीर चक्र' },
        { qEn: 'Which is the highest peacetime gallantry award in India?', qBn: 'শান্তিকালীন সময়ে ভারতের সর্বোচ্চ সাহসিকতা পুরস্কার কোনটি?', qHi: 'शांतिकाल का सर्वोच्च वीरता पुरस्कार कौन सा है?', ansEn: 'Ashoka Chakra', ansBn: 'অশোক চক্র', ansHi: 'अशोक चक्र' },
      ],
    },
    {
      topicId: 'ca_awards',
      topicEn: 'National & International Honors',
      topicBn: 'জাতীয় ও আন্তর্জাতিক সম্মাননা',
      topicHi: 'राष्ट्रीय और अंतर्राष्ट्रीय सम्मान',
      items: [
        { qEn: 'Which is the highest civilian award of the Republic of India instituted in 1954?', qBn: 'ভারতের সর্বোচ্চ অসামরিক সম্মান কোনটি (১৯৫৪ সালে প্রবর্তিত)?', qHi: 'भारत का सर्वोच्च नागरिक सम्मान (1954 में स्थापित) कौन सा है?', ansEn: 'Bharat Ratna', ansBn: 'ভারতরত্ন', ansHi: 'भारत रत्न' },
        { qEn: 'Which Father of India’s Green Revolution was conferred the Bharat Ratna in 2024?', qBn: '২০২৪ সালে ভারতের সবুজ বিপ্লবের কোন জনককে মরণোত্তর ভারতরত্ন দেওয়া হয়?', qHi: '2024 में हरित क्रांति के किस जनक को भारत रत्न से सम्मानित किया गया?', ansEn: 'Dr. M.S. Swaminathan', ansBn: 'ডঃ এম. এস. স্বামীনাথন', ansHi: 'डॉ. एम. एस. स्वामीनाथन' },
        { qEn: 'Which former Prime Minister and architect of 1991 economic reforms received Bharat Ratna in 2024?', qBn: '১৯৯১ সালের অর্থনৈতিক সংস্কারের রূপকার কোন প্রাক্তন প্রধানমন্ত্রী ২০২৪ সালে ভারতরত্ন পান?', qHi: '2024 में किस पूर्व प्रधानमंत्री को भारत रत्न से सम्मानित किया गया?', ansEn: 'P.V. Narasimha Rao & Chaudhary Charan Singh', ansBn: 'পি. ভি. নরসিমহা রাও ও চৌধুরী চরণ সিং', ansHi: 'पी. वी. नरसिम्हा राव और चौधरी चरण सिंह' },
        { qEn: 'Which is the highest literary award in India given by Bharatiya Jnanpith?', qBn: 'সাহিত্যের ক্ষেত্রে ভারতের সর্বোচ্চ সম্মান কোনটি?', qHi: 'भारतीय साहित्य के क्षेत्र में दिया जाने वाला सर्वोच्च पुरस्कार कौन सा है?', ansEn: 'Jnanpith Award', ansBn: 'জ্ঞানপীঠ পুরস্কার', ansHi: 'ज्ञानपीठ पुरस्कार' },
        { qEn: 'Who was the first Indian and Asian to win the Nobel Prize (1913 for Gitanjali)?', qBn: 'এশিয়া তথা ভারতের প্রথম নোবেলজয়ী ব্যক্তিত্ব কে ছিলেন (১৯১৩)?', qHi: 'नोबेल पुरस्कार जीतने वाले पहले भारतीय और एशियाई कौन थे (1913)?', ansEn: 'Rabindranath Tagore', ansBn: 'রবীন্দ্রনাথ ঠাকুর', ansHi: 'रवींद्रनाथ टैगोर' },
        { qEn: 'Which Indian economist won the Nobel Prize in Economic Sciences in 1998 for Welfare Economics?', qBn: '১৯৯৮ সালে কল্যাণমূলক অর্থনীতির জন্য কোন ভারতীয় অর্থনীতিবিদ নোবেল পান?', qHi: '1998 में कल्याणकारी अर्थशास्त्र के लिए किस भारतीय को नोबेल पुरस्कार मिला?', ansEn: 'Amartya Sen', ansBn: 'অমর্ত্য সেন', ansHi: 'अमर्त्य सेन' },
        { qEn: 'Which Indian-born economist won the 2019 Nobel Prize in Economics with Esther Duflo?', qBn: '২০১৯ সালে দারিদ্র্য দূরীকরণ গবেষণার জন্য কোন বাঙালি অর্থনীতিবিদ নোবেল পান?', qHi: '2019 में अर्थशास्त्र का नोबेल पुरस्कार किस भारतीय मूल के अर्थशास्त्री ने जीता?', ansEn: 'Abhijit Vinayak Banerjee', ansBn: 'অভিজিৎ বিনায়ক বন্দ্যোপাধ্যায়', ansHi: 'अभिजीत विनायक बनर्जी' },
        { qEn: 'Which song from "RRR" won the Academy Award (Oscar) for Best Original Song?', qBn: 'কোন ভারতীয় গানটি অস্কার (Academy Award)-এ সেরা মৌলিক গানের পুরস্কার জিতেছে?', qHi: 'फिल्म "RRR" के किस गीत ने सर्वश्रेष्ठ मूल गीत का ऑस्कर पुरस्कार जीता?', ansEn: 'Naatu Naatu (M.M. Keeravani)', ansBn: 'নাটু নাটু (এম. এম. কীরাবাণী)', ansHi: 'नाटू नाटू (एम. एम. कीरवानी)' },
        { qEn: 'Which Indian documentary short won the Academy Award (Oscar) for Best Documentary Short?', qBn: 'সেরা ডকুমেন্টারি শর্ট ফিল্ম বিভাগে অস্কার জয়ী ভারতীয় তথ্যচিত্র কোনটি?', qHi: 'सर्वश्रेष्ठ डॉक्यूमेंट्री शॉर्ट फिल्म का ऑस्कर जीतने वाली भारतीय फिल्म कौन सी है?', ansEn: 'The Elephant Whisperers', ansBn: 'দ্য এলিফ্যান্ট হুইস্পারার্স', ansHi: 'द एलिफेंट व्हिस्परर्स' },
        { qEn: 'Who was the first Indian to win an Individual Olympic Gold Medal (Beijing 2008)?', qBn: 'অলিম্পিকে ব্যক্তিগত বিভাগে ভারতের প্রথম স্বর্ণপদক জয়ী খেলোয়াড় কে?', qHi: 'ओलंपिक में व्यक्तिगत स्वर्ण पदक जीतने वाले पहले भारतीय कौन थे?', ansEn: 'Abhinav Bindra (10m Air Rifle)', ansBn: 'অভিনব বিন্দ্রা (শুটিং)', ansHi: 'अभिनव बिंद्रा (निशानेबाजी)' },
        { qEn: 'Which award is the highest recognition in Indian Cinema?', qBn: 'ভারতীয় চলচ্চিত্র জগতের সর্বোচ্চ সম্মান কোনটি?', qHi: 'भारतीय सिनेमा जगत का सर्वोच्च सम्मान कौन सा है?', ansEn: 'Dadasaheb Phalke Award', ansBn: 'দাদাসাহেব ফালকে পুরস্কার', ansHi: 'दादासाहेब फाल्के पुरस्कार' },
        { qEn: 'Which award is often referred to as the "Nobel Prize of Asia"?', qBn: 'কোন পুরস্কারকে "এশিয়ার নোবেল পুরস্কার" বলা হয়?', qHi: 'किस पुरस्कार को "एशिया का नोबेल पुरस्कार" कहा जाता है?', ansEn: 'Ramon Magsaysay Award', ansBn: 'র‍্যামন ম্যাগসেসে পুরস্কার', ansHi: 'रेमन मैग्सेसे पुरस्कार' },
        { qEn: 'Who was the first Indian recipient of the Ramon Magsaysay Award in 1958?', qBn: '১৯৫৮ সালে প্রথম ভারতীয় হিসেবে র‍্যামন ম্যাগসেসে পুরস্কার কে পান?', qHi: '1958 में रेमन मैग्सेसे पुरस्कार पाने वाले पहले भारतीय कौन थे?', ansEn: 'Acharya Vinoba Bhave', ansBn: 'আচার্য বিনোবা ভাবে', ansHi: 'आचार्य विनोबा भावे' },
        { qEn: 'Which prize is the highest international honour in Mathematics?', qBn: 'গণিতশাস্ত্রে বিশ্বের সর্বোচ্চ সম্মান কোনটি?', qHi: 'गणित के क्षेत्र में विश्व का सर्वोच्च पुरस्कार कौन सा है?', ansEn: 'Fields Medal & Abel Prize', ansBn: 'ফিল্ডস মেডেল ও আবেল পুরস্কার', ansHi: 'फील्ड्स मेडल और एबेल पुरस्कार' },
        { qEn: 'Pulitzer Prize is awarded for excellence in which field?', qBn: 'পুলিৎজার পুরস্কার (Pulitzer Prize) কোন ক্ষেত্রে প্রদত্ত হয়?', qHi: 'पुलित्जर पुरस्कार (Pulitzer Prize) किस क्षेत्र में दिया जाता है?', ansEn: 'Journalism and Literature', ansBn: 'সাংবাদিকতা ও সাহিত্য', ansHi: 'पत्रकारिता और साहित्य' },
        { qEn: 'Grammy Awards are presented for outstanding achievements in which field?', qBn: 'গ্র্যামি পুরস্কার (Grammy Award) কোন ক্ষেত্রে দেওয়া হয়?', qHi: 'ग्रैमी पुरस्कार (Grammy Award) किस क्षेत्र में दिया जाता है?', ansEn: 'Music Industry', ansBn: 'সংগীত জগৎ (Music)', ansHi: 'संगीत क्षेत्र (Music)' },
        { qEn: 'Shanti Swarup Bhatnagar Prize (Rashtriya Vigyan Puraskar) is given in which field?', qBn: 'শান্তি স্বরূপ ভাটনগর পুরস্কার কোন ক্ষেত্রে অসামান্য অবদানের জন্য দেওয়া হয়?', qHi: 'शांति स्वरूप भटनागर पुरस्कार किस क्षेत्र में दिया जाता है?', ansEn: 'Science and Technology', ansBn: 'বিজ্ঞান ও প্রযুক্তি', ansHi: 'विज्ञान और प्रौद्योगिकी' },
        { qEn: 'Dronacharya Award is given by the Ministry of Youth Affairs & Sports to whom?', qBn: 'দ্রোণাচার্য পুরস্কার কাদের প্রদান করা হয়?', qHi: 'द्रोणाचार्य पुरस्कार किसे प्रदान किया जाता है?', ansEn: 'Outstanding Sports Coaches', ansBn: 'ক্রীড়া প্রশিক্ষক (Sports Coaches)', ansHi: 'उत्कृष्ट खेल प्रशिक्षकों (Coaches) को' },
        { qEn: 'Who was the first woman in India to receive the Bharat Ratna (1971)?', qBn: 'ভারতের প্রথম মহিলা ভারতরত্ন প্রাপক কে ছিলেন (১৯৭১)?', qHi: 'भारत रत्न से सम्मानित होने वाली प्रथम महिला कौन थीं (1971)?', ansEn: 'Indira Gandhi', ansBn: 'ইন্দিরা গান্ধী', ansHi: 'इंदिरा गांधी' },
        { qEn: 'Which five languages were granted "Classical Language" status by the Union Cabinet in Oct 2024?', qBn: '২০২৪ সালের অক্টোবরে বাংলা সহ কোন ভাষাগুলিকে "ধ্রুপদী ভাষা" (Classical Language) মর্যাদা দেওয়া হয়েছে?', qHi: 'अक्टूबर 2024 में बंगाली और मराठी सहित किन भाषाओं को "शास्त्रीय भाषा" का दर्जा मिला?', ansEn: 'Bengali, Marathi, Pali, Prakrit & Assamese', ansBn: 'বাংলা, মারাঠি, পালি, প্রাকৃত ও অসমীয়া', ansHi: 'बंगाली, मराठी, पाली, प्राकृत और असमिया' },
      ],
    },
  ]);
}

export function generateGeneralAwarenessQuestions(): Question[] {
  return buildQuestionsFromTopicList('QM-GK', 'general_awareness', [
    {
      topicId: 'gk_culture',
      topicEn: 'Classical Dances, Festivals & Art',
      topicBn: 'শাস্ত্রীয় নৃত্য, উৎসব ও শিল্পকলা',
      topicHi: 'शास्त्रीय नृत्य, त्योहार और कला',
      items: [
        { qEn: 'Bharatanatyam is the classical dance form of which Indian state?', qBn: 'ভরতনাট্যম ভারতের কোন রাজ্যের শাস্ত্রীয় নৃত্য?', qHi: 'भरतनाट्यम किस राज्य का शास्त्रीय नृत्य है?', ansEn: 'Tamil Nadu', ansBn: 'তামিলনাড়ু', ansHi: 'तमिलनाडु' },
        { qEn: 'Kathakali and Mohiniyattam are the classical dance forms of which state?', qBn: 'কথাকলি ও মোহিনীঅট্টম কোন রাজ্যের শাস্ত্রীয় নৃত্য?', qHi: 'कथकली और मोहिनीअट्टम किस राज्य के शास्त्रीय नृत्य हैं?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Kuchipudi is the classical dance form originating from which state?', qBn: 'কুচিপুড়ি কোন রাজ্যের বিখ্যাত শাস্ত্রীয় নৃত্য?', qHi: 'कुचिपुड़ी किस राज्य का प्रसिद्ध शास्त्रीय नृत्य है?', ansEn: 'Andhra Pradesh', ansBn: 'অন্ধ্রপ্রদেশ', ansHi: 'आंध्र प्रदेश' },
        { qEn: 'Sattriya (introduced by Srimanta Sankardev) is the classical dance of which state?', qBn: 'সত্রিয় (Sattriya) কোন রাজ্যের শাস্ত্রীয় নৃত্য?', qHi: 'सत्रिया (Sattriya) किस राज्य का शास्त्रीय नृत्य है?', ansEn: 'Assam', ansBn: 'আসাম', ansHi: 'असम' },
        { qEn: 'Kathak is the major classical dance form of which state/region?', qBn: 'কত্থক প্রধানত কোন রাজ্যের শাস্ত্রীয় নৃত্য?', qHi: 'कथक मुख्य रूप से किस राज्य का शास्त्रीय नृत्य है?', ansEn: 'Uttar Pradesh (North India)', ansBn: 'উত্তরপ্রদেশ (উত্তর ভারত)', ansHi: 'उत्तर प्रदेश (उत्तर भारत)' },
        { qEn: 'Chhau dance (Purulia Chhau) is a famous folk/semi-classical dance of which state?', qBn: 'ছৌ নাচ (পুরুলিয়া ছৌ) কোন রাজ্যের বিখ্যাত লোকনৃত্য?', qHi: 'छऊ नृत्य (पुरुलिया छऊ) किस राज्य का प्रसिद्ध लोक नृत्य है?', ansEn: 'West Bengal, Jharkhand & Odisha', ansBn: 'পশ্চিমবঙ্গ, ঝাড়খণ্ড ও ওড়িশা', ansHi: 'पश्चिम बंगाल, झारखंड और ओडिशा' },
        { qEn: 'Bihu is the most famous folk dance and harvest festival of which state?', qBn: 'বিহু (Bihu) কোন রাজ্যের প্রধান উৎসব ও লোকনৃত্য?', qHi: 'बिहू (Bihu) किस राज्य का प्रमुख त्योहार और लोक नृत्य है?', ansEn: 'Assam', ansBn: 'আসাম', ansHi: 'असम' },
        { qEn: 'Garba and Dandiya Raas are famous folk dances of which state?', qBn: 'গরবা ও ডান্ডিয়া কোন রাজ্যের বিখ্যাত লোকনৃত্য?', qHi: 'गरबा और डांडिया रास किस राज्य के प्रसिद्ध लोक नृत्य हैं?', ansEn: 'Gujarat', ansBn: 'গুজরাট', ansHi: 'गुजरात' },
        { qEn: 'Ghoomar and Kalbelia are famous folk dances of which state?', qBn: 'ঘুমর ও কালবেলিয়া কোন রাজ্যের লোকনৃত্য?', qHi: 'घूमर और कालबेलिया किस राज्य के प्रसिद्ध लोक नृत्य हैं?', ansEn: 'Rajasthan', ansBn: 'রাজস্থান', ansHi: 'राजस्थान' },
        { qEn: 'Bhangra and Giddha are energetic folk dances of which state?', qBn: 'ভাঙড়া ও গিদ্ধা কোন রাজ্যের জনপ্রিয় লোকনৃত্য?', qHi: 'भांगड़ा और गिद्दा किस राज्य के प्रसिद्ध लोक नृत्य हैं?', ansEn: 'Punjab', ansBn: 'পাঞ্জাব', ansHi: 'पंजाब' },
        { qEn: 'Lavani and Tamasha are traditional folk dances of which state?', qBn: 'লাবণী ও তামাশা কোন রাজ্যের লোকনৃত্য?', qHi: 'लावणी और तमाशा किस राज्य के लोक नृत्य हैं?', ansEn: 'Maharashtra', ansBn: 'মহারাষ্ট্র', ansHi: 'महाराष्ट्र' },
        { qEn: 'Yakshagana is a traditional folk theater and dance form of which state?', qBn: 'যক্ষগান (Yakshagana) কোন রাজ্যের ঐতিহ্যবাহী লোকনাট্য ও নৃত্য?', qHi: 'यक्षगान किस राज्य का पारंपरिक लोक नृत्य-नाट्य है?', ansEn: 'Karnataka', ansBn: 'কর্ণাটক', ansHi: 'कर्नाटक' },
        { qEn: 'Hornbill Festival (Festival of Festivals) is celebrated in which state?', qBn: 'হর্নবিল উৎসব (Hornbill Festival) কোন রাজ্যে পালিত হয়?', qHi: 'हॉर्नबिल महोत्सव किस राज्य में मनाया जाता है?', ansEn: 'Nagaland', ansBn: 'নাগাল্যান্ড', ansHi: 'नागालैंड' },
        { qEn: 'Onam is the grand harvest festival celebrated in which state?', qBn: 'ওনাম (Onam) কোন রাজ্যের প্রধান উৎসব?', qHi: 'ओणम (Onam) किस राज्य का प्रमुख त्योहार है?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Pongal and Jallikattu are celebrated in which state?', qBn: 'পোঙ্গল ও জাল্লিকাট্টু কোন রাজ্যে পালিত হয়?', qHi: 'पोंगल और जल्लीकट्टू किस राज्य में मनाए जाते हैं?', ansEn: 'Tamil Nadu', ansBn: 'তামিলনাড়ু', ansHi: 'तमिलनाडु' },
        { qEn: 'Madhubani (Mithila) Painting is a GI-tagged traditional art form of which state?', qBn: 'মধুবনী চিত্রকলা কোন রাজ্যের ঐতিহ্যবাহী শিল্প?', qHi: 'मधुबनी चित्रकला किस राज्य की प्रसिद्ध लोक कला है?', ansEn: 'Bihar', ansBn: 'বিহার', ansHi: 'बिहार' },
        { qEn: 'Warli Folk Painting belongs to which Indian state?', qBn: 'ওয়ারলি (Warli) চিত্রকলা কোন রাজ্যের আদিবাসী শিল্প?', qHi: 'वारली (Warli) चित्रकला किस राज्य से संबंधित है?', ansEn: 'Maharashtra', ansBn: 'মহারাষ্ট্র', ansHi: 'महाराष्ट्र' },
        { qEn: 'Ustad Bismillah Khan (Bharat Ratna) was a legendary maestro of which instrument?', qBn: 'ভারতরত্ন ওস্তাদ বিসমিল্লাহ খান কোন বাদ্যযন্ত্রের কিংবদন্তি শিল্পী ছিলেন?', qHi: 'उस्ताद बिस्मिल्लाह खान किस वाद्ययंत्र के महान वादक थे?', ansEn: 'Shehnai', ansBn: 'সানাই (Shehnai)', ansHi: 'शहनाई (Shehnai)' },
        { qEn: 'Pandit Ravi Shankar was a world-renowned maestro of which musical instrument?', qBn: 'পণ্ডিত রবিশঙ্কর কোন বাদ্যযন্ত্রের বিশ্ববিখ্যাত শিল্পী ছিলেন?', qHi: 'पंडित रविशंकर किस वाद्ययंत्र के विश्व प्रसिद्ध वादक थे?', ansEn: 'Sitar', ansBn: 'সেতার (Sitar)', ansHi: 'सितार (Sitar)' },
        { qEn: 'Ustad Zakir Hussain and Ustad Allah Rakha are famous maestros of?', qBn: 'ওস্তাদ জাকির হুসেন কোন বাদ্যযন্ত্রের বিখ্যাত শিল্পী?', qHi: 'उस्ताद जाकिर हुसैन किस वाद्ययंत्र से संबंधित हैं?', ansEn: 'Tabla', ansBn: 'তবলা (Tabla)', ansHi: 'तबला (Tabla)' },
      ],
    },
    {
      topicId: 'gk_books',
      topicEn: 'Famous Books & Authors',
      topicBn: 'বিখ্যাত বই ও লেখক',
      topicHi: 'प्रसिद्ध पुस्तकें और लेखक',
      items: [
        { qEn: 'Who wrote the famous book "The Discovery of India"?', qBn: '"The Discovery of India" (ভারত সন্ধানে) গ্রন্থটি কার লেখা?', qHi: '"डिस्कवरी ऑफ इंडिया" (भारत एक खोज) पुस्तक के लेखक कौन हैं?', ansEn: 'Jawaharlal Nehru', ansBn: 'জওহরলাল নেহরু', ansHi: 'जवाहरलाल नेहरू' },
        { qEn: 'Who wrote the autobiography "Wings of Fire"?', qBn: '"Wings of Fire" (অগ্নিপক্ষ) কার আত্মজীবনী?', qHi: '"विंग्स ऑफ फायर" (अग्नि की उड़ान) किसकी आत्मकथा है?', ansEn: 'Dr. A.P.J. Abdul Kalam', ansBn: 'ডঃ এ. পি. জে. আব্দুল কালাম', ansHi: 'डॉ. ए. पी. जे. अब्दुल कलाम' },
        { qEn: 'Who authored "The Story of My Experiments with Truth"?', qBn: '"সত্যের সাথে আমার অভিজ্ঞতা" (My Experiments with Truth) কার আত্মজীবনী?', qHi: '"सत्य के प्रयोग" (My Experiments with Truth) किसकी आत्मकथा है?', ansEn: 'Mahatma Gandhi', ansBn: 'মহাত্মা গান্ধী', ansHi: 'महात्मा गांधी' },
        { qEn: 'Who wrote the novel "Anandamath" which contains India’s National Song "Vande Mataram"?', qBn: '"বন্দে মাতরম" সংগীত সমৃদ্ধ "আনন্দমঠ" উপন্যাসটি কার রচনা?', qHi: '"वंदे मातरम्" गीत वाला प्रसिद्ध उपन्यास "आनंदमठ" किसने लिखा?', ansEn: 'Bankim Chandra Chattopadhyay', ansBn: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', ansHi: 'बंकिम चंद्र चट्टोपाध्याय' },
        { qEn: 'Who wrote "Gora", "Chokher Bali", and India’s National Anthem "Jana Gana Mana"?', qBn: '"গোরা", "চোখের বালি" ও "জনগণমন" কার রচনা?', qHi: '"गोरा", "चोखेर बाली" और राष्ट्रगान "जन गण मन" के रचयिता कौन हैं?', ansEn: 'Rabindranath Tagore', ansBn: 'রবীন্দ্রনাথ ঠাকুর', ansHi: 'रवींद्रनाथ टैगोर' },
        { qEn: 'Who wrote the famous Bengali novels "Pather Panchali" and "Aranyak"?', qBn: '"পথের পাঁচালী" ও "আরণ্যক" উপন্যাসের রচয়িতা কে?', qHi: '"पथेर पांचाली" और "आरण्यक" उपन्यास के लेखक कौन हैं?', ansEn: 'Bibhutibhushan Bandyopadhyay', ansBn: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', ansHi: 'बिभूतिभूषण बंद्योपाध्याय' },
        { qEn: 'Who wrote "Devdas", "Srikanta", and "Pather Dabi"?', qBn: '"দেবদাস", "শ্রীকান্ত" ও "পথের দাবী" কার কালজয়ী রচনা?', qHi: '"देवदास", "श्रीकांत" और "पथेर दाबी" के लेखक कौन हैं?', ansEn: 'Sarat Chandra Chattopadhyay', ansBn: 'শরৎচন্দ্র চট্টোপাধ্যায়', ansHi: 'शरत चंद्र चट्टोपाध्याय' },
        { qEn: 'Who wrote "Abol Tabol" and "HaJaBaRaLa"?', qBn: '"আবোল তাবোল" ও "হযবরল" কার অমর সৃষ্টি?', qHi: 'प्रसिद्ध बांग्ला रचना "आबोल ताबोल" के लेखक कौन हैं?', ansEn: 'Sukumar Ray', ansBn: 'সুকুমার রায়', ansHi: 'सुकुमार राय' },
        { qEn: 'Who won the Booker Prize for the novel "The God of Small Things"?', qBn: '"The God of Small Things" উপন্যাসের জন্য কোন ভারতীয় লেখিকা বুকার পুরস্কার পান?', qHi: '"द गॉड ऑफ स्मॉल थिंग्स" के लिए बुकर पुरस्कार किसने जीता?', ansEn: 'Arundhati Roy', ansBn: 'অরুন্ধতী রায়', ansHi: 'अरुंधति रॉय' },
        { qEn: 'Who wrote the famous novels "Malgudi Days" and "The Guide"?', qBn: '"মালগুডি ডেজ" (Malgudi Days) ও "দ্য গাইড" কার লেখা?', qHi: '"मालगुडी डेज" और "द गाइड" पुस्तक के लेखक कौन हैं?', ansEn: 'R.K. Narayan', ansBn: 'আর. কে. নারায়ণ', ansHi: 'आर. के. नारायण' },
        { qEn: 'Who wrote "Train to Pakistan"?', qBn: 'দেশভাগের পটভূমিতে রচিত "Train to Pakistan" গ্রন্থের লেখক কে?', qHi: '"ट्रेन टू पाकिस्तान" पुस्तक के लेखक कौन हैं?', ansEn: 'Khushwant Singh', ansBn: 'খুশবন্ত সিং', ansHi: 'खुशवंत सिंह' },
        { qEn: 'Who authored the famous Hindi classic "Godan" and "Gaban"?', qBn: 'বিখ্যাত হিন্দি উপন্যাস "গোদান" ও "গবন" কার রচনা?', qHi: 'प्रसिद्ध हिंदी उपन्यास "गोदान" और "गबन" के लेखक कौन हैं?', ansEn: 'Munshi Premchand', ansBn: 'মুন্সি প্রেমচাঁদ', ansHi: 'मुंशी प्रेमचंद' },
        { qEn: 'Who wrote the book "India Wins Freedom"?', qBn: '"India Wins Freedom" গ্রন্থটি কার রচনা?', qHi: '"इंडिया विन्स फ्रीडम" पुस्तक किसने लिखी थी?', ansEn: 'Maulana Abul Kalam Azad', ansBn: 'মৌলানা আবুল কালাম আজাদ', ansHi: 'मौलाना अबुल कलाम आजाद' },
        { qEn: 'Who wrote "The Indian Struggle" (1920–1942)?', qBn: '"The Indian Struggle" গ্রন্থটির রচয়িতা কে?', qHi: '"द इंडियन स्ट्रगल" पुस्तक के लेखक कौन थे?', ansEn: 'Netaji Subhas Chandra Bose', ansBn: 'নেতাজি সুভাষচন্দ্র বসু', ansHi: 'नेताजी सुभाष चंद्र बोस' },
        { qEn: 'Who wrote "Unhappy India"?', qBn: '"Unhappy India" গ্রন্থটির লেখক কে?', qHi: '"अनहैप्पी इंडिया" पुस्तक किसने लिखी थी?', ansEn: 'Lala Lajpat Rai', ansBn: 'লালা লাজপত রায়', ansHi: 'लाला लाजपत राय' },
        { qEn: 'Who wrote "Gita Rahasya" while imprisoned in Mandalay Jail?', qBn: 'মান্দালয় জেলে বন্দি থাকাকালীন "গীতা রহস্য" কে রচনা করেন?', qHi: 'मांडले जेल में "गीता रहस्य" की रचना किसने की थी?', ansEn: 'Bal Gangadhar Tilak', ansBn: 'বাল গঙ্গাধর তিলক', ansHi: 'बाल गंगाधर तिलक' },
        { qEn: 'Who wrote the autobiography "Playing It My Way"?', qBn: '"Playing It My Way" কোন ক্রিকেট কিংবদন্তির আত্মজীবনী?', qHi: '"प्लेइंग इट माई वे" किस क्रिकेट दिग्गज की आत्मकथा है?', ansEn: 'Sachin Tendulkar', ansBn: 'শচীন তেন্ডুলকর', ansHi: 'सचिन तेंदुलकर' },
        { qEn: 'Who wrote "A Century is Not Enough"?', qBn: '"A Century is Not Enough" কার আত্মজীবনী?', qHi: '"ए सेंचुरी इज नॉट इनफ" किसकी आत्मकथा है?', ansEn: 'Sourav Ganguly', ansBn: 'সৌরভ গঙ্গোপাধ্যায়', ansHi: 'सौरव गांगुली' },
        { qEn: 'Who wrote the environmental classic "Silent Spring"?', qBn: 'পরিবেশ আন্দোলনের বিখ্যাত গ্রন্থ "Silent Spring" কার লেখা?', qHi: 'पर्यावरण पर प्रसिद्ध पुस्तक "साइलेंट स्प्रिंग" किसने लिखी?', ansEn: 'Rachel Carson', ansBn: 'র‍্যাচেল কার্সন', ansHi: 'रैचेल कार्सन' },
        { qEn: 'Who wrote "A Brief History of Time"?', qBn: '"A Brief History of Time" বিখ্যাত বিজ্ঞান গ্রন্থটি কার লেখা?', qHi: '"ए ब्रीफ हिस्ट्री ऑफ टाइम" पुस्तक के लेखक कौन हैं?', ansEn: 'Stephen Hawking', ansBn: 'স্টিফেন হকিং', ansHi: 'स्टीफन हॉकिंग' },
      ],
    },
    {
      topicId: 'gk_orgs',
      topicEn: 'World Organizations & HQ',
      topicBn: 'আন্তর্জাতিক সংস্থা ও সদর দপ্তর',
      topicHi: 'विश्व संगठन और मुख्यालय',
      items: [
        { qEn: 'Where is the headquarters of the United Nations (UNO) and UNICEF located?', qBn: 'সম্মিলিত জাতিপুঞ্জ (UNO) এবং ইউনিসেফ (UNICEF)-এর সদর দপ্তর কোথায়?', qHi: 'संयुक्त राष्ट्र संघ (UNO) और यूनिसेफ (UNICEF) का मुख्यालय कहाँ है?', ansEn: 'New York (USA)', ansBn: 'নিউ ইয়র্ক (USA)', ansHi: 'न्यूयॉर्क (USA)' },
        { qEn: 'Where is the headquarters of the World Health Organization (WHO) and WTO located?', qBn: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO) এবং বিশ্ব বাণিজ্য সংস্থা (WTO)-র সদর দপ্তর কোথায়?', qHi: 'विश्व स्वास्थ्य संगठन (WHO) और विश्व व्यापार संगठन (WTO) का मुख्यालय कहाँ है?', ansEn: 'Geneva (Switzerland)', ansBn: 'জেনেভা (সুইজারল্যান্ড)', ansHi: 'जिनेवा (स्विट्जरलैंड)' },
        { qEn: 'Where is the headquarters of UNESCO located?', qBn: 'ইউনেস্কো (UNESCO)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'यूनेस्को (UNESCO) का मुख्यालय कहाँ स्थित है?', ansEn: 'Paris (France)', ansBn: 'প্যারিস (ফ্রান্স)', ansHi: 'पेरिस (फ्रांस)' },
        { qEn: 'Where are the headquarters of the World Bank and International Monetary Fund (IMF)?', qBn: 'বিশ্ব ব্যাংক (World Bank) এবং আইএমএফ (IMF)-এর সদর দপ্তর কোথায়?', qHi: 'विश्व बैंक (World Bank) और अंतरराष्ट्रीय मुद्रा कोष (IMF) का मुख्यालय कहाँ है?', ansEn: 'Washington, D.C. (USA)', ansBn: 'ওয়াশিংটন ডি.সি. (USA)', ansHi: 'वाशिंगटन डी.सी. (USA)' },
        { qEn: 'Where is the International Court of Justice (ICJ) located?', qBn: 'আন্তর্জাতিক বিচারালয় (International Court of Justice) কোথায় অবস্থিত?', qHi: 'अंतर्राष्ट्रीय न्यायालय (ICJ) का मुख्यालय कहाँ स्थित है?', ansEn: 'The Hague (Netherlands)', ansBn: 'দ্য হেগ (নেদারল্যান্ডস)', ansHi: 'द हेग (नीदरलैंड)' },
        { qEn: 'Where is the headquarters of the Food and Agriculture Organization (FAO)?', qBn: 'খাদ্য ও কৃষি সংস্থা (FAO)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'खाद्य एवं कृषि संगठन (FAO) का मुख्यालय कहाँ है?', ansEn: 'Rome (Italy)', ansBn: 'রোম (ইতালি)', ansHi: 'रोम (इटली)' },
        { qEn: 'Where is the headquarters of the International Labour Organization (ILO)?', qBn: 'আন্তর্জাতিক শ্রম সংস্থা (ILO)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'अंतर्राष्ट्रीय श्रम संगठन (ILO) का मुख्यालय कहाँ स्थित है?', ansEn: 'Geneva (Switzerland)', ansBn: 'জেনেভা (সুইজারল্যান্ড)', ansHi: 'जिनेवा (स्विट्जरलैंड)' },
        { qEn: 'Where is the headquarters of the International Solar Alliance (ISA) in India?', qBn: 'ভারতে আন্তর্জাতিক সৌর জোট (International Solar Alliance)-এর সদর দপ্তর কোথায়?', qHi: 'अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय भारत में कहाँ स्थित है?', ansEn: 'Gurugram (Haryana)', ansBn: 'গুরুগ্রাম (হরিয়ানা)', ansHi: 'गुरुग्राम (हरियाणा)' },
        { qEn: 'Where is the headquarters of the Asian Development Bank (ADB)?', qBn: 'এশিয়ান ডেভেলপমেন্ট ব্যাংক (ADB)-এর সদর দপ্তর কোথায় অবস্থিত?', qHi: 'एशियाई विकास बैंक (ADB) का मुख्यालय कहाँ स्थित है?', ansEn: 'Mandaluyong, Manila (Philippines)', ansBn: 'ম্যানিলা (ফিলিপিন্স)', ansHi: 'मनीला (फिलीपींस)' },
        { qEn: 'Where is the headquarters of NATO (North Atlantic Treaty Organization)?', qBn: 'ন্যাটো (NATO)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'नाटो (NATO) का मुख्यालय कहाँ स्थित है?', ansEn: 'Brussels (Belgium)', ansBn: 'ব্রাসেলস (বেলজিয়াম)', ansHi: 'ब्रुसेल्स (बेल्जियम)' },
        { qEn: 'Where is the headquarters of the International Atomic Energy Agency (IAEA) and OPEC?', qBn: 'আন্তর্জাতিক পরমাণু শক্তি সংস্থা (IAEA) ও ওপেক (OPEC)-এর সদর দপ্তর কোথায়?', qHi: 'अंतर्राष्ट्रीय परमाणु ऊर्जा एजेंसी (IAEA) और ओपेक का मुख्यालय कहाँ है?', ansEn: 'Vienna (Austria)', ansBn: 'ভিয়েনা (অস্ট্রিয়া)', ansHi: 'वियना (ऑस्ट्रिया)' },
        { qEn: 'Where is the headquarters of the International Olympic Committee (IOC)?', qBn: 'আন্তর্জাতিক অলিম্পিক কমিটির (IOC) সদর দপ্তর কোথায় অবস্থিত?', qHi: 'अंतर्राष्ट्रीय ओलंपिक समिति (IOC) का मुख्यालय कहाँ है?', ansEn: 'Lausanne (Switzerland)', ansBn: 'লুসান (সুইজারল্যান্ড)', ansHi: 'लुसाने (स्विट्जरलैंड)' },
        { qEn: 'Where is the headquarters of the International Cricket Council (ICC)?', qBn: 'আইসিসি (ICC)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'अंतर्राष्ट्रीय क्रिकेट परिषद (ICC) का मुख्यालय कहाँ स्थित है?', ansEn: 'Dubai (UAE)', ansBn: 'দুবাই (সংযুক্ত আরব আমিরশাহী)', ansHi: 'दुबई (संयुक्त अरब अमीरात)' },
        { qEn: 'Where is the headquarters of FIFA (world football governing body)?', qBn: 'ফিফা (FIFA)-র সদর দপ্তর কোথায় অবস্থিত?', qHi: 'फीफा (FIFA) का मुख्यालय कहाँ स्थित है?', ansEn: 'Zurich (Switzerland)', ansBn: 'জুরিখ (সুইজারল্যান্ড)', ansHi: 'ज्यूरिख (स्विट्जरलैंड)' },
        { qEn: 'Where is the headquarters of the United Nations Environment Programme (UNEP)?', qBn: 'রাষ্ট্রপুঞ্জের পরিবেশ কর্মসূচি (UNEP)-র সদর দপ্তর কোথায়?', qHi: 'संयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP) का मुख्यालय कहाँ है?', ansEn: 'Nairobi (Kenya)', ansBn: 'নাইরোবি (কেনিয়া)', ansHi: 'नैरोबी (केन्या)' },
        { qEn: 'Where is the headquarters of Amnesty International and Commonwealth of Nations?', qBn: 'অ্যামনেস্টি ইন্টারন্যাশনাল ও কমনওয়েলথের সদর দপ্তর কোথায়?', qHi: 'एमनेस्टी इंटरनेशनल और राष्ट्रमंडल का मुख्यालय कहाँ है?', ansEn: 'London (United Kingdom)', ansBn: 'লন্ডন (যুক্তরাজ্য)', ansHi: 'लंदन (यूनाइटेड किंगडम)' },
        { qEn: 'Where is the headquarters of INTERPOL (International Criminal Police Organization)?', qBn: 'ইন্টারপোল (INTERPOL)-এর সদর দপ্তর কোথায় অবস্থিত?', qHi: 'इंटरपोल (INTERPOL) का मुख्यालय कहाँ स्थित है?', ansEn: 'Lyon (France)', ansBn: 'লিওঁ (ফ্রান্স)', ansHi: 'ल्यों (फ्रांस)' },
        { qEn: 'How many permanent members with Veto Power are in the UN Security Council (UNSC)?', qBn: 'রাষ্ট্রপুঞ্জের নিরাপত্তা পরিষদে ভেটো ক্ষমতাসম্পন্ন স্থায়ী সদস্য দেশ কয়টি?', qHi: 'संयुक्त राष्ट्र सुरक्षा परिषद में वीटो शक्ति वाले स्थायी सदस्य कितने हैं?', ansEn: '5 (USA, UK, France, Russia, China)', ansBn: '৫টি (আমেরিকা, ব্রিটেন, ফ্রান্স, রাশিয়া, চিন)', ansHi: '5 (अमेरिका, ब्रिटेन, फ्रांस, रूस, चीन)' },
        { qEn: 'Where is the headquarters of the Botanical Survey of India (BSI) & Zoological Survey of India (ZSI)?', qBn: 'বোটানিক্যাল সার্ভে অফ ইন্ডিয়া ও জুলজিক্যাল সার্ভে অফ ইন্ডিয়ার সদর দপ্তর কোথায়?', qHi: 'भारतीय वनस्पति सर्वेक्षण (BSI) और प्राणी सर्वेक्षण (ZSI) का मुख्यालय कहाँ है?', ansEn: 'Kolkata', ansBn: 'কলকাতা', ansHi: 'कोलकाता' },
        { qEn: 'Where is the Forest Research Institute (FRI) of India located?', qBn: 'ভারতের কেন্দ্রীয় বন গবেষণা ইনস্টিটিউট (Forest Research Institute) কোথায় অবস্থিত?', qHi: 'भारतीय वन अनुसंधान संस्थान (FRI) कहाँ स्थित है?', ansEn: 'Dehradun (Uttarakhand)', ansBn: 'দেরাদুন (উত্তরাখণ্ড)', ansHi: 'देहरादून (उत्तराखंड)' },
      ],
    },
    {
      topicId: 'gk_days',
      topicEn: 'Important Days & Currencies',
      topicBn: 'গুরুত্বপূর্ণ দিবস ও মুদ্রা',
      topicHi: 'महत्वपूर्ण दिवस और मुद्राएँ',
      items: [
        { qEn: 'On which date is National Science Day celebrated in India to mark the Raman Effect?', qBn: 'রমন এফেক্ট আবিষ্কারের স্মরণে ভারতে "জাতীয় বিজ্ঞান দিবস" কবে পালিত হয়?', qHi: 'रमन प्रभाव की खोज के उपलक्ष्य में "राष्ट्रीय विज्ञान दिवस" कब मनाया जाता है?', ansEn: '28 February', ansBn: '২৮ ফেব্রুয়ারি', ansHi: '28 फरवरी' },
        { qEn: 'On which date is National Youth Day celebrated on Swami Vivekananda’s birthday?', qBn: 'স্বামী বিবেকানন্দের জন্মদিন উপলক্ষে "জাতীয় যুব দিবস" কবে পালিত হয়?', qHi: 'स्वामी विवेकानंद की जयंती पर "राष्ट्रीय युवा दिवस" कब मनाया जाता है?', ansEn: '12 January', ansBn: '১২ জানুয়ারি', ansHi: '12 जनवरी' },
        { qEn: 'On which date is Parakram Diwas celebrated on Netaji Subhas Chandra Bose’s birth anniversary?', qBn: 'নেতাজি সুভাষচন্দ্র বসুর জন্মদিন কোন দিনটিতে "পরাক্রম দিবস" হিসেবে পালিত হয়?', qHi: 'नेताजी सुभाष चंद्र बोस की जयंती पर "पराक्रम दिवस" कब मनाया जाता है?', ansEn: '23 January', ansBn: '২৩ জানুয়ারি', ansHi: '23 जनवरी' },
        { qEn: 'On which date is National Voters’ Day celebrated in India?', qBn: 'ভারতে "জাতীয় ভোটার দিবস" (National Voters’ Day) কবে পালিত হয়?', qHi: 'भारत में "राष्ट्रीय मतदाता दिवस" कब मनाया जाता है?', ansEn: '25 January', ansBn: '২৫ জানুয়ারি', ansHi: '25 जनवरी' },
        { qEn: 'On which date is World Wetlands Day celebrated every year?', qBn: 'প্রতি বছর "বিশ্ব জলাভূমি দিবস" (World Wetlands Day) কবে পালিত হয়?', qHi: '"विश्व आर्द्रभूमि दिवस" (World Wetlands Day) कब मनाया जाता है?', ansEn: '2 February', ansBn: '২ ফেব্রুয়ারি', ansHi: '2 फरवरी' },
        { qEn: 'On which date is International Women’s Day celebrated worldwide?', qBn: '"আন্তর্জাতিক নারী দিবস" কবে পালিত হয়?', qHi: '"अंतर्राष्ट्रीय महिला दिवस" कब मनाया जाता है?', ansEn: '8 March', ansBn: '৮ মার্চ', ansHi: '8 मार्च' },
        { qEn: 'On which date is World Water Day celebrated?', qBn: '"বিশ্ব জল দিবস" (World Water Day) কবে পালিত হয়?', qHi: '"विश्व जल दिवस" (World Water Day) कब मनाया जाता है?', ansEn: '22 March', ansBn: '২২ মার্চ', ansHi: '22 मार्च' },
        { qEn: 'On which date is World Health Day celebrated (marking WHO’s founding in 1948)?', qBn: '"বিশ্ব স্বাস্থ্য দিবস" (World Health Day) কবে পালিত হয়?', qHi: '"विश्व स्वास्थ्य दिवस" (World Health Day) कब मनाया जाता है?', ansEn: '7 April', ansBn: '৭ এপ্রিল', ansHi: '7 अप्रैल' },
        { qEn: 'On which date is World Earth Day celebrated?', qBn: '"বিশ্ব ধরিত্রী দিবস" (Earth Day) কবে পালিত হয়?', qHi: '"विश्व पृथ्वी दिवस" (Earth Day) कब मनाया जाता है?', ansEn: '22 April', ansBn: '২২ এপ্রিল', ansHi: '22 अप्रैल' },
        { qEn: 'On which date is World Environment Day celebrated?', qBn: '"বিশ্ব পরিবেশ দিবস" (World Environment Day) কবে পালিত হয়?', qHi: '"विश्व पर्यावरण दिवस" (World Environment Day) कब मनाया जाता है?', ansEn: '5 June', ansBn: '৫ জুন', ansHi: '5 जून' },
        { qEn: 'On which date is International Day of Yoga celebrated worldwide?', qBn: '"আন্তর্জাতিক যোগ দিবস" (International Yoga Day) কবে পালিত হয়?', qHi: '"अंतर्राष्ट्रीय योग दिवस" कब मनाया जाता है?', ansEn: '21 June', ansBn: '২১ জুন', ansHi: '21 जून' },
        { qEn: 'On which date is National Doctors’ Day (Dr. Bidhan Chandra Roy’s birth/death anniversary) celebrated?', qBn: 'ডঃ বিধানচন্দ্র রায়ের স্মরণে ভারতে "জাতীয় চিকিৎসক দিবস" কবে পালিত হয়?', qHi: 'डॉ. विधान चंद्र रॉय की स्मृति में "राष्ट्रीय चिकित्सक दिवस" कब मनाया जाता है?', ansEn: '1 July', ansBn: '১ জুলাই', ansHi: '1 जुलाई' },
        { qEn: 'On which date is World Population Day observed?', qBn: '"বিশ্ব জনসংখ্যা দিবস" কবে পালিত হয়?', qHi: '"विश्व जनसंख्या दिवस" कब मनाया जाता है?', ansEn: '11 July', ansBn: '১১ জুলাই', ansHi: '11 जुलाई' },
        { qEn: 'On which date is Teachers’ Day celebrated in India (Dr. Sarvepalli Radhakrishnan’s birthday)?', qBn: 'ডঃ সর্বপল্লী রাধাকৃষ্ণণের জন্মদিনে ভারতে "শিক্ষক দিবস" কবে পালিত হয়?', qHi: 'डॉ. सर्वपल्ली राधाकृष्णन के जन्मदिन पर "शिक्षक दिवस" कब मनाया जाता है?', ansEn: '5 September', ansBn: '৫ সেপ্টেম্বর', ansHi: '5 सितंबर' },
        { qEn: 'On which date is World Ozone Day (preservation of Ozone Layer) celebrated?', qBn: '"বিশ্ব ওজোন স্তর সুরক্ষা দিবস" কবে পালিত হয়?', qHi: '"विश्व ओजोन दिवस" कब मनाया जाता है?', ansEn: '16 September', ansBn: '১৬ সেপ্টেম্বর', ansHi: '16 सितंबर' },
        { qEn: 'On which date is United Nations Day celebrated (marking 1945 UN Charter)?', qBn: '"সম্মিলিত জাতিপুঞ্জ দিবস" (UN Day) কবে পালিত হয়?', qHi: '"संयुक्त राष्ट्र दिवस" (UN Day) कब मनाया जाता है?', ansEn: '24 October', ansBn: '২৪ অক্টোবর', ansHi: '24 अक्टूबर' },
        { qEn: 'On which date is National Unity Day (Rashtriya Ekta Diwas - Sardar Patel’s birthday) celebrated?', qBn: 'সর্দার বল্লভভাই প্যাটেলের জন্মদিনে "জাতীয় একতা দিবস" কবে পালিত হয়?', qHi: 'सरदार पटेल की जयंती पर "राष्ट्रीय एकता दिवस" कब मनाया जाता है?', ansEn: '31 October', ansBn: '৩১ অক্টোবর', ansHi: '31 अक्टूबर' },
        { qEn: 'On which date is Constitution Day (Samvidhan Divas) celebrated in India?', qBn: 'ভারতে "সংবিধান দিবস" (Constitution Day) কবে পালিত হয়?', qHi: 'भारत में "संविधान दिवस" कब मनाया जाता है?', ansEn: '26 November', ansBn: '২৬ নভেম্বর', ansHi: '26 नवंबर' },
        { qEn: 'On which date is Human Rights Day celebrated globally?', qBn: '"বিশ্ব মানবাধিকার দিবস" (Human Rights Day) কবে পালিত হয়?', qHi: '"अंतर्राष्ट्रीय मानवाधिकार दिवस" कब मनाया जाता है?', ansEn: '10 December', ansBn: '১০ ডিসেম্বর', ansHi: '10 दिसंबर' },
        { qEn: 'On which date is National Mathematics Day celebrated on Srinivasa Ramanujan’s birthday?', qBn: 'শ্রীনিবাস রামানুজনের জন্মদিনে "জাতীয় গণিত দিবস" কবে পালিত হয়?', qHi: 'श्रीनिवास रामानुजन की जयंती पर "राष्ट्रीय गणित दिवस" कब मनाया जाता है?', ansEn: '22 December', ansBn: '২২ ডিসেম্বর', ansHi: '22 दिसंबर' },
      ],
    },
    {
      topicId: 'gk_firsts',
      topicEn: 'First in India & Superlatives',
      topicBn: 'ভারতে প্রথম ও বৃহত্তম-ক্ষুদ্রতম',
      topicHi: 'भारत में प्रथम और सर्वोच्च',
      items: [
        { qEn: 'Who was the first President of the Republic of India?', qBn: 'স্বাধীন ভারতের প্রথম রাষ্ট্রপতি কে ছিলেন?', qHi: 'स्वतंत्र भारत के प्रथम राष्ट्रपति कौन थे?', ansEn: 'Dr. Rajendra Prasad', ansBn: 'ডঃ রাজেন্দ্র প্রসাদ', ansHi: 'डॉ. राजेंद्र प्रसाद' },
        { qEn: 'Who was the first Vice-President of India?', qBn: 'ভারতের প্রথম উপরাষ্ট্রপতি কে ছিলেন?', qHi: 'भारत के प्रथम उपराष्ट्रपति कौन थे?', ansEn: 'Dr. Sarvepalli Radhakrishnan', ansBn: 'ডঃ সর্বপল্লী রাধাকৃষ্ণণ', ansHi: 'डॉ. सर्वपल्ली राधाकृष्णन' },
        { qEn: 'Who was the first Deputy Prime Minister and Home Minister of India?', qBn: 'স্বাধীন ভারতের প্রথম উপপ্রধানমন্ত্রী ও স্বরাষ্ট্রমন্ত্রী কে ছিলেন?', qHi: 'स्वतंत्र भारत के प्रथम उपप्रधानमंत्री और गृह मंत्री कौन थे?', ansEn: 'Sardar Vallabhbhai Patel', ansBn: 'সর্দার বল্লভভাই প্যাটেল', ansHi: 'सरदार वल्लभभाई पटेल' },
        { qEn: 'Who was the first Education Minister of independent India?', qBn: 'স্বাধীন ভারতের প্রথম শিক্ষামন্ত্রী কে ছিলেন?', qHi: 'स्वतंत्र भारत के प्रथम शिक्षा मंत्री कौन थे?', ansEn: 'Maulana Abul Kalam Azad', ansBn: 'মৌলানা আবুল কালাম আজাদ', ansHi: 'मौलाना अबुल कलाम आजाद' },
        { qEn: 'Who was the first Indian to travel into Space (aboard Soyuz T-11 in 1984)?', qBn: 'মহাকাশে গমনকারী প্রথম ভারতীয় কে ছিলেন (১৯৮৪)?', qHi: 'अंतरिक्ष में जाने वाले प्रथम भारतीय कौन थे (1984)?', ansEn: 'Wing Commander Rakesh Sharma', ansBn: 'রাকেশ শর্মা', ansHi: 'राकेश शर्मा' },
        { qEn: 'Which was India’s first artificial satellite launched on 19 April 1975?', qBn: '১৯৭৫ সালের ১৯ এপ্রিল উৎক্ষেপিত ভারতের প্রথম কৃত্রিম উপগ্রহ কোনটি?', qHi: '19 अप्रैल 1975 को प्रक्षेपित भारत का पहला कृत्रिम उपग्रह कौन सा था?', ansEn: 'Aryabhata', ansBn: 'আর্যভট্ট (Aryabhata)', ansHi: 'आर्यभट्ट (Aryabhata)' },
        { qEn: 'Who was the first Indian to pass the Indian Civil Service (ICS) examination in 1863?', qBn: 'প্রথম ভারতীয় হিসেবে আইসিএস (ICS) পরীক্ষায় কে উত্তীর্ণ হন?', qHi: 'सिविल सेवा (ICS) परीक्षा पास करने वाले पहले भारतीय कौन थे?', ansEn: 'Satyendranath Tagore', ansBn: 'সত্যেন্দ্রনাথ ঠাকুর', ansHi: 'सत्येंद्रनाथ टैगोर' },
        { qEn: 'Who was the first Indian woman to climb Mount Everest in 1984?', qBn: 'প্রথম ভারতীয় মহিলা হিসেবে মাউন্ট এভারেস্ট শৃঙ্গ কে জয় করেন (১৯৮৪)?', qHi: 'माउंट एवरेस्ट पर चढ़ने वाली प्रथम भारतीय महिला कौन थीं (1984)?', ansEn: 'Bachendri Pal', ansBn: 'বাছেন্দ্রী পাল', ansHi: 'बछेंद्री पाल' },
        { qEn: 'Who was the first Indian woman to swim across the English Channel?', qBn: 'প্রথম ভারতীয় তথা এশীয় মহিলা হিসেবে ইংলিশ চ্যানেল কে পার হন?', qHi: 'इंग्लिश चैनल पार करने वाली प्रथम भारतीय महिला कौन थीं?', ansEn: 'Arati Saha', ansBn: 'আরতি সাহা', ansHi: 'आरती साहा' },
        { qEn: 'Who was the first woman IPS Officer of India?', qBn: 'ভারতের প্রথম মহিলা আইপিএস (IPS) অফিসার কে?', qHi: 'भारत की प्रथम महिला आईपीएस (IPS) अधिकारी कौन थीं?', ansEn: 'Kiran Bedi', ansBn: 'কিরণ বেদী', ansHi: 'किरण बेदी' },
        { qEn: 'Who was the first woman Governor of a State in independent India?', qBn: 'স্বাধীন ভারতের কোনো রাজ্যের প্রথম মহিলা রাজ্যপাল কে ছিলেন?', qHi: 'स्वतंत्र भारत में किसी राज्य की प्रथम महिला राज्यपाल कौन थीं?', ansEn: 'Sarojini Naidu (Uttar Pradesh)', ansBn: 'সরোজিনী নাইডু (উত্তরপ্রদেশ)', ansHi: 'सरोजिनी नायडू (उत्तर प्रदेश)' },
        { qEn: 'Who was the first woman Chief Minister of an Indian State?', qBn: 'ভারতের কোনো রাজ্যের প্রথম মহিলা মুখ্যমন্ত্রী কে ছিলেন?', qHi: 'भारत के किसी राज्य की प्रथम महिला मुख्यमंत्री कौन थीं?', ansEn: 'Sucheta Kripalani (Uttar Pradesh)', ansBn: 'সুচেতা কৃপালনি (উত্তরপ্রদেশ)', ansHi: 'सुचेता कृपलानी (उत्तर प्रदेश)' },
        { qEn: 'Who was the first woman Speaker of the Lok Sabha?', qBn: 'লোকসভার প্রথম মহিলা স্পিকার (অধ্যক্ষ) কে ছিলেন?', qHi: 'लोकसभा की प्रथम महिला अध्यक्ष (स्पीकर) कौन थीं?', ansEn: 'Meira Kumar', ansBn: 'মীরা কুমার', ansHi: 'मीरा कुमार' },
        { qEn: 'Who was the first woman Judge of the Supreme Court of India?', qBn: 'সুপ্রিম কোর্টের প্রথম মহিলা বিচারপতি কে ছিলেন?', qHi: 'सर्वोच्च न्यायालय की प्रथम महिला न्यायाधीश कौन थीं?', ansEn: 'Justice M. Fathima Beevi', ansBn: 'বিচারপতি এম. ফাতিমা বিবি', ansHi: 'न्यायमूर्ति एम. फातिमा बीबी' },
        { qEn: 'Who was the first tribal woman to become the President of India?', qBn: 'ভারতের প্রথম আদিবাসী মহিলা রাষ্ট্রপতি কে?', qHi: 'भारत की प्रथम आदिवासी महिला राष्ट्रपति कौन हैं?', ansEn: 'Droupadi Murmu', ansBn: 'দ্রৌপদী মুর্মু', ansHi: 'द्रौपदी मुर्मू' },
        { qEn: 'Which is the largest state in India by geographical area?', qBn: 'আয়তনের দিক থেকে ভারতের বৃহত্তম রাজ্য কোনটি?', qHi: 'क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य कौन सा है?', ansEn: 'Rajasthan', ansBn: 'রাজস্থান', ansHi: 'राजस्थान' },
        { qEn: 'Which is the smallest state in India by geographical area?', qBn: 'আয়তনের দিক থেকে ভারতের ক্ষুদ্রতম রাজ্য কোনটি?', qHi: 'क्षेत्रफल की दृष्टि से भारत का सबसे छोटा राज्य कौन सा है?', ansEn: 'Goa', ansBn: 'গোয়া', ansHi: 'गोवा' },
        { qEn: 'Which state in India has the highest literacy rate (as per Census)?', qBn: 'জনগণনা অনুযায়ী ভারতের কোন রাজ্যের সাক্ষরতার হার সর্বাধিক?', qHi: 'जनगणना के अनुसार भारत में सर्वाधिक साक्षरता दर वाला राज्य कौन सा है?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Which was India’s first Nuclear Research Reactor commissioned at Trombay in 1956?', qBn: '১৯৫৬ সালে ট্রম্বেতে স্থাপিত ভারতের প্রথম পারমাণবিক চুল্লি (Nuclear Reactor) কোনটি?', qHi: '1956 में ट्रॉम्बे में स्थापित भारत का पहला परमाणु रिएक्टर कौन सा था?', ansEn: 'Apsara', ansBn: 'অপ্সরা (Apsara)', ansHi: 'अप्सरा (Apsara)' },
        { qEn: 'Which was the first full-length Indian sound (talkie) film released in 1931?', qBn: '১৯৩১ সালে মুক্তিপ্রাপ্ত ভারতের প্রথম সবাক চলচ্চিত্র (Talkie Film) কোনটি?', qHi: '1931 में प्रदर्शित भारत की पहली बोलती फिल्म (आलम आरा) कौन सी थी?', ansEn: 'Alam Ara (directed by Ardeshir Irani)', ansBn: 'আলম আরা (আর্দেশির ইরানি)', ansHi: 'आलम आरा (अर्देशिर ईरानी)' },
      ],
    },
  ]);
}
