const fs = require('fs');

const content = fs.readFileSync('./data/songs.js', 'utf8');
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

console.log(`Checking Chhath vs Devi in ${songs.length} songs...`);

// Check songs with 'chhath' in title/album
const chhathInTitle = songs.filter(s => 
  s.title.toLowerCase().includes('chhath') || 
  (s.album && s.album.toLowerCase().includes('chhath')) ||
  s.rawGenre?.toLowerCase().includes('chhath')
);

console.log(`Found ${chhathInTitle.length} songs with 'chhath' in metadata.`);
const genreBreakdown = {};
chhathInTitle.forEach(s => {
  genreBreakdown[s.genreId] = (genreBreakdown[s.genreId] || 0) + 1;
});
console.log('Genre breakdown of Chhath songs:', genreBreakdown);
