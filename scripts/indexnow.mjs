const HOST = 'dles.com.br';
const KEY = '8f4a2c1ed9b0673e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

/** Mesmas URLs do sitemap (@astrojs/sitemap, trailingSlash: always). */
const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/sobre/`,
  `https://${HOST}/sugerir/`,
];

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST,
  }),
  signal: AbortSignal.timeout(30000),
});

const body = await response.text();

console.log(`IndexNow ${response.status} ${response.statusText}`);
if (body) console.log(body);

if (response.status === 200 || response.status === 202) {
  console.log('URLs enviadas:', URL_LIST.join(', '));
  process.exit(0);
}

console.error('IndexNow falhou.');
process.exit(1);
