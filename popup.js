```javascript
let currentQuote = null;

// Import the quotes array and storage object
const { quotesArray, storage } = require('./quotes.js', './storage.js');

// Function to fetch a new quote
function fetchNewQuote() {
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  currentQuote = quotesArray[randomIndex];
  document.getElementById('quoteDisplay').innerText = currentQuote.text;
  document.body.style.backgroundColor = currentQuote.color;
}

// Function to save a comment
function saveComment() {
  const comment = document.getElementById('commentInput').value;
  if (comment) {
    storage.saveComment(currentQuote, comment);
    document.getElementById('commentInput').value = '';
  }
}

// Event listener for the next quote button
document.getElementById('nextQuoteButton').addEventListener('click', fetchNewQuote);

// Event listener for the save comment button
document.getElementById('saveCommentButton').addEventListener('click', saveComment);

// Fetch the initial quote when the popup is opened
fetchNewQuote();
```