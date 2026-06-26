import dles from '../src/data/dles.json' with { type: 'json' };

async function checkUrl(url) {
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
    return { status: r.status, final: r.url };
  } catch (e) {
    return { error: e.message };
  }
}

function isUrlOk(result) {
  if (result.error) return false;
  return result.status >= 200 && result.status < 400;
}

async function favicons(pageUrl) {
  const r = await fetch(pageUrl, { signal: AbortSignal.timeout(20000) });
  const html = await r.text();
  const hrefs = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/icon/i.test(tag)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (href) hrefs.push(href);
  }
  return { status: r.status, hrefs: [...new Set(hrefs)] };
}

const failures = [];

console.log('=== URL CHECK ===');
for (const dle of dles) {
  const result = await checkUrl(dle.url);
  console.log(`${dle.name}: ${JSON.stringify(result)}`);
  if (!isUrlOk(result)) {
    failures.push({ name: dle.name, url: dle.url, result });
  }
}

console.log('\n=== FAVICONS (informativo) ===');
const pages = [...new Set(dles.map((d) => d.url))];
for (const page of pages) {
  try {
    const { status, hrefs } = await favicons(page);
    console.log(page, status, hrefs);
  } catch (e) {
    console.log(page, 'error', e.message);
  }
}

if (failures.length > 0) {
  console.error('\n=== LINKS COM FALHA ===');
  for (const { name, url, result } of failures) {
    console.error(`${name} (${url}): ${JSON.stringify(result)}`);
  }
  process.exit(1);
}

console.log('\nTodos os links OK.');
