const fs = require('fs');
const songsContent = fs.readFileSync('./data/songs.js', 'utf8');
const match = songsContent.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

const artistsMatch = songsContent.match(/export const BHOJPURI_ARTISTS = (\[[\s\S]*?\]);/);
const artists = JSON.parse(artistsMatch[1]);

console.log(`Total songs: ${songs.length}`);
console.log(`Artists:`, artists.map(a => `${a.name} (${a.songsCount})`));

const targetSingers = ['Pawan Singh', 'Anjali Bharadwaj', 'Devi', 'Anu Dubey', 'Khesari Lal Yadav', 'Ritesh Pandey'];

targetSingers.forEach(singer => {
  const deviSongs = songs.filter(s => s.singer.toLowerCase().includes(singer.toLowerCase()) && (s.genreId === 'bhakti' || s.rawGenre?.toLowerCase().includes('devi') || s.title.toLowerCase().includes('maiya') || s.title.toLowerCase().includes('devi') || s.title.toLowerCase().includes('maai')));
  console.log(`\n${singer} Devi Geets (${deviSongs.length}):`);
  deviSongs.slice(0, 5).forEach(s => console.log(` - ${s.title} [yt: ${s.youtubeId}]`));
});
