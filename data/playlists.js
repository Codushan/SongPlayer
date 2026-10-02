// Curated Bhojpuri Categories & Dynamic Playlists
// Automatically catches songs from data/songs.js via song.genre tags

export const CURATED_CATEGORIES = [
  {
    id: 'dj',
    name: 'DJ',
    hindiTitle: 'डीजे धमाका',
    title: 'DJ Kamariya & Dance Party',
    description: 'High voltage dance chartbusters, DJ remixes and party anthems from top stars.',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #ff007a 0%, #ff5e3a 100%)',
    accent: '#ff007a',
    tag: 'Trending Hits',
    keywords: ['dj', 'dance', 'party', 'remix', 'dhamaka', 'kamariya', 'club', 'bhojpuri_party_dance'],
  },
  {
    id: 'pop',
    name: 'Pop',
    hindiTitle: 'पॉप हिट्स',
    title: 'Modern Desi Pop & Club',
    description: 'Viral modern beats, trending singles and high tempo Bhojpuri pop.',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    accent: '#8b5cf6',
    tag: 'Modern Beats',
    keywords: ['pop', 'viral', 'modern', 'club', 'urban', 'thumka', 'bop'],
  },
  {
    id: 'love_song',
    name: 'Love Song',
    hindiTitle: 'रोमांटिक व लव गीत',
    title: 'Evergreen Romantic Duets & Love',
    description: 'Sweet harmonies, romantic cinema duets and soulful love ballads.',
    icon: '💖',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    accent: '#ec4899',
    tag: 'Feel Good',
    keywords: ['love', 'love song', 'romantic', 'duet', 'prem', 'pyar', 'dil', 'ishq'],
  },
  {
    id: 'bhakti',
    name: 'Bhakti',
    hindiTitle: 'भक्ति सागर व भजन',
    title: 'Pavitra Bhakti Sagar',
    description: 'Sacred temple bhajans, aarti, and devotional prayers.',
    icon: '🙏',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    accent: '#f59e0b',
    tag: 'Bhakti Sagar',
    keywords: ['bhakti', 'bhajan', 'aarti', 'prarthana', 'kripa', 'mandir', 'pooja', 'ganga', 'bhakt'],
  },
  {
    id: 'devi_geet',
    name: 'Devi Geet',
    hindiTitle: 'माँ दुर्गा व देवी पचरा',
    title: 'Maa Durga Bhakti & Devi Pachra',
    description: 'Mata ke bhajans, sacred Navratri offerings and emotional Pachra.',
    icon: '🌺',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    accent: '#ef4444',
    tag: 'Navratri Special',
    keywords: ['devi_geet', 'devi pachra', 'durga', 'pachra', 'sherawali', 'sheetla', 'navratri', 'shakti', 'jagadamba', 'vindhyachal', 'maihar', 'sato bahiniya', 'bhawani', 'mata bhajan'],
  },
  {
    id: 'chhath_geet',
    name: 'Chhath Geet',
    hindiTitle: 'छठ महापर्व के पावन गीत',
    title: 'Pavitra Chhath Mahaparv Geetein',
    description: 'Sacred Ganga-ghat hymns and traditional offerings by Sharda Sinha & legends.',
    icon: '🪔',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    accent: '#f59e0b',
    tag: 'Sacred Festival',
    keywords: ['chhath', 'chhath geet', 'surya', 'ganga', 'arghya', 'bahangiya', 'soop', 'deenanath', 'chhathi maiya'],
  },
  {
    id: 'bolbum',
    name: 'Bolbum',
    hindiTitle: 'बोल बम व कांवड़ यात्रा',
    title: 'Bol Bam & Deoghar Shiv Yatra',
    description: 'High spirit Shiv bhajans and Sawan Kanwar Yatra chartbusters.',
    icon: '🔱',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
    accent: '#0284c7',
    tag: 'Shiv Bhajan',
    keywords: ['bolbum', 'bolbam', 'bol bam', 'kanwar', 'shiv', 'shiva', 'bhole', 'sawan', 'deoghar', 'kanwariya'],
  },
  {
    id: 'nirgun',
    name: 'Nirgun',
    hindiTitle: 'निर्गुण व अध्यात्म',
    title: 'Kabir Nirgun & Spiritual Philosophy',
    description: 'Timeless spiritual verses and contemplative folk hymns of life and soul.',
    icon: '🧘',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    accent: '#6366f1',
    tag: 'Spiritual Heritage',
    keywords: ['nirgun', 'chetna', 'kabir', 'adhyatmik', 'parampara', 'vairagya', 'gyan'],
  },
  {
    id: 'sohar',
    name: 'Sohar',
    hindiTitle: 'सोहर व बधाई गीत',
    title: 'Shubh Sohar & Janmotsav Geet',
    description: 'Joyous traditional child-birth celebrations and festive family blessings.',
    icon: '👶',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    accent: '#10b981',
    tag: 'Sanskar Geet',
    keywords: ['sohar', 'badhai', 'badhaiya', 'janmotsav', 'lalana', 'khelawana', 'babua'],
  },
  {
    id: 'kajari',
    name: 'Kajari',
    hindiTitle: 'कजरी व वर्षा ऋतु',
    title: 'Barsaat Ke Rang & Pure Kajari',
    description: 'Monsoon swings, rain ballads and classical folk traditions from Mirzapur & Bhojpur.',
    icon: '🌧️',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    accent: '#0ea5e9',
    tag: 'Monsoon Folk',
    keywords: ['kajari', 'kajri', 'barsaat', 'sawani', 'jhula', 'varsha', 'megha'],
  },
  {
    id: 'biraha',
    name: 'Biraha',
    hindiTitle: 'पारम्परिक बिरहा व किस्सा',
    title: 'Bhojpuri Biraha & Veer Gatha',
    description: 'Storytelling folk ballads, heroic tales and classic narrative poetry.',
    icon: '🪕',
    gradient: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
    accent: '#d97706',
    tag: 'Folk Gatha',
    keywords: ['biraha', 'birha', 'kissa', 'lok gatha', 'kahani', 'dangal'],
  },
  {
    id: 'holi_phagua',
    name: 'Holi/Phagua',
    hindiTitle: 'पारम्परिक फगुआ व चैता',
    title: 'Traditional Phagua, Jogira & Chaita',
    description: 'Authentic village dholak-jhal rhythm, classical Jogira and festive folk spirits.',
    icon: '🥁',
    gradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
    accent: '#d946ef',
    tag: 'Folk Phagua',
    keywords: ['holi/phagua', 'phagua', 'fagua', 'chaita', 'jogira', 'folk holi', 'dholak'],
  },
  {
    id: 'vivah',
    name: 'Vivah',
    hindiTitle: 'विवाह व लगन स्पेशल',
    title: 'Shubh Vivah, Haldi & Bidai',
    description: 'Traditional wedding ceremonies, Haldi, Tilak, Matkor and heartfelt Bidai songs.',
    icon: '💍',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
    accent: '#e11d48',
    tag: 'Wedding Ceremonies',
    keywords: ['vivah', 'shadi', 'lagan', 'haldi', 'banna', 'banni', 'bidai', 'dulha', 'wedding', 'matkor'],
  },
  {
    id: 'jhijiya_parcha',
    name: 'Jhijiya/Parcha',
    hindiTitle: 'झिझिया, परछा व अनुष्ठान',
    title: 'Jhijiya Nritya & Parachhan Geet',
    description: 'Earthen pot lamp dances, ritual Parachhan welcoming traditions and folklore.',
    icon: '🏺',
    gradient: 'linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)',
    accent: '#84cc16',
    tag: 'Ritual Dance',
    keywords: ['jhijiya', 'parcha', 'parch', 'jhijiya/parcha', 'jhijhiya', 'folk ritual', 'parachhan', 'deepak'],
  },
  {
    id: 'political',
    name: 'Political',
    hindiTitle: 'चुनावी व जन जागरण गीत',
    title: 'Chunav, Neta & Political Anthems',
    description: 'Election campaign anthems, satirical folk commentary and patriotic rallying tracks.',
    icon: '📢',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    accent: '#3b82f6',
    tag: 'Jan Jagran',
    keywords: ['political', 'chunav', 'election', 'neta', 'prachar', 'vidhan sabha', 'lok sabha', 'rajneeti', 'jan jagran', 'kranti'],
  },
  {
    id: 'holi',
    name: 'Holi',
    hindiTitle: 'होली रंग व डीजे धमाल',
    title: 'Holi Ke Rang & DJ Dhamaal',
    description: 'High energy color splash, Pichkari beats and blockbuster dance numbers for Holi.',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    accent: '#f43f5e',
    tag: 'Color Festival',
    keywords: ['holi', 'rang', 'gulal', 'pichkari', 'rangbaazi', 'rang barse', 'abir'],
  },
];

export const CURATED_PLAYLISTS = CURATED_CATEGORIES;

/**
 * Robust category matcher that checks:
 * 1. song.genre / song.genres comma-separated string (e.g. "dj, bhakti, devi, birha, parch")
 * 2. Fallbacks for existing songs without explicit genre property
 */
export function songMatchesCategory(song, categoryId) {
  if (!song) return false;
  if (!categoryId || categoryId === 'all') return true;

  const cat = CURATED_CATEGORIES.find(
    (c) => c.id === categoryId || c.name.toLowerCase() === categoryId.toLowerCase()
  );
  if (!cat) return false;

  const targetKeywords = [
    cat.id.toLowerCase(),
    cat.name.toLowerCase(),
    ...(cat.keywords || []).map((k) => k.toLowerCase()),
  ];

  const isChhath =
    song.genreId === 'chhath' ||
    (song.rawGenre && song.rawGenre.toLowerCase().includes('chhath')) ||
    (song.title && song.title.toLowerCase().includes('chhath')) ||
    (song.album && song.album.toLowerCase().includes('chhath'));

  // 1. Chhath Geet playlist is strictly for Chhath Mahaparv songs
  if (cat.id === 'chhath_geet') {
    return isChhath;
  }

  // 2. Chhath songs must NEVER leak into Devi Geet, Bhakti, Bolbum or other playlists
  if (isChhath) {
    return false;
  }

  // 3. Direct check in song.genre or song.genres
  const rawGenre = (song.genre || song.genres || '').toString().toLowerCase();
  if (rawGenre) {
    const userTags = rawGenre
      .split(/[,/]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    for (const tag of userTags) {
      if (
        targetKeywords.includes(tag) ||
        targetKeywords.some((kw) => kw === tag || tag.includes(kw) || kw.includes(tag))
      ) {
        return true;
      }
    }
  }

  // 4. Fallback to existing metadata (genreId, rawGenre, genreName, title)
  const legacyId = (song.genreId || '').toLowerCase();
  const legacyRaw = (song.rawGenre || '').toLowerCase();
  const legacyName = (song.genreName || '').toLowerCase();
  const songTitle = (song.title || '').toLowerCase();
  const fullText = `${legacyId} ${legacyRaw} ${legacyName} ${songTitle}`;

  // Legacy genreId smart mappings for older records without explicit 'genre' field
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

export function getSongsForCategory(songs, categoryId) {
  return (songs || []).filter((s) => songMatchesCategory(s, categoryId));
}

// Century / Era Breakdown
export const CENTURY_ERAS = [
  { id: 'all', label: 'All Eras', icon: 'fa-solid fa-clock-rotate-left' },
  { id: '2020s', label: '2020s (Modern Hits)', range: [2020, 2099], icon: 'fa-solid fa-bolt' },
  { id: '2010s', label: '2010s (Digital Boom)', range: [2010, 2019], icon: 'fa-solid fa-mobile-screen' },
  { id: '2000s', label: '2000s (Millennium Hits)', range: [2000, 2009], icon: 'fa-solid fa-compact-disc' },
  { id: '90s', label: '90s (Cassette Revolution)', range: [1990, 1999], icon: 'fa-solid fa-tape' },
  { id: 'classic', label: 'Golden Classics (< 1990)', range: [1900, 1989], icon: 'fa-solid fa-radio' },
];

export function filterSongsByEra(songs, eraId) {
  if (!eraId || eraId === 'all') return songs || [];
  const era = CENTURY_ERAS.find((e) => e.id === eraId);
  if (!era || !era.range) return songs || [];
  const [min, max] = era.range;
  return (songs || []).filter((s) => {
    const y = parseInt(s.year, 10);
    return !isNaN(y) && y >= min && y <= max;
  });
}
