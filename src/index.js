// Initialising main variables
const quoteUrl = "https://quote-garden.herokuapp.com/api/v3/quotes";
const generateBtn = document.querySelector(".generator");
const quote = document.querySelector(".quote");
const quoteCircle = document.querySelector(".quote-circle");
const quoteAuthor = document.querySelector(".author");
const info = document.querySelector(".info");
const anchor = document.querySelector(".anchor");
let lastQuote = null;

// Feature: Generating (and assigning) random quote
function assignQuote(quotes, num) {
    quote.innerText = quotes.data[num].quoteText;
    // After the quote has been inserted, make the elements visible/opaque 
    quoteCircle.classList.remove("disabled"); 
    info.classList.remove("disabled");
    anchor.classList.remove("disabled");
}
// Feedback: assigning functions could be one

function assignAuthor(authors, num) {
    let author = authors.data[num].quoteAuthor;
    quoteAuthor.innerText = author;
    authorArr = author.split(" "); // Removes the blank spaces in the author's name
    let name = authorArr.join("+"); // Replaces the blank spaces with plus signs
    anchor.setAttribute("href", `https://duckduckgo.com/?q=${name}`); // Set the href to attribute to an URL with the author's name as query parameter's value
}

// Feature: Adjusting font size so it always fits into the quote circle
const quoteText = document.querySelector(".quote");

function adjustFontSize(quotes, num) {
    let quote = quotes.data[num].quoteText;
    console.log(quote.length);
    console.log(quoteText);
    if (quote.length >= 88) {
        quoteText.style.fontSize = "1.75em";
    } else if (quote.length >= 40) {
        quoteText.style.fontSize = "2.5em";
    }else if (quote.length >= 12) {
        quoteText.style.fontSize = "3em";
    }
}

// Feature: Fetching a random quote and assigning it to the quote circle
function assignFeatures() {
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            let randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            if (lastQuote !== null) { // Checks if a quote has already been generated during the session
                while (randomNumber === lastQuote) { // Checks if the current number matches the last quote's index
                    randomNumber = Math.floor(Math.random() * 10);
                }
            }
            lastQuote = randomNumber;
            console.log(data);
            assignQuote(data, randomNumber);
            assignAuthor(data, randomNumber);
            adjustFontSize(data, randomNumber);
        });
}

generateBtn.addEventListener("click", assignFeatures);