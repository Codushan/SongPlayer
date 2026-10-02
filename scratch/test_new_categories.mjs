import { CURATED_CATEGORIES, songMatchesCategory } from '../data/playlists.js';
import { BHOJPURI_SONGS } from '../data/songs.js';

// Test new matcher function logic
function testNewMatcher(song, categoryId) {
  if (!song) return false;
  if (!categoryId || categoryId === 'all') return true;

  const cat = CURATED_CATEGORIES.find(
    (c) => c.id === categoryId || c.name.toLowerCase() === categoryId.toLowerCase()
  );
  if (!cat) return false;

  const isChhath =
    song.genreId === 'chhath' ||
    (song.rawGenre && song.rawGenre.toLowerCase().includes('chhath')) ||
    (song.title && song.title.toLowerCase().includes('chhath')) ||
    (song.album && song.album.toLowerCase().includes('chhath'));

  if (cat.id === 'chhath_geet') {
    return isChhath;
  }

  // Chhath is completely isolated from other genres
  if (isChhath) {
    return false;
  }

  const legacyId = (song.genreId || '').toLowerCase();
  const legacyRaw = (song.rawGenre || '').toLowerCase();
  const legacyName = (song.genreName || '').toLowerCase();
  const songTitle = (song.title || '').toLowerCase();
  const fullText = `${legacyId} ${legacyRaw} ${legacyName} ${songTitle}`;

  switch (cat.id) {
    case 'dj':
      return legacyId === 'dj_party';
    case 'pop':
      return legacyId === 'dj_party' || legacyRaw.includes('party') || legacyRaw.includes('dance');
    case 'love_song':
      return legacyId === 'romantic' || legacyRaw.includes('romantic') || legacyRaw.includes('duet');
    case 'bhakti':
      return legacyId === 'bhakti';
    case 'devi_geet':
      return (
        legacyRaw.includes('devi') ||
        legacyRaw.includes('pachra') ||
        legacyRaw.includes('durga') ||
        legacyRaw.includes('navratri') ||
        legacyRaw.includes('aradhana') ||
        legacyRaw.includes('bhajan') ||
        songTitle.includes('durga') ||
        songTitle.includes('pachra') ||
        songTitle.includes('navratri') ||
        songTitle.includes('sheetla') ||
        songTitle.includes('jagadamba') ||
        songTitle.includes('vindhyachal') ||
        songTitle.includes('maihar') ||
        songTitle.includes('sato bahiniya') ||
        songTitle.includes('sherawali') ||
        songTitle.includes('bhawani') ||
        (legacyId === 'bhakti' && (songTitle.includes('maai') || songTitle.includes('maiya') || songTitle.includes('mata')))
      );
    case 'bolbum':
      return legacyId === 'bolbam' || fullText.includes('shiv') || fullText.includes('deoghar') || fullText.includes('bhole');
    case 'nirgun':
      return legacyId === 'lokgeet' && (legacyRaw.includes('nirgun') || fullText.includes('nirgun'));
    case 'sohar':
      return fullText.includes('sohar') || fullText.includes('badhai') || fullText.includes('babua');
    case 'kajari':
      return fullText.includes('kajari') || fullText.includes('kajri');
    case 'biraha':
      return legacyRaw.includes('biraha') || fullText.includes('biraha') || fullText.includes('birha');
    case 'holi_phagua':
      return legacyId === 'holi' || fullText.includes('phagua') || fullText.includes('jogira');
    case 'vivah':
      return legacyId === 'vivah' || fullText.includes('vivah') || fullText.includes('dulha') || fullText.includes('haldi');
    case 'jhijiya_parcha':
      return fullText.includes('jhijiya') || fullText.includes('parcha');
    case 'political':
      return fullText.includes('political') || fullText.includes('chunav') || fullText.includes('neta');
    case 'holi':
      return legacyId === 'holi' || fullText.includes('holi');
    default:
      return false;
  }
}

console.log('--- NEW MATCHING COUNTS ---');
CURATED_CATEGORIES.forEach(cat => {
  const matches = BHOJPURI_SONGS.filter(s => testNewMatcher(s, cat.id));
  const chhathCount = matches.filter(s => s.genreId === 'chhath' || s.title.toLowerCase().includes('chhath')).length;
  console.log(`${cat.id.padEnd(16)} (${cat.name.padEnd(14)}): ${matches.length.toString().padStart(4)} songs (Chhath songs: ${chhathCount})`);
});
