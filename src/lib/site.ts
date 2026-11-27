export type DoctorInfo = {
  name: string;
  shortTitle: string;
  degrees: string;
  bmdc: string;
  hospital: string;
  address: string;
  phone: string;
  phoneHref: string;
  assistantPhone: string;
  assistantHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  website: string;
  facebook: string;
  facebookLabel: string;
  youtube: string;
  youtubeLabel: string;
  linkedin: string;
  hoursSummary: string;
  callCenterHours: string;
  scheduleRow1: string;
  scheduleRow2: string;
  scheduleRow3: string;
  closedDay: string;
  mapEmbedUrl: string;
};

export type EyeService = {
  slug: string;
  title: string;
  summary: string;
  cta: string;
  image: string;
  cardClass: string;
  imgWrapClass: string;
};

export type PublicationItem = {
  id: string;
  year: number;
  kind: string;
  topics: string[];
  firstAuthor: boolean;
  title: string;
  authors: string;
  journal: string;
  citation: string;
  url: string;
};

export type VideoItem = {
  id: string;
  ytId: string;
  title: string;
  channel: "dbc" | "ntv" | "rtv" | "boishakhi" | "nexus" | "own";
  channelLabel: string;
  topic: string;
  show: string;
  date: string;
  duration: string;
  thumb: string;
  featured?: boolean;
};

export type GalleryItem = {
  id: string;
  category: "conference" | "training" | "portrait" | "travel";
  title: string;
  place: string;
  image: string;
  thumb: string;
  showOnHome: boolean;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
};

export type AchievementItem = {
  id: string;
  tag: string;
  icon: string;
  title: string;
  meta: string;
  desc: string;
  quote: string;
  footIcon: string;
  footText: string;
  link: string;
  img: string;
  fullImg: string;
};

export const doctor: DoctorInfo = {
  name: "Dr. Md. Afzal Mahfuzullah",
  shortTitle: "Vitreo-Retina Specialist & Phaco Surgeon",
  degrees: "MBBS, MCPS, FCPS (Ophthalmology), Fellow — Vitreo-Retina",
  bmdc: "A-48558",
  hospital: "VISION EYE HOSPITAL",
  address: "299, Green Road, Dhaka",
  phone: "09610244123",
  phoneHref: "tel:+8809610244123",
  assistantPhone: "01988815714",
  assistantHref: "tel:+8801988815714",
  whatsapp: "+8801720053045",
  whatsappHref: "https://wa.me/8801720053045",
  email: "drafzalmahfuzullah@gmail.com",
  website: "www.visioneyebd.org",
  facebook: "https://www.facebook.com/dr.mdafzalmahfuzullah",
  facebookLabel: "dr.mdafzalmahfuzullah",
  youtube: "https://www.youtube.com/@afzalmahfuzullah1002",
  youtubeLabel: "@afzalmahfuzullah1002",
  linkedin: "https://www.linkedin.com/in/dr-md-afzal-mahfuzullah-0a696382",
  hoursSummary: "Sat 5:30–9:00 PM · Sun 5:30–9:00 PM · Mon 5:30–9:00 PM · Tue 5:30–9:00 PM · Wed 6:30–9:00 PM · Thu 5:30–8:00 PM",
  callCenterHours: "Call centre 8:00 AM – 10:00 PM",
  scheduleRow1: "Saturday: 5:30 PM – 9:00 PM  |  Sunday: 5:30 PM – 9:00 PM",
  scheduleRow2: "Monday: 5:30 PM – 9:00 PM  |  Tuesday: 5:30 PM – 9:00 PM",
  scheduleRow3: "Wednesday: 6:30 PM – 9:00 PM  |  Thursday: 5:30 PM – 8:00 PM",
  closedDay: "Friday: Closed",
  mapEmbedUrl: "https://www.google.com/maps?q=Vision%20Eye%20Hospital%2C%20299%20Green%20Road%2C%20Dhaka%2C%20Bangladesh&output=embed",
};

export const services: EyeService[] = [
  { slug: "cataract-surgery", title: "Cataract Surgery", summary: "Modern phacoemulsification surgery with advanced intraocular lens (IOL) implantation for clear vision.", cta: "Book Consultation", image: "/site/images/services/cataract-surgery.webp", cardClass: "serrr1", imgWrapClass: "serrr2" },
  { slug: "retina-management", title: "Retina Management", summary: "Diagnosis and management of retinal diseases affecting vision and eye health.", cta: "Book Consultation", image: "/site/images/services/retina-management.webp", cardClass: "serrr11", imgWrapClass: "serrr12" },
  { slug: "glaucoma-management", title: "Glaucoma Management", summary: "Diagnosis and treatment of glaucoma including medication, laser, and surgical options to protect against optic nerve damage.", cta: "Book Consultation", image: "/site/images/services/glaucoma-management.webp", cardClass: "serrr3", imgWrapClass: "serrr4" },
  { slug: "pediatric-eye-care", title: "Pediatric Eye Care", summary: "Childhood refractive errors, squint (strabismus), amblyopia (lazy eye), and pediatric eye examinations.", cta: "Book Consultation", image: "/site/images/services/pediatric-eye-care.webp", cardClass: "serrr7", imgWrapClass: "serrr8" },
  { slug: "refractive-correction", title: "Refractive Error Correction", summary: "Comprehensive eye check-up for glasses prescription — myopia, hyperopia, astigmatism, and presbyopia.", cta: "Book Consultation", image: "/site/images/services/refractive-correction.webp", cardClass: "serrr9", imgWrapClass: "serrr10" },
  { slug: "eye-checkup", title: "Comprehensive Eye Checkup", summary: "Complete eye health assessment including vision, refraction, slit-lamp exam, and retinal evaluation.", cta: "Book Consultation", image: "/site/images/services/eye-checkup.webp", cardClass: "serrr11", imgWrapClass: "serrr12" },
  { slug: "dry-eye-care", title: "Dry Eye & Corneal Care", summary: "Management of dry eye syndrome, corneal infections, ulcers, and other anterior segment disorders.", cta: "Book Consultation", image: "/site/images/services/dry-eye-care.webp", cardClass: "serrr11", imgWrapClass: "serrr12" },
  { slug: "minor-procedures", title: "Minor Ocular Procedures", summary: "Incision & drainage of stye, chalazion removal, foreign body removal, and pterygium surgery.", cta: "Book Consultation", image: "/site/images/services/minor-procedures.webp", cardClass: "serrr11", imgWrapClass: "serrr12" },
];

export const publications: PublicationItem[] = [
  { id: "pub-23", year: 2026, kind: "Original article", topics: ["refractive"], firstAuthor: false, title: "Refractive status of diabetic patients at Bangladesh Medical University (BMU)", authors: "Noman SM, Das R, Mahfuzullah MA, Haque M, Mehtaj T", journal: "Journal of Ophthalmology and Research", citation: "2026 · Vol. 3 · p. 25", url: "https://www.fortunejournals.com/abstract/refractive-status-of-diabetic-patients-at-bangladesh-medical-university-bmu-6035.html" },
  { id: "pub-22", year: 2026, kind: "Original article", topics: ["covid"], firstAuthor: true, title: "Evaluation of ocular findings in patients with coronavirus disease (COVID-19)", authors: "Mahfuzullah MA, Anwar NB, Zafrullah TA, Noman SM, Anwar B, Lasker MA", journal: "The Eastern Eye", citation: "2026 · Vol. 2 (1) · pp. 9–13", url: "https://easterneyejournal.net/evaluation-of-ocular-findings-in-patients-with-coronavirus-disease-covid-19/" },
  { id: "pub-21", year: 2025, kind: "Original article", topics: ["surface"], firstAuthor: false, title: "Autologous serum eye drops for treatment of dry eye syndrome", authors: "Shaheen SSI, Hoque A, Mahfuzullah MA, Ahmed MS, Sharmin E", journal: "Bangabandhu Sheikh Mujib Medical University Journal", citation: "2025 · Vol. 17", url: "https://doi.org/10.3329/bsmmuj.v17i2.70255" },
  { id: "pub-20", year: 2025, kind: "Original article", topics: ["glaucoma", "retina"], firstAuthor: false, title: "Management of neovascular glaucoma for retinal diseases at Bangladesh Medical University", authors: "Mehtaj T, Noman SM, Haque M, Das R, Mahfuzullah MA", journal: "Journal of Bangladesh Glaucoma Society", citation: "2025 · Vol. 13 · p. 18", url: "" },
  { id: "pub-19", year: 2025, kind: "Original article", topics: ["glaucoma"], firstAuthor: false, title: "Outcome of filtration surgery in advanced POAG in patients attending the Glaucoma Clinic at BMU", authors: "Haque M, Mahfuzullah MA, Noman SM, Mehtaj T, Das R", journal: "Journal of Bangladesh Glaucoma Society", citation: "2025 · Vol. 13 · p. 35", url: "" },
  { id: "pub-18", year: 2025, kind: "Original article", topics: ["pediatric"], firstAuthor: false, title: "Smartphone overuse as a trigger for acquired comitant esotropia: a growing visual concern", authors: "Zafrullah TA, Gazi SS, Rahman S, Shamsuddoha AB, Mahfuzullah MA", journal: "Journal of Bangladesh Academy of Ophthalmology", citation: "2025 · Vol. 1 (1) · pp. 6–12", url: "" },
  { id: "pub-17", year: 2024, kind: "Original article", topics: ["pediatric", "retina"], firstAuthor: false, title: "Ophthalmological changes in children with advanced stage of chronic kidney disease: a hospital-based study", authors: "Datta AK, Begum A, Roy RR, Jesmin T, Al Mamun A, Mahfuzullah MA, Chowdhury F, Iktidar MA", journal: "BMJ Paediatrics Open", citation: "2024 · Vol. 8", url: "https://doi.org/10.1136/bmjpo-2024-002777" },
  { id: "pub-16", year: 2024, kind: "Original article", topics: ["retina"], firstAuthor: false, title: "Comparing the outcomes of anti-VEGF treatment for choroidal neovascular membrane", authors: "Bhuyan MMR, Kadir SMU, Faridi J, Sultana N, Mahfuzullah MA, Hasan SN", journal: "Community Based Medical Journal", citation: "2024 · Vol. 13 · pp. 265–273", url: "https://doi.org/10.3329/cbmj.v13i2.75318" },
  { id: "pub-15", year: 2024, kind: "Original article", topics: ["glaucoma"], firstAuthor: false, title: "Relationship between sleep position and glaucoma progression", authors: "Islam MM, Hossian MS, Raina MZ, Mahfuzullah MA", journal: "International Journal of Ophthalmology & Visual Science", citation: "2024 · Vol. 9 · pp. 56–61", url: "https://doi.org/10.11648/j.ijovs.20240904.11" },
  { id: "pub-14", year: 2022, kind: "Original article", topics: ["glaucoma"], firstAuthor: false, title: "Clinical characteristics of pigment dispersion syndrome in Bangladeshi population", authors: "Noman SM, Akbar US, Haque M, Jabbar Z, Ahsan S, Mahfuzullah MA", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2022 · Vol. 49", url: "" },
  { id: "pub-13", year: 2021, kind: "Original article", topics: ["covid"], firstAuthor: true, title: "Assessment of coronavirus in the conjunctival tears and secretions in patients with SARS-CoV-2 infection in Bangladesh", authors: "Mahfuzullah MA, et al.", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2021 · Vol. 48 · pp. 9–13", url: "" },
  { id: "pub-12", year: 2021, kind: "Case series", topics: ["covid"], firstAuthor: true, title: "Neuro-ophthalmologic manifestations of coronavirus disease (COVID-19): a case series", authors: "Mahfuzullah MA, Ahmed MS, Khaled Z, et al.", journal: "Bangabandhu Sheikh Mujib Medical University Journal", citation: "2021 · Vol. 14 · pp. 42–44", url: "https://doi.org/10.3329/bsmmuj.v14i3.54680" },
  { id: "pub-11", year: 2021, kind: "Original article", topics: ["retina"], firstAuthor: true, title: "Oral eplerenone for the management of chronic central serous chorioretinopathy", authors: "Mahfuzullah MA, Islam MM, Hossain MGF, Haque M, Jesmin S", journal: "International Journal of Ophthalmology Sciences", citation: "2021 · Vol. 3 · pp. 6–8", url: "https://doi.org/10.33545/26648520.2021.v3.i1a.20" },
  { id: "pub-10", year: 2021, kind: "Original article", topics: ["retina"], firstAuthor: false, title: "Retinal nerve fibre layer thinning after silicone oil injection in patients with retinal detachment", authors: "Hassan SN, Begum S, Anwar NB, Anwar B, Chowdhury N, Mehtaj T, Mahfuzullah MA", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2021 · Vol. 48 · pp. 51–55", url: "" },
  { id: "pub-09", year: 2021, kind: "Case report", topics: ["glaucoma", "case"], firstAuthor: false, title: "Topiramate-induced acute angle closure glaucoma and high myopia: a case report", authors: "Das R, Haque M, Noman SM, Mahfuzullah MA, Jabbar Z, Khaled MZ", journal: "Ophthalmic Horizon", citation: "2021 · Vol. 16 · pp. 54–58", url: "" },
  { id: "pub-08", year: 2020, kind: "Case report", topics: ["covid", "case"], firstAuthor: false, title: "Detection of SARS-CoV-2 RNA in conjunctival swab of a COVID-19 patient: the first report from Bangladesh", authors: "Islam SMRU, Akhter T, Mahfuzullah MA, Nasif MAO, Jamil MS, Mosaddeque MB, Munshi SU", journal: "SAGE Open Medical Case Reports", citation: "2020 · Vol. 8", url: "https://doi.org/10.1177/2050313X20964103" },
  { id: "pub-07", year: 2019, kind: "Case report", topics: ["case"], firstAuthor: false, title: "A 50-year-old woman presented with severe reduction of vision and recurrent pain in right eye following cataract surgery", authors: "Khaleque MA, Mahfuzullah MA, Sarker S, Sajj AB, Islam MS", journal: "Bangabandhu Sheikh Mujib Medical University Journal", citation: "2019 · Vol. 12 (3) · pp. 154–158", url: "https://doi.org/10.3329/bsmmuj.v12i3.43330" },
  { id: "pub-06", year: 2017, kind: "Original article", topics: ["refractive", "pediatric"], firstAuthor: false, title: "Type and characteristics of refractive errors in Madrassa students of Jatrabari, Dhaka, Bangladesh", authors: "Hossain MS, Mahfuzullah MA, Haque M, Ahsan S", journal: "Journal of Community Ophthalmology", citation: "2017 · Vol. 10", url: "" },
  { id: "pub-05", year: 2016, kind: "Case report", topics: ["retina", "case"], firstAuthor: true, title: "Pathological myopia, V-pattern exotropia & unilateral retinal detachment in Rubinstein-Taybi syndrome: a rare case report", authors: "Mahfuzullah MA, Chowdhury N, Hassan SN, Kabir MS, Khaled MZ, Ahmed MS", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2016 · Vol. 43 · pp. 141–144", url: "" },
  { id: "pub-04", year: 2016, kind: "Case series", topics: ["retina", "case"], firstAuthor: true, title: "An unusual and spontaneous resolution of a macula-off total rhegmatogenous retinal detachment: a case series", authors: "Mahfuzullah MA, Chowdhury N, Hassan SN, Kabir MS, Khaled MZ, Ahmed MS", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2016 · Vol. 43 · pp. 132–136", url: "" },
  { id: "pub-03", year: 2016, kind: "Case report", topics: ["retina", "pediatric", "case"], firstAuthor: false, title: "Congenital retinoschisis: a report of two cases", authors: "Rabbi S, Rahman M, Nahar N, Malek MA, Ahmed T, Sumsujjaman M, Mahfuzullah MA", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2016 · Vol. 43 · pp. 149–152", url: "" },
  { id: "pub-02", year: 2015, kind: "Conference abstract", topics: ["retina", "case"], firstAuthor: true, title: "Choroidal osteoma with CNVM: successful treatment with laser photocoagulation", authors: "Mahfuzullah MA", journal: "Journal of Clinical & Experimental Ophthalmology", citation: "2015 · Supplement · Conference abstract", url: "https://omicsonline.org/2155-9570/2155-9570.S1.022-007.pdf" },
  { id: "pub-01", year: 2015, kind: "Original article", topics: ["refractive"], firstAuthor: true, title: "Type & characteristics of refractive error in diabetes mellitus (type 2) patients in 108 cases", authors: "Mahfuzullah MA, Kabir MS, Huda S, Hassan SN, Chowdhury N, Ahmed MS", journal: "Journal of Ophthalmological Society of Bangladesh", citation: "2015 · Vol. 42 · pp. 34–42", url: "" },
];

export const videos: VideoItem[] = [
  { id: "vid-01", ytId: "hDtoChwmqLM", title: "ছানি অপারেশন ও লেন্স সংযোজন, কোন লেন্স কখন", channel: "dbc", channelLabel: "DBC NEWS", topic: "Cataract", show: "স্বাস্থ্যকথা", date: "Jun 2026", duration: "20:26", thumb: "/site/images/video1-thumbnail-960.webp", featured: true },
  { id: "vid-02", ytId: "cj-2QrkqTJk", title: "ডায়াবেটিক রেটিনোপ্যাথি – নীরব অন্ধত্বের ঝুঁকি", channel: "rtv", channelLabel: "Rtv", topic: "Retina & Diabetes", show: "Medi Café · EP-34", date: "Apr 2026", duration: "19:06", thumb: "/site/images/videos/cj-2QrkqTJk-960.webp" },
  { id: "vid-03", ytId: "Z-odfM1Nx1k", title: "বাংলাদেশে রেটিনার রোগ বৃদ্ধির সতর্কবার্তা", channel: "rtv", channelLabel: "Rtv", topic: "Retina & Diabetes", show: "Medi Café", date: "Apr 2026", duration: "3:38", thumb: "/site/images/videos/Z-odfM1Nx1k-960.webp" },
  { id: "vid-04", ytId: "OI3BJ7T6QGI", title: "ঝাপসা দৃষ্টি ও অন্ধত্বের ঝুঁকি নিয়ে বিশেষ আলোচনা", channel: "rtv", channelLabel: "Rtv", topic: "Retina & Diabetes", show: "Medi Café", date: "Apr 2026", duration: "2:47", thumb: "/site/images/videos/OI3BJ7T6QGI-960.webp" },
  { id: "vid-05", ytId: "x1QQnxY5dC8", title: "ছানি অপারেশনের ঝুঁকি ও চিকিৎসা", channel: "dbc", channelLabel: "DBC NEWS", topic: "Cataract", show: "স্বাস্থ্যকথা", date: "Sep 2025", duration: "19:06", thumb: "/site/images/videos/x1QQnxY5dC8-960.webp" },
  { id: "vid-06", ytId: "8DJ3jG6o0ms", title: "ডায়াবেটিস জনিত চোখের সমস্যা", channel: "boishakhi", channelLabel: "Boishakhi TV", topic: "Retina & Diabetes", show: "সরাসরি ডাক্তার · পর্ব ২৪৫", date: "Apr 2022", duration: "18:34", thumb: "/site/images/videos/8DJ3jG6o0ms-960.webp" },
  { id: "vid-07", ytId: "tBHTAMVrbe0", title: "ছানি পড়া রোধে করণীয়", channel: "dbc", channelLabel: "DBC NEWS", topic: "Cataract", show: "স্বাস্থ্যকথা", date: "Dec 2021", duration: "18:52", thumb: "/site/images/videos/tBHTAMVrbe0-960.webp" },
  { id: "vid-08", ytId: "u-d5hzJFzR0", title: "চোখের নানা রোগ ও চিকিৎসা", channel: "nexus", channelLabel: "Nexus TV", topic: "General eye care", show: "কেমন আছেন", date: "Oct 2021", duration: "57:29", thumb: "/site/images/videos/u-d5hzJFzR0-960.webp" },
  { id: "vid-09", ytId: "m-7jxFLRbOE", title: "ডায়াবেটিক রেটিনোপ্যাথি ও চোখের অন্যান্য সমস্যায় করণীয়", channel: "dbc", channelLabel: "DBC NEWS", topic: "Retina & Diabetes", show: "স্বাস্থ্যকথা", date: "Jul 2021", duration: "19:37", thumb: "/site/images/videos/m-7jxFLRbOE-960.webp" },
  { id: "vid-10", ytId: "a0oJ3oYe1K8", title: "চোখের যেসব সমস্যা হতে পারে", channel: "ntv", channelLabel: "NTV", topic: "General eye care", show: "স্বাস্থ্য প্রতিদিন", date: "Jan 2021", duration: "10:48", thumb: "/site/images/videos/a0oJ3oYe1K8-960.webp" },
  { id: "vid-11", ytId: "meA5Di2kca0", title: "ডায়াবেটিক রেটিনোপ্যাথি কী", channel: "ntv", channelLabel: "NTV", topic: "Retina & Diabetes", show: "স্বাস্থ্য প্রতিদিন", date: "Mar 2017", duration: "9:15", thumb: "/site/images/videos/meA5Di2kca0-640.webp" },
  { id: "vid-12", ytId: "v7iFeQEDVbQ", title: "ডায়াবেটিক রেটিনোপ্যাথি হলে করণীয়", channel: "ntv", channelLabel: "NTV", topic: "Retina & Diabetes", show: "স্বাস্থ্য প্রতিদিন · পর্ব ২৬৯০", date: "Mar 2017", duration: "17:41", thumb: "/site/images/videos/v7iFeQEDVbQ-640.webp" },
  { id: "vid-13", ytId: "AOEQmNQ0L6E", title: "চোখের বিভিন্ন সমস্যায় কী করবেন", channel: "ntv", channelLabel: "NTV", topic: "General eye care", show: "স্বাস্থ্য প্রতিদিন", date: "Mar 2017", duration: "10:55", thumb: "/site/images/videos/AOEQmNQ0L6E-640.webp" },
  { id: "vid-14", ytId: "_heBrw-gwL8", title: "চোখের বিভিন্ন সমস্যার সমাধানের উপায়", channel: "ntv", channelLabel: "NTV", topic: "General eye care", show: "স্বাস্থ্য প্রতিদিন · পর্ব ২৬৬৬", date: "Mar 2017", duration: "19:54", thumb: "/site/images/videos/_heBrw-gwL8-640.webp" },
  { id: "vid-15", ytId: "ZPc7UK4BFt4", title: "ডায়াবেটিক রেটিনোপ্যাথি কী ও করণীয়", channel: "own", channelLabel: "Own channel", topic: "Retina & Diabetes", show: "Dr. Afzal's channel", date: "Jul 2021", duration: "19:37", thumb: "/site/images/video2-thumbnail-960.webp" },
  { id: "vid-16", ytId: "k5aZkEhyRoI", title: "চোখের ছানি: লক্ষণ, ফ্যাকো সার্জারি ও কোন লেন্স লাগাবেন", channel: "own", channelLabel: "Own channel", topic: "Cataract", show: "Dr. Afzal's channel", date: "Sep 2020", duration: "52:55", thumb: "/site/images/video3-thumbnail-960.webp" },
  { id: "vid-17", ytId: "h9XHSyQxvC4", title: "রমজানের রোজায় চোখের ড্রপ ব্যবহার", channel: "own", channelLabel: "Own channel", topic: "General eye care", show: "Dr. Afzal's channel", date: "Apr 2020", duration: "2:46", thumb: "/site/images/video4-thumbnail-960.webp" },
];

const rawGallery: [number, GalleryItem["category"], string, string][] = [
  [1, "conference", "Speaking at the BVRS Conference 2026", "8th Bangladesh Vitreo-Retina Society Conference"],
  [2, "conference", "At the APVRS 2026 Congress", "Asia-Pacific Vitreo-Retina Society · Gold Coast, Australia"],
  [3, "conference", "8th BVRS Conference 2026", "Bangladesh Vitreo-Retina Society"],
  [4, "portrait", "Dr. Md. Afzal Mahfuzullah", "Vitreo-Retina Specialist & Phaco Surgeon"],
  [5, "training", "Hands-on surgical training", "Vitreo-retinal microsurgery skills lab"],
  [6, "training", "With fellow surgeons", "Advanced vitreo-retina training"],
  [7, "training", "Microsurgical practice session", "Advanced vitreo-retina training"],
  [8, "training", "Surgical skills lab", "With faculty & fellow surgeons"],
  [9, "conference", "At the congress exhibition", "International vitreo-retina meeting"],
  [10, "travel", "Between congress sessions", "Australia"],
  [11, "portrait", "Dr. Md. Afzal Mahfuzullah", "Associate Professor (Vitreo-Retina), BMU"],
  [12, "travel", "Sydney Harbour Bridge", "Sydney, Australia"],
  [13, "travel", "Sydney Harbour", "Sydney, Australia"],
  [14, "travel", "By the waterfront", "Gold Coast, Australia"],
  [15, "travel", "Riverside walk", "Gold Coast, Australia"],
  [16, "travel", "City by the water", "Gold Coast, Australia"],
  [17, "travel", "Among the towers", "Gold Coast, Australia"],
  [18, "travel", "Morning stroll", "Gold Coast, Australia"],
  [19, "travel", "Spring in the park", "Australia"],
  [20, "travel", "By the beach", "Australia"],
  [21, "travel", "Out in nature", "Australia"],
  [22, "travel", "Ocean breeze", "Australia"],
  [23, "travel", "Afternoon in the park", "Australia"],
  [24, "travel", "Out & about", "Australia"],
  [25, "travel", "Golden hour", "Australia"],
  [26, "travel", "Coastal view", "Australia"],
  [27, "travel", "In bloom", "Australia"],
  [28, "travel", "Riverside", "Australia"],
  [29, "travel", "Lakeside", "Australia"],
  [30, "travel", "Cloudy afternoon", "Australia"],
];
const homeGalleryIds = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14]);
const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

export const gallery: GalleryItem[] = rawGallery.map(([n, category, title, place]) => ({
  id: `gal-${pad2(n)}`,
  category,
  title,
  place,
  image: `/site/images/gallery/afzal-${pad2(n)}.webp`,
  thumb: `/site/images/gallery/thumbs/afzal-${pad2(n)}.webp`,
  showOnHome: homeGalleryIds.has(n),
}));

export const testimonials: TestimonialItem[] = [
  { id: "rev-1", name: "Mr. Abdul Karim", role: "CATARACT PATIENT", quote: "Dr. Md. Afzal Mahfuzullah performed phaco surgery with lens implants. Now I can read and watch TV without glasses.", image: "/site/images/photo-1566492031773-4f4e44671857.webp" },
  { id: "rev-2", name: "Mrs. Rehana Begum", role: "GLAUCOMA TREATMENT", quote: "Dr. Md. Afzal Mahfuzullah detected my glaucoma early during a routine checkup. Thanks to his treatment, my vision has been preserved.", image: "/site/images/photo-1544005313-94ddf0286df2.webp" },
  { id: "rev-3", name: "Child's Parents", role: "SQUINT CORRECTION", quote: "Our 5-year-old daughter had a squint eye. Dr. Md. Afzal Mahfuzullah performed surgery. Her eyes are straight and her confidence has grown.", image: "/site/images/photo-1507003211169-0a1dd7228f2d.webp" },
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    tag: "01 · Award",
    icon: "fa-trophy",
    title: "Best Abstract Award",
    meta: "APVRS 2026 · Surgical Video Section",
    desc: "Received the prestigious Best Abstract Award at the Asia-Pacific Vitreo-Retina Conference, Gold Coast, Australia.",
    quote: "“Deeply honoured and humbled… One more inspiration to learn, innovate, and contribute!”",
    footIcon: "fa-map-marker-alt",
    footText: "Gold Coast, Australia",
    link: "https://www.facebook.com/share/p/1HBnQeiRs2/",
    img: "/site/images/achievements/apvrs2026-award-ceremony-sm.webp",
    fullImg: "/site/images/achievements/apvrs2026-award-ceremony.webp",
  },
  {
    id: "ach-2",
    tag: "02 · Training",
    icon: "fa-microscope",
    title: "Advanced Vitreo Retinal Microsurgical Training",
    meta: "Hands-on · Gold Coast, Australia",
    desc: "Hands-on training on the latest vitreo-retinal surgical systems with leading surgeons from across the Asia-Pacific region.",
    quote: "New skills brought home to Vision Eye Hospital, Green Road, Dhaka.",
    footIcon: "fa-calendar-alt",
    footText: "August 2026",
    link: "https://www.facebook.com/share/p/18MY2qek3s/",
    img: "/site/images/achievements/apvrs2026-microsurgical-training-sm.webp",
    fullImg: "/site/images/achievements/apvrs2026-microsurgical-training.webp",
  },
];

export const homeVideoIds = ["hDtoChwmqLM", "ZPc7UK4BFt4", "k5aZkEhyRoI", "h9XHSyQxvC4"];

export const credentialsHome = [
  { icon: "fa-user-md", title: "MBBS", desc: "Bachelor of Medicine, Bachelor of Surgery" },
  { icon: "fa-building", title: "MCPS", desc: "Member of the College of Physicians and Surgeons" },
  { icon: "fa-award", title: "FCPS (Ophthalmology)", desc: "Fellow of the College of Physicians and Surgeons" },
  { icon: "fa-eye", title: "Fellow — Retina & Vitreous (IEH)", desc: "Vitreo-Retina Specialist and Phaco Surgeon" },
  { icon: "fa-plane-departure", title: "Advanced Training (India)", desc: "Advanced vitreoretinal surgery training at Susrut Eye Hospital, India" },
  { icon: "fa-microscope", title: "Advanced Vitreo Retinal Microsurgical Training", desc: "Gold Coast, Australia" },
  { icon: "fa-university", title: "Associate Professor (Vitreo-Retina)", desc: "Department of Ophthalmology, Bangladesh Medical University (BMU) · Joint Secretary General, Bangladesh Vitreo-Retina Society (BVRS)" },
  { icon: "fa-trophy", title: "Awards", desc: "Best Abstract Award, Asia Pacific Vitreo-Retina Conference, Gold Coast, Australia (2026) · M A Matin Gold Medal, OSB (2021) · Best Paper Award, OSB (2017)" },
  { icon: "fa-id-badge", title: "BMDC Reg: A-48558", desc: "Registered with Bangladesh Medical & Dental Council" },
  { icon: "fa-hospital", title: "VISION EYE HOSPITAL", desc: "299, Green Road, Dhaka · Call 09610244123 · 01988815714" },
];

export const credentialsAbout = [
  { icon: "fa-user-md", title: "MBBS", desc: "Bachelor of Medicine, Bachelor of Surgery" },
  { icon: "fa-flag", title: "MCPS", desc: "Member of the College of Physicians and Surgeons" },
  { icon: "fa-award", title: "FCPS (Ophthalmology)", desc: "Fellow of the College of Physicians and Surgeons" },
  { icon: "fa-eye", title: "Fellow — Retina & Vitreous (IEH)", desc: "Vitreo-Retina Specialist and Phaco Surgeon" },
  { icon: "fa-plane-departure", title: "Advanced Training (India)", desc: "Advanced vitreoretinal surgery training at Susrut Eye Hospital, India" },
  { icon: "fa-microscope", title: "Advanced Vitreo Retinal Microsurgical Training", desc: "Gold Coast, Australia" },
  { icon: "fa-university", title: "Associate Professor (Vitreo-Retina)", desc: "Department of Ophthalmology, Bangladesh Medical University (BMU)" },
  { icon: "fa-id-badge", title: "BMDC Reg: A-48558", desc: "Registered with Bangladesh Medical & Dental Council" },
  { icon: "fa-hospital", title: "VISION EYE HOSPITAL", desc: "299, Green Road, Dhaka · Call 09610244123 · 01988815714" },
  { icon: "fa-trophy", title: "Best Abstract Award, 2026", desc: "Asia Pacific Vitreo-Retina Conference, Gold Coast, Australia (27 August 2026)" },
  { icon: "fa-medal", title: "M A Matin Gold Medal, 2021", desc: "Prestigious award for best research work — Ophthalmological Society of Bangladesh (OSB) Conference" },
  { icon: "fa-award", title: "Best Paper Award, 2017", desc: "Ophthalmological Society of Bangladesh (OSB) Conference" },
  { icon: "fa-users", title: "Joint Secretary General", desc: "Bangladesh Vitreo-Retina Society (BVRS)" },
  { icon: "fa-chalkboard-teacher", title: "Conference Presentations", desc: "Several presentations at national and international conferences — Bangladesh, USA, Spain & Australia" },
  { icon: "fa-globe-europe", title: "International Memberships", desc: "Member of European Vitreo-Retina Society (EVRS), European Society of Cataract & Refractive Surgeons (ESCRS), All India Ophthalmological Society (AIOS)" },
  { icon: "fa-id-card", title: "Life Memberships", desc: "Ophthalmological Society of Bangladesh (OSB), Bangladesh Vitreo-Retina Society (BVRS), Bangladesh Uvea Society, BSCRS, BSL, BMA, OLSA, BAO, Bangladesh Neuro Ophthalmologist Association, BSMMU Alumni Association, BCPS Welfare Association" },
  { icon: "fa-microscope", title: "Clinical Areas", desc: "Cataract, Vitreo-Retina, ROP screening, retinal laser, retinal detachment, diabetic retinopathy (medical & surgical), intravitreal injections" },
];

export const quickProfile = [
  { icon: "fa-graduation-cap", title: "Medical Degrees", desc: "MBBS, MCPS, FCPS (Ophthalmology), Fellow — Vitreo-Retina" },
  { icon: "fa-certificate", title: "Specialized Training", desc: "Fellow — Retina & Vitreous (IEH); long-term fellowship in Vitreo-Retina (Bangladesh & India); advanced vitreoretinal surgery training, Susrut Eye Hospital (India)" },
  { icon: "fa-hospital", title: "Current Position", desc: "Associate Professor (Vitreo-Retina), Department of Ophthalmology, Bangladesh Medical University (BMU) · Consultant Ophthalmologist, VISION EYE HOSPITAL, 299, Green Road, Dhaka · Joint Secretary General, BVRS" },
  { icon: "fa-clock", title: "Consultation", desc: "Sat–Tue 5:30–9:00 PM · Wed 6:30–9:00 PM · Thu 5:30–8:00 PM · Friday Closed · Call: 09610244123 · 01988815714" },
];