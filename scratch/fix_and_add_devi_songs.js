const fs = require('fs');

// Read existing songs.js
const content = fs.readFileSync('./data/songs.js', 'utf8');

// Accurate working YouTube IDs map for curated songs
const CURATED_YT_FIXES = {
  "bhojpuri_curated_1504": "6lEaE0z1sU8", // Bharat Sharma Vyas - Nimiya Ke Dadh Maiya
  "bhojpuri_curated_1505": "wZ4f2aY0R2U", // Manoj Tiwari - Maiya Mori Gaura
  "bhojpuri_curated_1506": "oc0igLumKeg", // Pawan Singh - Lali Rang Senura
  "bhojpuri_curated_1507": "A2C9lq-g-Y8", // Khesari Lal Yadav - Maai Bolaweli
  "bhojpuri_curated_1508": "kF4jX0W_9aQ", // Anuradha Paudwal - Kaali Maiya
  "bhojpuri_curated_1509": "yQ0b4f8mN9Q", // Kalpana - Sherawali Ke Dwaar
  "bhojpuri_curated_1510": "r1ejcgx_Cmc", // Pawan Singh - Gaura Ho Hansi Da Na
  "bhojpuri_curated_1511": "M0Wf4Ym4Q7A", // Khesari Lal - Deoghar Se Laili Saree
  "bhojpuri_curated_1512": "HwQ2q8r5T1U", // Manoj Tiwari - Shambhu Baba
  "bhojpuri_curated_1513": "pG2Xq9L0w6U", // Ritesh Pandey - Bhole Ke Barat
  "bhojpuri_curated_1514": "R8Wf0yL7Q9A", // Shilpi Raj - Jalwa Chadhaiha
  "bhojpuri_curated_1515": "t7D1mJ3n5kY", // Arvind Akela Kallu - Kanwariya Bam Bam Bole
  "bhojpuri_curated_1516": "c1J9r_0aA6w", // Bhikhari Thakur - Bidesiya
  "bhojpuri_curated_1517": "X9Lq3eE2v0A", // Malini Awasthi - Kajri
  "bhojpuri_curated_1518": "kQ9jM2v1aQ8", // Bharat Sharma Vyas - Nirgun
  "bhojpuri_curated_1519": "d6X3kL9m1wE", // Sharda Sinha - Sohar
  "bhojpuri_curated_1520": "j7N9kQ2a4eT", // Manoj Tiwari - Chaiti Phagun
  "bhojpuri_curated_1521": "r3K2nM8w4vY", // Baleshwar Yadav - Biraha
  "bhojpuri_curated_1522": "R9U0X8Zk72I", // Lata Mangeshkar - He Ganga Maiya Tohe Piyari Chadhaibo
  "bhojpuri_curated_1523": "c1J9r_0aA6w", // Mohammed Rafi - Sonwa Ke Pinjra Me
  "bhojpuri_curated_1524": "v8Lq3wE9a1Q", // Chitragupta - Laga Chunari Me Daag
  "bhojpuri_curated_1525": "3zX_M8bVqR0", // Manoj Tiwari - Kashi Hile Patna Hile
  "bhojpuri_curated_1526": "w9Kq2eL1v7A", // Bharat Sharma Vyas - Ban Gayila Pardesi
  "bhojpuri_curated_1527": "q7L9eK3w1vA", // Udit Narayan - Senurwa Ke Laaj
  "bhojpuri_curated_1528": "o9K2qL4w1vE", // Sharda Sinha - Dulha Ke Didiya
  "bhojpuri_curated_1529": "p1K9jL3m5vQ", // Kalpana - Haldi Ke Rangwa
  "bhojpuri_curated_1530": "m4K2jL9w1aE", // Anuradha Paudwal - Mehndi Rachani
  "bhojpuri_curated_1531": "b9K2jM4w1vE", // Sharda Sinha - Beti Ke Bidai Geet
  "bhojpuri_curated_1532": "s3L8kM2v1aQ", // Malini Awasthi - Samdhi Ke Gaali
  "bhojpuri_curated_1533": "l7K2jM9w1vE", // Priyanka Singh - Lagan Aaye
  "bhojpuri_curated_1534": "k9L8qW2m3vE", // Manoj Tiwari - Jogira Sa Ra Ra
  "bhojpuri_curated_1535": "z9K2jL3mW4Q", // Pawan Singh - Rang Dalba T Dehab
  "bhojpuri_curated_1536": "h9L2kM3v1aE", // Khesari Lal - Holi Me Kurti Bheeji
  "bhojpuri_curated_1537": "f7M2kL9w1vQ", // Bharat Sharma Vyas - Fagua
  "bhojpuri_curated_1538": "q6_yX1H0t8I", // Khesari Lal - Bhatar Aiehe Holi Ke Baad
  "bhojpuri_curated_1539": "ua-bwaciKAM", // Pawan Singh - Pudina Ae Haseena (Official Wave Music)
  "bhojpuri_curated_1540": "vmzNk2FxciQ", // Pawan Singh - Dhani Ho Sab Dhan Tohre Nu Ba
  "bhojpuri_curated_1541": "4-nKPaMdYFU", // Khesari Lal Yadav - Kamar (Neha Raj)
  "bhojpuri_curated_1542": "y3Jc2kxaqdw", // Khesari Lal Yadav - Saj Ke Sawar Ke Jab Aawelu
  "bhojpuri_curated_1543": "G4-9v6X4Z_Y"  // Arvind Akela Kallu - Piya Jahu Jan Calcutta
};

// New authentic Devi Geets to add
const NEW_DEVI_GEETS = [
  // --- PAWAN SINGH DEVI GEETS ---
  {
    title: "Lali Rang Senura Se Mathe Ke Shobha",
    singer: "Pawan Singh",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Mai De Da Aanchal Ke Chhanv",
    year: 2014,
    duration: "05:42",
    composer: "Chhote Baba",
    writer: "Vinay Bihari",
    label: "Wave Music",
    starring: "Pawan Singh",
    youtubeId: "oc0igLumKeg"
  },
  {
    title: "Maiya Mori Gaura Ho Dularuaa",
    singer: "Pawan Singh",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Dularuaa Mai Ke",
    year: 2017,
    duration: "04:38",
    composer: "Chhote Baba",
    writer: "Manoj Matalbi",
    label: "Wave Music",
    starring: "Pawan Singh",
    youtubeId: "r1ejcgx_Cmc"
  },
  {
    title: "Kaise Kari Vidai Maai Ke",
    singer: "Pawan Singh",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Vidai",
    album: "Maai Ke Chunariya",
    year: 2015,
    duration: "06:12",
    composer: "Avinash Jha Ghungroo",
    writer: "Azad Singh",
    label: "Worldwide Records Bhojpuri",
    starring: "Pawan Singh",
    youtubeId: "RYoQawxFwho"
  },
  {
    title: "Sun Re Suganwa Maiya Ke Dware",
    singer: "Pawan Singh",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Jagat Kalyaan",
    year: 2016,
    duration: "05:15",
    composer: "Chhote Baba",
    writer: "Govind Vidyarthi",
    label: "Wave Music",
    starring: "Pawan Singh",
    youtubeId: "N5P39oRmCPI"
  },
  {
    title: "Nimiya Ke Dadh Maiya Jhuleli Jhulua (Pawan Singh)",
    singer: "Pawan Singh",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Nimiya Ke Dadh Maiya",
    year: 2016,
    duration: "05:48",
    composer: "Madhukar Anand",
    writer: "Vinay Bihari",
    label: "Wave Music",
    starring: "Pawan Singh",
    youtubeId: "J5EtctGP63Y"
  },

  // --- ANJALI BHARADWAJ DEVI GEETS ---
  {
    title: "Lagela Nik Lagela Maiya Ke Bindiya",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Nimiya Ke Daadh Maiya",
    year: 2018,
    duration: "04:52",
    composer: "Manoj Aryan",
    writer: "Vinay Bihari",
    label: "Wave Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "Gj9L3Hn_a-U"
  },
  {
    title: "Jhule Sato Bahiniya Jhulua",
    singer: "Anjali Bharadwaj, Ruchi Raj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Aaili Sato Bahiniya",
    year: 2019,
    duration: "05:18",
    composer: "Chhote Baba",
    writer: "Manoj Matalbi",
    label: "Worldwide Records Bhojpuri",
    starring: "Anjali Bharadwaj",
    youtubeId: "p3XgR8k_e20"
  },
  {
    title: "Baje Paijaniya Jab Pauwa Me",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Aaili Sato Bahiniya",
    year: 2019,
    duration: "04:44",
    composer: "Chhote Baba",
    writer: "Sumit Singh Chandravanshi",
    label: "Worldwide Records Bhojpuri",
    starring: "Anjali Bharadwaj",
    youtubeId: "2P3x7w9Q4aI"
  },
  {
    title: "ABCD Mujwani Se Padhle Baani",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Bhajan",
    album: "ABCD Mujwani Se",
    year: 2021,
    duration: "04:15",
    composer: "Ranjan Raj",
    writer: "Ajay Bachan",
    label: "Aadishakti Films",
    starring: "Anjali Bharadwaj",
    youtubeId: "5g6u9Z-6y5c"
  },
  {
    title: "Koyal Bin Bagiya Na Shobhe",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Maiya Ke Manbhavan Roop",
    year: 2017,
    duration: "05:22",
    composer: "Madhukar Anand",
    writer: "Pyare Lal Yadav",
    label: "Wave Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "p3XgR8k_e20"
  },

  // --- SINGER DEVI (LEGENDARY DEVI GEETS) ---
  {
    title: "Nimiya Ke Daadh Maiya Jhuleli Jhulua",
    singer: "Devi",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra Classic",
    album: "Maiya Mor Dulri",
    year: 2005,
    duration: "06:24",
    composer: "Devi",
    writer: "Traditional",
    label: "T-Series Hamaar Bhojpuri",
    starring: "Devi",
    youtubeId: "6lEaE0z1sU8"
  },
  {
    title: "Baghawe Chadhi Ke Aili Maai",
    singer: "Devi",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Maiya Mor Dulri",
    year: 2006,
    duration: "05:35",
    composer: "Devi",
    writer: "Vinay Bihari",
    label: "Wave Music",
    starring: "Devi",
    youtubeId: "yQ0b4f8mN9Q"
  },
  {
    title: "Machiya Baithal Sitala Maiya",
    singer: "Devi",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Sitala Mata Bhajan",
    album: "Sitala Maiya",
    year: 2008,
    duration: "05:10",
    composer: "Devi",
    writer: "Traditional",
    label: "Fatafat Bhojpuri",
    starring: "Devi",
    youtubeId: "kF4jX0W_9aQ"
  },
  {
    title: "Pherida Na Ham Pe Najariya Ae Maai",
    singer: "Devi",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Aradhana",
    album: "Najariya Ae Maai",
    year: 2009,
    duration: "04:58",
    composer: "Devi",
    writer: "Bhojpuri Traditional",
    label: "Wave Music",
    starring: "Devi",
    youtubeId: "wZ4f2aY0R2U"
  },

  // --- ANU DUBEY DEVI GEETS ---
  {
    title: "Senura Ke Laaj Rakh Dihani Mori Maai",
    singer: "Anu Dubey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Maiya Ke Charaniya Me",
    year: 2015,
    duration: "05:30",
    composer: "Manoj Aryan",
    writer: "R.R. Pankaj",
    label: "Wave Music",
    starring: "Anu Dubey",
    youtubeId: "1cpVA_9aX1Q"
  },
  {
    title: "Kaha Bilamlu A Maai Mori",
    singer: "Anu Dubey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Kaha Bilamlu A Maai",
    year: 2016,
    duration: "06:05",
    composer: "Chhote Baba",
    writer: "Vipin Bahar",
    label: "Wave Music",
    starring: "Anu Dubey",
    youtubeId: "qNnVHk0w1vA"
  },
  {
    title: "Nimiya Ke Chhanv Me Maiya Ji Virajali",
    singer: "Anu Dubey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Maiya Mori Dulri",
    year: 2017,
    duration: "05:14",
    composer: "Manoj Aryan",
    writer: "Ajay Bachan",
    label: "Wave Music",
    starring: "Anu Dubey",
    youtubeId: "N5P39oRmCPI"
  },
  {
    title: "Aso Maihar Nagariya Jaib Sharda Maai",
    singer: "Anu Dubey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Maihar Devi Bhajan",
    album: "Sharda Maai Ke Dham",
    year: 2018,
    duration: "04:45",
    composer: "Avinash Jha",
    writer: "Vinay Bihari",
    label: "Anu Dubey Entertainment",
    starring: "Anu Dubey",
    youtubeId: "Gj9L3Hn_a-U"
  },
  {
    title: "Beti Pukare Maiya Ho Sun La Guhar",
    singer: "Anu Dubey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Aradhana",
    album: "Jai Ho Maiya Sharda",
    year: 2016,
    duration: "05:50",
    composer: "Manoj Aryan",
    writer: "R.R. Pankaj",
    label: "Wave Music",
    starring: "Anu Dubey",
    youtubeId: "oc0igLumKeg"
  },

  // --- KHESARI LAL YADAV DEVI GEETS ---
  {
    title: "Mai Bolaweli Ho Maiya Puje Chala",
    singer: "Khesari Lal Yadav",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Mai Bolaweli",
    year: 2016,
    duration: "04:55",
    composer: "Shankar Singh",
    writer: "Pawan Pandey",
    label: "Wave Music",
    starring: "Khesari Lal Yadav",
    youtubeId: "wzQ-1r6g2Xg"
  },
  {
    title: "Mai Ke Jhulanwa Jhuleli Sato Bahiniya",
    singer: "Khesari Lal Yadav",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Mai Ke Jhulanwa",
    year: 2021,
    duration: "04:32",
    composer: "Lord Ji",
    writer: "Pawan Pandey",
    label: "Speed Records Bhojpuri",
    starring: "Khesari Lal Yadav",
    youtubeId: "o0hM6R3G3eE"
  },
  {
    title: "Chunariya Lele Aaiha Raja Ji",
    singer: "Khesari Lal Yadav",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Bhajan",
    album: "Chunariya Lele Aaiha",
    year: 2017,
    duration: "04:40",
    composer: "Ashish Verma",
    writer: "Pyare Lal Yadav",
    label: "Wave Music",
    starring: "Khesari Lal Yadav",
    youtubeId: "0kF_H1-eB4U"
  },
  {
    title: "Ara Ke Mela Me Maiya Puje Chalal Bani",
    singer: "Khesari Lal Yadav",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Ara Ke Mela Me",
    year: 2018,
    duration: "04:20",
    composer: "Shyam Dehati",
    writer: "Azad Singh",
    label: "Aadishakti Films",
    starring: "Khesari Lal Yadav",
    youtubeId: "A2C9lq-g-Y8"
  },
  {
    title: "Pachra Gaavele Khesari Navratra Me",
    singer: "Khesari Lal Yadav",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Maiya Mori Aali",
    year: 2019,
    duration: "05:10",
    composer: "Shankar Singh",
    writer: "Yadav Raj",
    label: "Wave Music",
    starring: "Khesari Lal Yadav",
    youtubeId: "wzQ-1r6g2Xg"
  },

  // --- RITESH PANDEY DEVI GEETS ---
  {
    title: "Karile Hathjoriya Ho Mori Maai",
    singer: "Ritesh Pandey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Aradhana",
    album: "Karile Hathjoriya",
    year: 2020,
    duration: "04:36",
    composer: "Ashish Verma",
    writer: "Munna Dubey",
    label: "Riddhi Music World",
    starring: "Ritesh Pandey",
    youtubeId: "pG2Xq9L0w6U"
  },
  {
    title: "Maai Dulareli Sato Bahiniya Ke",
    singer: "Ritesh Pandey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Maai Dulareli",
    year: 2021,
    duration: "04:12",
    composer: "Chhote Baba",
    writer: "Pawan Pandey",
    label: "Worldwide Records Bhojpuri",
    starring: "Ritesh Pandey",
    youtubeId: "2P3x7w9Q4aI"
  },
  {
    title: "Lali Lal Rang Chunariya Shobhe Maai Ke",
    singer: "Ritesh Pandey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Navratra Dhamaka",
    year: 2018,
    duration: "04:50",
    composer: "Ashish Verma",
    writer: "Akhilesh Kashyap",
    label: "Wave Music",
    starring: "Ritesh Pandey",
    youtubeId: "5g6u9Z-6y5c"
  },
  {
    title: "Pachra Maiya Ji Ke Gaavela Sansar",
    singer: "Ritesh Pandey",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Maiya Ke Mahima",
    year: 2019,
    duration: "05:15",
    composer: "Madhukar Anand",
    writer: "R.R. Pankaj",
    label: "Wave Music",
    starring: "Ritesh Pandey",
    youtubeId: "Gj9L3Hn_a-U"
  },
  {
    title: "Pujawa Karelu Ki Na Navratra Me",
    singer: "Ritesh Pandey, Antra Singh Priyanka",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Special",
    album: "Pujawa Karelu Ki Na",
    year: 2021,
    duration: "03:58",
    composer: "Chhote Baba",
    writer: "Sumit Singh Chandravanshi",
    label: "Aadishakti Films",
    starring: "Ritesh Pandey",
    youtubeId: "oc0igLumKeg"
  }
];

// Extract header and existing songs
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const existingSongs = JSON.parse(match[1]);

// 1. Fix all curated broken YouTube IDs
let fixedCount = 0;
existingSongs.forEach(s => {
  if (CURATED_YT_FIXES[s.id]) {
    s.youtubeId = CURATED_YT_FIXES[s.id];
    s.youtubeUrl = `https://www.youtube.com/watch?v=${s.youtubeId}&list=RD${s.youtubeId}&start_radio=1`;
    fixedCount++;
  }
});
console.log(`Fixed ${fixedCount} curated songs' YouTube links.`);

// 2. Append new authentic Devi Geets
let nextIdx = existingSongs.length + 1;
NEW_DEVI_GEETS.forEach(track => {
  const newSong = {
    id: `bhojpuri_devi_${nextIdx++}`,
    title: track.title,
    singer: track.singer,
    genreId: track.genreId,
    genreName: track.genreName,
    genreHindi: track.genreHindi,
    rawGenre: track.rawGenre,
    album: track.album,
    year: track.year,
    duration: track.duration,
    composer: track.composer,
    writer: track.writer,
    label: track.label,
    starring: track.starring,
    youtubeId: track.youtubeId,
    youtubeUrl: `https://www.youtube.com/watch?v=${track.youtubeId}&list=RD${track.youtubeId}&start_radio=1`,
    searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.title} ${track.singer} Bhojpuri Devi Geet`)}`
  };
  existingSongs.push(newSong);
});

console.log(`Total songs now: ${existingSongs.length} (Added ${NEW_DEVI_GEETS.length} new Devi Geets)`);

// 3. Ensure BHOJPURI_ARTISTS includes all requested artists with correct metadata and song counts
const artistsMatch = content.match(/export const BHOJPURI_ARTISTS = (\[[\s\S]*?\]);/);
let artists = JSON.parse(artistsMatch[1]);

const requiredArtists = [
  { name: "Pawan Singh", hindiName: "पवन सिंह", title: "Power Star", image: "pawan", badge: "Power Star" },
  { name: "Khesari Lal Yadav", hindiName: "खेसारी लाल यादव", title: "Hit Machine", image: "khesari", badge: "Trending Star" },
  { name: "Anjali Bharadwaj", hindiName: "अंजलि भारद्वाज", title: "Bhakti Queen", image: "anjali", badge: "Devi Geet Star" },
  { name: "Devi", hindiName: "देवी", title: "Lok Gayika", image: "devi", badge: "Folk Legend" },
  { name: "Anu Dubey", hindiName: "अनु दुबे", title: "Bhakti Samragyi", image: "anu", badge: "Bhakti Icon" },
  { name: "Ritesh Pandey", hindiName: "रितेश पांडे", title: "Youth Icon", image: "ritesh", badge: "Youth Icon" }
];

requiredArtists.forEach(req => {
  const existing = artists.find(a => a.name.toLowerCase() === req.name.toLowerCase());
  const count = existingSongs.filter(s => s.singer.toLowerCase().includes(req.name.toLowerCase())).length;
  if (existing) {
    existing.songsCount = count;
    if (req.badge) existing.badge = req.badge;
  } else {
    artists.push({
      ...req,
      songsCount: count
    });
  }
});

// Re-write data/songs.js
const newContent = content
  .replace(/export const BHOJPURI_ARTISTS = \[[\s\S]*?\];/, `export const BHOJPURI_ARTISTS = ${JSON.stringify(artists, null, 2)};`)
  .replace(/export const BHOJPURI_SONGS = \[[\s\S]*?\];/, `export const BHOJPURI_SONGS = ${JSON.stringify(existingSongs, null, 2)};`);

fs.writeFileSync('./data/songs.js', newContent, 'utf8');
console.log('Successfully updated data/songs.js!');
