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
  subject: 'geography' | 'polity',
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

export function generateGeographyQuestions(): Question[] {
  return buildQuestionsFromTopicList('QM-GEO', 'geography', [
    {
      topicId: 'geo_physical',
      topicEn: 'Mountains, Passes & Borders',
      topicBn: 'পর্বতমালা, গিরিপথ ও সীমানা',
      topicHi: 'पर्वत, दर्रे और सीमाएँ',
      items: [
        { qEn: 'Which is the highest mountain peak located entirely within India (Sikkim)?', qBn: 'ভারতের অভ্যন্তরে (সিকিম) অবস্থিত সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?', qHi: 'भारत में (सिक्किम) स्थित सर्वोच्च पर्वत शिखर कौन सा है?', ansEn: 'Kangchenjunga (8,586 m)', ansBn: 'কাঞ্চনজঙ্ঘা (৮,৫৮৬ মি)', ansHi: 'कंचनजंगा (8,586 मी)' },
        { qEn: 'Which is the oldest mountain range in India?', qBn: 'ভারতের প্রাচীনতম পর্বতমালা কোনটি?', qHi: 'भारत की सबसे प्राचीन पर्वत श्रृंखला कौन सी है?', ansEn: 'Aravalli Range', ansBn: 'আরাবল্লী পর্বতমালা', ansHi: 'अरावली पर्वत श्रृंखला' },
        { qEn: 'What is the highest peak of the Aravalli Range?', qBn: 'আরাবল্লী পর্বতের সর্বোচ্চ শৃঙ্গ কোনটি?', qHi: 'अरावली पर्वत की सबसे ऊँची चोटी कौन सी है?', ansEn: 'Guru Shikhar', ansBn: 'গুরু শিখর', ansHi: 'गुरु शिखर' },
        { qEn: 'What is the highest peak in South India (Peninsular India)?', qBn: 'দক্ষিণ ভারতের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?', qHi: 'दक्षिण भारत (प्रायद्वीपीय भारत) की सबसे ऊँची चोटी कौन सी है?', ansEn: 'Anamudi (Kerala)', ansBn: 'আনাইমুদি (কেরল)', ansHi: 'अनाइमुडी (केरल)' },
        { qEn: 'Where do the Eastern Ghats and Western Ghats meet?', qBn: 'পূর্বঘাট ও পশ্চিমঘাট পর্বতমালা কোথায় মিলিত হয়েছে?', qHi: 'पूर्वी घाट और पश्चिमी घाट का मिलन स्थल कौन सा है?', ansEn: 'Nilgiri Hills', ansBn: 'নীলগিরি পর্বত', ansHi: 'नीलगिरि पहाड़ियाँ' },
        { qEn: 'What is the highest peak of the Nilgiri Hills?', qBn: 'নীলগিরি পর্বতের সর্বোচ্চ শৃঙ্গ কোনটি?', qHi: 'नीलगिरि पहाड़ियों की सबसे ऊँची चोटी कौन सी है?', ansEn: 'Doddabetta', ansBn: 'দোদাবেতা', ansHi: 'दोद्दाबेट्टा' },
        { qEn: 'Nathu La and Jelep La passes are located in which Indian state?', qBn: 'নাথু লা ও জেলেপ লা গিরিপথ কোন রাজ্যে অবস্থিত?', qHi: 'नाथू ला और जेलेप ला दर्रा किस राज्य में स्थित हैं?', ansEn: 'Sikkim', ansBn: 'সিকিম', ansHi: 'सिक्किम' },
        { qEn: 'Zoji La Pass connects Srinagar with which town?', qBn: 'জোজি লা গিরিপথ শ্রীনগরের সাথে কোন স্থানকে যুক্ত করেছে?', qHi: 'ज़ोजी ला दर्रा श्रीनगर को किससे जोड़ता है?', ansEn: 'Leh (Ladakh)', ansBn: 'লেহ (লাদাখ)', ansHi: 'लेह (लद्दाख)' },
        { qEn: 'Rohtang Pass and Shipki La Pass are located in which state?', qBn: 'রোটাং পাস ও শিপকি লা গিরিপথ কোন রাজ্যে অবস্থিত?', qHi: 'रोहतांग दर्रा और शिपकी ला दर्रा किस राज्य में स्थित हैं?', ansEn: 'Himachal Pradesh', ansBn: 'হিমাচল প্রদেশ', ansHi: 'हिमाचल प्रदेश' },
        { qEn: 'Which boundary line separates India and China?', qBn: 'ভারত ও চিনের মধ্যে সীমারেখার নাম কী?', qHi: 'भारत और चीन के बीच की सीमा रेखा क्या कहलाती है?', ansEn: 'McMahon Line', ansBn: 'ম্যাকমোহন লাইন', ansHi: 'मैकमोहन रेखा' },
        { qEn: 'Which boundary line separates India and Pakistan?', qBn: 'ভারত ও পাকিস্তানের মধ্যে আন্তর্জাতিক সীমারেখা কোনটি?', qHi: 'भारत और पाकिस्तान को अलग करने वाली सीमा रेखा कौन सी है?', ansEn: 'Radcliffe Line', ansBn: 'র‍্যাডক্লিফ লাইন', ansHi: 'रेडक्लिफ रेखा' },
        { qEn: 'With which country does India share its longest land border (4,096 km)?', qBn: 'কোন দেশের সাথে ভারতের দীর্ঘতম স্থলসীমান্ত (৪,০৯৬ কিমি) রয়েছে?', qHi: 'भारत किस देश के साथ सबसे लंबी स्थलीय सीमा (4,096 किमी) साझा करता है?', ansEn: 'Bangladesh', ansBn: 'বাংলাদেশ', ansHi: 'बांग्लादेश' },
        { qEn: 'Which Indian state has the longest coastline on the mainland?', qBn: 'ভারতের কোন রাজ্যের উপকূলরেখা দীর্ঘতম?', qHi: 'भारत के किस राज्य की तटरेखा सबसे लंबी है?', ansEn: 'Gujarat', ansBn: 'গুজরাট', ansHi: 'गुजरात' },
        { qEn: 'Which channel separates the Andaman Islands from the Nicobar Islands?', qBn: 'আন্দামান ও নিকোবর দ্বীপপুঞ্জকে পৃথক করেছে কোন চ্যানেল?', qHi: 'अंडमान और निकोबार द्वीप समूह को कौन सा चैनल अलग करता है?', ansEn: 'Ten Degree (10°) Channel', ansBn: '১০ ডিগ্রি চ্যানেল', ansHi: '10 डिग्री चैनल' },
        { qEn: 'What is the southernmost point of the Republic of India?', qBn: 'ভারতের দক্ষিণতম বিন্দু কোনটি?', qHi: 'भारत का सबसे दक्षिणी बिंदु कौन सा है?', ansEn: 'Indira Point (Great Nicobar)', ansBn: 'ইন্দিরা পয়েন্ট (গ্রেট নিকোবর)', ansHi: 'इंदिरा पॉइंट (ग्रेट निकोबार)' },
        { qEn: 'Which standard meridian determines Indian Standard Time (IST)?', qBn: 'ভারতের প্রমাণ সময় (IST) কোন দ্রাঘিমারেখা অনুযায়ী নির্ধারিত হয়?', qHi: 'भारतीय मानक समय (IST) किस देशांतर रेखा से निर्धारित होता है?', ansEn: '82°30′ East Longitude', ansBn: '৮২°৩০′ পূর্ব দ্রাঘিমা', ansHi: '82°30′ पूर्वी देशांतर' },
        { qEn: 'Through how many Indian states does the Tropic of Cancer pass?', qBn: 'কর্কটক্রান্তি রেখা ভারতের কয়টি রাজ্যের ওপর দিয়ে গেছে?', qHi: 'कर्क रेखा भारत के कितने राज्यों से होकर गुजरती है?', ansEn: '8 States', ansBn: '৮টি রাজ্য', ansHi: '8 राज्य' },
        { qEn: 'What is the highest peak of West Bengal?', qBn: 'পশ্চিমবঙ্গের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?', qHi: 'पश्चिम बंगाल की सबसे ऊँची चोटी कौन सी है?', ansEn: 'Sandakphu (3,636 m)', ansBn: 'সান্দাকফু (৩,৬৩৬ মি)', ansHi: 'संदकफू (3,636 मी)' },
        { qEn: 'Which strait separates India from Sri Lanka?', qBn: 'ভারত ও শ্রীলঙ্কাকে পৃথক করেছে কোন প্রণালী?', qHi: 'भारत और श्रीलंका को कौन सी जलसंधि अलग करती है?', ansEn: 'Palk Strait', ansBn: 'পক প্রণালী', ansHi: 'पाक जलडमरूमध्य' },
        { qEn: 'What is the highest peak of the Satpura Range?', qBn: 'সাতপুরা পর্বতের সর্বোচ্চ শৃঙ্গ কোনটি?', qHi: 'सतपुड़ा पर्वत श्रेणी की सबसे ऊँची चोटी कौन सी है?', ansEn: 'Dhupgarh', ansBn: 'ধূপগড়', ansHi: 'धूपगढ़' },
      ],
    },
    {
      topicId: 'geo_rivers',
      topicEn: 'Rivers, Dams & Lakes of India',
      topicBn: 'ভারতের নদনদী, বাঁধ ও হ্রদ',
      topicHi: 'भारत की नदियाँ, बाँध और झीलें',
      items: [
        { qEn: 'Which is the longest river in India (2,525 km)?', qBn: 'ভারতের দীর্ঘতম নদী কোনটি (২,৫২৫ কিমি)?', qHi: 'भारत की सबसे लंबी नदी (2,525 किमी) कौन सी है?', ansEn: 'Ganga River', ansBn: 'গঙ্গা নদী', ansHi: 'गंगा नदी' },
        { qEn: 'Which river is known as the "Dakshin Ganga" (Ganga of the South)?', qBn: 'কোন নদীকে "দক্ষিণ ভারতের গঙ্গা" বা বৃদ্ধ গঙ্গা বলা হয়?', qHi: 'किस नदी को "दक्षिण गंगा" (वृद्ध गंगा) कहा जाता है?', ansEn: 'Godavari River', ansBn: 'গোদাবরী নদী', ansHi: 'गोदावरी नदी' },
        { qEn: 'Which major west-flowing river originates from Amarkantak Plateau?', qBn: 'অমরকণ্টক মালভূমি থেকে উৎপন্ন পশ্চিমবাহিনী নদী কোনটি?', qHi: 'अमरकंटक पठार से निकलने वाली प्रमुख पश्चिम वाहिनी नदी कौन सी है?', ansEn: 'Narmada River', ansBn: 'নর্মদা নদী', ansHi: 'नर्मदा नदी' },
        { qEn: 'Which river was historically known as the "Sorrow of Bengal"?', qBn: 'কোন নদীকে "বাংলার দুঃখ" বলা হতো?', qHi: 'किस नदी को "बंगाल का शोक" कहा जाता था?', ansEn: 'Damodar River', ansBn: 'দামোদর নদ', ansHi: 'दामोदर नदी' },
        { qEn: 'Which river is known as the "Sorrow of Bihar"?', qBn: 'কোন নদীকে "বিহারের দুঃখ" বলা হয়?', qHi: 'किस नदी को "बिहार का शोक" कहा जाता है?', ansEn: 'Kosi River', ansBn: 'কোশী নদী', ansHi: 'कोसी नदी' },
        { qEn: 'By what name is the Brahmaputra River known in Tibet?', qBn: 'তিব্বতে ব্রহ্মপুত্র নদ কী নামে পরিচিত?', qHi: 'तिब्बत में ब्रह्मपुत्र नदी को किस नाम से जाना जाता है?', ansEn: 'Tsangpo (Yarlung Tsangpo)', ansBn: 'সাংপো (Tsangpo)', ansHi: 'सांगपो (Tsangpo)' },
        { qEn: 'Which is the largest river island in the world located in Assam?', qBn: 'আসামে অবস্থিত বিশ্বের বৃহত্তম নদী দ্বীপ কোনটি?', qHi: 'असम में स्थित विश्व का सबसे बड़ा नदी द्वीप कौन सा है?', ansEn: 'Majuli Island', ansBn: 'মাজুলি দ্বীপ', ansHi: 'माजुली द्वीप' },
        { qEn: 'Which is the highest dam in India (260.5 m) built on the Bhagirathi river?', qBn: 'ভাগীরথী নদীর ওপর নির্মিত ভারতের উচ্চতম বাঁধ কোনটি?', qHi: 'भागीरथी नदी पर बना भारत का सबसे ऊँचा बाँध कौन सा है?', ansEn: 'Tehri Dam (Uttarakhand)', ansBn: 'তেহরি বাঁধ (উত্তরাখণ্ড)', ansHi: 'टिहरी बाँध (उत्तराखंड)' },
        { qEn: 'Which is the longest dam in India built on the Mahanadi River?', qBn: 'মহানদীর ওপর নির্মিত ভারতের দীর্ঘতম বাঁধ কোনটি?', qHi: 'महानदी पर बना भारत का सबसे लंबा बाँध कौन सा है?', ansEn: 'Hirakud Dam (Odisha)', ansBn: 'হিরাকুঁদ বাঁধ (ওড়িশা)', ansHi: 'हीराकुंड बाँध (ओडिशा)' },
        { qEn: 'Bhakra Nangal Dam is built across which river?', qBn: 'ভাকরা নাঙ্গাল বাঁধ কোন নদীর ওপর নির্মিত?', qHi: 'भाखड़ा नांगल बाँध किस नदी पर बनाया गया है?', ansEn: 'Sutlej River', ansBn: 'শতদ্রু নদী (Sutlej)', ansHi: 'सतलुज नदी' },
        { qEn: 'Sardar Sarovar Dam is built on which river in Gujarat?', qBn: 'গুজরাটের সর্দার সরোবর বাঁধ কোন নদীর ওপর অবস্থিত?', qHi: 'गुजरात में सरदार सरोवर बाँध किस नदी पर स्थित है?', ansEn: 'Narmada River', ansBn: 'নর্মদা নদী', ansHi: 'नर्मदा नदी' },
        { qEn: 'Nagarjuna Sagar Dam is built across which river?', qBn: 'নাগার্জুন সাগর বাঁধ কোন নদীর ওপর নির্মিত?', qHi: 'नागार्जुन सागर बाँध किस नदी पर बना है?', ansEn: 'Krishna River', ansBn: 'কৃষ্ণা নদী', ansHi: 'कृष्णा नदी' },
        { qEn: 'Which is the largest brackish water lagoon lake in India?', qBn: 'ভারতের বৃহত্তম লবণাক্ত জলের উপহ্রদ (Lagoon) কোনটি?', qHi: 'भारत की सबसे बड़ी खारे पानी की लैगून झील कौन सी है?', ansEn: 'Chilika Lake (Odisha)', ansBn: 'চিল্কা হ্রদ (ওড়িশা)', ansHi: 'चिल्का झील (ओडिशा)' },
        { qEn: 'Which is the largest freshwater lake in India?', qBn: 'ভারতের বৃহত্তম সাধু জলের হ্রদ কোনটি?', qHi: 'भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?', ansEn: 'Wular Lake (Jammu & Kashmir)', ansBn: 'উলার হ্রদ (জম্মু ও কাশ্মীর)', ansHi: 'वुलर झील (जम्मू-कश्मीर)' },
        { qEn: 'Loktak Lake, home to the floating Keibul Lamjao National Park, is in?', qBn: 'ভাসমান কেইবুল লামজাও উদ্যান ও লোকটাক হ্রদ কোন রাজ্যে অবস্থিত?', qHi: 'लोकटक झील और तैरता हुआ केइबुल लामजाओ पार्क किस राज्य में है?', ansEn: 'Manipur', ansBn: 'মণিপুর', ansHi: 'मणिपुर' },
        { qEn: 'Which is the highest waterfall in India located in Karnataka?', qBn: 'কর্ণাটকে অবস্থিত ভারতের উচ্চতম জলপ্রপাত কোনটি?', qHi: 'कर्नाटक में स्थित भारत का सबसे ऊँचा जलप्रपात कौन सा है?', ansEn: 'Kunchikal Falls (Varahi River)', ansBn: 'কুঞ্চিকল জলপ্রপাত', ansHi: 'कुंचिकल जलप्रपात' },
        { qEn: 'Jog Falls (Gersoppa Falls) is situated on which river?', qBn: 'যোগ বা গেরসোপ্পা জলপ্রপাত কোন নদীর ওপর অবস্থিত?', qHi: 'जोग (गरसोप्पा) जलप्रपात किस नदी पर स्थित है?', ansEn: 'Sharavathi River', ansBn: 'সরাবতী নদী', ansHi: 'शरावती नदी' },
        { qEn: 'Dhuandhar Falls near Jabalpur is formed by which river?', qBn: 'জবলপুরের কাছে ধুঁয়াধার জলপ্রপাত কোন নদীতে সৃষ্টি হয়েছে?', qHi: 'जबलपुर के पास धुआँधार जलप्रपात किस नदी द्वारा निर्मित है?', ansEn: 'Narmada River', ansBn: 'নর্মদা নদী', ansHi: 'नर्मदा नदी' },
        { qEn: 'At which place do Bhagirathi and Alaknanda rivers meet to form Ganga?', qBn: 'ভাগীরথী ও অলকানন্দা নদী কোথায় মিলিত হয়ে গঙ্গা নাম নিয়েছে?', qHi: 'भागीरथी और अलकनंदा नदियाँ किस स्थान पर मिलकर गंगा कहलाती हैं?', ansEn: 'Devprayag', ansBn: 'দেবপ্রয়াগ', ansHi: 'देवप्रयाग' },
        { qEn: 'Which river crosses the Tropic of Cancer twice in India?', qBn: 'ভারতের কোন নদী কর্কটক্রান্তি রেখাকে দুইবার অতিক্রম করেছে?', qHi: 'भारत की कौन सी नदी कर्क रेखा को दो बार काटती है?', ansEn: 'Mahi River', ansBn: 'মাহি নদী', ansHi: 'माही नदी' },
      ],
    },
    {
      topicId: 'geo_climate',
      topicEn: 'Soils, Climate & National Parks',
      topicBn: 'মৃত্তিকা, জলবায়ু ও জাতীয় উদ্যান',
      topicHi: 'मिट्टी, जलवायु और राष्ट्रीय उद्यान',
      items: [
        { qEn: 'Which soil is best suited for Cotton cultivation and called Regur soil?', qBn: 'তুলা চাষের জন্য আদর্শ "রেগুর" মৃত্তিকা কোনটি?', qHi: 'कपास की खेती के लिए सर्वोत्तम "रेगुर मिट्टी" किसे कहते हैं?', ansEn: 'Black Soil', ansBn: 'কৃষ্ণ মৃত্তিকা (Black Soil)', ansHi: 'काली मिट्टी (Black Soil)' },
        { qEn: 'Which soil type covers the largest geographical area in India?', qBn: 'ভারতের সর্বাধিক অঞ্চল জুড়ে কোন মৃত্তিকা দেখা যায়?', qHi: 'भारत के सर्वाधिक क्षेत्रफल पर कौन सी मिट्टी पाई जाती है?', ansEn: 'Alluvial Soil', ansBn: 'পলি মাটি (Alluvial Soil)', ansHi: 'जलोढ़ मिट्टी (Alluvial Soil)' },
        { qEn: 'Which was the first National Park established in India (1936)?', qBn: 'ভারতের প্রথম জাতীয় উদ্যান (১৯৩৬) কোনটি?', qHi: 'भारत का पहला राष्ट्रीय उद्यान (1936) कौन सा है?', ansEn: 'Jim Corbett National Park', ansBn: 'জিম করবেট জাতীয় উদ্যান', ansHi: 'जिम कॉर्बेट राष्ट्रीय उद्यान' },
        { qEn: 'Kaziranga National Park in Assam is world-famous for which animal?', qBn: 'আসামের কাজিরাঙা জাতীয় উদ্যান কোন প্রাণীর জন্য বিখ্যাত?', qHi: 'असम का काजीरंगा राष्ट्रीय उद्यान किस जीव के लिए प्रसिद्ध है?', ansEn: 'One-Horned Rhinoceros', ansBn: 'একশৃঙ্গ গন্ডার', ansHi: 'एक सींग वाला गैंडा' },
        { qEn: 'Gir National Park in Gujarat is the only natural habitat of?', qBn: 'গুজরাটের গির অরণ্য কোন প্রাণীর একমাত্র প্রাকৃতিক আবাসস্থল?', qHi: 'गुजरात का गिर राष्ट्रीय उद्यान किस जानवर का प्राकृतिक आवास है?', ansEn: 'Asiatic Lion', ansBn: 'এশিয়াটিক সিংহ', ansHi: 'एशियाई शेर' },
        { qEn: 'Sundarbans National Park in West Bengal is famous for?', qBn: 'পশ্চিমবঙ্গের সুন্দরবন জাতীয় উদ্যান কিসের জন্য বিখ্যাত?', qHi: 'पश्चिम बंगाल का सुंदरबन राष्ट्रीय उद्यान किसके लिए प्रसिद्ध है?', ansEn: 'Royal Bengal Tiger & Mangroves', ansBn: 'রয়্যাল বেঙ্গল টাইগার ও ম্যানগ্রোভ', ansHi: 'रॉयल बंगाल टाइगर और मैंग्रोव' },
        { qEn: 'Periyar Wildlife Sanctuary is located in which state?', qBn: 'পেরিয়ার বন্যপ্রাণী অভয়ারণ্য কোন রাজ্যে অবস্থিত?', qHi: 'पेरियार वन्यजीव अभयारण्य किस राज्य में स्थित है?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Ranthambore and Keoladeo (Bharatpur) National Parks are in which state?', qBn: 'রণথম্ভোর ও কেওলাদেও জাতীয় উদ্যান কোন রাজ্যে অবস্থিত?', qHi: 'रणथंभौर और केवलादेव राष्ट्रीय उद्यान किस राज्य में हैं?', ansEn: 'Rajasthan', ansBn: 'রাজস্থান', ansHi: 'राजस्थान' },
        { qEn: 'Kanha and Bandhavgarh Tiger Reserves are located in which state?', qBn: 'কানহা ও বান্ধবগড় ব্যাঘ্র প্রকল্প কোন রাজ্যে অবস্থিত?', qHi: 'कान्हा और बांधवगढ़ टाइगर रिजर्व किस राज्य में स्थित हैं?', ansEn: 'Madhya Pradesh', ansBn: 'মধ্যপ্রদেশ', ansHi: 'मध्य प्रदेश' },
        { qEn: 'In which year was "Project Tiger" launched in India?', qBn: 'ভারতে "প্রজেক্ট টাইগার" কত সালে শুরু হয়েছিল?', qHi: 'भारत में "प्रोजेक्ट टाइगर" किस वर्ष शुरू किया गया था?', ansEn: '1973', ansBn: '১৯৭৩ সালে', ansHi: '1973 में' },
        { qEn: 'Which place in Meghalaya receives the highest average annual rainfall in the world?', qBn: 'বিশ্বের সর্বাধিক বৃষ্টিপাতযুক্ত স্থান কোনটি (মেঘালয়)?', qHi: 'विश्व में सर्वाधिक वर्षा वाला स्थान (मेघालय) कौन सा है?', ansEn: 'Mawsynram', ansBn: 'মৌসিনরাম', ansHi: 'मासिनराम' },
        { qEn: 'Winter rainfall in the Coromandel Coast (Tamil Nadu) is caused by?', qBn: 'শীতকালে তামিলনাড়ুর করমণ্ডল উপকূলে কোন বায়ুর প্রভাবে বৃষ্টিপাত হয়?', qHi: 'शीतकाल में तमिलनाडु के कोरोमंडल तट पर वर्षा किस मानसून से होती है?', ansEn: 'North-East (Retreating) Monsoon', ansBn: 'উত্তর-পূর্ব মৌসুমি বায়ু (প্রত্যাগমনকারী)', ansHi: 'उत्तर-पूर्वी (लौटता हुआ) मानसून' },
        { qEn: 'Silent Valley National Park is located in which state?', qBn: 'সাইলেন্ট ভ্যালি জাতীয় উদ্যান কোন রাজ্যে অবস্থিত?', qHi: 'साइलेंट वैली राष्ट्रीय उद्यान किस राज्य में स्थित है?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Jaldapara and Gorumara National Parks are located in which state?', qBn: 'জলদাপাড়া ও গরুমারা জাতীয় উদ্যান কোন রাজ্যে অবস্থিত?', qHi: 'जलदापाड़ा और गोरुमारा राष्ट्रीय उद्यान किस राज्य में स्थित हैं?', ansEn: 'West Bengal', ansBn: 'পশ্চিমবঙ্গ', ansHi: 'पश्चिम बंगाल' },
        { qEn: 'Simlipal and Bhitarkanika National Parks are in which state?', qBn: 'সিমলিপাল ও ভিতরকণিকা জাতীয় উদ্যান কোন রাজ্যে অবস্থিত?', qHi: 'सिमलीपाल और भितरकनिका राष्ट्रीय उद्यान किस राज्य में हैं?', ansEn: 'Odisha', ansBn: 'ওড়িশা', ansHi: 'ओडिशा' },
        { qEn: 'Dachigam National Park (famous for Hangul / Kashmir Stag) is in?', qBn: 'দাচিগাম জাতীয় উদ্যান (হাঙ্গুল হরিণের জন্য বিখ্যাত) কোথায় অবস্থিত?', qHi: 'दाचीगाम राष्ट्रीय उद्यान (हंगुल हिरण हेतु प्रसिद्ध) कहाँ स्थित है?', ansEn: 'Jammu and Kashmir', ansBn: 'জম্মু ও কাশ্মীর', ansHi: 'जम्मू और कश्मीर' },
        { qEn: 'Hemis National Park (largest in India, famous for Snow Leopard) is in?', qBn: 'ভারতের বৃহত্তম জাতীয় উদ্যান "হেমিস" কোথায় অবস্থিত?', qHi: 'भारत का सबसे बड़ा राष्ट्रीय उद्यान "हेमिस" कहाँ स्थित है?', ansEn: 'Ladakh', ansBn: 'লাদাখ', ansHi: 'लद्दाख' },
        { qEn: 'Who is known as the Father of the Green Revolution in India?', qBn: 'ভারতে সবুজ বিপ্লবের জনক কাকে বলা হয়?', qHi: 'भारत में हरित क्रांति के जनक कौन माने जाते हैं?', ansEn: 'Dr. M.S. Swaminathan', ansBn: 'ডঃ এম. এস. স্বামীনাথন', ansHi: 'डॉ. एम. एस. स्वामीनाथन' },
        { qEn: 'Who spearheaded the White Revolution (Operation Flood / Milk) in India?', qBn: 'ভারতে শ্বেত বিপ্লব (অপারেশন ফ্লাড)-এর জনক কাকে বলা হয়?', qHi: 'भारत में श्वेत क्रांति (ऑपरेशन फ्लड) के जनक कौन हैं?', ansEn: 'Dr. Verghese Kurien', ansBn: 'ডঃ ভার্গিস কুরিয়েন', ansHi: 'डॉ. वर्गीज कुरियन' },
        { qEn: 'What does the "Blue Revolution" refer to in Indian agriculture?', qBn: '"নীল বিপ্লব" (Blue Revolution) কোন ক্ষেত্রের উৎপাদনের সাথে যুক্ত?', qHi: '"नीली क्रांति" (Blue Revolution) का संबंध किसके उत्पादन से है?', ansEn: 'Fish & Aquaculture Production', ansBn: 'মৎস্য উৎপাদন', ansHi: 'मत्स्य (मछली) उत्पादन' },
      ],
    },
    {
      topicId: 'geo_resources',
      topicEn: 'Minerals, Agriculture & Ports',
      topicBn: 'খনিজ, কৃষি ও বন্দর',
      topicHi: 'खनिज, कृषि और बंदरगाह',
      items: [
        { qEn: 'Khetri Mines in Rajasthan are famous for which mineral?', qBn: 'রাজস্থানের ক্ষেত্রী খনি কোন ধাতুর জন্য বিখ্যাত?', qHi: 'राजस्थान की खेतड़ी खदान किस खनिज के लिए प्रसिद्ध है?', ansEn: 'Copper', ansBn: 'তামা (Copper)', ansHi: 'तांबा (Copper)' },
        { qEn: 'Jaduguda Mines in Jharkhand are famous for which radioactive mineral?', qBn: 'ঝাড়খণ্ডের জাদুগোড়া খনি কোন খনিজের জন্য বিখ্যাত?', qHi: 'झारखंड की जादूगोड़ा खदान किस खनिज के लिए प्रसिद्ध है?', ansEn: 'Uranium', ansBn: 'ইউরেনিয়াম', ansHi: 'यूरेनियम' },
        { qEn: 'Kolar Gold Fields (KGF) and Hutti Gold Mines are in which state?', qBn: 'কোলার ও হুট্টি সোনার খনি কোন রাজ্যে অবস্থিত?', qHi: 'कोलार और हट्टी सोने की खदानें किस राज्य में स्थित हैं?', ansEn: 'Karnataka', ansBn: 'কর্ণাটক', ansHi: 'कर्नाटक' },
        { qEn: 'Panna in Madhya Pradesh is famous for the mining of?', qBn: 'মধ্যপ্রদেশের পান্না কিসের খনির জন্য বিখ্যাত?', qHi: 'मध्य प्रदेश का पन्ना किसकी खदानों के लिए प्रसिद्ध है?', ansEn: 'Diamond', ansBn: 'হীরে (Diamond)', ansHi: 'हीरा (Diamond)' },
        { qEn: 'Jharia in Jharkhand and Raniganj in West Bengal are famous for?', qBn: 'ঝাড়খণ্ডের ঝরিয়া ও পশ্চিমবঙ্গের রানিগঞ্জ কিসের জন্য বিখ্যাত?', qHi: 'झरिया (झारखंड) और रानीगंज (पश्चिम बंगाल) किसके लिए प्रसिद्ध हैं?', ansEn: 'Coal Fields', ansBn: 'কয়লা খনি (Coal)', ansHi: 'कोयला खदान (Coal)' },
        { qEn: 'Which was the first oil refinery established in Asia (1901)?', qBn: 'এশিয়ার প্রাচীনতম খনিজ তেল শোধনাগার কোনটি (১৯০১)?', qHi: 'एशिया का सबसे पुराना तेल शोधक कारखाना (1901) कौन सा है?', ansEn: 'Digboi (Assam)', ansBn: 'ডিগবয় (আসাম)', ansHi: 'डिगबोई (असम)' },
        { qEn: 'Which Indian state is the largest producer of Tea?', qBn: 'ভারতের কোন রাজ্য চা উৎপাদনে প্রথম স্থান অধিকার করে?', qHi: 'भारत में चाय का सबसे बड़ा उत्पादक राज्य कौन सा है?', ansEn: 'Assam', ansBn: 'আসাম', ansHi: 'असम' },
        { qEn: 'Which Indian state is the largest producer of Coffee?', qBn: 'ভারতের কোন রাজ্য কফি উৎপাদনে প্রথম?', qHi: 'भारत में कॉफी का सबसे बड़ा उत्पादक राज्य कौन सा है?', ansEn: 'Karnataka', ansBn: 'কর্ণাটক', ansHi: 'कर्नाटक' },
        { qEn: 'Which Indian state is the largest producer of Jute and Rice?', qBn: 'পাট ও ধান উৎপাদনে ভারতের কোন রাজ্য প্রথম?', qHi: 'जूट और चावल के उत्पादन में भारत का अग्रणी राज्य कौन सा है?', ansEn: 'West Bengal', ansBn: 'পশ্চিমবঙ্গ', ansHi: 'पश्चिम बंगाल' },
        { qEn: 'Which Indian state is the largest producer of Natural Rubber and Spices?', qBn: 'প্রাকৃতিক রাবার উৎপাদনে ভারতের কোন রাজ্য প্রথম?', qHi: 'प्राकृतिक रबर के उत्पादन में भारत का प्रथम राज्य कौन सा है?', ansEn: 'Kerala', ansBn: 'কেরল', ansHi: 'केरल' },
        { qEn: 'Which union territory is the main producer of Saffron (Kesar) in India?', qBn: 'ভারতে জাফরান (কেশর) উৎপাদনে কোন অঞ্চল প্রথম?', qHi: 'भारत में केसर का प्रमुख उत्पादक क्षेत्र कौन सा है?', ansEn: 'Jammu & Kashmir (Pampore)', ansBn: 'জম্মু ও কাশ্মীর', ansHi: 'जम्मू और कश्मीर' },
        { qEn: 'Which is a major tidal port located in the Gulf of Kutch (Gujarat)?', qBn: 'গুজরাটের কচ্ছ উপসাগরে অবস্থিত শুল্কমুক্ত জোয়ারভাটা বন্দর কোনটি?', qHi: 'गुजरात में कच्छ की खाड़ी में स्थित ज्वारीय बंदरगाह कौन सा है?', ansEn: 'Kandla Port (Deendayal Port)', ansBn: 'কান্দলা বন্দর (দীনদয়াল বন্দর)', ansHi: 'कांडला बंदरगाह (दीनदयाल पोर्ट)' },
        { qEn: 'Which is the deepest landlocked natural port on the east coast of India?', qBn: 'ভারতের গভীরতম স্থলবেষ্টিত প্রাকৃতিক বন্দর কোনটি?', qHi: 'भारत का सबसे गहरा स्थलरुद्ध प्राकृतिक बंदरगाह कौन सा है?', ansEn: 'Visakhapatnam Port', ansBn: 'বিশাখাপত্তনম বন্দর', ansHi: 'विशाखापत्तनम बंदरगाह' },
        { qEn: 'Which plateau is called the "Ruhr of India" due to rich mineral reserves?', qBn: 'খনিজ সম্পদের প্রাচুর্যের জন্য কোন মালভূমিকে "ভারতের রূঢ়" বলা হয়?', qHi: 'खनिज संपदा के कारण किस पठार को "भारत का रूर" कहा जाता है?', ansEn: 'Chota Nagpur Plateau', ansBn: 'ছোটনাগপুর মালভূমি', ansHi: 'छोटा नागपुर का पठार' },
        { qEn: 'Bhilai Steel Plant in Chhattisgarh was set up with the collaboration of?', qBn: 'ছত্তিশগড়ের ভিলাই ইস্পাত কারখানা কোন দেশের সহযোগিতায় গড়ে ওঠে?', qHi: 'भिलाई इस्पात संयंत्र किस देश के सहयोग से स्थापित किया गया था?', ansEn: 'USSR (Russia)', ansBn: 'সোভিয়েত ইউনিয়ন (রাশিয়া)', ansHi: 'सोवियत संघ (रूस)' },
        { qEn: 'Rourkela Steel Plant in Odisha was established with the assistance of?', qBn: 'ওড়িশার রাউরকেল্লা ইস্পাত কারখানা কোন দেশের সহায়তায় নির্মিত?', qHi: 'राउरकेला इस्पात संयंत्र किस देश के सहयोग से स्थापित हुआ?', ansEn: 'Germany', ansBn: 'জার্মানি', ansHi: 'जर्मनी' },
        { qEn: 'Durgapur Steel Plant in West Bengal was established with the collaboration of?', qBn: 'পশ্চিমবঙ্গের দুর্গাপুর ইস্পাত কারখানা কোন দেশের সহযোগিতায় স্থাপিত?', qHi: 'दुर्गापुर इस्पात संयंत्र किस देश के सहयोग से स्थापित किया गया?', ansEn: 'United Kingdom (Britain)', ansBn: 'ব্রিটেন (যুক্তরাজ্য)', ansHi: 'ब्रिटेन (यूनाइटेड किंगडम)' },
        { qEn: 'Where is the headquarters of Indian Railways Eastern Railway & South Eastern Railway?', qBn: 'পূর্ব রেল ও দক্ষিণ-পূর্ব রেলের সদর দপ্তর কোথায় অবস্থিত?', qHi: 'पूर्वी रेलवे और दक्षिण-पूर्वी रेलवे का मुख्यालय कहाँ स्थित है?', ansEn: 'Kolkata', ansBn: 'কলকাতা', ansHi: 'कोलकाता' },
        { qEn: 'National Waterway 1 (NW-1) runs from Prayagraj to Haldia across which river?', qBn: '১ নং জাতীয় জলপথ (প্রয়াগরাজ থেকে হলদিয়া) কোন নদীর ওপর বিস্তৃত?', qHi: 'राष्ट्रीय जलमार्ग-1 (प्रयागराज से हल्दिया) किस नदी पर स्थित है?', ansEn: 'Ganga-Bhagirathi-Hooghly', ansBn: 'গঙ্গা-ভাগীরথী-হুগলি নদী', ansHi: 'गंगा-भागीरथी-हुगली नदी' },
        { qEn: 'Kudankulam and Kalpakkam Nuclear Power Plants are in which state?', qBn: 'কুদানকুলাম ও কালপক্কম পারমাণবিক বিদ্যুৎ কেন্দ্র কোন রাজ্যে অবস্থিত?', qHi: 'कुडनकुलम और कलपक्कम परमाणु ऊर्जा संयंत्र किस राज्य में हैं?', ansEn: 'Tamil Nadu', ansBn: 'তামিলনাড়ু', ansHi: 'तमिलनाडु' },
      ],
    },
    {
      topicId: 'geo_solar',
      topicEn: 'Solar System & World Geography',
      topicBn: 'সৌরজগৎ ও বিশ্ব ভূগোল',
      topicHi: 'सौर मंडल और विश्व भूगोल',
      items: [
        { qEn: 'Which planet is known as the "Morning Star", "Evening Star", and "Earth’s Twin"?', qBn: 'কোন গ্রহকে "ভোরের তারা", "সন্ধ্যাতারা" ও "পৃথিবীর যমজ" বলা হয়?', qHi: 'किस ग्रह को "भोर का तारा", "सांझ का तारा" और "पृथ्वी की जुड़वां बहन" कहते हैं?', ansEn: 'Venus', ansBn: 'শুক্র গ্রহ (Venus)', ansHi: 'शुक्र ग्रह (Venus)' },
        { qEn: 'Which planet is known as the "Red Planet" due to iron oxide?', qBn: 'আয়রন অক্সাইডের উপস্থিতির জন্য কোন গ্রহকে "লাল গ্রহ" বলা হয়?', qHi: 'आयरन ऑक्साइड के कारण किस ग्रह को "लाल ग्रह" कहा जाता है?', ansEn: 'Mars', ansBn: 'মঙ্গল গ্রহ (Mars)', ansHi: 'मंगल ग्रह (Mars)' },
        { qEn: 'Which is the largest planet in our Solar System?', qBn: 'সৌরজগতের বৃহত্তম গ্রহ কোনটি?', qHi: 'हमारे सौर मंडल का सबसे बड़ा ग्रह कौन सा है?', ansEn: 'Jupiter', ansBn: 'বৃহস্পতি (Jupiter)', ansHi: 'बृहस्पति (Jupiter)' },
        { qEn: 'Which atmospheric layer contains the Ozone Layer that absorbs UV rays?', qBn: 'বায়ুমণ্ডলের কোন স্তরে ওজোন স্তর (Ozone Layer) অবস্থিত?', qHi: 'वायुमंडल की किस परत में ओजोन परत (Ozone Layer) पाई जाती है?', ansEn: 'Stratosphere', ansBn: 'স্ট্র্যাটোস্ফিয়ার (শান্তমণ্ডল)', ansHi: 'समताप मंडल (Stratosphere)' },
        { qEn: 'In which lowest layer of the atmosphere do all weather phenomena occur?', qBn: 'বায়ুমণ্ডলের কোন স্তরে ঝড়-বৃষ্টি ও আবহাওয়ার যাবতীয় ঘটনা ঘটে?', qHi: 'मौसम संबंधी सभी घटनाएँ वायुमंडल की किस परत में होती हैं?', ansEn: 'Troposphere', ansBn: 'ট্রপোস্ফিয়ার (ক্ষুব্ধমণ্ডল)', ansHi: 'क्षोभमंडल (Troposphere)' },
        { qEn: 'Which is the longest river in the world?', qBn: 'পৃথিবীর দীর্ঘতম নদী কোনটি?', qHi: 'विश्व की सबसे लंबी नदी कौन सी है?', ansEn: 'Nile River (Africa)', ansBn: 'নীলনদ (আফ্রিকা)', ansHi: 'नील नदी (अफ्रीका)' },
        { qEn: 'Which is the largest river in the world by water volume?', qBn: 'জলপ্রবাহের দিক থেকে পৃথিবীর বৃহত্তম নদী কোনটি?', qHi: 'अपवाह क्षेत्र और जल के आयतन की दृष्टि से विश्व की सबसे बड़ी नदी कौन सी है?', ansEn: 'Amazon River (South America)', ansBn: 'আমাজন নদী (দক্ষিণ আমেরিকা)', ansHi: 'अमेज़न नदी (दक्षिण अमेरिका)' },
        { qEn: 'Which is the deepest oceanic trench in the world (in the Pacific Ocean)?', qBn: 'প্রশান্ত মহাসাগরে অবস্থিত পৃথিবীর গভীরতম সমুদ্রখাত কোনটি?', qHi: 'प्रशांत महासागर में स्थित विश्व की सबसे गहरी महासागरीय खाई कौन सी है?', ansEn: 'Mariana Trench', ansBn: 'মারিয়ানা খাত', ansHi: 'मेरियाना गर्त (Mariana Trench)' },
        { qEn: 'The Suez Canal connects the Mediterranean Sea with which sea?', qBn: 'সুয়েজ খাল ভূমধ্যসাগরের সাথে কোন সাগরকে যুক্ত করেছে?', qHi: 'स्वेज नहर भूमध्य सागर को किस सागर से जोड़ती है?', ansEn: 'Red Sea', ansBn: 'লোহিত সাগর (Red Sea)', ansHi: 'लाल सागर (Red Sea)' },
        { qEn: 'The Panama Canal connects the Atlantic Ocean with which ocean?', qBn: 'পানামা খাল আটলান্টিক মহাসাগরের সাথে কোন মহাসাগরকে যুক্ত করেছে?', qHi: 'पनामा नहर अटलांटिक महासागर को किस महासागर से जोड़ती है?', ansEn: 'Pacific Ocean', ansBn: 'প্রশান্ত মহাসাগর', ansHi: 'प्रशांत महासागर' },
        { qEn: 'Which is the largest hot desert in the world?', qBn: 'পৃথিবীর বৃহত্তম উষ্ণ মরুভূমি কোনটি?', qHi: 'विश्व का सबसे बड़ा गर्म मরুस्थल कौन सा है?', ansEn: 'Sahara Desert (Africa)', ansBn: 'সাহারা মরুভূমি (আফ্রিকা)', ansHi: 'सहारा मरुस्थल (अफ्रीका)' },
        { qEn: 'Which is the longest continental mountain range in the world?', qBn: 'পৃথিবীর দীর্ঘতম পর্বতমালা কোনটি?', qHi: 'विश्व की सबसे लंबी पर्वत श्रृंखला कौन सी है?', ansEn: 'Andes (South America)', ansBn: 'আন্দিজ পর্বতমালা (দক্ষিণ আমেরিকা)', ansHi: 'एंडीज पर्वतमाला (दक्षिण अमेरिका)' },
        { qEn: 'Which plateau is known as the "Roof of the World"?', qBn: 'কোন মালভূমিকে "পৃথিবীর ছাদ" বলা হয়?', qHi: 'किस पठार को "विश्व की छत" (Roof of the World) कहा जाता है?', ansEn: 'Pamir Plateau', ansBn: 'পামির মালভূমি', ansHi: 'पामीर का पठार' },
        { qEn: 'What are the temperate grasslands of North America called?', qBn: 'উত্তর আমেরিকার নাতিশীতোষ্ণ তৃণভূমি কী নামে পরিচিত?', qHi: 'उत्तरी अमेरिका के शीतोष्ण घास के मैदानों को क्या कहा जाता है?', ansEn: 'Prairies', ansBn: 'প্রেইরি (Prairies)', ansHi: 'प्रेयरी (Prairies)' },
        { qEn: 'What are the temperate grasslands of Argentina (South America) called?', qBn: 'আর্জেন্টিনার নাতিশীতোষ্ণ তৃণভূমির নাম কী?', qHi: 'अर्जेंटीना के घास के मैदानों को क्या कहा जाता है?', ansEn: 'Pampas', ansBn: 'পম্পাস (Pampas)', ansHi: 'पम्पास (Pampas)' },
        { qEn: 'Which country is known as the "Land of the Rising Sun"?', qBn: 'কোন দেশকে "উদীয়মান সূর্যের দেশ" বলা হয়?', qHi: 'किस देश को "उगते सूर्य की भूमि" कहा जाता है?', ansEn: 'Japan', ansBn: 'জাপান', ansHi: 'जापान' },
        { qEn: 'Which country is known as the "Land of the Midnight Sun"?', qBn: 'কোন দেশকে "নিশীথ সূর্যের দেশ" বলা হয়?', qHi: 'किस देश को "मध्यरात्रि के सूर्य का देश" कहा जाता है?', ansEn: 'Norway', ansBn: 'নরওয়ে', ansHi: 'नॉर्वे' },
        { qEn: 'Which is the deepest lake in the world located in Siberia (Russia)?', qBn: 'পৃথিবীর গভীরতম হ্রদ কোনটি (রাশিয়া)?', qHi: 'विश्व की सबसे गहरी झील (रूस) कौन सी है?', ansEn: 'Lake Baikal', ansBn: 'বৈকাল হ্রদ (Lake Baikal)', ansHi: 'बैकाल झील (Lake Baikal)' },
        { qEn: 'On which two dates do Equinoxes (equal day and night across Earth) occur?', qBn: 'বছরের কোন দুটি দিনে পৃথিবীর সর্বত্র দিন ও রাত্রি সমান হয় (মহাবিষুব ও জলবিষুব)?', qHi: 'वर्ष की किन दो तिथियों को पृथ्वी पर दिन और रात बराबर (विषुव) होते हैं?', ansEn: '21 March & 23 September', ansBn: '২১ মার্চ ও ২৩ সেপ্টেম্বর', ansHi: '21 मार्च और 23 सितंबर' },
        { qEn: 'Which imaginary line of latitude is located at 0° dividing Earth into two hemispheres?', qBn: '০° অক্ষাংশে অবস্থিত কোন রেখা পৃথিবীকে উত্তর ও দক্ষিণ গোলার্ধে ভাগ করেছে?', qHi: '0° अक्षांश पर स्थित कौन सी रेखा पृथ्वी को दो गोलार्धों में विभाजित करती है?', ansEn: 'Equator', ansBn: 'নিরক্ষরেখা বা বিষুবরেখা', ansHi: 'भूमध्य रेखा (विषुवत रेखा)' },
      ],
    },
  ]);
}

export function generatePolityQuestions(): Question[] {
  return buildQuestionsFromTopicList('QM-POL', 'polity', [
    {
      topicId: 'pol_making',
      topicEn: 'Constituent Assembly & Preamble',
      topicBn: 'গণপরিষদ ও প্রস্তাবনা',
      topicHi: 'संविधान सभा और प्रस्तावना',
      items: [
        { qEn: 'Who was the Chairman of the Drafting Committee of the Indian Constitution?', qBn: 'ভারতীয় সংবিধানের খসড়া কমিটির (Drafting Committee) চেয়ারম্যান কে ছিলেন?', qHi: 'भारतीय संविधान की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?', ansEn: 'Dr. B.R. Ambedkar', ansBn: 'ডঃ বি. আর. আম্বেদকর', ansHi: 'डॉ. बी. आर. अंबेडकर' },
        { qEn: 'Who was elected the Permanent President of the Constituent Assembly on 11 Dec 1946?', qBn: 'গণপরিষদের স্থায়ী সভাপতি হিসেবে কে নির্বাচিত হয়েছিলেন?', qHi: 'संविधान सभा के स्थायी अध्यक्ष कौन चुने गए थे?', ansEn: 'Dr. Rajendra Prasad', ansBn: 'ডঃ রাজেন্দ্র প্রসাদ', ansHi: 'डॉ. राजेंद्र प्रसाद' },
        { qEn: 'Who served as the temporary Chairman of the first Constituent Assembly meeting on 9 Dec 1946?', qBn: '১৯৪৬ সালের ৯ ডিসেম্বর গণপরিষদের প্রথম অধিবেশনে অস্থায়ী সভাপতি কে ছিলেন?', qHi: '9 दिसंबर 1946 को संविधान सभा की पहली बैठक के अस्थायी अध्यक्ष कौन थे?', ansEn: 'Dr. Sachchidananda Sinha', ansBn: 'ডঃ সচ্চিদানন্দ সিনহা', ansHi: 'डॉ. सच्चिदानंद सिन्हा' },
        { qEn: 'Who was the Constitutional Advisor to the Constituent Assembly?', qBn: 'গণপরিষদের সাংবিধানিক উপদেষ্টা কে ছিলেন?', qHi: 'संविधान सभा के संवैधानिक सलाहकार कौन थे?', ansEn: 'Sir B.N. Rau', ansBn: 'বি. এন. রাও', ansHi: 'बी. एन. राव' },
        { qEn: 'On which date was the Constitution of India adopted by the Constituent Assembly?', qBn: 'ভারতের সংবিধান কবে গণপরিষদে গৃহীত হয়েছিল?', qHi: 'संविधान सभा द्वारा भारतीय संविधान को किस तिथि को अपनाया गया था?', ansEn: '26 November 1949', ansBn: '২৬ নভেম্বর ১৯৪৯', ansHi: '26 नवंबर 1949' },
        { qEn: 'On which date did the Constitution of India come into full force?', qBn: 'ভারতের সংবিধান কবে থেকে কার্যকর হয়?', qHi: 'भारतीय संविधान पूर्ण रूप से किस तिथि को लागू हुआ?', ansEn: '26 January 1950', ansBn: '২৬ জানুয়ারি ১৯৫০', ansHi: '26 जनवरी 1950' },
        { qEn: 'How much time did the Constituent Assembly take to frame the Constitution?', qBn: 'ভারতের সংবিধান রচনা করতে মোট কত সময় লেগেছিল?', qHi: 'भारतीय संविधान के निर्माण में कुल कितना समय लगा था?', ansEn: '2 Years, 11 Months, 18 Days', ansBn: '২ বছর ১১ মাস ১৮ দিন', ansHi: '2 वर्ष, 11 माह, 18 दिन' },
        { qEn: 'Which Amendment added the words "Socialist, Secular, and Integrity" to the Preamble?', qBn: 'কোন সংবিধান সংশোধনীর মাধ্যমে প্রস্তাবনায় "সমাজতান্ত্রিক ও ধর্মনিরপেক্ষ" শব্দ যুক্ত হয়?', qHi: 'किस संविधान संशोधन द्वारा प्रस्तावना में "समाजवादी, पंथनिरपेक्ष और अखंडता" शब्द जोड़े गए?', ansEn: '42nd Amendment Act, 1976', ansBn: '৪২তম সংশোধনী আইন, ১৯৭৬', ansHi: '42वाँ संशोधन अधिनियम, 1976' },
        { qEn: 'From which country’s Constitution was the concept of Fundamental Rights borrowed?', qBn: 'মৌলিক অধিকারের ধারণাটি কোন দেশের সংবিধান থেকে নেওয়া হয়েছে?', qHi: 'मौलिक अधिकारों की अवधारणा किस देश के संविधान से ली गई है?', ansEn: 'United States of America (USA)', ansBn: 'মার্কিন যুক্তরাষ্ট্র (USA)', ansHi: 'संयुक्त राज्य अमेरिका (USA)' },
        { qEn: 'From which country were the Directive Principles of State Policy (DPSP) borrowed?', qBn: 'রাষ্ট্রপরিচালনার নির্দেশমূলক নীতি কোন দেশের সংবিধান থেকে গৃহীত?', qHi: 'राज्य के नीति निदेशक तत्व किस देश के संविधान से लिए गए हैं?', ansEn: 'Ireland', ansBn: 'আয়ারল্যান্ড', ansHi: 'आयरलैंड' },
        { qEn: 'From which country was the concept of Fundamental Duties borrowed?', qBn: 'মৌলিক কর্তব্যের ধারণা কোন দেশের সংবিধান থেকে নেওয়া হয়েছে?', qHi: 'मौलिक कर्तव्यों का प्रावधान किस देश के संविधान से लिया गया है?', ansEn: 'USSR (Russia)', ansBn: 'সোভিয়েত রাশিয়া (USSR)', ansHi: 'सोवियत संघ (रूस)' },
        { qEn: 'From which country was the Concurrent List in the 7th Schedule borrowed?', qBn: 'যুগ্ম তালিকা (Concurrent List)-এর ধারণা কোন দেশ থেকে নেওয়া হয়েছে?', qHi: 'समवर्ती सूची (Concurrent List) किस देश के संविधान से ली गई है?', ansEn: 'Australia', ansBn: 'অস্ট্রেলিয়া', ansHi: 'ऑस्ट्रेलिया' },
        { qEn: 'From which country was the Parliamentary System and Single Citizenship borrowed?', qBn: 'সংসদীয় শাসনব্যবস্থা ও একক নাগরিকত্ব কোন দেশ থেকে গৃহীত?', qHi: 'संसदीय प्रणाली और एकल नागरिकता किस देश से ली गई है?', ansEn: 'United Kingdom (Britain)', ansBn: 'ব্রিটেন (যুক্তরাজ্য)', ansHi: 'ब्रिटेन (यूनाइटेड किंगडम)' },
        { qEn: 'From which country was the procedure for Constitutional Amendment (Art 368) borrowed?', qBn: 'সংবিধান সংশোধনের পদ্ধতি (ধারা ৩৬৮) কোন দেশ থেকে নেওয়া হয়েছে?', qHi: 'संविधान संशोधन की प्रक्रिया (अनुच्छेद 368) किस देश से ली गई है?', ansEn: 'South Africa', ansBn: 'দক্ষিণ আফ্রিকা', ansHi: 'दक्षिण अफ्रीका' },
        { qEn: 'Who moved the historic "Objectives Resolution" in the Constituent Assembly on 13 Dec 1946?', qBn: 'গণপরিষদে "উদ্দেশ্যমূলক প্রস্তাব" (Objectives Resolution) কে পেশ করেছিলেন?', qHi: 'संविधान सभा में "उद्देश्य प्रस्ताव" किसने प्रस्तुत किया था?', ansEn: 'Jawaharlal Nehru', ansBn: 'জওহরলাল নেহরু', ansHi: 'जवाहरलाल नेहरू' },
        { qEn: 'On which date was the National Flag (Tiranga) adopted by the Constituent Assembly?', qBn: 'গণপরিষদ কবে ভারতের জাতীয় পতাকা গ্রহণ করে?', qHi: 'संविधान सभा ने राष्ट्रीय ध्वज (तिरंगा) को कब अपनाया था?', ansEn: '22 July 1947', ansBn: '২২ জুলাই ১৯৪৭', ansHi: '22 जुलाई 1947' },
        { qEn: 'Which part of the Constitution is called the "Soul and Key to the Constitution"?', qBn: 'সংবিধানের কোন অংশকে "সংবিধানের আত্মা ও চাবিকাঠি" বলা হয়?', qHi: 'संविधान के किस भाग को "संविधान की आत्मा और कुंजी" कहा जाता है?', ansEn: 'The Preamble', ansBn: 'প্রস্তাবনা (Preamble)', ansHi: 'प्रस्तावना (उद्देशिका)' },
        { qEn: 'Which Part of the Indian Constitution deals with Citizenship (Articles 5 to 11)?', qBn: 'সংবিধানের কোন অংশে নাগরিকত্ব (ধারা ৫-১১) সম্পর্কে আলোচনা করা হয়েছে?', qHi: 'संविधान के किस भाग में नागरिकता (अनुच्छेद 5-11) का उल्लेख है?', ansEn: 'Part II', ansBn: 'দ্বিতীয় অংশ (Part II)', ansHi: 'भाग II (Part II)' },
        { qEn: 'Which state was the first in India to be formed on a linguistic basis in 1953?', qBn: 'ভাষার ভিত্তিতে গঠিত ভারতের প্রথম রাজ্য কোনটি (১৯৫৩)?', qHi: '1953 में भाषाई आधार पर गठित होने वाला भारत का पहला राज्य कौन सा था?', ansEn: 'Andhra Pradesh', ansBn: 'অন্ধ্রপ্রদেশ', ansHi: 'आंध्र प्रदेश' },
        { qEn: 'How many Schedules are currently present in the Constitution of India?', qBn: 'বর্তমানে ভারতের সংবিধানে মোট কয়টি তফসিল (Schedules) রয়েছে?', qHi: 'वर्तमान में भारतीय संविधान में कुल कितनी अनुसूचियाँ (Schedules) हैं?', ansEn: '12 Schedules', ansBn: '১২টি তফসিল', ansHi: '12 अनुसूचियाँ' },
      ],
    },
    {
      topicId: 'pol_rights',
      topicEn: 'Fundamental Rights & Duties',
      topicBn: 'মৌলিক অধিকার ও কর্তব্য',
      topicHi: 'मौलिक अधिकार और कर्तव्य',
      items: [
        { qEn: 'In which Part of the Indian Constitution are Fundamental Rights enshrined?', qBn: 'সংবিধানের কোন অংশে মৌলিক অধিকার বর্ণিত আছে?', qHi: 'भारतीय संविधान के किस भाग में मौलिक अधिकारों का वर्णन है?', ansEn: 'Part III (Articles 12–35)', ansBn: 'তৃতীয় অংশ (ধারা ১২–৩৫)', ansHi: 'भाग III (अनुच्छेद 12–35)' },
        { qEn: 'How many Fundamental Rights are currently guaranteed by the Indian Constitution?', qBn: 'বর্তমানে ভারতীয় সংবিধানে কয়টি মৌলিক অধিকার রয়েছে?', qHi: 'वर्तमान में भारतीय संविधान में कितने मौलिक अधिकार हैं?', ansEn: '6 Fundamental Rights', ansBn: '৬টি মৌলিক অধিকার', ansHi: '6 मौलिक अधिकार' },
        { qEn: 'Which Article guarantees "Equality before Law" and equal protection of laws?', qBn: 'সংবিধানের কোন ধারায় "আইনের দৃষ্টিতে সমতা" প্রদত্ত হয়েছে?', qHi: 'कौन सा अनुच्छेद "विधि के समक्ष समता" सुनिश्चित करता है?', ansEn: 'Article 14', ansBn: 'ধারা ১৪ (Article 14)', ansHi: 'अनुच्छेद 14 (Article 14)' },
        { qEn: 'Which Article of the Constitution abolishes "Untouchability" in all forms?', qBn: 'সংবিধানের কোন ধারায় "অস্পৃশ্যতা" (Untouchability) নিষিদ্ধ করা হয়েছে?', qHi: 'संविधान के किस अनुच्छेद के तहत "अस्पृश्यता का अंत" किया गया है?', ansEn: 'Article 17', ansBn: 'ধারা ১৭ (Article 17)', ansHi: 'अनुच्छेद 17 (Article 17)' },
        { qEn: 'Which Article deals with the "Abolition of Titles" (except military & academic)?', qBn: 'সংবিধানের কোন ধারায় উপাধি বর্জন (Abolition of Titles) বর্ণিত হয়েছে?', qHi: 'कौन सा अनुच्छेद "उपाधियों के अंत" से संबंधित है?', ansEn: 'Article 18', ansBn: 'ধারা ১৮ (Article 18)', ansHi: 'अनुच्छेद 18 (Article 18)' },
        { qEn: 'Which Article guarantees six fundamental freedoms including Speech and Expression?', qBn: 'বাক্ ও মতপ্রকাশের স্বাধীনতা সংবিধানের কোন ধারায় রয়েছে?', qHi: 'वाक् एवं अभिव्यक्ति की स्वतंत्रता किस अनुच्छेद में दी गई है?', ansEn: 'Article 19', ansBn: 'ধারা ১৯ (Article 19)', ansHi: 'अनुच्छेद 19 (Article 19)' },
        { qEn: 'Which Article guarantees "Protection of Life and Personal Liberty"?', qBn: 'জীবন ও ব্যক্তিগত স্বাধীনতার অধিকার কোন ধারায় সুরক্ষিত?', qHi: 'प्राण और दैहिक स्वतंत्रता का संरक्षण किस अनुच्छेद में है?', ansEn: 'Article 21', ansBn: 'ধারা ২১ (Article 21)', ansHi: 'अनुच्छेद 21 (Article 21)' },
        { qEn: 'Which Article provides the Right to Free and Compulsory Education (6 to 14 years)?', qBn: '৬ থেকে ১৪ বছর বয়সী শিশুদের শিক্ষার অধিকার কোন ধারায় যুক্ত হয়েছে?', qHi: '6 से 14 वर्ष के बच्चों के लिए शिक्षा का अधिकार किस अनुच्छेद में है?', ansEn: 'Article 21A (86th Amendment)', ansBn: 'ধারা ২১এ (৮৬তম সংশোধনী)', ansHi: 'अनुच्छेद 21A (86वाँ संशोधन)' },
        { qEn: 'Which Article prohibits the employment of children below 14 years in hazardous factories?', qBn: '১৪ বছরের কম বয়সী শিশুদের ঝুঁকিপূর্ণ কাজে নিয়োগ নিষিদ্ধ কোন ধারায়?', qHi: 'कारखानों में 14 वर्ष से कम आयु के बच्चों के नियोजन का प्रतिषेध किस अनुच्छेद में है?', ansEn: 'Article 24', ansBn: 'ধারা ২৪ (Article 24)', ansHi: 'अनुच्छेद 24 (Article 24)' },
        { qEn: 'Which Article did Dr. B.R. Ambedkar call the "Heart and Soul of the Constitution"?', qBn: 'ডঃ আম্বেদকর কোন ধারাকে "সংবিধানের হৃদয় ও আত্মা" বলেছেন?', qHi: 'डॉ. अंबेडकर ने किस अनुच्छेद को "संविधान का हृदय और आत्मा" कहा था?', ansEn: 'Article 32 (Constitutional Remedies)', ansBn: 'ধারা ৩২ (সাংবিধানিক প্রতিবিধানের অধিকার)', ansHi: 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)' },
        { qEn: 'How many types of Writs can the Supreme Court issue under Article 32?', qBn: 'ধারা ৩২ অনুযায়ী সুপ্রিম কোর্ট কয় প্রকার লেখ (Writs) জারি করতে পারে?', qHi: 'अनुच्छेद 32 के तहत सर्वोच्च न्यायालय कितने प्रकार की रिट जारी कर सकता है?', ansEn: '5 Writs (Habeas Corpus, etc.)', ansBn: '৫ প্রকার লেখ (বন্দী প্রত্যক্ষীকরণ ইত্যাদি)', ansHi: '5 प्रकार की रिट (बंदी प्रत्यक्षीकरण आदि)' },
        { qEn: 'By which Amendment was the Right to Property removed from Fundamental Rights?', qBn: 'কোন সংশোধনীর মাধ্যমে সম্পত্তির অধিকারকে মৌলিক অধিকার থেকে বাদ দেওয়া হয়?', qHi: 'संपत्ति के अधिकार को किस संशोधन द्वारा मौलिक अधिकारों से हटाया गया?', ansEn: '44th Amendment Act, 1978', ansBn: '৪৪তম সংশোধনী আইন, ১৯৭৮', ansHi: '44वाँ संशोधन अधिनियम, 1978' },
        { qEn: 'Right to Property is now a legal/constitutional right under which Article?', qBn: 'সম্পত্তির অধিকার বর্তমানে সংবিধানের কোন ধারায় একটি আইনি অধিকার?', qHi: 'संपत्ति का अधिकार अब किस अनुच्छेद के अंतर्गत एक विधिक अधिकार है?', ansEn: 'Article 300A (Part XII)', ansBn: 'ধারা ৩০০এ (Article 300A)', ansHi: 'अनुच्छेद 300A (भाग XII)' },
        { qEn: 'In which Part of the Constitution are Directive Principles of State Policy (DPSP) placed?', qBn: 'রাষ্ট্রপরিচালনার নির্দেশমূলক নীতি সংবিধানের কোন অংশে রয়েছে?', qHi: 'राज्य के नीति निदेशक तत्व संविधान के किस भाग में हैं?', ansEn: 'Part IV (Articles 36–51)', ansBn: 'চতুর্থ অংশ (ধারা ৩৬–৫১)', ansHi: 'भाग IV (अनुच्छेद 36–51)' },
        { qEn: 'Which Article directs the State to organize Village Panchayats?', qBn: 'গ্রাম পঞ্চায়েত গঠনের কথা সংবিধানের কোন ধারায় বলা হয়েছে?', qHi: 'ग्राम पंचायतों के गठन का निर्देश किस अनुच्छेद में दिया गया है?', ansEn: 'Article 40', ansBn: 'ধারা ৪০ (Article 40)', ansHi: 'अनुच्छेद 40 (Article 40)' },
        { qEn: 'Which Article mentions the Uniform Civil Code (UCC) for citizens?', qBn: 'অভিন্ন দেওয়ানি বিধি (Uniform Civil Code) সংবিধানের কোন ধারায় উল্লেখ আছে?', qHi: 'समान नागरिक संहिता (Uniform Civil Code) का उल्लेख किस अनुच्छेद में है?', ansEn: 'Article 44', ansBn: 'ধারা ৪৪ (Article 44)', ansHi: 'अनुच्छेद 44 (Article 44)' },
        { qEn: 'Which Article directs the separation of Judiciary from the Executive?', qBn: 'শাসন বিভাগ থেকে বিচার বিভাগের পৃথকীকরণ কোন ধারায় বলা হয়েছে?', qHi: 'कार्यपालिका से न्यायपालिका के पृथक्करण का उल्लेख किस अनुच्छेद में है?', ansEn: 'Article 50', ansBn: 'ধারা ৫০ (Article 50)', ansHi: 'अनुच्छेद 50 (Article 50)' },
        { qEn: 'On the recommendation of which Committee were Fundamental Duties added in 1976?', qBn: 'কোন কমিটির সুপারিশে ১৯৭৬ সালে মৌলিক কর্তব্য সংবিধানে যুক্ত হয়?', qHi: 'किस समिति की सिफारिश पर 1976 में मौलिक कर्तव्य जोड़े गए थे?', ansEn: 'Swaran Singh Committee', ansBn: 'স্বর্ণ সিং কমিটি', ansHi: 'सरदार स्वर्ण सिंह समिति' },
        { qEn: 'Under which Article and Part are Fundamental Duties listed?', qBn: 'মৌলিক কর্তব্য সংবিধানের কোন অংশ ও ধারায় অন্তর্ভুক্ত?', qHi: 'मौलिक कर्तव्य संविधान के किस भाग और अनुच्छेद में वर्णित हैं?', ansEn: 'Part IVA, Article 51A', ansBn: 'অংশ IVA, ধারা ৫১এ', ansHi: 'भाग IVA, अनुच्छेद 51A' },
        { qEn: 'How many total Fundamental Duties are currently listed under Article 51A?', qBn: 'বর্তমানে ধারা ৫১এ-তে মোট কয়টি মৌলিক কর্তব্য রয়েছে?', qHi: 'वर्तमान में अनुच्छेद 51A के तहत कुल कितने मौलिक कर्तव्य हैं?', ansEn: '11 Fundamental Duties', ansBn: '১১টি মৌলিক কর্তব্য', ansHi: '11 मौलिक कर्तव्य' },
      ],
    },
    {
      topicId: 'pol_union',
      topicEn: 'President, PM & Parliament',
      topicBn: 'রাষ্ট্রপতি, প্রধানমন্ত্রী ও সংসদ',
      topicHi: 'राष्ट्रपति, प्रधानमंत्री और संसद',
      items: [
        { qEn: 'What is the minimum age required to become the President of India?', qBn: 'ভারতের রাষ্ট্রপতি পদপ্রার্থী হওয়ার জন্য ন্যূনতম বয়স কত হতে হয়?', qHi: 'भारत का राष्ट्रपति बनने के लिए न्यूनतम आयु कितनी होनी चाहिए?', ansEn: '35 Years', ansBn: '৩৫ বছর', ansHi: '35 वर्ष' },
        { qEn: 'What is the minimum age required to become a member of the Lok Sabha?', qBn: 'লোকসভার সদস্য (MP) হওয়ার জন্য ন্যূনতম বয়স কত?', qHi: 'लोकसभा का सदस्य बनने के लिए न्यूनतम आयु क्या है?', ansEn: '25 Years', ansBn: '২৫ বছর', ansHi: '25 वर्ष' },
        { qEn: 'What is the minimum age required to become a member of the Rajya Sabha?', qBn: 'রাজ্যসভার সদস্য হওয়ার জন্য ন্যূনতম বয়স কত?', qHi: 'राज्यसभा का सदस्य बनने के लिए न्यूनतम आयु कितनी होनी चाहिए?', ansEn: '30 Years', ansBn: '৩০ বছর', ansHi: '30 वर्ष' },
        { qEn: 'Who acts as the ex-officio Chairman of the Rajya Sabha?', qBn: 'পদাধিকারবলে রাজ্যসভার চেয়ারম্যান বা সভাপতি কে হন?', qHi: 'राज्यसभा का पदेन सभापति कौन होता है?', ansEn: 'Vice-President of India', ansBn: 'ভারতের উপরাষ্ট্রপতি', ansHi: 'भारत का उपराष्ट्रपति' },
        { qEn: 'Who administers the oath of office to the President of India?', qBn: 'ভারতের রাষ্ট্রপতিকে কে শপথবাক্য পাঠ করান?', qHi: 'भारत के राष्ट्रपति को पद की शपथ कौन दिलाता है?', ansEn: 'Chief Justice of India (CJI)', ansBn: 'সুপ্রিম কোর্টের প্রধান বিচারপতি', ansHi: 'भारत के मुख्य न्यायाधीश (CJI)' },
        { qEn: 'Under which Article can the President of India be impeached?', qBn: 'সংবিধানের কোন ধারা অনুযায়ী রাষ্ট্রপতিকে ইমপিচমেন্ট (পদচ্যুত) করা যায়?', qHi: 'राष्ट्रपति पर महाभियोग (Impeachment) किस अनुच्छेद के तहत लगाया जाता है?', ansEn: 'Article 61', ansBn: 'ধারা ৬১ (Article 61)', ansHi: 'अनुच्छेद 61 (Article 61)' },
        { qEn: 'Under which Article does the President have the power to grant Pardons?', qBn: 'সংবিধানের কোন ধারায় রাষ্ট্রপতির ক্ষমা প্রদর্শনের ক্ষমতা (Pardoning Power) রয়েছে?', qHi: 'किस अनुच्छेद के तहत राष्ट्रपति को क्षमादान की शक्ति प्राप्त है?', ansEn: 'Article 72', ansBn: 'ধারা ৭২ (Article 72)', ansHi: 'अनुच्छेद 72 (Article 72)' },
        { qEn: 'Under which Article can the President promulgate Ordinances during recess of Parliament?', qBn: 'সংসদের অধিবেশন বন্ধ থাকাকালীন রাষ্ট্রপতি কোন ধারায় অধ্যাদেশ (Ordinance) জারি করেন?', qHi: 'राष्ट्रपति किस अनुच्छेद के तहत अध्यादेश (Ordinance) जारी कर सकते हैं?', ansEn: 'Article 123', ansBn: 'ধারা ১২৩ (Article 123)', ansHi: 'अनुच्छेद 123 (Article 123)' },
        { qEn: 'Who presides over a Joint Sitting of both Houses of Parliament (Article 108)?', qBn: 'সংসদের উভয় কক্ষের যৌথ অধিবেশনে (ধারা ১০৮) কে সভাপতিত্ব করেন?', qHi: 'संसद के दोनों सदनों की संयुक्त बैठक (अनुच्छेद 108) की अध्यक्षता कौन करता है?', ansEn: 'Speaker of the Lok Sabha', ansBn: 'লোকসভার স্পিকার (অধ্যক্ষ)', ansHi: 'लोकसभा अध्यक्ष (स्पीकर)' },
        { qEn: 'Who was the first Speaker of the Lok Sabha?', qBn: 'লোকসভার প্রথম স্পিকার (অধ্যক্ষ) কে ছিলেন?', qHi: 'लोकसभा के प्रथम अध्यक्ष (स्पीकर) कौन थे?', ansEn: 'G.V. Mavalankar', ansBn: 'গণেশ বাসুদেব মাভালঙ্কর', ansHi: 'जी. वी. मावलंकर' },
        { qEn: 'In which House of Parliament can a Money Bill (Article 110) be introduced?', qBn: 'অর্থবিল (Money Bill - ধারা ১১০) কেবল সংসদের কোন কক্ষে পেশ করা যায়?', qHi: 'धन विधेयक (अनुच्छेद 110) केवल किस सदन में पेश किया जा सकता है?', ansEn: 'Only in Lok Sabha', ansBn: 'কেবলমাত্র লোকসভায়', ansHi: 'केवल लोकसभा में' },
        { qEn: 'Which Article deals with the Annual Financial Statement (Union Budget)?', qBn: 'কেন্দ্রীয় বাজেট বা বার্ষিক আর্থিক বিবৃতি কোন ধারায় বর্ণিত?', qHi: 'वार्षिक वित्तीय विवरण (केंद्रीय बजट) का उल्लेख किस अनुच्छेद में है?', ansEn: 'Article 112', ansBn: 'ধারা ১১২ (Article 112)', ansHi: 'अनुच्छेद 112 (Article 112)' },
        { qEn: 'What is the tenure of individual members of the Rajya Sabha?', qBn: 'রাজ্যসভার সদস্যদের কার্যকালের মেয়াদ কত বছর?', qHi: 'राज्यसभा के सदस्यों का कार्यकाल कितने वर्ष का होता है?', ansEn: '6 Years (1/3 retire every 2 yrs)', ansBn: '৬ বছর (প্রতি ২ বছরে ১/৩ অংশ অবসর নেন)', ansHi: '6 वर्ष (प्रत्येक 2 वर्ष में 1/3 सेवानिवृत्त)' },
        { qEn: 'What is the maximum permissible gap between two sessions of Parliament?', qBn: 'সংসদের দুটি অধিবেশনের মধ্যে সর্বাধিক বিরতি কত হতে পারে?', qHi: 'संसद के दो सत्रों के बीच अधिकतम कितना अंतराल हो सकता है?', ansEn: '6 Months', ansBn: '৬ মাস', ansHi: '6 महीने' },
        { qEn: 'Who is the highest law officer of the Government of India (Article 76)?', qBn: 'ভারত সরকারের সর্বোচ্চ আইন আধিকারিক কে (ধারা ৭৬)?', qHi: 'भारत सरकार का सर्वोच्च विधि अधिकारी (अनुच्छेद 76) कौन होता है?', ansEn: 'Attorney General of India', ansBn: 'অ্যাটর্নি জেনারেল (Attorney General)', ansHi: 'भारत का महान्यायवादी (Attorney General)' },
        { qEn: 'Which Article provides for the Comptroller and Auditor General (CAG) of India?', qBn: 'ভারতের কম্পট্রোলার অ্যান্ড অডিটর জেনারেল (CAG) কোন ধারায় নিযুক্ত হন?', qHi: 'नियंत्रक एवं महालेखा परीक्षक (CAG) का प्रावधान किस अनुच्छेद में है?', ansEn: 'Article 148', ansBn: 'ধারা ১৪৮ (Article 148)', ansHi: 'अनुच्छेद 148 (Article 148)' },
        { qEn: 'Which Parliamentary Committee has 22 members (15 Lok Sabha + 7 Rajya Sabha) and audits CAG reports?', qBn: 'সিএজি (CAG) রিপোর্ট পরীক্ষা করে সংসদের কোন ২২ সদস্যের কমিটি?', qHi: 'सीएजी (CAG) की रिपोर्ट की जांच संसद की कौन सी समिति करती है?', ansEn: 'Public Accounts Committee (PAC)', ansBn: 'পাবলিক অ্যাকাউন্টস কমিটি (PAC)', ansHi: 'लोक लेखा समिति (PAC)' },
        { qEn: 'Under which Article is National Emergency declared on grounds of war or armed rebellion?', qBn: 'যুদ্ধ বা সশস্ত্র বিদ্রোহের কারণে জাতীয় জরুরি অবস্থা কোন ধারায় ঘোষিত হয়?', qHi: 'युद्ध या सशस्त्र विद्रोह के आधार पर राष्ट्रीय आपातकाल किस अनुच्छेद में लगता है?', ansEn: 'Article 352', ansBn: 'ধারা ৩৫২ (Article 352)', ansHi: 'अनुच्छेद 352 (Article 352)' },
        { qEn: 'Under which Article is President’s Rule (State Emergency) imposed in a State?', qBn: 'কোনো রাজ্যে রাষ্ট্রপতির শাসন (President’s Rule) কোন ধারায় জারি করা হয়?', qHi: 'राज्यों में राष्ट्रपति शासन (संवैधानिक तंत्र की विफलता) किस अनुच्छेद में लगता है?', ansEn: 'Article 356', ansBn: 'ধারা ৩৫৬ (Article 356)', ansHi: 'अनुच्छेद 356 (Article 356)' },
        { qEn: 'Under which Article can Financial Emergency be proclaimed in India?', qBn: 'ভারতে আর্থিক জরুরি অবস্থা (Financial Emergency) কোন ধারায় জারি হতে পারে?', qHi: 'वित्तीय आपातकाल का प्रावधान संविधान के किस अनुच्छेद में है?', ansEn: 'Article 360', ansBn: 'ধারা ৩৬০ (Article 360)', ansHi: 'अनुच्छेद 360 (Article 360)' },
      ],
    },
    {
      topicId: 'pol_judiciary',
      topicEn: 'Supreme Court & State Govt',
      topicBn: 'সুপ্রিম কোর্ট ও রাজ্য সরকার',
      topicHi: 'सर्वोच्च न्यायालय और राज्य सरकार',
      items: [
        { qEn: 'What is the retirement age of a Judge of the Supreme Court of India?', qBn: 'সুপ্রিম কোর্টের বিচারপতিদের অবসর গ্রহণের বয়স কত?', qHi: 'सर्वोच्च न्यायालय के न्यायाधीशों की सेवानिवृत्ति की आयु क्या है?', ansEn: '65 Years', ansBn: '৬৫ বছর', ansHi: '65 वर्ष' },
        { qEn: 'What is the retirement age of a Judge of a High Court in India?', qBn: 'হাইকোর্টের বিচারপতিদের অবসর গ্রহণের বয়স কত?', qHi: 'उच्च न्यायालय (High Court) के न्यायाधीशों की सेवानिवृत्ति आयु क्या है?', ansEn: '62 Years', ansBn: '৬২ বছর', ansHi: '62 वर्ष' },
        { qEn: 'Who was the first Chief Justice of independent India?', qBn: 'স্বাধীন ভারতের প্রথম প্রধান বিচারপতি (CJI) কে ছিলেন?', qHi: 'स्वतंत्र भारत के प्रथम मुख्य न्यायाधीश (CJI) कौन थे?', ansEn: 'Justice H.J. Kania', ansBn: 'বিচারপতি এইচ. জে. কানিয়া', ansHi: 'न्यायमूर्ति एच. जे. कानिया' },
        { qEn: 'Under which Article can a High Court issue Writs for enforcement of rights?', qBn: 'হাইকোর্ট সংবিধানের কোন ধারা অনুযায়ী লেখ (Writs) জারি করতে পারে?', qHi: 'उच्च न्यायालय किस अनुच्छेद के तहत रिट (Writs) जारी कर सकता है?', ansEn: 'Article 226', ansBn: 'ধারা ২২৬ (Article 226)', ansHi: 'अनुच्छेद 226 (Article 226)' },
        { qEn: 'Under which Article can the President seek advisory opinion from the Supreme Court?', qBn: 'রাষ্ট্রপতি কোন ধারা অনুযায়ী সুপ্রিম কোর্টের কাছে আইনি পরামর্শ চাইতে পারেন?', qHi: 'राष्ट्रपति किस अनुच्छेद के तहत सर्वोच्च न्यायालय से परामर्श मांग सकते हैं?', ansEn: 'Article 143', ansBn: 'ধারা ১৪৩ (Article 143)', ansHi: 'अनुच्छेद 143 (Article 143)' },
        { qEn: 'Who appoints the Governor of a State in India?', qBn: 'রাজ্যের রাজ্যপালকে (Governor) কে নিয়োগ করেন?', qHi: 'राज्य के राज्यपाल की नियुक्ति कौन करता है?', ansEn: 'President of India', ansBn: 'ভারতের রাষ্ট্রপতি', ansHi: 'भारत का राष्ट्रपति' },
        { qEn: 'Who administers the oath of office to the Governor of a State?', qBn: 'রাজ্যপালকে শপথবাক্য পাঠ করান কে?', qHi: 'राज्यपाल को पद की शपथ कौन दिलाता है?', ansEn: 'Chief Justice of the High Court', ansBn: 'সংশ্লিষ্ট হাইকোর্টের প্রধান বিচারপতি', ansHi: 'संबंधित उच्च न्यायालय का मुख्य न्यायाधीश' },
        { qEn: 'Who is the highest law officer of a State Government (Article 165)?', qBn: 'রাজ্য সরকারের সর্বোচ্চ আইন আধিকারিক কে (ধারা ১৬৫)?', qHi: 'राज्य सरकार का सर्वोच्च विधि अधिकारी (अनुच्छेद 165) कौन होता है?', ansEn: 'Advocate General', ansBn: 'অ্যাডভোকেট জেনারেল', ansHi: 'महाधिवक्ता (Advocate General)' },
        { qEn: 'Which was the first state in India to inaugurate Panchayati Raj on 2 Oct 1959?', qBn: '১৯৫৯ সালের ২ অক্টোবর ভারতের কোন রাজ্যে প্রথম পঞ্চায়েতি রাজ চালু হয়?', qHi: '2 अक्टूबर 1959 को पंचायती राज लागू करने वाला पहला राज्य कौन सा था?', ansEn: 'Rajasthan (Nagaur district)', ansBn: 'রাজস্থান (নাগৌর জেলা)', ansHi: 'राजस्थान (नागौर जिला)' },
        { qEn: 'Which Committee recommended the 3-tier Panchayati Raj system in 1957?', qBn: '১৯৫৭ সালে ত্রিস্তর পঞ্চায়েতি রাজ ব্যবস্থার সুপারিশ করেছিল কোন কমিটি?', qHi: 'त्रिस्तरीय पंचायती राज व्यवस्था की सिफारिश किस समिति ने की थी?', ansEn: 'Balwant Rai Mehta Committee', ansBn: 'বলবন্ত রাই মেহতা কমিটি', ansHi: 'बलवंत राय मेहता समिति' },
        { qEn: 'What is the minimum age required to contest Panchayat or Municipal elections?', qBn: 'পঞ্চায়েত বা পৌরসভা নির্বাচনে প্রার্থী হওয়ার ন্যূনতম বয়স কত?', qHi: 'पंचायत या नगरपालिका चुनाव लड़ने के लिए न्यूनतम आयु क्या है?', ansEn: '21 Years', ansBn: '২১ বছর', ansHi: '21 वर्ष' },
        { qEn: 'Which Constitutional Amendment granted constitutional status to Panchayati Raj?', qBn: 'কোন সংবিধান সংশোধনীর মাধ্যমে পঞ্চায়েতি রাজ সাংবিধানিক মর্যাদা পায়?', qHi: 'किस संविधान संशोधन द्वारा पंचायती राज को संवैधानिक दर्जा दिया गया?', ansEn: '73rd Amendment Act, 1992', ansBn: '৭৩তম সংশোধনী আইন, ১৯৯২', ansHi: '73वाँ संशोधन अधिनियम, 1992' },
        { qEn: 'Which Constitutional Amendment granted constitutional status to Municipalities?', qBn: 'পৌরসভা (Municipalities) কোন সংবিধান সংশোধনীর মাধ্যমে সাংবিধানিক মর্যাদা পায়?', qHi: 'नगरपालिकाओं को किस संविधान संशोधन द्वारा संवैधानिक दर्जा मिला?', ansEn: '74th Amendment Act, 1992', ansBn: '৭৪তম সংশোধনী আইন, ১৯৯২', ansHi: '74वाँ संशोधन अधिनियम, 1992' },
        { qEn: 'Which is the oldest High Court in India established in 1862?', qBn: '১৮৬২ সালে প্রতিষ্ঠিত ভারতের প্রাচীনতম হাইকোর্ট কোনটি?', qHi: '1862 में स्थापित भारत का सबसे पुराना उच्च न्यायालय कौन सा है?', ansEn: 'Calcutta High Court', ansBn: 'কলকাতা হাইকোর্ট', ansHi: 'कलकत्ता उच्च न्यायालय' },
        { qEn: 'In landmark case Kesavananda Bharati v. State of Kerala (1973), what doctrine was propounded?', qBn: '১৯৭৩ সালের কেশবানন্দ ভারতী মামলায় সুপ্রিম কোর্ট কোন তত্ত্ব প্রতিষ্ঠা করে?', qHi: '1973 के केशवानंद भारती मामले में सर्वोच्च न्यायालय ने कौन सा सिद्धांत दिया?', ansEn: 'Basic Structure Doctrine', ansBn: 'সংবিধানের মূল কাঠামো তত্ত্ব', ansHi: 'मूल ढांचे का सिद्धांत (Basic Structure)' },
        { qEn: 'Who is known as the pioneer of Public Interest Litigation (PIL) in India?', qBn: 'ভারতে জনস্বার্থ মামলা (PIL)-এর প্রতিকৃৎ কোন বিচারপতিদের মানা হয়?', qHi: 'भारत में जनहित याचिका (PIL) का जनक किन न्यायाधीशों को माना जाता है?', ansEn: 'Justice P.N. Bhagwati & V.R. Krishna Iyer', ansBn: 'বিচারপতি পি. এন. ভগবতী ও কৃষ্ণ আয়ার', ansHi: 'न्यायमूर्ति पी. एन. भगवती और वी. आर. कृष्णा अय्यर' },
        { qEn: 'Under which Article does the Governor issue Ordinances in a State?', qBn: 'রাজ্যপাল সংবিধানের কোন ধারা অনুযায়ী রাজ্যে অধ্যাদেশ জারি করেন?', qHi: 'राज्यपाल किस अनुच्छेद के तहत राज्य में अध्यादेश जारी करते हैं?', ansEn: 'Article 213', ansBn: 'ধারা ২১৩ (Article 213)', ansHi: 'अनुच्छेद 213 (Article 213)' },
        { qEn: 'What can be the maximum strength of a State Legislative Assembly (Vidhan Sabha)?', qBn: 'কোনো রাজ্যের বিধানসভার সর্বাধিক সদস্য সংখ্যা কত হতে পারে?', qHi: 'किसी राज्य विधानसभा की अधिकतम सदस्य संख्या कितनी हो सकती है?', ansEn: '500 Members (Min 60)', ansBn: '৫০০ জন (ন্যূনতম ৬০)', ansHi: '500 सदस्य (न्यूनतम 60)' },
        { qEn: 'Which Article empowers Parliament to create or abolish a State Legislative Council (Vidhan Parishad)?', qBn: 'রাজ্যের বিধান পরিষদ গঠন বা অবলুপ্তির ক্ষমতা কোন ধারায় রয়েছে?', qHi: 'राज्य विधान परिषद के सृजन या उत्सादन का प्रावधान किस अनुच्छेद में है?', ansEn: 'Article 169', ansBn: 'ধারা ১৬৯ (Article 169)', ansHi: 'अनुच्छेद 169 (Article 169)' },
        { qEn: 'On which date is National Panchayati Raj Day celebrated in India?', qBn: 'ভারতে "জাতীয় পঞ্চায়েতি রাজ দিবস" কবে পালিত হয়?', qHi: 'भारत में "राष्ट्रीय पंचायती राज दिवस" कब मनाया जाता है?', ansEn: '24 April', ansBn: '২৪ এপ্রিল', ansHi: '24 अप्रैल' },
      ],
    },
    {
      topicId: 'pol_amendments',
      topicEn: 'Schedules, Articles & Amendments',
      topicBn: 'তফসিল, ধারা ও সংশোধনী',
      topicHi: 'अनुसूचियाँ, अनुच्छेद और संशोधन',
      items: [
        { qEn: 'Which Schedule of the Indian Constitution lists the 22 recognized official languages?', qBn: 'সংবিধানের কোন তফসিলে ২২টি স্বীকৃত ভাষার উল্লেখ রয়েছে?', qHi: 'संविधान की किस अनुसूची में 22 मान्यता प्राप्त भाषाओं का उल्लेख है?', ansEn: 'Eighth Schedule', ansBn: 'অষ্টম তফসিল (8th Schedule)', ansHi: 'आठवीं अनुसूची (8th Schedule)' },
        { qEn: 'Which Schedule deals with the Anti-Defection Law (added by 52nd Amendment, 1985)?', qBn: 'দলত্যাগ বিরোধী আইন (৫২তম সংশোধনী) কোন তফসিলে রয়েছে?', qHi: 'दलबदल विरोधी कानून (52वाँ संशोधन) किस अनुसूची में है?', ansEn: 'Tenth Schedule', ansBn: 'দশম তফসিল (10th Schedule)', ansHi: 'दसवीं अनुसूची (10th Schedule)' },
        { qEn: 'Which Schedule divides powers into Union, State, and Concurrent Lists?', qBn: 'কেন্দ্র, রাজ্য ও যুগ্ম তালিকার ক্ষমতা বণ্টন কোন তফসিলে রয়েছে?', qHi: 'संघ, राज्य और समवर्ती सूची का विभाजन किस अनुसूची में है?', ansEn: 'Seventh Schedule', ansBn: 'সপ্তম তফসিল (7th Schedule)', ansHi: 'सातवीं अनुसूची (7th Schedule)' },
        { qEn: 'Which Amendment lowered the voting age from 21 years to 18 years?', qBn: 'কোন সংবিধান সংশোধনীর মাধ্যমে ভোটাধিকারের বয়স ২১ থেকে কমিয়ে ১৮ বছর করা হয়?', qHi: 'किस संविधान संशोधन द्वारा मतदान की आयु 21 से घटाकर 18 वर्ष की गई?', ansEn: '61st Amendment Act, 1988', ansBn: '৬১তম সংশোধনী আইন, ১৯৮৮', ansHi: '61वाँ संशोधन अधिनियम, 1988' },
        { qEn: 'Which Amendment is known as the "Mini-Constitution" of India?', qBn: 'কোন সংবিধান সংশোধনীকে ভারতের "ক্ষুদ্র সংবিধান" (Mini Constitution) বলা হয়?', qHi: 'किस संविधान संशोधन को "लघु संविधान" (Mini-Constitution) कहा जाता है?', ansEn: '42nd Amendment Act, 1976', ansBn: '৪২তম সংশোধনী আইন, ১৯৭৬', ansHi: '42वाँ संशोधन अधिनियम, 1976' },
        { qEn: 'Which Constitutional Amendment introduced the Goods and Services Tax (GST)?', qBn: 'জিএসটি (GST) কোন সংবিধান সংশোধনী আইনের মাধ্যমে চালু হয়?', qHi: 'वस्तु एवं सेवा कर (GST) किस संविधान संशोधन द्वारा लागू किया गया?', ansEn: '101st Amendment Act, 2016', ansBn: '১০১তম সংশোধনী আইন, ২০১৬', ansHi: '101वाँ संशोधन अधिनियम, 2016' },
        { qEn: 'Which Amendment provided 10% reservation for Economically Weaker Sections (EWS)?', qBn: 'আর্থিকভাবে দুর্বল শ্রেণির (EWS) জন্য ১০% সংরক্ষণ কোন সংশোধনীতে দেওয়া হয়েছে?', qHi: 'आर्थिक रूप से कमजोर वर्ग (EWS) को 10% आरक्षण किस संशोधन से मिला?', ansEn: '103rd Amendment Act, 2019', ansBn: '১০৩তম সংশোধনী আইন, ২০১৯', ansHi: '103वाँ संशोधन अधिनियम, 2019' },
        { qEn: 'Which Amendment (Nari Shakti Vandan Adhiniyam) provides 33% reservation for women in Lok Sabha & Assemblies?', qBn: 'লোকসভা ও বিধানসভায় মহিলাদের ৩৩% আসন সংরক্ষণ কোন সংশোধনী আইনে রয়েছে?', qHi: 'लोकसभा और विधानसभाओं में महिलाओं को 33% आरक्षण किस संशोधन से मिला?', ansEn: '106th Amendment Act, 2023', ansBn: '১০৬তম সংশোধনী আইন, ২০২৩', ansHi: '106वाँ संशोधन अधिनियम, 2023' },
        { qEn: 'Which Article provides for the Finance Commission of India every 5 years?', qBn: 'প্রতি ৫ বছর অন্তর অর্থ কমিশন (Finance Commission) গঠনের কথা কোন ধারায় আছে?', qHi: 'वित्त आयोग (Finance Commission) के गठन का प्रावधान किस अनुच्छेद में है?', ansEn: 'Article 280', ansBn: 'ধারা ২৮০ (Article 280)', ansHi: 'अनुच्छेद 280 (Article 280)' },
        { qEn: 'Which Article vests the superintendence and conduct of elections in the Election Commission?', qBn: 'ভারতের নির্বাচন কমিশনের (Election Commission) কথা সংবিধানের কোন ধারায় বলা হয়েছে?', qHi: 'निर्वाचन आयोग (Election Commission) का उल्लेख किस अनुच्छेद में है?', ansEn: 'Article 324', ansBn: 'ধারা ৩২৪ (Article 324)', ansHi: 'अनुच्छेद 324 (Article 324)' },
        { qEn: 'Which Article deals with the Union Public Service Commission (UPSC)?', qBn: 'ইউপিএসসি (UPSC) ও রাজ্য পাবলিক সার্ভিস কমিশন কোন ধারায় গঠিত হয়?', qHi: 'संघ लोक सेवा आयोग (UPSC) का प्रावधान किस अनुच्छेद में है?', ansEn: 'Article 315', ansBn: 'ধারা ৩১৫ (Article 315)', ansHi: 'अनुच्छेद 315 (Article 315)' },
        { qEn: 'Which Article declares Hindi in Devanagari script as the Official Language of the Union?', qBn: 'দেবনাগরী হরফে হিন্দিকে কেন্দ্রের সরকারি ভাষার স্বীকৃতি দেওয়া হয়েছে কোন ধারায়?', qHi: 'संघ की राजभाषा हिंदी और लिपि देवनागरी किस अनुच्छेद में घोषित है?', ansEn: 'Article 343', ansBn: 'ধারা ৩৪৩ (Article 343)', ansHi: 'अनुच्छेद 343 (Article 343)' },
        { qEn: 'Which Schedule contains 29 functional items assigned to Panchayats?', qBn: 'পঞ্চায়েতের ২৯টি কাজের তালিকা সংবিধানের কোন তফসিলে রয়েছে?', qHi: 'पंचायतों से संबंधित 29 विषयों का उल्लेख किस अनुसूची में है?', ansEn: 'Eleventh Schedule', ansBn: 'একাদশ তফসিল (11th Schedule)', ansHi: 'ग्यारहवीं अनुसूची (11th Schedule)' },
        { qEn: 'Which Schedule contains 18 functional items assigned to Municipalities?', qBn: 'পৌরসভার ১৮টি কাজের তালিকা সংবিধানের কোন তফসিলে রয়েছে?', qHi: 'नगरपालिकाओं के 18 विषयों का उल्लेख किस अनुसूची में है?', ansEn: 'Twelfth Schedule', ansBn: 'দ্বাদশ তফসিল (12th Schedule)', ansHi: 'बारहवीं अनुसूची (12th Schedule)' },
        { qEn: 'Which Schedule deals with administration of tribal areas in Assam, Meghalaya, Tripura & Mizoram?', qBn: 'আসাম, মেঘালয়, ত্রিপুরা ও মিজোরামের উপজাতি অঞ্চলের শাসন কোন তফসিলে রয়েছে?', qHi: 'असम, मेघालय, त्रिपुरा और मिजोरम के जनजातीय क्षेत्रों का प्रशासन किस अनुसूची में है?', ansEn: 'Sixth Schedule', ansBn: 'ষষ্ঠ তফসিল (6th Schedule)', ansHi: 'छठी अनुसूची (6th Schedule)' },
        { qEn: 'Who is the ex-officio Chairperson of NITI Aayog (established on 1 Jan 2015)?', qBn: 'নীতি আয়োগ (NITI Aayog)-এর পদাধিকারবলে চেয়ারম্যান কে হন?', qHi: 'नीति आयोग (1 जनवरी 2015 को गठित) का पदेन अध्यक्ष कौन होता है?', ansEn: 'Prime Minister of India', ansBn: 'ভারতের প্রধানমন্ত্রী', ansHi: 'भारत का प्रधानमंत्री' },
        { qEn: 'Who was the first Chief Election Commissioner of India?', qBn: 'ভারতের প্রথম মুখ্য নির্বাচন কমিশনার কে ছিলেন?', qHi: 'भारत के प्रथम मुख्य चुनाव आयुक्त कौन थे?', ansEn: 'Sukumar Sen', ansBn: 'সুকুমার সেন', ansHi: 'सुकुमार सेन' },
        { qEn: 'Which Amendment added the Ninth Schedule to the Constitution in 1951?', qBn: '১৯৫১ সালে কোন সংশোধনীর মাধ্যমে সংবিধানে নবম তফসিল যুক্ত হয়?', qHi: '1951 में किस संशोधन द्वारा संविधान में नौवीं अनुसूची जोड़ी गई?', ansEn: 'First Amendment Act, 1951', ansBn: 'প্রথম সংশোধনী আইন, ১৯৫১', ansHi: 'प्रथम संशोधन अधिनियम, 1951' },
        { qEn: 'Which Amendment capped the size of the Council of Ministers at 15% of the Lower House?', qBn: 'মন্ত্রিসভার আকার লোকসভা বা বিধানসভার সদস্য সংখ্যার ১৫%-এ সীমাবদ্ধ করা হয় কোন সংশোধনীতে?', qHi: 'मंत्रिपरिषद का आकार सदन के 15% तक किस संशोधन द्वारा सीमित किया गया?', ansEn: '91st Amendment Act, 2003', ansBn: '৯১তম সংশোধনী আইন, ২০০৩', ansHi: '91वाँ संशोधन अधिनियम, 2003' },
        { qEn: 'Which Languages were added to the 8th Schedule by the 92nd Amendment Act, 2003?', qBn: '৯২তম সংশোধনী আইনের (২০০৩) মাধ্যমে অষ্টম তফসিলে কোন চারটি ভাষা যুক্ত হয়?', qHi: '92वें संशोधन अधिनियम (2003) द्वारा आठवीं अनुसूची में कौन सी चार भाषाएँ जोड़ी गईं?', ansEn: 'Bodo, Dogri, Maithili & Santhali', ansBn: 'বোড়ো, ডোগরি, মৈথিলি ও সাঁওতালি', ansHi: 'बोडो, डोगरी, मैथिली और संथाली' },
      ],
    },
  ]);
}
