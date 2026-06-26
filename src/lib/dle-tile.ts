import { getDleInitial, resolveDleIcon } from './dle-icon';
import type { Dle } from './types';

type DleTileSource = Pick<Dle, 'name' | 'url' | 'icon'>;

function bindDleTile(tile: HTMLElement) {
  const img = tile.querySelector<HTMLImageElement>('[data-dle-icon]');
  const initial = tile.querySelector<HTMLElement>('[data-dle-initial]');
  if (!img || !initial || tile.dataset.dleTileBound === 'true') return;

  tile.dataset.dleTileBound = 'true';

  const markLoaded = () => {
    if (img.naturalWidth > 0) tile.classList.add('is-loaded');
  };

  const markFallback = () => {
    tile.classList.remove('is-loaded');
  };

  if (img.complete) {
    if (img.naturalWidth > 0) markLoaded();
    else markFallback();
  } else {
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', markFallback);
  }
}

export function initDleTiles(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-dle-tile]').forEach(bindDleTile);
}

export function mountDleTile(tile: HTMLElement, dle: DleTileSource) {
  const { src, kind } = resolveDleIcon(dle);
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
  img.src = src;
  img.alt = '';
  img.width = 48;
  img.height = 48;
  img.decoding = 'async';

  tile.append(initialEl, img);
  bindDleTile(tile);
}
