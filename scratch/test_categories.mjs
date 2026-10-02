import { CURATED_CATEGORIES, songMatchesCategory } from '../data/playlists.js';
import { BHOJPURI_SONGS } from '../data/songs.js';

console.log(`Testing category matching on ${BHOJPURI_SONGS.length} songs...\n`);

CURATED_CATEGORIES.forEach(cat => {
  const matches = BHOJPURI_SONGS.filter(s => songMatchesCategory(s, cat.id));
  const chhathCount = matches.filter(s => s.genreId === 'chhath' || s.title.toLowerCase().includes('chhath')).length;
  console.log(`${cat.id.padEnd(16)} (${cat.name.padEnd(14)}): ${matches.length.toString().padStart(4)} songs (Chhath songs: ${chhathCount})`);
});
