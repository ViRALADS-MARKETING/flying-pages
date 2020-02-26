// Prefetch a give URL. Use native DOM prefetch if available,
// Otherwise use native Fetch.
// XHR is not implement since it's only needed for Internet Explorer
// and IE doesn't support intersectionObserver which is necessary
// Prefetch browser support: https://caniuse.com/#feat=link-rel-prefetch
// `Fetch` browser support: https://caniuse.com/#feat=fetch

const prefetchViaDOM = url =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

const prefetchViaFetch = url => fetch(url, { credentials: `include` });

const isDomPrefetchSupported = () => {
  const link = document.createElement("link");
  return (
    link.relList && link.relList.supports && link.relList.supports("prefetch")
  );
};

const prefetch = isDomPrefetchSupported() ? prefetchViaDOM : prefetchViaFetch;

export default prefetch;
