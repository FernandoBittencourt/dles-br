const SAO_PAULO_TZ = 'America/Sao_Paulo';

export function getDateKeyInSaoPaulo(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SAO_PAULO_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function hashDate(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (Math.imul(31, hash) + dateKey.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function pickDaily<T>(items: T[], date: Date = new Date()): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty list.');
  }
  const index = hashDate(getDateKeyInSaoPaulo(date)) % items.length;
  return items[index]!;
}

export function formatDailyDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: SAO_PAULO_TZ,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date);

  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const month = (parts.find((part) => part.type === 'month')?.value ?? '').toUpperCase();
  const year = parts.find((part) => part.type === 'year')?.value ?? '';

  return `${day} ${month} ${year}`;
}
