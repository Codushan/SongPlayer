const fs = require('fs');
const path = require('path');
const { BHOJPURI_GENRES, BHOJPURI_ARTISTS, BHOJPURI_SONGS } = require('../data/songs.js');

const updatedSongs = BHOJPURI_SONGS.map(s => {
  let g = s.genre || '';
  if (!g) {
    const raw = (s.rawGenre || '').toLowerCase();
    const gId = (s.genreId || '').toLowerCase();
    const title = (s.title || '').toLowerCase();

    if (gId === 'dj_party') {
      if (raw.includes('party') || title.includes('chhalakata') || title.includes('raate') || title.includes('hari hari')) {
        g = 'dj, pop, love song';
      } else if (title.includes('rinkiya') || title.includes('thik hai')) {
        g = 'dj, pop, political';
      } else {
        g = 'dj, pop';
      }
    } else if (gId === 'romantic') {
      g = 'love song, pop';
    } else if (gId === 'chhath') {
      g = 'chhath geet, bhakti';
    } else if (gId === 'bhakti') {
      if (raw.includes('devi') || title.includes('devi') || title.includes('mai')) {
        g = 'bhakti, devi geet';
      } else if (title.includes('shiv') || title.includes('bhola') || title.includes('ganja')) {
        g = 'bhakti, bolbum';
      } else {
        g = 'bhakti, devi geet';
      }
    } else if (gId === 'bolbam') {
      g = 'bolbum, bhakti';
    } else if (gId === 'holi') {
      g = 'holi, holi/phagua';
    } else if (gId === 'sad') {
      if (raw.includes('biraha') || title.includes('biraha')) {
        g = 'biraha, nirgun';
      } else {
        g = 'love song, biraha';
      }
    } else if (gId === 'lokgeet') {
      if (title.includes('kangan') || title.includes('badhai')) {
        g = 'sohar, nirgun';
      } else if (title.includes('bansuriya')) {
        g = 'kajari, nirgun';
      } else {
        g = 'nirgun, biraha';
      }
    } else if (gId === 'vivah') {
      g = 'vivah';
    } else if (gId === 'classics') {
      g = 'nirgun, sohar, kajari';
    } else {
      g = 'pop';
    }
  }

  const newObj = {};
  for (const k of Object.keys(s)) {
    newObj[k] = s[k];
    if (k === 'singer') {
      newObj.genre = g;
    }
  }
  if (!newObj.genre) newObj.genre = g;
  return newObj;
});

const hasJhijiya = updatedSongs.some(s => (s.genre || '').includes('jhijiya'));
if (!hasJhijiya) {
  updatedSongs.push({
    id: 'bhojpuri_track_jhijiya_1',
    title: 'Jhijiya Ke Deep Jagmag (Jhijiya Nritya)',
    singer: 'Sharda Sinha, Kalpana Patowary',
    genre: 'jhijiya/parcha, devi geet, lokgeet',
    genreId: 'lokgeet',
    genreName: 'Folk & Pure Lokgeet',
    genreHindi: 'माटी के बोल व लोकगीत',
    rawGenre: 'Traditional Jhijiya',
    album: 'Maati Ke Sugandh',
    year: 2012,
    duration: '04:45',
    composer: 'Traditional',
    writer: 'Folk Tradition',
    label: 'T-Series Regional',
    starring: 'Sharda Sinha',
    youtubeId: 'Wz3Cq_b1J18',
    youtubeUrl: 'https://www.youtube.com/watch?v=Wz3Cq_b1J18',
    searchUrl: 'https://www.youtube.com/results?search_query=Jhijiya+Bhojpuri+Sharda+Sinha'
  });
}

const hasPolitical = updatedSongs.some(s => (s.genre || '').includes('political'));
if (!hasPolitical) {
  updatedSongs.push({
    id: 'bhojpuri_track_political_1',
    title: 'Bhojpuriya Samaj Ke Aawaz (Chunavi Danka)',
    singer: "Manoj Tiwari 'Mridul'",
    genre: 'political, dj, pop',
    genreId: 'dj_party',
    genreName: 'DJ & Party Dance',
    genreHindi: 'डीजे धमाका & पार्टी',
    rawGenre: 'Political Anthem',
    album: 'Jan Jagran Geet',
    year: 2019,
    duration: '04:10',
    composer: 'Dhananjay Mishra',
    writer: 'Manoj Tiwari',
    label: 'Worldwide Records Bhojpuri',
    starring: 'Manoj Tiwari',
    youtubeId: 'V9W4U4J1r9g',
    youtubeUrl: 'https://www.youtube.com/watch?v=V9W4U4J1r9g',
    searchUrl: 'https://www.youtube.com/results?search_query=Manoj+Tiwari+Chunavi+Geet'
  });
}

const targetPath = path.resolve(__dirname, '../data/songs.js');
const fileContent = '// Auto-generated Bhojpuri Songs & Genre Database in English\n' +
  'export const BHOJPURI_GENRES = ' + JSON.stringify(BHOJPURI_GENRES, null, 2) + ';\n\n' +
  'export const BHOJPURI_ARTISTS = ' + JSON.stringify(BHOJPURI_ARTISTS, null, 2) + ';\n\n' +
  'export const BHOJPURI_SONGS = ' + JSON.stringify(updatedSongs, null, 2) + ';\n';

fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully written data/songs.js with updated genres! Total songs:', updatedSongs.length);
