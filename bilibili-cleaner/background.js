chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    blockOn: true,
    redirectOn: true,
    shortOn: true,
    blockTitle: [],
    blockUp: [],
    redirectTitle: [],
    redirectUp: []
  });
});
