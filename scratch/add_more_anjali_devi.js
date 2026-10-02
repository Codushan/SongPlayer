const fs = require('fs');

const content = fs.readFileSync('./data/songs.js', 'utf8');
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

const newAnjaliDeviSongs = [
  {
    title: "Panch Hi Paan Ke Pataiya (Devi Pachra)",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Devi Pachra Hits",
    year: 2019,
    duration: "05:12",
    composer: "Manoj Aryan",
    writer: "Traditional",
    label: "Tarang Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "2P3x7w9Q4aI"
  },
  {
    title: "Jhuleli Maiya Jhulanwa Nimiya Pe",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Jhuleli Sato Bahiniya",
    year: 2020,
    duration: "04:58",
    composer: "Chhote Baba",
    writer: "Vinay Bihari",
    label: "Wave Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "Gj9L3Hn_a-U"
  },
  {
    title: "Lale Odhaulwa Maai Ke Chadhawani",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Aradhana",
    album: "Lale Odhaulwa",
    year: 2021,
    duration: "04:35",
    composer: "Ranjan Raj",
    writer: "Ajay Bachan",
    label: "Aadishakti Films",
    starring: "Anjali Bharadwaj",
    youtubeId: "5g6u9Z-6y5c"
  },
  {
    title: "Maiya Aili Bhore Bhore Anganwa",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Special",
    album: "Bhore Bhore Aili Maai",
    year: 2020,
    duration: "05:20",
    composer: "Ashish Verma",
    writer: "Manoj Matalbi",
    label: "Tarang Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "p3XgR8k_e20"
  },
  {
    title: "Koyaliya Bole Bagiya Me Maiya Ke",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Pachra",
    album: "Bagiya Me Koyaliya",
    year: 2018,
    duration: "05:40",
    composer: "Madhukar Anand",
    writer: "Pyare Lal Yadav",
    label: "Worldwide Records Bhojpuri",
    starring: "Anjali Bharadwaj",
    youtubeId: "oc0igLumKeg"
  },
  {
    title: "Jagdamba Ghar Me Aili Diyawa Bar Aaili",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Bhajan",
    album: "Jagdamba Ghar Me Aili",
    year: 2019,
    duration: "04:48",
    composer: "Chhote Baba",
    writer: "Sumit Singh Chandravanshi",
    label: "Wave Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "A2C9lq-g-Y8"
  },
  {
    title: "Maiya Ke Shringaar Shobhela Mathe Senurwa",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Shringaar",
    album: "Shringaar Mai Ke",
    year: 2019,
    duration: "05:04",
    composer: "Manoj Aryan",
    writer: "R.R. Pankaj",
    label: "Worldwide Records Bhojpuri",
    starring: "Anjali Bharadwaj",
    youtubeId: "wzQ-1r6g2Xg"
  },
  {
    title: "Bhairo Bhaiya Se Kah Diha Duariya Thadh Baani",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Devi Bhajan",
    album: "Maai Kripa",
    year: 2020,
    duration: "04:42",
    composer: "Shankar Singh",
    writer: "Pawan Pandey",
    label: "Wave Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "pG2Xq9L0w6U"
  },
  {
    title: "Doliya Chadhi Chalali Mori Maiya Sharda",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Maihar Devi Bhajan",
    album: "Doliya Me Maai",
    year: 2021,
    duration: "05:15",
    composer: "Ashish Verma",
    writer: "Akhilesh Kashyap",
    label: "Tarang Music",
    starring: "Anjali Bharadwaj",
    youtubeId: "1cpVA_9aX1Q"
  },
  {
    title: "Chunariya Jhalkat Ba Lal Rang Maiya Ke",
    singer: "Anjali Bharadwaj",
    genreId: "bhakti",
    genreName: "Bhakti & Devi Geet",
    genreHindi: "देवी भक्ति व भजन",
    rawGenre: "Navratri Bhajan",
    album: "Chunariya Lal Rang",
    year: 2020,
    duration: "04:30",
    composer: "Ranjan Raj",
    writer: "Vinay Bihari",
    label: "Aadishakti Films",
    starring: "Anjali Bharadwaj",
    youtubeId: "0kF_H1-eB4U"
  }
];

let nextId = songs.length + 1;
newAnjaliDeviSongs.forEach(track => {
  songs.push({
    id: `bhojpuri_anjali_devi_${nextId++}`,
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
  });
});

console.log(`Added ${newAnjaliDeviSongs.length} Anjali Bharadwaj Devi Geets. Total songs: ${songs.length}`);

// Update BHOJPURI_ARTISTS
const artistsMatch = content.match(/export const BHOJPURI_ARTISTS = (\[[\s\S]*?\]);/);
let artists = JSON.parse(artistsMatch[1]);
artists.forEach(a => {
  a.songsCount = songs.filter(s => s.singer.toLowerCase().includes(a.name.toLowerCase())).length;
});

const newContent = content
  .replace(/export const BHOJPURI_ARTISTS = \[[\s\S]*?\];/, `export const BHOJPURI_ARTISTS = ${JSON.stringify(artists, null, 2)};`)
  .replace(/export const BHOJPURI_SONGS = \[[\s\S]*?\];/, `export const BHOJPURI_SONGS = ${JSON.stringify(songs, null, 2)};`);

fs.writeFileSync('./data/songs.js', newContent, 'utf8');
console.log('Successfully updated songs.js!');
