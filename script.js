const longQuoteCharacterThreshold = 200;
const dropDownBtn = document.getElementById('dropdown-btn');
const dropDownContent = document.getElementById('dropdown-content');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let quoteHistory = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function addQuoteToHistory(quote) {
    quoteHistory.push(quote);

    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.addEventListener('click', function() {
        populateQuoteContainerFromHistory(quote);
    });
    a.textContent = quote.author;

    dropDownContent.appendChild(a);
}

function populateQuoteContainerFromHistory(quote) {
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    dropDownContent.hidden = true;
}

function toggleDropDownContent() {
    if (!dropDownContent.hidden) {
        dropDownContent.hidden = true;
        return;
    }
    dropDownContent.hidden = false;
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    addQuoteToHistory(quote);

    authorText.textContent = quote.author ?? 'Unknown';

    if (quote.text.length > longQuoteCharacterThreshold) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        removeLoadingSpinner();
    } catch (err) {
        removeLoadingSpinner();
        alert('Something went wrong');
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
dropDownBtn.addEventListener('click', toggleDropDownContent);

window.onload = function() {
    getQuotes();
};