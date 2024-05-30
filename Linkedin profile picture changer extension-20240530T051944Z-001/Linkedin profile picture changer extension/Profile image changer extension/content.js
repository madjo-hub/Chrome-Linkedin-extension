function replaceProfilePictures(imageUrl) {
  const profilePics = document.querySelectorAll('img');

  profilePics.forEach(pic => {
    if (pic.alt.toLowerCase().includes("profile photo") ||
        pic.classList.contains("EntityPhoto-circle-0") ||
        pic.classList.contains("EntityPhoto-circle-3") ||
        pic.classList.contains("EntityPhoto-square-3") ||
        pic.classList.contains("EntityPhoto-circle-1") ||
        pic.classList.contains("EntityPhoto-circle-3-ghost-person") ||
        pic.classList.contains("discover-entity-type-card__image-circle--dash") ||
        pic.classList.contains("ivm-view-attr__ghost-entity") ||
        pic.classList.contains("ivm-image-view-model__circle-img") ||
        pic.classList.contains("EntityPhoto-square-1")) {
      console.log('Replacing image:', pic.src, 'with', imageUrl);
      pic.src = imageUrl;
      pic.srcset = `${imageUrl} 1x, ${imageUrl} 2x`; // Adjust for retina displays
    }
  });
}

// Initial replacement when the script is first injected
window.addEventListener('load', () => {
  chrome.storage.local.get('profileImage', function(data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      if (data.profileImage) {
        replaceProfilePictures(data.profileImage);
      }
    }
  });
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateProfileImage' && message.imageUrl) {
    replaceProfilePictures(message.imageUrl);
  }
});

// Observe the target URL for changes to ensure dynamic content is also updated
const observer = new MutationObserver(() => {
  chrome.storage.local.get('profileImage', function(data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      if (data.profileImage) {
        replaceProfilePictures(data.profileImage);
      }
    }
  });
});

// Start observing the body for added/removed nodes and subtree modifications
observer.observe(document.body, { childList: true, subtree: true });
