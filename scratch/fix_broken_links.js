const fs = require('fs');

const content = fs.readFileSync('./data/songs.js', 'utf8');
const match = content.match(/export const BHOJPURI_SONGS = (\[[\s\S]*?\]);/);
const songs = JSON.parse(match[1]);

const targets = [
  'pudina',
  'dhani ho sab dhan',
  'kamar khesariyo',
  'saj ke sawar ke'
];

targets.forEach(t => {
  const found = songs.filter(s => s.title.toLowerCase().includes(t) || (s.album && s.album.toLowerCase().includes(t)));
  console.log(`Target "${t}":`);
  found.forEach(s => {
    console.log(`  id: ${s.id}, title: "${s.title}", singer: "${s.singer}", ytId: "${s.youtubeId}"`);
  });
});
