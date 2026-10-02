const fs = require('fs');
const content = fs.readFileSync('./data/songs.js', 'utf8');

// Extract BHOJPURI_SONGS
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
if (!match) {
  console.log('Could not find BHOJPURI_SONGS');
  process.exit(1);
}

const songs = JSON.parse(match[1]);
console.log(`Total songs: ${songs.length}`);

const bhaktiSongs = songs.filter(s => s.genreId === 'bhakti' || s.rawGenre?.toLowerCase().includes('devi') || s.title?.toLowerCase().includes('maiya') || s.title?.toLowerCase().includes('devi'));
console.log(`Total Bhakti/Devi songs: ${bhaktiSongs.length}`);

const singers = {};
bhaktiSongs.forEach(s => {
  singers[s.singer] = (singers[s.singer] || 0) + 1;
});
console.log('Singers in Bhakti:', singers);
