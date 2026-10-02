const fs = require('fs');

const content = fs.readFileSync('./data/songs.js', 'utf8');
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

console.log(`Checking ${songs.length} songs...`);

const curated = songs.filter(s => s.id.startsWith('bhojpuri_curated_'));
console.log(`Total curated songs: ${curated.length}`);
curated.forEach(s => {
  console.log(`${s.id}: "${s.title}" - ${s.singer} -> ${s.youtubeId}`);
});
