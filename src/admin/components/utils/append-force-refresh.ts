const REFRESH_KEY = 'refresh';
const IGNORE_PARAMS_KEY = 'ignore_params';

export const appendForceRefresh = (url: string, search?: string): string => {
  const searchParamsIdx = url.lastIndexOf('?');
  const urlSearchParams =
    searchParamsIdx !== -1 ? url.substring(searchParamsIdx + 1) : null;

  const oldParams = new URLSearchParams(
    search ?? urlSearchParams ?? window.location.search ?? '',
  );
  const shouldIgnoreOldParams =
    new URLSearchParams(urlSearchParams || '').get(IGNORE_PARAMS_KEY) ===
    'true';
  const newParams = shouldIgnoreOldParams
    ? new URLSearchParams('')
    : new URLSearchParams(oldParams.toString());

  newParams.set(REFRESH_KEY, 'true');

  const newUrl =
    searchParamsIdx !== -1 ? url.substring(0, searchParamsIdx) : url;

  return `${newUrl}?${newParams.toString()}`;
};
