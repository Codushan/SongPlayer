const fs = require('fs');
const content = fs.readFileSync('./data/songs.js', 'utf8');
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

const checkList = [
  'Pudina Ae Haseena',
  'Dhani Ho Sab Dhan Tohre Nu Ba',
  'Kamar Khesariyo Ke Hile',
  'Saj Ke Sawar Ke Jab Aawelu',
  'Lali Rang Senura Se Mathe Ke Shobha',
  'Lagela Nik Lagela Maiya Ke Bindiya',
  'Nimiya Ke Daadh Maiya Jhuleli Jhulua',
  'Senura Ke Laaj Rakh Dihani Mori Maai',
  'Mai Bolaweli Ho Maiya Puje Chala',
  'Karile Hathjoriya Ho Mori Maai'
];

console.log('--- Verification of Songs ---');
checkList.forEach(title => {
  const s = songs.find(x => x.title.toLowerCase().includes(title.toLowerCase()));
  if (s) {
    console.log(`✓ [${s.id}] "${s.title}" (${s.singer}) -> yt: ${s.youtubeId} (url: ${s.youtubeUrl})`);
  } else {
    console.log(`✗ NOT FOUND: "${title}"`);
  }
});
