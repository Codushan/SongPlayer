const fs = require('fs');

const playlistsContent = fs.readFileSync('./data/playlists.js', 'utf8');
const songsContent = fs.readFileSync('./data/songs.js', 'utf8');

const { CURATED_CATEGORIES, songMatchesCategory } = require('./data/playlists.js');
const { BHOJPURI_SONGS } = require('./data/songs.js');

console.log(`Testing category matching on ${BHOJPURI_SONGS.length} songs...\n`);

CURATED_CATEGORIES.forEach(cat => {
  const matches = BHOJPURI_SONGS.filter(s => songMatchesCategory(s, cat.id));
  const chhathCount = matches.filter(s => s.genreId === 'chhath' || s.title.toLowerCase().includes('chhath')).length;
  console.log(`${cat.id} (${cat.name}): ${matches.length} songs (Chhath songs in this: ${chhathCount})`);
});
