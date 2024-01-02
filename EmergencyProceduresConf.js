 // Array of quotes about disaster risk reduction
 const quotes = [
    "Prevention is better than cure. Reduce disaster risks!",
    "Prepare today, survive tomorrow. Disaster risk reduction is key.",
    "Build to last. Build to withstand disasters.",
    "Stay informed, stay safe. Know your risks.",
    "Resilience is the key to reducing disaster impact.",
    // Add more quotes as needed
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteContainer = document.getElementById('quote-text');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteContainer.textContent = quotes[randomIndex];
}

// Initial quote display
displayRandomQuote();

// Function to change quote every 10 seconds
setInterval(displayRandomQuote, 10000);