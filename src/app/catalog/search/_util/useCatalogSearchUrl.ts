import { useCallback, useRef, useSyncExternalStore } from 'react';

const SEARCH_URL_CHANGE_EVENT = 'catalog-search-url-change';

export function useCatalogSearchUrl(initialSearch: string) {
  const search = useSyncExternalStore(
    subscribeToSearchUrl,
    readSearchFromLocation,
    () => initialSearch,
  );
  const hasRestoredScroll = useRef(false);

  const restoreScroll = useCallback(() => {
    if (hasRestoredScroll.current || search !== readSearchFromLocation()) return;

    hasRestoredScroll.current = true;
    const historyState: unknown = window.history.state;
    if (typeof historyState !== 'object' || !historyState) return;
    if (!('catalogSearchScrollY' in historyState)) return;

    const scrollY = historyState.catalogSearchScrollY;
    if (typeof scrollY === 'number') window.scrollTo({ top: scrollY, behavior: 'instant' });
  }, [search]);

  function updateSearch(value: string) {
    if (value === search) return;

    hasRestoredScroll.current = true;

    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState({ catalogSearchScrollY: 0 }, '', url);
    window.dispatchEvent(new Event(SEARCH_URL_CHANGE_EVENT));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleResultNavigate() {
    window.history.replaceState({ catalogSearchScrollY: window.scrollY }, '');
  }

  return { search, updateSearch, restoreScroll, handleResultNavigate };
}

function subscribeToSearchUrl(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  // replaceState는 popstate를 발생시키지 않으므로 입력에서 별도로 알립니다.
  window.addEventListener(SEARCH_URL_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(SEARCH_URL_CHANGE_EVENT, onChange);
  };
}

function readSearchFromLocation() {
  return new URLSearchParams(window.location.search).get('q') ?? '';
}
