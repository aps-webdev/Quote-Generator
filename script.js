const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show laoder
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//hide loader
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// get quotes from api
const getQuotes = async () => {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //  catch error here
  }
};

// get new quotes randomly
const newQuote = () => {
  loading();
  let idx = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[idx];
  authorText.textContent = '-' + quote.author ?? 'Unknown';
  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
  complete();
};

// Tweet a quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// event listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
