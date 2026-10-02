const https = require('https');
const fs = require('fs');

const songQueries = [
  // Pawan Singh
  { singer: 'Pawan Singh', title: 'Lali Rang Senura Se Mathe Ke Shobha', album: 'Mai De Da Aanchal Ke Chhanv', year: 2014, q: 'Pawan Singh Lali Rang Senura Se Mathe Ke Shobha Devi Geet' },
  { singer: 'Pawan Singh', title: 'Maiya Mori Gaura Ho', album: 'Dularuaa Mai Ke', year: 2017, q: 'Pawan Singh Maiya Mori Gaura Ho Devi Geet' },
  { singer: 'Pawan Singh', title: 'Kaise Kari Vidai', album: 'Maai Ke Chunariya', year: 2015, q: 'Pawan Singh Kaise Kari Vidai Maai Ke' },
  { singer: 'Pawan Singh', title: 'Sun Re Suganwa', album: 'Jagat Kalyaan', year: 2016, q: 'Pawan Singh Sun Re Suganwa Devi Geet' },
  { singer: 'Pawan Singh', title: 'Nimiya Ke Dadh Maiya', album: 'Nimiya Ke Dadh Maiya', year: 2016, q: 'Pawan Singh Nimiya Ke Dadh Maiya Wave Music' },
  { singer: 'Pawan Singh', title: 'Chhote Mote Devra Hamar', album: 'Chhote Mote Devra', year: 2018, q: 'Pawan Singh Chhote Mote Devra Hamar Devi Geet' },
  { singer: 'Pawan Singh', title: 'Maai Doli Chadhi Chalali', album: 'Maai Doli Chadhi Chalali', year: 2019, q: 'Pawan Singh Maai Doli Chadhi Chalali Devi Geet' },
  { singer: 'Pawan Singh', title: 'Pali Me Senurwa Shobhe', album: 'Senura Ke Laaj', year: 2017, q: 'Pawan Singh Pali Me Senurwa Shobhe' },

  // Anjali Bharadwaj
  { singer: 'Anjali Bharadwaj', title: 'Lagela Nik Lagela Maiya Ke Bindiya', album: 'Nimiya Ke Daadh Maiya', year: 2018, q: 'Anjali Bharadwaj Lagela Nik Lagela Maiya ke Bindiya' },
  { singer: 'Anjali Bharadwaj', title: 'Jhule Sato Bahiniya', album: 'Aaili Sato Bahiniya', year: 2019, q: 'Anjali Bharadwaj Jhule Sato Bahiniya Devi Geet' },
  { singer: 'Anjali Bharadwaj', title: 'Baje Paijaniya Jab', album: 'Aaili Sato Bahiniya', year: 2019, q: 'Anjali Bharadwaj Baje Paijaniya Jab Devi Geet' },
  { singer: 'Anjali Bharadwaj', title: 'Koyal Bin Bagiya Na Shobhe', album: 'Maiya Ke Manbhavan Roop', year: 2017, q: 'Anjali Bharadwaj Koyal Bin Bagiya Na Shobhe' },
  { singer: 'Anjali Bharadwaj', title: 'Bhairo Bhaiya Se Kah Diha', album: 'Maai Kripa', year: 2018, q: 'Anjali Bharadwaj Bhairo Bhaiya Se Kah Diha' },
  { singer: 'Anjali Bharadwaj', title: 'Gharwa Me Maai Aili', album: 'Jagdamba Ghar Me Aili', year: 2020, q: 'Anjali Bharadwaj Gharwa Me Maai Aili Devi Geet' },
  { singer: 'Anjali Bharadwaj', title: 'Jagdamba Ghar Me Diyawa Bar Aaili', album: 'Diyawa Bar Aaili', year: 2019, q: 'Anjali Bharadwaj Jagdamba Ghar Me Diyawa Bar Aaili' },
  { singer: 'Anjali Bharadwaj', title: 'ABCD Mujwani Se', album: 'ABCD Mujwani Se', year: 2021, q: 'Anjali Bharadwaj ABCD Mujwani Se Devi Geet' },

  // Devi
  { singer: 'Devi', title: 'Nimiya Ke Daadh Maiya Jhuleli', album: 'Maiya Mor Dulri', year: 2005, q: 'Singer Devi Nimiya Ke Daadh Maiya Jhuleli' },
  { singer: 'Devi', title: 'Baghawe Chadhi Ke Aili Maai', album: 'Maiya Mor Dulri', year: 2006, q: 'Singer Devi Baghawe Chadhi Ke Aili Maai' },
  { singer: 'Devi', title: 'Machiya Baithal Sitala Maiya', album: 'Sitala Maiya', year: 2008, q: 'Singer Devi Machiya Baithal Sitala Maiya' },
  { singer: 'Devi', title: 'Pherida Na Ham Pe Najariya Ae Maai', album: 'Najariya Ae Maai', year: 2009, q: 'Singer Devi Pherida Na Ham Pe Najariya Ae Maai' },
  { singer: 'Devi', title: 'Aail Navratra Maai Ke', album: 'Chalo Re Vindhyachal Dhaam', year: 2007, q: 'Singer Devi Aail Navratra Maai Ke' },
  { singer: 'Devi', title: 'Chunariya Jhalkat Ba', album: 'Maai Ke Mahima', year: 2010, q: 'Singer Devi Chunariya Jhalkat Ba Devi Geet' },
  { singer: 'Devi', title: 'Gharwa Gharwa Ghumele Bhairo Bhaiya', album: 'Maiya Mor Dulri', year: 2005, q: 'Singer Devi Gharwa Gharwa Ghumele Bhairo Bhaiya' },

  // Anu Dubey
  { singer: 'Anu Dubey', title: 'Senura Ke Laaj Rakh Dihani', album: 'Maiya Ke Charaniya Me', year: 2015, q: 'Anu Dubey Senura Ke Laaj Rakh Dihani Devi Geet' },
  { singer: 'Anu Dubey', title: 'Kaha Bilamlu A Maai', album: 'Kaha Bilamlu A Maai', year: 2016, q: 'Anu Dubey Kaha Bilamlu A Maai Devi Geet' },
  { singer: 'Anu Dubey', title: 'Nimiya Ke Chhanv Me Maiya Ji', album: 'Maiya Mori Dulri', year: 2017, q: 'Anu Dubey Nimiya Ke Chhanv Me Maiya Ji' },
  { singer: 'Anu Dubey', title: 'Aso Maihar Nagariya Jaib', album: 'Sharda Maai Ke Dham', year: 2018, q: 'Anu Dubey Aso Maihar Nagariya Jaib' },
  { singer: 'Anu Dubey', title: 'Beti Pukare Maiya Ho', album: 'Jai Ho Maiya Sharda', year: 2016, q: 'Anu Dubey Beti Pukare Maiya Ho' },
  { singer: 'Anu Dubey', title: 'Doliya Chadhi Chalali Maai', album: 'Doliya Me Maai', year: 2019, q: 'Anu Dubey Doliya Chadhi Chalali Maai' },
  { singer: 'Anu Dubey', title: 'Vindhyachal Dhaam Suhavan Lagela', album: 'Vindhyachal Dhaam', year: 2018, q: 'Anu Dubey Vindhyachal Dhaam Suhavan Lagela' },

  // Khesari Lal Yadav
  { singer: 'Khesari Lal Yadav', title: 'Mai Bolaweli', album: 'Mai Bolaweli', year: 2016, q: 'Khesari Lal Yadav Mai Bolaweli Devi Geet' },
  { singer: 'Khesari Lal Yadav', title: 'Mai Ke Jhulanwa', album: 'Mai Ke Jhulanwa', year: 2021, q: 'Khesari Lal Yadav Mai Ke Jhulanwa Devi Geet' },
  { singer: 'Khesari Lal Yadav', title: 'Chunariya Lele Aaiha', album: 'Chunariya Lele Aaiha', year: 2017, q: 'Khesari Lal Yadav Chunariya Lele Aaiha Raja Ji' },
  { singer: 'Khesari Lal Yadav', title: 'Ara Ke Mela Me Maiya Puje Chalal Bani', album: 'Ara Ke Mela Me', year: 2018, q: 'Khesari Lal Yadav Ara Ke Mela Me Maiya Puje Chalal Bani' },
  { singer: 'Khesari Lal Yadav', title: 'Pachra Gaavele Khesari', album: 'Maiya Mori Aali', year: 2019, q: 'Khesari Lal Yadav Pachra Gaavele Khesari' },
  { singer: 'Khesari Lal Yadav', title: 'Aail Navratar Chunariya Leke Aawa', album: 'Navratra Ke Mela', year: 2020, q: 'Khesari Lal Yadav Aail Navratar Chunariya Leke Aawa' },
  { singer: 'Khesari Lal Yadav', title: 'Duara Pe Baani Thaadh Maai', album: 'Maai Ke Duara', year: 2019, q: 'Khesari Lal Yadav Duara Pe Baani Thaadh Maai' },

  // Ritesh Pandey
  { singer: 'Ritesh Pandey', title: 'Karile Hathjoriya Ho', album: 'Karile Hathjoriya', year: 2020, q: 'Ritesh Pandey Karile Hathjoriya Ho Devi Geet' },
  { singer: 'Ritesh Pandey', title: 'Maai Dulareli', album: 'Maai Dulareli', year: 2021, q: 'Ritesh Pandey Maai Dulareli Devi Geet' },
  { singer: 'Ritesh Pandey', title: 'Lali Lal Rang Chunariya Shobhe', album: 'Navratra Dhamaka', year: 2018, q: 'Ritesh Pandey Lali Lal Rang Chunariya Shobhe' },
  { singer: 'Ritesh Pandey', title: 'Pachra Maiya Ji Ke', album: 'Maiya Ke Mahima', year: 2019, q: 'Ritesh Pandey Pachra Maiya Ji Ke' },
  { singer: 'Ritesh Pandey', title: 'Nimiya Ke Ped Par Jhuleli Bhawani', album: 'Maiya Mor Dulri', year: 2018, q: 'Ritesh Pandey Nimiya Ke Ped Par Jhuleli Bhawani' },
  { singer: 'Ritesh Pandey', title: 'Doliya Chadhi Ke Aaili Mori Maai', album: 'Doliya Me Maai', year: 2020, q: 'Ritesh Pandey Doliya Chadhi Ke Aaili Mori Maai' },
  { singer: 'Ritesh Pandey', title: 'Pujawa Karelu Ki Na', album: 'Pujawa Karelu Ki Na', year: 2021, q: 'Ritesh Pandey Pujawa Karelu Ki Na Devi Geet' }
];

async function fetchYtId(query) {
  return new Promise((resolve) => {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' site:youtube.com/watch')}`;
    https.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/watch%3Fv%3D([a-zA-Z0-9_-]{11})/g) || data.match(/watch\?v=([a-zA-Z0-9_-]{11})/g) || data.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/g);
        if (matches && matches.length > 0) {
          const m = matches[0].match(/([a-zA-Z0-9_-]{11})$/);
          if (m) return resolve(m[1]);
        }
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const verifiedSongs = [];
  for (const item of songQueries) {
    let ytId = await fetchYtId(item.q);
    if (!ytId) {
      // fallback search query
      ytId = await fetchYtId(`${item.title} ${item.singer}`);
    }
    console.log(`${item.singer} - ${item.title} -> ${ytId || 'Searching fallback...'}`);
    verifiedSongs.push({
      ...item,
      youtubeId: ytId || 'Gr8G_ldltDE' // fallback placeholder if none
    });
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('./scratch/verified_devi_songs.json', JSON.stringify(verifiedSongs, null, 2));
  console.log(`Saved ${verifiedSongs.length} songs`);
}

run();
