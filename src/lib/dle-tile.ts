import {
  decodeFaviconCandidates,
  encodeFaviconCandidates,
  getDleInitial,
  resolveDleIcon,
} from './dle-icon';
import type { Dle } from './types';

type DleTileSource = Pick<Dle, 'name' | 'url' | 'icon'>;

function bindFaviconImg(img: HTMLImageElement, tile: HTMLElement) {
  const markLoaded = () => tile.classList.add('is-loaded');
  const markFallback = () => tile.classList.remove('is-loaded');

  const candidates =
    decodeFaviconCandidates(img.dataset.faviconCandidates) || [img.src];
  let attempt = 0;

  const tryNext = () => {
    if (attempt >= candidates.length) {
      markFallback();
      return;
    }
    img.src = candidates[attempt];
    attempt += 1;
  };

  const onLoad = () => {
    if (img.naturalWidth > 0) markLoaded();
    else tryNext();
  };

  img.addEventListener('load', onLoad);
  img.addEventListener('error', tryNext);

  if (img.complete) {
    onLoad();
  } else {
    void img.decode().then(onLoad).catch(tryNext);
  }
}

function bindDleTile(tile: HTMLElement) {
  const img = tile.querySelector<HTMLImageElement>('[data-dle-icon]');
  if (!img || tile.dataset.dleTileBound === 'true') return;

  tile.dataset.dleTileBound = 'true';

  if (img.dataset.iconKind === 'logo') {
    const markLoaded = () => {
      if (img.naturalWidth > 0) tile.classList.add('is-loaded');
      else tile.classList.remove('is-loaded');
    };

    img.addEventListener('load', markLoaded);
    img.addEventListener('error', () => tile.classList.remove('is-loaded'));

    if (img.complete) markLoaded();
    else void img.decode().then(markLoaded).catch(() => tile.classList.remove('is-loaded'));
    return;
  }

  bindFaviconImg(img, tile);
}

export function initDleTiles(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-dle-tile]').forEach(bindDleTile);
}

export function mountDleTile(tile: HTMLElement, dle: DleTileSource) {
  const { src, kind, faviconCandidates } = resolveDleIcon(dle);
  const initial = getDleInitial(dle.name);

  tile.dataset.dleTile = '';
  tile.dataset.dleTileBound = '';
  tile.classList.remove('is-loaded');
  tile.replaceChildren();

  const initialEl = document.createElement('span');
  initialEl.className = 'dle-tile__initial';
  initialEl.dataset.dleInitial = '';
  initialEl.textContent = initial;

  const img = document.createElement('img');
  img.className = 'dle-tile__icon';
  img.dataset.dleIcon = '';
  img.dataset.iconKind = kind;
  if (faviconCandidates?.length) {
    img.dataset.faviconCandidates = encodeFaviconCandidates(faviconCandidates);
  }
  img.src = src;
  img.alt = '';
  img.width = 48;
  img.height = 48;
  img.decoding = 'async';
  img.loading = 'eager';

  tile.append(initialEl, img);
  bindDleTile(tile);
}
