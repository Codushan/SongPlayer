const https = require('https');

async function searchYouTube(query) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const idMatches = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
        const titleMatches = data.match(/"title":\{"runs":\[\{"text":"([^"]+)"\}/g);
        const durationMatches = data.match(/"simpleText":"(\d+:\d+(?::\d+)?)"/g);
        
        const results = [];
        if (idMatches) {
          const uniqueIds = new Set();
          for (let i = 0; i < idMatches.length && results.length < 5; i++) {
            const id = idMatches[i].match(/"videoId":"([a-zA-Z0-9_-]{11})"/)[1];
            if (!uniqueIds.has(id)) {
              uniqueIds.add(id);
              results.push({ id });
            }
          }
        }
        resolve(results);
      });
    }).on('error', () => resolve([]));
  });
}

const queries = [
  "Pawan Singh Devi Geet Lali Rang Senura Se Mathe Ke Shobha",
  "Pawan Singh Devi Geet Maiya Mori Gaura Ho",
  "Pawan Singh Devi Geet Kaise Kari Vidai",
  "Pawan Singh Devi Geet Sun Re Suganwa",
  "Pawan Singh Devi Geet Nimiya Ke Dadh Maiya",
  "Pawan Singh Devi Geet Jag Re Jag Chhati Maiya",
  "Pawan Singh Devi Geet Maai Doli Chadhi Chalali",
  "Pawan Singh Devi Geet Pali Me Senurwa Shobhe",
  "Anjali Bharadwaj Devi Geet Maai Ke Singar Shobhela",
  "Anjali Bharadwaj Devi Geet Koyal Bin Bagiya Na Shobhe",
  "Anjali Bharadwaj Devi Geet Aawa Mor Maai Mori",
  "Anjali Bharadwaj Devi Geet Bhairo Bhaiya Se Kah Diha",
  "Anjali Bharadwaj Devi Geet Nav Din Ratriya Me Maai Mor Aali",
  "Anjali Bharadwaj Devi Geet Gharwa Me Maai Aili",
  "Anjali Bharadwaj Devi Geet Jagdamba Ghar Me Diyawa Bar Aaili",
  "Devi Bhojpuri Devi Geet Nimiya Ke Daadh Maiya Jhuleli",
  "Devi Bhojpuri Devi Geet Baghawe Chadhi Ke Aili Maai",
  "Devi Bhojpuri Devi Geet Aail Navratra Maai Ke",
  "Devi Bhojpuri Devi Geet Chunariya Jhalkat Ba",
  "Devi Bhojpuri Devi Geet Chalo Re Vindhyachal Dhaam",
  "Devi Bhojpuri Devi Geet Gharwa Gharwa Ghumele Bhairo Bhaiya",
  "Anu Dubey Devi Geet Senura Ke Laaj Rakh Dihani",
  "Anu Dubey Devi Geet Kaha Bilamlu A Maai",
  "Anu Dubey Devi Geet Nimiya Ke Chhanv Me Maiya Ji",
  "Anu Dubey Devi Geet Aso Maihar Nagariya Jaib",
  "Anu Dubey Devi Geet Beti Pukare Maiya Ho",
  "Anu Dubey Devi Geet Doliya Chadhi Chalali Maai",
  "Khesari Lal Yadav Devi Geet Nimiya Ke Chhanv Me Jhuleli Jhulua",
  "Khesari Lal Yadav Devi Geet Ara Ke Mela Me Maiya Puje Chalal Bani",
  "Khesari Lal Yadav Devi Geet Chunariya Lele Aaiha Raja Ji",
  "Khesari Lal Yadav Devi Geet Pachra Gaavele Khesari",
  "Khesari Lal Yadav Devi Geet Aail Navratar Chunariya Leke Aawa",
  "Khesari Lal Yadav Devi Geet Duara Pe Baani Thaadh Maai",
  "Ritesh Pandey Devi Geet Lali Lal Rang Chunariya Shobhe",
  "Ritesh Pandey Devi Geet Pachra Maiya Ji Ke",
  "Ritesh Pandey Devi Geet Nimiya Ke Ped Par Jhuleli Bhawani",
  "Ritesh Pandey Devi Geet Doliya Chadhi Ke Aaili Mori Maai",
  "Ritesh Pandey Devi Geet Navmi Ke Pujanwa",
  "Ritesh Pandey Devi Geet Pujawa Karelu Ki Na"
];

async function run() {
  const finalSongs = [];
  for (const q of queries) {
    const res = await searchYouTube(q);
    console.log(`${q} => ${res[0] ? res[0].id : 'NOT FOUND'}`);
    finalSongs.push({ query: q, topId: res[0]?.id });
    await new Promise(r => setTimeout(r, 400));
  }
  require('fs').writeFileSync('./scratch/found_devi_yt.json', JSON.stringify(finalSongs, null, 2));
}

run();
