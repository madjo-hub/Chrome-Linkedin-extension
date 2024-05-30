document.getElementById('uploadButton').addEventListener('click', function() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onloadend = function() {
      const base64Data = reader.result;
      // Save the base64 image data to Chrome storage
      chrome.storage.local.set({ profileImage: base64Data }, function() {
        console.log('Profile image saved.');
        alert('Profile image uploaded successfully.');
        // Send a message to the content script to update the profile images
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateProfileImage', imageUrl: base64Data });
        });
      });
    }
    
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file.');
  }
});
