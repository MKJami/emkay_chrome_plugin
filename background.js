```javascript
// Importing the storage object from storage.js
import { storage } from './storage.js';

// Listening for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getQuote') {
    fetchQuote().then(quote => {
      sendResponse({ quote: quote });
    });
    return true; // Indicates that the response is sent asynchronously
  } else if (request.message === 'saveComment') {
    storage.saveComment(request.comment).then(() => {
      sendResponse({ success: true });
    });
    return true; // Indicates that the response is sent asynchronously
  }
});

// Fetching a random quote
function fetchQuote() {
  return new Promise((resolve, reject) => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        resolve({
          text: data.content,
          author: data.author,
          category: data.tags[0] // Assuming the first tag as the category
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}
```