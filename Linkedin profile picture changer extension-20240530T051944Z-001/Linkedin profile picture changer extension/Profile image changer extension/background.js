chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ profileImage: '' }, function() {
    console.log('Profile image storage initialized.');
  });
});
